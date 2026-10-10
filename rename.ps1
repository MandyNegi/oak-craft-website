$files = Get-ChildItem -Path . -File -Recurse | Where-Object { 
    $_.FullName -notmatch '\\node_modules\\' -and 
    $_.FullName -notmatch '\\\.git\\' -and 
    $_.FullName -notmatch '\\\.next\\' 
}

foreach ($file in $files) {
    $original = [IO.File]::ReadAllText($file.FullName)
    $modified = $original.Replace("Perfect Space Interior", "Perfect Space Interior")
    $modified = $modified.Replace("PERFECT SPACE INTERIOR", "PERFECT SPACE INTERIOR")
    $modified = $modified.Replace("perfectspaceinterior.co.uk", "perfectspaceinterior.co.uk")
    $modified = $modified.Replace("perfect-space-interior", "perfect-space-interior")
    
    if ($original -cne $modified) {
        [IO.File]::WriteAllText($file.FullName, $modified)
        Write-Host "Updated $($file.Name)"
    }
}
