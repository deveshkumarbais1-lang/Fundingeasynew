import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Sign In | Funding Easy");
    }

    async getHtml() {
        return `
            <style>
                .auth-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background-color: var(--bg-app);
                }
                .auth-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 24px 80px 24px;
                }
                .auth-card {
                    width: 100%;
                    max-width: 460px;
                    margin: 0 auto;
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .auth-card:hover {
                    border-color: rgba(58, 117, 99, 0.2);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
                }
                .auth-card h1 {
                    font-size: 2rem;
                    margin-bottom: 8px;
                    color: var(--text-primary);
                    font-weight: 500;
                    font-family: 'Lora', serif;
                    text-align: center;
                }
                .auth-card p.subtitle {
                    color: var(--text-secondary);
                    margin-bottom: 20px;
                    font-size: 0.95rem;
                    text-align: center;
                    line-height: 1.5;
                }
                .auth-card .trust-line {
                    font-size: 0.8rem;
                    padding: 10px 16px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    letter-spacing: 0.01em;
                    margin-bottom: 32px;
                    text-align: center;
                }
                .auth-form {
                    width: 100%;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 24px;
                }
                .form-group label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    margin: 0;
                }
                .form-group input {
                    width: 100%;
                    padding: 14px;
                    min-height: 48px;
                    background: rgba(15, 17, 23, 0.6);
                    border: 1px solid var(--border-strong);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    outline: none;
                    font-size: 0.95rem;
                    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
                }
                .form-group input:focus {
                    border-color: var(--brand-primary);
                    box-shadow: 0 0 0 3px rgba(58, 117, 99, 0.15);
                }
                .password-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                }
                .password-row a {
                    font-size: 0.8rem;
                    color: var(--brand-primary);
                    text-decoration: none;
                    font-weight: 500;
                }
                .password-row a:hover {
                    text-decoration: underline;
                    color: var(--brand-primary-hover);
                }
                .password-field {
                    position: relative;
                    width: 100%;
                }
                .password-field input {
                    padding-right: 58px;
                }
                .password-toggle {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 0.8rem;
                    padding: 8px 12px;
                    min-height: 38px;
                    font-weight: 600;
                    outline: none;
                    user-select: none;
                    border-radius: 4px;
                    transition: color var(--transition-fast), background-color var(--transition-fast);
                }
                .password-toggle:hover {
                    color: var(--text-primary);
                    background-color: rgba(255, 255, 255, 0.05);
                }
                .password-toggle:focus-visible {
                    outline: 2px solid var(--brand-primary);
                }
                
                .state-alert {
                    display: none;
                    padding: 12px 16px;
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    margin-bottom: 24px;
                    align-items: center;
                    gap: 10px;
                    line-height: 1.4;
                }
                .state-alert.error {
                    display: flex;
                    background: rgba(183, 80, 80, 0.1);
                    border: 1px solid rgba(183, 80, 80, 0.2);
                    color: #e08b8b;
                }
                .state-alert.success {
                    display: flex;
                    background: rgba(63, 138, 87, 0.1);
                    border: 1px solid rgba(63, 138, 87, 0.2);
                    color: #7bc08f;
                }
                .state-alert.info {
                    display: flex;
                    background: rgba(75, 125, 184, 0.1);
                    border: 1px solid rgba(75, 125, 184, 0.2);
                    color: #8bbce0;
                }
                
                .form-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    margin-top: 24px;
                }
                .login-btn {
                    background: var(--accent-primary);
                    color: #0f1117;
                    border: none;
                    padding: 14px;
                    border-radius: var(--radius-md);
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                    min-height: 48px;
                    transition: all var(--transition-normal);
                    box-shadow: var(--shadow-sm);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                }
                .login-btn:hover:not(:disabled) {
                    background: var(--brand-primary-hover);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(58, 117, 99, 0.2);
                }
                .login-btn:active:not(:disabled) {
                    transform: translateY(0);
                }
                .login-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .spinner {
                    display: none;
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(15, 17, 23, 0.2);
                    border-top-color: #0f1117;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .signup-prompt {
                    text-align: center;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin: 0;
                }
                .signup-prompt a {
                    color: var(--accent-primary);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color var(--transition-fast);
                }
                .signup-prompt a:hover {
                    text-decoration: underline;
                    color: var(--brand-primary-hover);
                }
                .support-path {
                    text-align: center;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    margin: 0;
                }
                .support-path a {
                    color: var(--text-secondary);
                    text-decoration: underline;
                    transition: color var(--transition-fast);
                }
                .support-path a:hover {
                    color: var(--text-primary);
                }
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
                }
            </style>
 
            <div class="auth-page">
                ${Navbar()}
                
                <main class="auth-container">
                    <section class="auth-card" id="auth-card-content">
                        <!-- Loaded dynamically by state machine -->
                    </section>
                </main>
            </div>
        `;
    }

    init() {
        const cardContent = document.getElementById('auth-card-content');
        if (!cardContent) return;

        let currentState = 'CREDENTIALS';
        let failedAttempts = parseInt(localStorage.getItem('failedLoginAttempts') || '0');
        let tempEmail = '';
        let tempRole = 'entrepreneur';
        let countdownTimer = null;

        // Check if locked out on load
        const lockoutEnd = localStorage.getItem('lockoutEnd');
        if (lockoutEnd && parseInt(lockoutEnd) > Date.now()) {
            currentState = 'LOCKED';
        }

        const renderState = () => {
            if (currentState === 'CREDENTIALS') {
                cardContent.innerHTML = `
                    <h1>Welcome back</h1>
                    <p class="subtitle">Sign in to your private capital dashboard.</p>
                    <div class="trust-line" style="border: 1px solid var(--border-subtle); background: rgba(243, 234, 215, 0.02); color: var(--text-muted);">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3A7563" stroke-width="2.5" style="flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        Secure access for verified capital-market participants.
                    </div>
                    
                    <div id="stateAlert" class="state-alert"></div>
                    
                    <form id="loginForm" class="auth-form" novalidate>
                        <input type="hidden" id="csrfInput" name="_csrf" value="csrf_FE2026_d3f82a9c">
                        
                        <div class="social-login-group">
                            <button type="button" id="googleBtn" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Continue with Google</button>
                            <button type="button" id="linkedInBtn" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2"/></svg> Continue with LinkedIn</button>
                        </div>
                        <div class="divider">
                            <span>or continue with email</span>
                        </div>

                        <div class="form-group">
                            <label for="emailInput">Email Address</label>
                            <input id="emailInput" type="email" placeholder="name@company.com" autocomplete="email" required>
                        </div>
                        
                        <div class="form-group">
                            <div class="password-row">
                                <label for="passwordInput">Password</label>
                                <a href="/forgot-password" id="forgotPasswordLink" data-link>Forgot password?</a>
                            </div>
                            <div class="password-field">
                                <input id="passwordInput" type="password" placeholder="••••••••" autocomplete="current-password" required>
                                <button type="button" id="togglePasswordBtn" class="password-toggle">Show</button>
                            </div>
                        </div>
 
                        <div class="form-actions">
                            <button type="submit" id="submitBtn" class="login-btn" disabled>
                                <span class="spinner" id="btnSpinner"></span>
                                <span id="btnText">Sign in</span>
                            </button>
                            
                            <p class="signup-prompt">
                                Don't have an account? <a href="/signup" data-link>Sign up</a>
                            </p>
                            
                            <p class="support-path">
                                Need help signing in? <a href="/contact" id="supportLink" data-link>Contact support</a>
                            </p>
                            
                            <p class="support-path" style="margin-top: 12px; font-size: 0.75rem;">
                                <a href="/privacy" data-link>Privacy Policy</a> &middot; <a href="/terms" data-link>Terms of Use</a>
                            </p>
                        </div>
                    </form>
                `;

                // Bind events for credentials
                const emailInput = document.getElementById('emailInput');
                const passwordInput = document.getElementById('passwordInput');
                const togglePasswordBtn = document.getElementById('togglePasswordBtn');
                const loginForm = document.getElementById('loginForm');
                const submitBtn = document.getElementById('submitBtn');
                const btnSpinner = document.getElementById('btnSpinner');
                const btnText = document.getElementById('btnText');
                const stateAlert = document.getElementById('stateAlert');

                // Check for timeout reason in URL
                if (location.search.includes('reason=timeout')) {
                    stateAlert.className = 'state-alert info';
                    stateAlert.style.display = 'flex';
                    stateAlert.textContent = 'Your session has expired due to inactivity. Please sign in again.';
                    // Clear the query parameter so reloading doesn't show the error again
                    history.replaceState(null, null, location.pathname);
                }

                const validateForm = () => {
                    const emailVal = emailInput.value.trim();
                    const passwordVal = passwordInput.value;
                    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
                    const isPasswordEntered = passwordVal.length >= 1;
                    submitBtn.disabled = !(isValidEmail && isPasswordEntered);
                };

                emailInput.addEventListener('input', validateForm);
                passwordInput.addEventListener('input', validateForm);

                togglePasswordBtn.addEventListener('click', () => {
                    const isPassword = passwordInput.type === 'password';
                    passwordInput.type = isPassword ? 'text' : 'password';
                    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
                });

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

                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const email = emailInput.value.toLowerCase().trim();
                    const password = passwordInput.value;

                    submitBtn.disabled = true;
                    btnSpinner.style.display = 'inline-block';
                    btnText.textContent = 'Verifying...';
                    stateAlert.style.display = 'none';

                    setTimeout(() => {
                        console.log(`[AUDIT] SEC_EVENT_LOGIN_ATTEMPT: Login request received for email: ${email}`);
                        
                        if (password === 'wrong') {
                            failedAttempts++;
                            localStorage.setItem('failedLoginAttempts', failedAttempts.toString());
                            console.warn(`[AUDIT] SEC_EVENT_LOGIN_FAILED: Authentication failure (bad password) for user: ${email}. Attempt ${failedAttempts}/3`);

                            if (failedAttempts >= 3) {
                                const lockoutDuration = 60000;
                                localStorage.setItem('lockoutEnd', (Date.now() + lockoutDuration).toString());
                                console.error(`[AUDIT] SEC_EVENT_LOCKOUT_TRIGGERED: Maximum failed attempts exceeded. Account locked for 60 seconds.`);
                                currentState = 'LOCKED';
                                renderState();
                            } else {
                                btnSpinner.style.display = 'none';
                                btnText.textContent = 'Sign in';
                                submitBtn.disabled = false;
                                stateAlert.className = 'state-alert error';
                                stateAlert.style.display = 'flex';
                                stateAlert.textContent = `Invalid credentials. Attempt ${failedAttempts} of 3 before account lockout.`;
                            }
                            return;
                        }

                        // Success at credentials step
                        failedAttempts = 0;
                        localStorage.removeItem('failedLoginAttempts');
                        tempEmail = email;
                        
                        if (email.includes('investor')) {
                            tempRole = 'investor';
                        } else if (email.includes('admin')) {
                            tempRole = 'admin';
                        } else {
                            tempRole = 'entrepreneur';
                        }

                        // Determine next state: Device recognition challenge vs 2FA
                        const deviceVerified = localStorage.getItem('deviceVerified_FE2026');
                        if (!deviceVerified) {
                            console.log(`[AUDIT] SEC_EVENT_DEVICE_CHALLENGE: Unrecognized device fingerprint. Initializing device trust challenge.`);
                            currentState = 'DEVICE_VERIFICATION';
                        } else {
                            console.log(`[AUDIT] SEC_EVENT_MFA_CHALLENGE: Multi-factor authentication required for active session.`);
                            currentState = 'TWO_FACTOR';
                        }
                        renderState();
                    }, 1000);
                });

            } else if (currentState === 'DEVICE_VERIFICATION') {
                cardContent.innerHTML = `
                    <h1>Device Verification</h1>
                    <p class="subtitle">A login attempt from a new device or location has been detected. Enter the verification code sent to your registered address.</p>
                    <div class="trust-line" style="border: 1px solid #cf8b2e; background: rgba(207, 139, 46, 0.05); color: #cf8b2e;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        New Device Verification Gating Active
                    </div>
                    
                    <div id="stateAlert" class="state-alert"></div>
                    
                    <form id="deviceForm" class="auth-form" novalidate>
                        <div class="social-login-group">
                            <button type="button" id="googleBtn" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Continue with Google</button>
                            <button type="button" id="linkedInBtn" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2"/></svg> Continue with LinkedIn</button>
                        </div>
                        <div class="divider">
                            <span>or continue with email</span>
                        </div>

                        <div class="form-group">
                            <label for="deviceCodeInput">Verification Code</label>
                            <input id="deviceCodeInput" type="text" placeholder="FE-••••••" style="letter-spacing: 0.15em; text-align: center; font-size: 1.15rem;" maxlength="8" required>
                            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; display: block; text-align: center;">Sandbox Verification Code: <strong style="color: #3A7563;">FE8899</strong></span>
                        </div>

                        <div class="form-actions">
                            <button type="submit" id="deviceSubmitBtn" class="login-btn">
                                <span class="spinner" id="deviceSpinner"></span>
                                <span id="deviceBtnText">Verify & Approve Device</span>
                            </button>
                            
                            <p class="signup-prompt">
                                Didn't receive the email? <a href="#" id="resendDeviceBtn">Resend Code</a>
                            </p>
                            
                            <p class="support-path">
                                <a href="#" id="backToCredentialsBtn" style="color: var(--text-secondary); text-decoration: underline;">Back to credentials</a>
                            </p>
                            
                            <p class="support-path" style="margin-top: 12px; font-size: 0.75rem;">
                                <a href="/privacy" data-link>Privacy Policy</a> &middot; <a href="/terms" data-link>Terms of Use</a>
                            </p>
                        </div>
                    </form>
                `;

                const deviceCodeInput = document.getElementById('deviceCodeInput');
                const deviceForm = document.getElementById('deviceForm');
                const deviceSubmitBtn = document.getElementById('deviceSubmitBtn');
                const deviceSpinner = document.getElementById('deviceSpinner');
                const deviceBtnText = document.getElementById('deviceBtnText');
                const stateAlert = document.getElementById('stateAlert');

                deviceForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const code = deviceCodeInput.value.trim().toUpperCase();

                    deviceSubmitBtn.disabled = true;
                    deviceSpinner.style.display = 'inline-block';
                    deviceBtnText.textContent = 'Verifying...';
                    stateAlert.style.display = 'none';

                    setTimeout(() => {
                        if (code === 'FE8899') {
                            console.log(`[AUDIT] SEC_EVENT_DEVICE_APPROVED: Device footprint successfully verified and registered as trusted.`);
                            localStorage.setItem('deviceVerified_FE2026', 'true');
                            
                            currentState = 'TWO_FACTOR';
                            renderState();
                        } else {
                            console.warn(`[AUDIT] SEC_EVENT_DEVICE_VERIFICATION_FAILED: Invalid device verification code entered.`);
                            deviceSpinner.style.display = 'none';
                            deviceBtnText.textContent = 'Verify & Approve Device';
                            deviceSubmitBtn.disabled = false;
                            stateAlert.className = 'state-alert error';
                            stateAlert.style.display = 'flex';
                            stateAlert.textContent = 'Invalid verification code. Please check your email or resend code.';
                        }
                    }, 800);
                });

                document.getElementById('resendDeviceBtn').addEventListener('click', (e) => {
                    e.preventDefault();
                    stateAlert.className = 'state-alert success';
                    stateAlert.style.display = 'flex';
                    stateAlert.textContent = 'A new device verification code has been dispatched to your email.';
                });

                document.getElementById('backToCredentialsBtn').addEventListener('click', (e) => {
                    e.preventDefault();
                    currentState = 'CREDENTIALS';
                    renderState();
                });

            } else if (currentState === 'TWO_FACTOR') {
                cardContent.innerHTML = `
                    <h1>2-Step Verification</h1>
                    <p class="subtitle">Enter the 6-digit confirmation code generated by your mobile authenticator application.</p>
                    <div class="trust-line" style="border: 1px solid #3A7563; background: rgba(58, 117, 99, 0.05); color: #3A7563;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        Multi-Factor Authenticator Gating Active
                    </div>
                    
                    <div id="stateAlert" class="state-alert"></div>
                    
                    <form id="mfaForm" class="auth-form" novalidate>
                        <div class="social-login-group">
                            <button type="button" id="googleBtn" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Continue with Google</button>
                            <button type="button" id="linkedInBtn" class="social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2"/></svg> Continue with LinkedIn</button>
                        </div>
                        <div class="divider">
                            <span>or continue with email</span>
                        </div>

                        <div class="form-group">
                            <label for="mfaCodeInput">Authenticator Code</label>
                            <input id="mfaCodeInput" type="text" placeholder="000 000" style="letter-spacing: 0.25em; text-align: center; font-size: 1.25rem;" maxlength="6" required>
                            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; display: block; text-align: center;">Sandbox TOTP Code: <strong style="color: #3A7563;">123456</strong></span>
                        </div>

                        <div class="form-actions">
                            <button type="submit" id="mfaSubmitBtn" class="login-btn">
                                <span class="spinner" id="mfaSpinner"></span>
                                <span id="mfaBtnText">Verify & Access Workspace</span>
                            </button>
                            
                            <p class="signup-prompt">
                                Lost device? <a href="#" id="mfaRecoveryBtn">Use Recovery Code</a>
                            </p>
                            
                            <p class="support-path">
                                <a href="#" id="backToCredentialsBtn2" style="color: var(--text-secondary); text-decoration: underline;">Back to credentials</a>
                            </p>
                            
                            <p class="support-path" style="margin-top: 12px; font-size: 0.75rem;">
                                <a href="/privacy" data-link>Privacy Policy</a> &middot; <a href="/terms" data-link>Terms of Use</a>
                            </p>
                        </div>
                    </form>
                `;

                const mfaCodeInput = document.getElementById('mfaCodeInput');
                const mfaForm = document.getElementById('mfaForm');
                const mfaSubmitBtn = document.getElementById('mfaSubmitBtn');
                const mfaSpinner = document.getElementById('mfaSpinner');
                const mfaBtnText = document.getElementById('mfaBtnText');
                const stateAlert = document.getElementById('stateAlert');

                mfaForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const code = mfaCodeInput.value.trim();

                    mfaSubmitBtn.disabled = true;
                    mfaSpinner.style.display = 'inline-block';
                    mfaBtnText.textContent = 'Verifying...';
                    stateAlert.style.display = 'none';

                    setTimeout(() => {
                        if (code === '123456') {
                            console.log(`[AUDIT] SEC_EVENT_MFA_SUCCESS: MFA TOTP challenge completed successfully. Session tokens issued.`);
                            
                            // Successful login
                            localStorage.setItem('userRole', tempRole);
                            localStorage.setItem('kycStatus', 'verified');
                            
                            stateAlert.className = 'state-alert success';
                            stateAlert.style.display = 'flex';
                            stateAlert.textContent = 'Verification approved. Redirecting to workspace...';

                            setTimeout(() => {
                                window.navigateTo(`/dashboard/${tempRole}`);
                            }, 800);
                        } else {
                            console.warn(`[AUDIT] SEC_EVENT_MFA_FAILED: Invalid MFA token submitted for user: ${tempEmail}`);
                            mfaSpinner.style.display = 'none';
                            mfaBtnText.textContent = 'Verify & Access Workspace';
                            mfaSubmitBtn.disabled = false;
                            stateAlert.className = 'state-alert error';
                            stateAlert.style.display = 'flex';
                            stateAlert.textContent = 'Invalid authenticator code. Please check your authenticator application.';
                        }
                    }, 800);
                });

                document.getElementById('mfaRecoveryBtn').addEventListener('click', (e) => {
                    e.preventDefault();
                    stateAlert.className = 'state-alert error';
                    stateAlert.style.display = 'flex';
                    stateAlert.textContent = 'Authenticator recovery has been disabled in this sandbox environment. Please contact administrator.';
                });

                document.getElementById('backToCredentialsBtn2').addEventListener('click', (e) => {
                    e.preventDefault();
                    currentState = 'CREDENTIALS';
                    renderState();
                });

            } else if (currentState === 'LOCKED') {
                const lockoutEnd = parseInt(localStorage.getItem('lockoutEnd') || '0');
                let secondsLeft = Math.max(0, Math.ceil((lockoutEnd - Date.now()) / 1000));

                cardContent.innerHTML = `
                    <h1>Account Locked</h1>
                    <p class="subtitle">For your security, this account has been temporarily locked due to repeated failed login attempts.</p>
                    <div class="trust-line" style="border: 1px solid #b75050; background: rgba(183, 80, 80, 0.05); color: #b75050;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Brute-Force Lockout Defense Active
                    </div>
                    
                    <div id="lockoutAlert" class="state-alert error" style="display: flex;">
                        Too many failed attempts. Access is disabled for another <span id="lockout-countdown" style="font-weight: 700; margin: 0 4px;">${secondsLeft}</span> seconds.
                    </div>

                    <div class="form-actions" style="margin-top: 32px;">
                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; text-align: center; margin-bottom: 24px;">
                            You may verify your identity via security email link to unlock immediately, or wait for the lockout timer to expire.
                        </div>
                        
                        <button type="button" id="verifyEmailUnlockBtn" class="login-btn" style="background: #3A7563; color: #0f1117;">
                            Verify Email to Unlock Immediately
                        </button>
                        
                        <p class="support-path" style="margin-top: 16px;">
                            Need help? <a href="mailto:support@fundingeasy.in">Contact Security Operations</a>
                        </p>
                    </div>
                `;

                const startCountdown = () => {
                    if (countdownTimer) clearInterval(countdownTimer);
                    countdownTimer = setInterval(() => {
                        const remaining = parseInt(localStorage.getItem('lockoutEnd') || '0') - Date.now();
                        secondsLeft = Math.max(0, Math.ceil(remaining / 1000));
                        
                        const countSpan = document.getElementById('lockout-countdown');
                        if (countSpan) countSpan.textContent = secondsLeft;

                        if (secondsLeft <= 0) {
                            clearInterval(countdownTimer);
                            countdownTimer = null;
                            failedAttempts = 0;
                            localStorage.removeItem('failedLoginAttempts');
                            localStorage.removeItem('lockoutEnd');
                            console.log(`[AUDIT] SEC_EVENT_LOCKOUT_EXPIRED: Account lockout cooldown completed.`);
                            currentState = 'CREDENTIALS';
                            renderState();
                        }
                    }, 1000);
                };

                startCountdown();

                document.getElementById('verifyEmailUnlockBtn').addEventListener('click', () => {
                    clearInterval(countdownTimer);
                    countdownTimer = null;
                    failedAttempts = 0;
                    localStorage.removeItem('failedLoginAttempts');
                    localStorage.removeItem('lockoutEnd');
                    console.log(`[AUDIT] SEC_EVENT_LOCKOUT_BYPASS: Account unlocked via verified email recovery link.`);
                    currentState = 'CREDENTIALS';
                    renderState();
                });
            }
        };

        // Trigger initial paint
        renderState();

        // Ensure clean timer cleanup if user navigates away
        this.cleanup = () => {
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        };
    }
}


