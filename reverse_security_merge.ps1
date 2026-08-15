$file_path = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"
$content = Get-Content -Path $file_path -Raw

# 1. Update Section 5
$section5Old = '<section id="security-compliance" class="reveal-on-scroll" style="padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px;">
                            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 64px; align-items: center;">
                                <div>
                                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">Institutional Security</span>
                                    <h2 style="font-size: 2.25rem; font-weight: 400; color: var(--text); margin: 16px 0;">Enterprise-Grade Protection</h2>
                                    <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 32px;">
                                        Your cap table and IP are sensitive. Our platform architecture ensures strict compliance and granular access controls at every layer.
                                    </p>
                                    <a href="#security" class="btn btn-secondary" style="width: fit-content;" data-link>View Security Features</a>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; padding: 48px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border);">
                                    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        <span style="font-size: 1.1rem; font-weight: 500; color: var(--text); letter-spacing: 0.02em;">AES-256 at rest, TLS 1.3 in transit via AWS KMS</span>
                                    </div>
                                </div>'

$section5New = '<section id="security" class="reveal-on-scroll" style="padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px;">
                            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 64px; align-items: center;">
                                <div>
                                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">Institutional Security</span>
                                    <h2 style="font-size: 2.25rem; font-weight: 400; color: var(--text); margin: 16px 0;">Enterprise-Grade Protection</h2>
                                    <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 32px;">
                                        Your cap table and IP are sensitive. Our platform architecture ensures strict compliance and granular access controls at every layer.
                                    </p>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                            <div style="font-weight: 600; color: var(--text); font-size: 1.05rem;">AES-256 / TLS 1.3</div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">AES-256 at rest, TLS 1.3 in transit via AWS KMS.</div>
                                    </div>
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <div style="font-weight: 600; color: var(--text); font-size: 1.05rem;">KYC/AML Enforcement</div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Mandatory identity and accreditation verification for all members.</div>
                                    </div>
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            <div style="font-weight: 600; color: var(--text); font-size: 1.05rem;">Role-Based Permissions</div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Granular document access controls and automatic expiry.</div>
                                    </div>
                                    <div style="padding: 24px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            <div style="font-weight: 600; color: var(--text); font-size: 1.05rem;">Immutable Audit Logs</div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Complete traceability of all data access and matchmaking activities.</div>
                                    </div>'

$content = $content.Replace($section5Old, $section5New)

# 2. Update Pricing Strip area
$pricingStripOld = '<div id="security" style="background: var(--surface-3); border: 1px solid var(--border); border-radius: 12px; padding: 32px; margin-bottom: 64px;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 16px;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    <span style="font-size: 1.25rem; font-weight: 600; color: var(--text-primary); font-family: ''Lora'', serif;">Enterprise-Grade Security & Compliance</span>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
                                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" style="margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div>
                                            <div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 4px;">AES-256 at rest, TLS 1.3 in transit via AWS KMS</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">All diligence documents and platform data are strictly secured.</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" style="margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div>
                                            <div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 4px;">KYC/AML Enforcement</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">Mandatory identity and accreditation verification for all members.</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" style="margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div>
                                            <div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 4px;">Role-Based Permissions</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">Granular document access controls and automatic expiry.</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" style="margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div>
                                            <div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 4px;">Immutable Audit Logs</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">Complete traceability of all data access and matchmaking activities.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>'

$pricingStripNew = '<div style="background: var(--surface-3); border: 1px solid var(--border); border-radius: 12px; padding: 24px 32px; margin-bottom: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    <span style="font-size: 1.15rem; font-weight: 500; color: var(--text); font-family: ''Lora'', serif;">Enterprise-grade security</span>
                                </div>
                                <a href="#security" style="color: var(--accent); font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 4px;" data-link>See full details <span style="font-size: 1.2rem; line-height: 1;">&uarr;</span></a>
                            </div>'

$content = $content.Replace($pricingStripOld, $pricingStripNew)

Set-Content -Path $file_path -Value $content
