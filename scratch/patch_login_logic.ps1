$file = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\LoginView.js"
$content = Get-Content $file -Raw

# 1. Update Social Buttons with IDs
$content = $content -replace '<button type="button" class="social-btn">(\s*<svg.*?4285F4.*?>.*?)\s*Continue with Google\s*</button>', '<button type="button" id="googleBtn" class="social-btn">$1 Continue with Google</button>'
$content = $content -replace '<button type="button" class="social-btn">(\s*<svg.*?0A66C2.*?>.*?)\s*Continue with LinkedIn\s*</button>', '<button type="button" id="linkedInBtn" class="social-btn">$1 Continue with LinkedIn</button>'

# 2. Update support link
$content = $content -replace 'href="mailto:support@fundingeasy\.in" id="supportLink"', 'href="/contact" id="supportLink" data-link'

# 3. Remove old forgotPasswordLink interceptor
$forgotInterceptor = '(?s)document\.getElementById\(''forgotPasswordLink''\)\.addEventListener\(''click'', \(e\) => \{.*?\}\);\s*'
$content = [regex]::Replace($content, $forgotInterceptor, "")

# 4. Inject OAuth mocking handlers before loginForm submit event
$oauthMocking = @"
                // Social login mock handlers
                const handleSocialLogin = (btnId, providerName) => {
                    const btn = document.getElementById(btnId);
                    if (!btn) return;
                    
                    btn.addEventListener('click', () => {
                        const originalHtml = btn.innerHTML;
                        btn.disabled = true;
                        btn.style.opacity = '0.7';
                        btn.innerHTML = '<span class="spinner" style="display:inline-block; margin-right:8px; border-top-color:var(--text-primary);"></span> Redirecting to ' + providerName + '...';
                        
                        submitBtn.disabled = true;
                        if(btnId === 'googleBtn') document.getElementById('linkedInBtn').disabled = true;
                        if(btnId === 'linkedInBtn') document.getElementById('googleBtn').disabled = true;
                        
                        stateAlert.style.display = 'none';

                        setTimeout(() => {
                            btn.disabled = false;
                            btn.style.opacity = '1';
                            btn.innerHTML = originalHtml;
                            
                            submitBtn.disabled = false;
                            document.getElementById('googleBtn').disabled = false;
                            document.getElementById('linkedInBtn').disabled = false;
                            
                            stateAlert.className = 'state-alert error';
                            stateAlert.style.display = 'flex';
                            stateAlert.textContent = 'We couldn’t complete sign-in with ' + providerName + '. Please try again or use email.';
                        }, 1500);
                    });
                };
                
                handleSocialLogin('googleBtn', 'Google');
                handleSocialLogin('linkedInBtn', 'LinkedIn');

"@

$loginSubmitRegex = 'loginForm\.addEventListener\(''submit'', \(e\) => \{'
$content = [regex]::Replace($content, $loginSubmitRegex, "$oauthMocking`n                $loginSubmitRegex")

Set-Content $file $content
