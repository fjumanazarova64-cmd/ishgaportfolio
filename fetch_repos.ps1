$repos = Invoke-RestMethod -Uri 'https://api.github.com/users/fjumanazarova64-cmd/repos?per_page=100&sort=updated' -Headers @{'User-Agent'='Mozilla/5.0'}
foreach ($r in $repos) {
    Write-Host ("NAME: " + $r.name)
    Write-Host ("DESC: " + $r.description)
    Write-Host ("LANG: " + $r.language)
    Write-Host ("URL:  " + $r.html_url)
    Write-Host ("SITE: " + $r.homepage)
    Write-Host "---"
}
