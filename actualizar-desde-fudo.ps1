# Lee la carta QR pública de Fudo (todas las categorías) y escribe datos/fudo.js, que usan
# la carta completa (index.html), la carta de vinos (vinos/) y el A5 imprimible (../Carta-vinos/).
# Uso: powershell -File actualizar-desde-fudo.ps1
# Funciona en Windows (con Edge) y en Linux (con Chrome): GitHub Actions lo corre cada hora.

$ErrorActionPreference = "Stop"
$dir = $PSScriptRoot
$menu = "https://menu.fu.do/laserena/qr-menu"

$navegador = @(
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $navegador) { throw "No encontré Edge ni Chrome." }

# El navegador escribe avisos en stderr que no son errores: se ignoran solo en esta llamada.
$ErrorActionPreference = "Continue"
$html = & $navegador --headless=new --disable-gpu --no-sandbox --virtual-time-budget=20000 --dump-dom $menu 2>$null | Out-String
$ErrorActionPreference = "Stop"

function Limpiar($s) { [System.Net.WebUtility]::HtmlDecode(($s -replace '<[^>]+>', '').Trim()) }

# La página tiene un <h3> por categoría y, debajo, un <a class="product" href="/laserena/<categoría>/<producto>"> por producto.
$categorias = @(); $actual = $null
foreach ($m in [regex]::Matches($html, '<h3 id="[^"]*">(.*?)</h3>|<a class="product[^"]*" href="/laserena/([^/"]+)/[^"]+">(.*?)</a>', 'Singleline')) {
  if ($m.Groups[1].Success) {
    $actual = [ordered]@{ nombre = (Limpiar $m.Groups[1].Value); slug = ""; productos = @() }
    $categorias += $actual
    continue
  }
  if (-not $actual) { continue }
  $actual.slug = $m.Groups[2].Value
  $cuerpo = $m.Groups[3].Value
  $nombre = Limpiar ([regex]::Match($cuerpo, '<h4>(.*?)</h4>', 'Singleline').Groups[1].Value)
  $precio = [regex]::Match($cuerpo, '\$\s*([\d\.]+),\d\d').Groups[1].Value -replace '\.', ''
  $desc = Limpiar ([regex]::Match($cuerpo, '</h4>\s*<p[^>]*>(.*?)</p>', 'Singleline').Groups[1].Value)
  $foto = [regex]::Match($cuerpo, '<img[^>]+src="(https://[^"]+)"').Groups[1].Value
  if ($nombre) {
    $actual.productos += [ordered]@{ nombre = $nombre; desc = $desc; precio = $(if ($precio) { [int]$precio } else { 0 }); foto = $foto }
  }
}
$categorias = @($categorias | Where-Object { $_.productos.Count -gt 0 })

# Si Fudo no respondió bien, no se pisa la última versión buena.
$total = ($categorias | ForEach-Object { $_.productos.Count } | Measure-Object -Sum).Sum
if ($categorias.Count -lt 5 -or $total -lt 50) { throw "Leí solo $($categorias.Count) categorías y $total productos de Fudo; dejo la carta como estaba." }

$zona = if ($IsLinux) { "America/Argentina/Buenos_Aires" } else { "Argentina Standard Time" }
$ahora = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, $zona)
$datos = [ordered]@{ actualizado = $ahora.ToString("dd/MM/yyyy HH:mm"); categorias = $categorias }
$nl = [string][char]10
$js = "// Generado por actualizar-desde-fudo.ps1 a partir de la carta QR de Fudo. No editar a mano." + $nl + "var FUDO = " + ($datos | ConvertTo-Json -Depth 6 -Compress) + ";" + $nl

# Solo se reescribe si cambió algún producto o precio: así la fecha dice cuándo hubo un cambio real
# y GitHub no guarda una versión nueva cada hora.
$archivo = Join-Path $dir "datos/fudo.js"
$sinFecha = { param($t) $t -replace '"actualizado":"[^"]*"', '' }
$antes = if (Test-Path $archivo) { & $sinFecha ([IO.File]::ReadAllText($archivo)) } else { "" }
$cambio = (& $sinFecha $js) -ne $antes
if ($cambio) {
  New-Item -ItemType Directory -Force (Split-Path $archivo) | Out-Null
  [IO.File]::WriteAllText($archivo, $js, (New-Object System.Text.UTF8Encoding $false))
}
"Leí $($categorias.Count) categorías y $total productos de Fudo. " + $(if ($cambio) { "Hubo cambios." } else { "Sin cambios." })
