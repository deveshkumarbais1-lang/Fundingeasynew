$file_path = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"
$content = Get-Content -Path $file_path -Raw

$oldSec5 = '                    <!-- 5. Enterprise Security Grid -->
                    <section id="security" class="reveal-on-scroll" style="padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--border);">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>'

$newSec5 = '                    <!-- 5. Enterprise Security Grid -->
                    <section id="security" class="reveal-on-scroll" style="padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px;">
                            <div style="text-align: center; max-width: 800px; margin: 0 auto 64px;">
                                <h2 style="font-size: 2.25rem; font-weight: 400; color: var(--text); margin-bottom: 16px;">Your deal data stays private.</h2>
                                <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6;">
                                    Every document, introduction, and diligence interaction is protected by verified identity checks, permissioned access, and full activity tracking.
                                </p>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">
                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Verified participants</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">Only approved founders and investors can enter the network.</div>
                                </div>
                                
                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Private document access</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">Choose who can view, download, or comment on each file.</div>
                                </div>

                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Access that expires</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">Revoke or automatically expire access when diligence ends.</div>
                                </div>

                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Complete activity history</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">See who opened, downloaded, or interacted with your information.</div>
                                </div>
                            </div>
                            
                            <div style="max-width: 800px; margin: 0 auto;">
                                <details style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; cursor: pointer;">
                                    <summary style="padding: 20px 24px; font-weight: 500; color: var(--text); display: flex; align-items: center; justify-content: space-between; user-select: none; list-style: none;">
                                        <span style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                            Technical controls
                                        </span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </summary>
                                    <div style="padding: 0 24px 24px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; border-top: 1px solid var(--border-subtle); margin-top: 4px; padding-top: 20px;">
                                        AES-256 encryption at rest, TLS 1.3 in transit, AWS KMS, role-based permissions, and audit logging.
                                    </div>
                                </details>
                            </div>
                        </div>
                    </section>'

$content = $content.Replace($oldSec5, $newSec5)


$oldBadge = '                                <!-- Aggregate Trust Badge -->
                                <div style="margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: var(--radius-full); box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    <span style="font-size: 0.9rem; font-weight: 600; color: var(--text); letter-spacing: 0.02em;">SOC 2 Type II Certified &amp; KYC Enforced</span>
                                </div>'
                                
$content = $content.Replace($oldBadge, '')


Set-Content -Path $file_path -Value $content
