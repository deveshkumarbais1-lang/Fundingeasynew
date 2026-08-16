import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Reset Password | Funding Easy");
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
                    margin-bottom: 24px;
                    font-size: 0.95rem;
                    text-align: center;
                    line-height: 1.5;
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
                .login-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .support-path {
                    text-align: center;
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    margin: 0;
                }
                .support-path a {
                    color: var(--text-primary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                    font-weight: 500;
                }
                .support-path a:hover {
                    text-decoration: underline;
                    color: var(--brand-primary-hover);
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
                .state-alert {
                    display: none;
                    padding: 12px 16px;
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    margin-bottom: 24px;
                    align-items: flex-start;
                    gap: 10px;
                    line-height: 1.4;
                }
                .state-alert.success {
                    display: flex;
                    background: rgba(63, 138, 87, 0.1);
                    border: 1px solid rgba(63, 138, 87, 0.2);
                    color: #7bc08f;
                }
            </style>
 
            <div class="auth-page">
                ${Navbar()}
                
                <main class="auth-container">
                    <section class="auth-card">
                        <h1>Reset Password</h1>
                        <p class="subtitle">Enter your email to receive recovery instructions.</p>
                        
                        <div id="resetStateAlert" class="state-alert success"></div>
                        
                        <form id="forgotPasswordForm" class="auth-form" novalidate>
                            <div class="form-group">
                                <label for="resetEmailInput">Email Address</label>
                                <input id="resetEmailInput" type="email" placeholder="name@company.com" required>
                            </div>
     
                            <div class="form-actions">
                                <button type="submit" id="resetBtn" class="login-btn" disabled>
                                    <span class="spinner" id="resetSpinner"></span>
                                    <span id="resetBtnText">Email reset link</span>
                                </button>
                                
                                <p class="support-path">
                                    <a href="/login" data-link>Back to sign in</a>
                                </p>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        `;
    }

    init() {
        const form = document.getElementById('forgotPasswordForm');
        if (!form) return;

        const emailInput = document.getElementById('resetEmailInput');
        const submitBtn = document.getElementById('resetBtn');
        const spinner = document.getElementById('resetSpinner');
        const btnText = document.getElementById('resetBtnText');
        const alert = document.getElementById('resetStateAlert');

        emailInput.addEventListener('input', () => {
            const val = emailInput.value.trim();
            submitBtn.disabled = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (!email) return;

            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';
            btnText.textContent = 'Sending...';
            alert.style.display = 'none';

            // Simulate server-side reset token flow (neutral confirmation)
            setTimeout(() => {
                spinner.style.display = 'none';
                btnText.textContent = 'Email reset link';
                emailInput.value = '';
                
                alert.style.display = 'flex';
                alert.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>If an account exists for this email, you'll receive reset instructions shortly.</div>
                `;
            }, 800);
        });
    }
}
