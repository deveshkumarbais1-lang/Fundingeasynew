$filepath = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\InvestorDashboardView.js"
$content = Get-Content -Path $filepath -Raw

# 1. Inject mandate disclaimer in the Discover filter header
$old_discover_filter_header = '<h2 style="font-size: 1.15rem; font-weight: 600; color: var(--inv-text-primary);">Discover Filters</h2>'
$new_discover_filter_header = $old_discover_filter_header + "`r`n                            <div style=`"background: rgba(200, 164, 93, 0.1); border-bottom: 1px solid rgba(200, 164, 93, 0.3); padding: 12px 0px; font-size: 0.85rem; color: var(--inv-text-secondary); margin-top: 8px;`"><strong>Note:</strong> Deal flow is filtered strictly by your approved mandate and jurisdiction.</div>"
$content = $content.Replace($old_discover_filter_header, $new_discover_filter_header)

# 2. Add compliant copy to Diligence/Documents. I'll inject it next to "Diligence Readiness".
$old_diligence = '<div class="filter-section-title">Diligence Readiness</div>'
$new_diligence = '<div style="margin-bottom: 16px; padding: 12px; background: rgba(255,255,255,0.02); border-left: 3px solid var(--inv-accent); font-size: 0.8rem; color: var(--inv-text-secondary);">FundingEasy records selected workspace activity to support access oversight.</div>' + "`r`n                                " + $old_diligence
$content = $content.Replace($old_diligence, $new_diligence)

Set-Content -Path $filepath -Value $content -Encoding UTF8
Write-Host "Successfully patched InvestorDashboardView.js"
