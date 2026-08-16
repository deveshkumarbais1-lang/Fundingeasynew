$file = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\LoginView.js"
$content = Get-Content $file -Raw

# 1. Update Title and Headers
$content = $content -replace 'this\.setTitle\("Log In \| Funding Easy"\);', 'this.setTitle("Sign In | Funding Easy");'
$content = $content -replace '<p class="subtitle">Log in to your private capital dashboard\.</p>', '<p class="subtitle">Sign in to your private capital dashboard.</p>'
$content = $content -replace 'Secure access for verified founders, investors, and internal teams\.', 'Secure access for verified capital-market participants.'
$content = $content -replace 'id="btnText">Log In</span>', 'id="btnText">Sign in</span>'
$content = $content -replace 'btnText\.textContent = ''Log In'';', 'btnText.textContent = ''Sign in'';'
$content = $content -replace 'Need help signing in\?', 'Need help signing in?' # Keep same
$content = $content -replace 'Your session has expired due to inactivity\. Please log in again\.', 'Your session has expired due to inactivity. Please sign in again.'

# 2. Add CSS for social buttons and divider
$cssRegex = '(\.support-path a:hover \{\s*color: var\(--text-primary\);\s*\})'
$newCss = '$1
                .social-login-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 24px;
                }
                .social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    padding: 12px;
                    min-height: 48px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-strong);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-size: 0.95rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                .social-btn:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.2);
                }
                .divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 24px;
                }
                .divider::before, .divider::after {
                    content: "";
                    flex: 1;
                    border-bottom: 1px solid var(--border-subtle);
                }
                .divider span {
                    padding: 0 12px;
                    color: var(--text-muted);
                    font-size: 0.8rem;
                }'
$content = [regex]::Replace($content, $cssRegex, $newCss)

# 3. Replace TLS/Rate limiting info with Social Buttons and Divider
$tlsRegex = '(?s)<div style="font-size: 0\.75rem; color: #8F9CAE; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba\(255,255,255,0\.05\); padding-bottom: 8px;">.*?</div>'
$socialHtml = '<div class="social-login-group">
                            <button type="button" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                Continue with Google
                            </button>
                            <button type="button" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2"/></svg>
                                Continue with LinkedIn
                            </button>
                        </div>
                        <div class="divider">
                            <span>or continue with email</span>
                        </div>'
$content = [regex]::Replace($content, $tlsRegex, $socialHtml, 1)

# 4. Add Privacy Policy and Terms of Use links below the support link
$supportRegex = '(?s)<p class="support-path">(.*?)</p>'
$supportReplacement = '<p class="support-path">$1</p>
                            
                            <p class="support-path" style="margin-top: 12px; font-size: 0.75rem;">
                                <a href="/privacy" data-link>Privacy Policy</a> &middot; <a href="/terms" data-link>Terms of Use</a>
                            </p>'
$content = [regex]::Replace($content, $supportRegex, $supportReplacement, 1)

Set-Content $file $content
