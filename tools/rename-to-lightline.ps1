$root = "c:\LightLine"
$excludeDirs = @("node_modules", ".git", "tabby-cache", ".firebase", "out", ".next", "tools")

$files = Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $p = $_.FullName
    $skip = $false
    foreach ($ex in $excludeDirs) {
        if ($p -like "*\$ex\*") { $skip = $true; break }
    }
    -not $skip -and $_.Extension -match '\.(html|htm|css|js|ts|tsx|jsx|json|md|txt|mjs|yml|yaml|xml)$'
}

# ordered: most-specific patterns first (list of pairs to allow case-distinct keys)
$replacements = @(
    @("FIREBASE_SERVICE_ACCOUNT_NOTHINGBUTTHETRUTH_1CD23", "FIREBASE_SERVICE_ACCOUNT_LIGHTLINE"),
    @("nothingbutthetruth-1cd23-default-rtdb",              "lightline-default-rtdb"),
    @("nothingbutthetruth-1cd23",                           "lightline"),
    @("NothingButTheTRUTH.web.app",                         "LightLine.web.app"),
    @("nothingbutthetruth.web.app",                         "lightline.web.app"),
    @("nothingbutthetruth.com",                             "lightline.com"),
    @("NothingButTheTRUTH",                                 "LightLine"),
    @("NothingButTheTruth",                                 "LightLine"),
    @("nothingbutthetruth",                                 "lightline")
)

$changed = 0
foreach ($file in $files) {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $content = [System.Text.Encoding]::UTF8.GetString($bytes)
        $original = $content
        foreach ($pair in $replacements) {
            $content = $content.Replace($pair[0], $pair[1])
        }
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host "Updated: $($file.FullName.Replace($root + '\', ''))"
            $changed++
        }
    } catch {
        Write-Warning "Skipped $($file.Name): $_"
    }
}

Write-Host ""
Write-Host "Done. $changed files updated."
