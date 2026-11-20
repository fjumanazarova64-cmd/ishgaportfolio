$html = Invoke-WebRequest -Uri 'https://github.com/fjumanazarova64-cmd?tab=repositories' -Headers @{'User-Agent'='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
$text = $html.Content

# Extract repo names with regex
$matches1 = [regex]::Matches($text, 'href="/fjumanazarova64-cmd/([^"/?]+)"[^>]*itemprop="name codeRepository"')
$names = $matches1 | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

Write-Host "REPOS FOUND:"
foreach ($name in $names) {
    Write-Host $name
}
