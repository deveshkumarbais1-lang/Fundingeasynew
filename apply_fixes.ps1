$file_path = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"
$content = Get-Content -Path $file_path -Raw

# 1. Remove Footer Pull Quote
$pullQuote = '<div style="background: var(--surface); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 8px; margin-bottom: 32px; border-left: 3px solid var(--accent);">
                                    <p style="font-size: 0.85rem; font-style: italic; color: var(--text); margin-bottom: 8px; line-height: 1.5;">"Closed our lead investor 3 weeks faster than previous rounds."</p>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 500;">&mdash; Sarah Jenkins, Founder</div>
                                </div>'
$content = $content.Replace($pullQuote, "")

# 2. Section 5: Enterprise Security Grid
# Target the 2-column grid and replace with a large badge and move the link
$section5Old = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            <div style="font-weight: 600; color: var(--text); font-size: 1.05rem;">Role-Based Permissions</div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Granular document access controls and automatic expiry.</div>
                                    </div>
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            <div style="font-weight: 600; color: var(--text); font-size: 1.05rem;">Immutable Audit Logs</div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Complete traceability of all data access and matchmaking activities.</div>
                                    </div>

'
$section5New = '<div style="display: flex; align-items: center; justify-content: center; padding: 48px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border);">
                                    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        <span style="font-size: 1.1rem; font-weight: 500; color: var(--text); letter-spacing: 0.02em;">AES-256 at rest, TLS 1.3 in transit via AWS KMS</span>
                                    </div>
                                </div>'
$content = $content.Replace($section5Old, $section5New)

# Also add the anchor link to the text in Section 5
$sec5TextOld = 'Your cap table and IP are sensitive. Our platform architecture ensures strict compliance and granular access controls at every layer.
                                    </p>'
$sec5TextNew = 'Your cap table and IP are sensitive. Our platform architecture ensures strict compliance and granular access controls at every layer.
                                    </p>
                                    <a href="#security" class="btn btn-secondary" style="width: fit-content;" data-link>View Security Features</a>'
$content = $content.Replace($sec5TextOld, $sec5TextNew)


# 3. Remove orphaned grids from the Pricing area
$orphans = '                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="font-weight: 600; color: var(--text); margin-bottom: 8px; font-size: 1.05rem;">AWS KMS Encryption</div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">AES-256 encryption at rest and TLS 1.3 in transit for all diligence files.</div>
                                    </div>
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="font-weight: 600; color: var(--text); margin-bottom: 8px; font-size: 1.05rem;">KYC/AML Verified</div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Identity and accreditation checks integrated via Stripe Identity.</div>
                                    </div>
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="font-weight: 600; color: var(--text); margin-bottom: 8px; font-size: 1.05rem;">Access Audit Logs</div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Immutable tracking of exactly who viewed what document and when.</div>
                                    </div>
                                </div>
                            </div>'
$content = $content.Replace($orphans, "")


# 4. Canonicalize messaging in the Enhanced Security Strip
$stripOld = '<div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 4px;">AES-256 & SSL Encryption</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">Data is encrypted at rest and in transit via TLS 1.3.</div>'
$stripNew = '<div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 4px;">AES-256 at rest, TLS 1.3 in transit via AWS KMS</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">All diligence documents and platform data are strictly secured.</div>'
$content = $content.Replace($stripOld, $stripNew)

# 5. Canonicalize messaging in the footer
$footerBadgeOld = '<span style="display: flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-trust)" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg> AES-256 at rest</span>'
$footerBadgeNew = '<span style="display: flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-trust)" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg> AES-256 at rest, TLS 1.3 in transit via AWS KMS</span>'
$content = $content.Replace($footerBadgeOld, $footerBadgeNew)

Set-Content -Path $file_path -Value $content
