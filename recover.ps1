$transcript = "C:\Users\user\.gemini\antigravity\brain\017c2d6e-0c4a-460f-84ba-aa8def928e41\.system_generated\logs\transcript.jsonl"
$contents = @()
foreach ($line in Get-Content $transcript) {
    if ($line -match 'InvestorDashboardView.js') {
        try {
            $obj = $line | ConvertFrom-Json
            if ($obj.tool_calls) {
                foreach ($tc in $obj.tool_calls) {
                    if ($tc.arguments.TargetFile -match 'InvestorDashboardView.js') {
                        if ($tc.arguments.CodeContent) {
                            $contents += $tc.arguments.CodeContent
                        }
                    }
                }
            }
        } catch {}
    }
}
if ($contents.Count -gt 1) {
    $contents[$contents.Count - 2] | Out-File "C:\Users\user\.gemini\antigravity\scratch\funding-easy\recovered_investor.js"
} elseif ($contents.Count -eq 1) {
    # If there's only 1 write, then there was no previous write to InvestorDashboardView.js by me.
    # It might have been generated earlier or already existed.
    Write-Host "Only 1 write found."
} else {
    Write-Host "Not enough versions"
}
