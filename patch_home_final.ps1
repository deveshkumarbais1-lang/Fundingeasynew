$filepath = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"
$content = Get-Content -Path $filepath -Raw

# 1. Route updates
$content = $content -replace 'href="/founder/start"', 'href="/founder/apply" data-link'
$content = $content -replace 'href="/signup\?role=entrepreneur"', 'href="/founder/apply" data-link'
$content = $content -replace 'href="/signup\?role=investor"', 'href="/investor/apply" data-link'
$content = $content -replace 'href="/investor/start"', 'href="/investor/apply" data-link'

# 2. Security claims replacement
$old_sec_1 = 'AES-256 encryption at rest, TLS 1.3 in transit, AWS KMS, role-based permissions, and audit logging.'
$new_sec_1 = 'Data is encrypted in transit and at rest using controls documented in our Security Overview. Access to platform information is managed according to assigned user roles and permissions.'
$content = $content.Replace($old_sec_1, $new_sec_1)

$old_sec_2 = 'Only approved founders and investors can enter the network.'
$new_sec_2 = 'Access to the network is subject to FundingEasy’s onboarding and approval process.'
$content = $content.Replace($old_sec_2, $new_sec_2)

$old_sec_3 = '<div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Verified participants</div>'
$new_sec_3 = '<div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Participant Review</div>'
$content = $content.Replace($old_sec_3, $new_sec_3)

# 3. Traction stats removal
$content = $content -replace '120\+<span style="color: var\(--text-muted\); font-size: 1.5rem; vertical-align: super;">\*</span>', 'Verified'
$content = $content -replace '<div style="font-size: 1.1rem; color: var\(--text\); font-weight: 500; margin-bottom: 4px;">Verified Founders</div>', '<div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Founders</div>'

$content = $content -replace '85\+', 'Active'

$content = $content -replace '~3<span style="font-size: 1.5rem; vertical-align: super;">wks</span>', 'Matches'
$content = $content -replace '<div style="font-size: 1.1rem; color: var\(--text\); font-weight: 500; margin-bottom: 4px;">Median Time to Term Sheet</div>', '<div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Facilitated</div>'

# 4. Success fee references
$content = $content -replace 'A 5-7% success fee is charged only after successful funding', 'A success fee applies subject to successful funding matching'
$content = $content -replace 'A 5-7% success fee applies only on capital closed', 'A success fee applies subject to capital closed'
$content = $content -replace '&check; 5-7% success fee', '&check; Transparent success fee'
$content = $content -replace '5-7% success fee', 'success fee'

# 5. SOC 2 and Stripe Identity (if they exist)
$content = $content -replace 'SOC 2 Type II', 'Secure Platform'
$content = $content -replace 'Stripe Identity', 'Standard Identity Verification'

Set-Content -Path $filepath -Value $content -Encoding UTF8
Write-Host "Successfully patched HomeView.js"
