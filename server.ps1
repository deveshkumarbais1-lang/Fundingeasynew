 $port = 8083
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server running at http://localhost:$port/"
Write-Host "Press Ctrl+C to stop"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $response = $context.Response
        
        $requestMethod = $context.Request.HttpMethod
        $requestUrl = $context.Request.Url.LocalPath
        Write-Host "Request: $requestMethod $requestUrl"
        
        if ($requestUrl -eq "/") { $requestUrl = "/index.html" }
        
        # We need to map some routes back to index.html for SPA routing
        $filePath = Join-Path $root $requestUrl
        if (-not (Test-Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $root "/index.html"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            [byte[]]$content = [System.IO.File]::ReadAllBytes($filePath)
            Write-Host "Serving file: $filePath ($($content.Length) bytes)"
            
            # Basic mime types
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".png"  { $response.ContentType = "image/png" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            if ($requestMethod -eq "HEAD") {
                $response.ContentLength64 = $content.Length
                $response.Close()
            } else {
                $response.ContentLength64 = $content.Length
                $response.Close($content, $true)
            }
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    }
}
finally {
    $listener.Stop()
}
