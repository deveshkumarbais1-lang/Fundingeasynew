$file_path = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"
$content = Get-Content -Path $file_path -Raw

$restore_path = "C:\Users\user\.gemini\antigravity\brain\017c2d6e-0c4a-460f-84ba-aa8def928e41\restore_content.txt"
$restored_text = Get-Content -Path $restore_path -Raw

# The target we want to inject BEFORE
$target = '<div style="text-align: center; margin-bottom: 48px; position: relative;">
                                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">Traction & Proof</span>'

# Because PowerShell uses `replace` with regex, we can just use string `Replace`
$content = $content.Replace($target, $restored_text + "`r`n`r`n" + $target)

Set-Content -Path $file_path -Value $content
