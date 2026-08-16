import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Sign Up | Funding Easy");
    }

    async getHtml() {
        return `
            <div class="auth-page">
                ${Navbar({ simplified: true })}
                <main class="container" style="padding: 40px 0 80px 0; max-width: 700px;">
                    <div style="background: var(--bg-surface); padding: 48px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                    <!-- Step Progress Wayfinder -->
                    <div style="margin-bottom: 32px; text-align: center;">
                        <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #3A7563; margin-bottom: 12px;">Step 1 of 3: Create Account</div>
                        <div style="display: flex; gap: 8px; justify-content: center; width: 100%; max-width: 240px; margin: 0 auto;">
                            <div style="flex: 1; height: 4px; background: #3A7563; border-radius: 2px;"></div>
                            <div style="flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;"></div>
                            <div style="flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;"></div>
                        </div>
                    </div>
                    
                    <h2 style="font-size: 2rem; margin-bottom: 8px; text-align: center; color: var(--text-primary); font-weight: 500;">Create your account</h2>
                    <p style="text-align: center; color: var(--text-secondary); margin-bottom: 48px;">Join the verified private-market matching infrastructure.</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 48px;">
                        <div class="role-card active" data-role="entrepreneur" style="padding: 24px; border: 1px solid var(--accent-primary); border-radius: var(--radius-sm); cursor: pointer; background: rgba(47, 107, 94, 0.05);">
                            <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Apply as Founder</h3>
                            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">For venture-backable companies raising private capital.</p>
                        </div>
                        <div class="role-card" data-role="investor" style="padding: 24px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); cursor: pointer; background: var(--bg-base);">
                            <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Apply as Investor</h3>
                            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">For accredited and institutional investors.</p>
                        </div>
                    </div>

                    <form id="signupForm" style="text-align: left;">
                        <input type="hidden" id="roleInput" value="entrepreneur">
                        
                        <!-- Common Fields -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Full Name</label>
                                <input type="text" name="name" autocomplete="name" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);" required>
                            </div>
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Phone Number</label>
                                <input type="tel" name="phone" autocomplete="tel" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);" required>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Personal Email</label>
                                <input type="email" name="email" autocomplete="email" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);" required>
                            </div>
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Official Email ID</label>
                                <input type="email" name="work-email" autocomplete="email" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                            </div>
                        </div>

                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Company Name <span id="companyOptional" style="color: var(--text-muted); font-weight: 400; display: none;">(Optional)</span></label>
                            <input type="text" name="company" autocomplete="organization" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);" required id="companyInput">
                        </div>

                        <div style="margin-bottom: 32px;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Password</label>
                            <input id="passwordInput" type="password" name="password" autocomplete="new-password" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); outline: none;" required>
                            
                            <!-- Password Strength Indicator -->
                            <div id="password-strength-container" style="display: none;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                    <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Strength: <span id="strength-label" style="font-weight: 700;">Weak</span></span>
                                    <span id="entropy-label" style="font-size: 0.75rem; color: var(--text-muted);">0 bits</span>
                                </div>
                                <div class="strength-bar-wrapper">
                                    <div id="strength-bar-1" class="strength-bar-segment"></div>
                                    <div id="strength-bar-2" class="strength-bar-segment"></div>
                                    <div id="strength-bar-3" class="strength-bar-segment"></div>
                                </div>
                                <div id="password-feedback" style="display: flex; flex-direction: column; gap: 6px;">
                                    <div class="password-feedback-item">
                                        <span id="check-length" class="password-feedback-check" style="color: var(--danger);">✗</span> At least 12 characters (or 20+ for passphrase)
                                    </div>
                                    <div class="password-feedback-item">
                                        <span id="check-complexity" class="password-feedback-check" style="color: var(--danger);">✗</span> Contains numbers, uppercase, lowercase, & symbols (bypassed for passphrase)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Entrepreneur Specific Fields -->
                        <div id="entrepreneurFields">
                            <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border-subtle);">
                                <h4 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">Startup Details</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Designation</label>
                                        <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                            <option>Founder</option>
                                            <option>Co-Founder</option>
                                            <option>CEO</option>
                                        </select>
                                    </div>
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Company Type</label>
                                        <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                            <option>Product</option>
                                            <option>Service</option>
                                            <option>SaaS</option>
                                            <option>FinTech</option>
                                            <option>HealthTech</option>
                                            <option>EdTech</option>
                                        </select>
                                    </div>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Expected Investment</label>
                                    <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                        <option>₹50L – ₹1Cr</option>
                                        <option>₹1Cr – ₹5Cr</option>
                                        <option>₹5Cr – ₹10Cr</option>
                                        <option>₹10Cr+</option>
                                    </select>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Funding Status</label>
                                    <div style="display: flex; gap: 16px;">
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="radio" name="fundingStatus" checked> Looking for Funding</label>
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="radio" name="fundingStatus"> Already Funded</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Investor Specific Fields -->
                        <div id="investorFields" style="display: none;">
                            <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border-subtle);">
                                <h4 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">Investment Mandate</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Designation</label>
                                        <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                            <option>Angel Investor</option>
                                            <option>Partner (VC)</option>
                                            <option>Syndicate Lead</option>
                                            <option>Family Office</option>
                                        </select>
                                    </div>
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Preferred Stage</label>
                                        <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                            <option>Pre-seed</option>
                                            <option>Seed</option>
                                            <option>Pre-Series A</option>
                                            <option>Series A</option>
                                        </select>
                                    </div>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Ticket Size Range</label>
                                    <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                        <option>₹10L – ₹50L</option>
                                        <option>₹50L – ₹2Cr</option>
                                        <option>₹2Cr – ₹10Cr</option>
                                        <option>₹10Cr+</option>
                                    </select>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Preferred Geography</label>
                                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="checkbox" checked> India</label>
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="checkbox"> South Asia</label>
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="checkbox"> Global</label>
                                    </div>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Digest Frequency</label>
                                    <div style="display: flex; gap: 16px;">
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="radio" name="digest" checked> Weekly</label>
                                        <label style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.875rem;"><input type="radio" name="digest"> Daily</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 32px;">
                            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
                                <span style="color: var(--accent-gold);">●</span> KYC required on next step
                            </div>
                            <button type="submit" id="submitBtn" style="background: var(--accent-primary); color: #fff; border: none; padding: 12px 32px; border-radius: var(--radius-sm); font-size: 1rem; font-weight: 500; cursor: pointer;" disabled>Continue to Onboarding</button>
                        </div>
                    </form>
                    
                    <p style="margin-top: 32px; text-align: center; font-size: 0.875rem; color: var(--text-secondary);">
                        Already have an account? <a href="/login" style="color: var(--accent-primary); text-decoration: none;" data-link>Log in</a>
                    </p>
                </div>
            </main>
        </div>
        `;
    }

    init() {
        const roleCards = document.querySelectorAll('.role-card');
        const roleInput = document.getElementById('roleInput');
        const entrepreneurFields = document.getElementById('entrepreneurFields');
        const investorFields = document.getElementById('investorFields');
        const companyInput = document.getElementById('companyInput');
        const companyOptional = document.getElementById('companyOptional');

        const signupForm = document.getElementById('signupForm');
        const submitBtn = document.getElementById('submitBtn');
        const passwordInput = document.getElementById('passwordInput');
        const strengthContainer = document.getElementById('password-strength-container');
        const nameInput = document.querySelector('input[name="name"]');
        const phoneInput = document.querySelector('input[name="phone"]');
        const emailInput = document.querySelector('input[name="email"]');

        const validateSignupForm = () => {
            const nameVal = nameInput.value.trim();
            const phoneVal = phoneInput.value.trim();
            const emailVal = emailInput.value.toLowerCase().trim();
            const companyVal = companyInput.value.trim();
            const pwd = passwordInput.value;
            
            const isNameEntered = nameVal.length >= 2;
            const isPhoneEntered = phoneVal.length >= 8;
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
            const isCompanyValid = !companyInput.required || companyVal.length >= 1;
            
            const isPassphrase = pwd.length >= 20;
            const lengthValid = pwd.length >= 12 || isPassphrase;
            
            const hasLower = /[a-z]/.test(pwd);
            const hasUpper = /[A-Z]/.test(pwd);
            const hasNumber = /[0-9]/.test(pwd);
            const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
            const complexityCount = (hasLower ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);
            const complexityValid = complexityCount >= 3 || isPassphrase;

            const isPasswordValid = lengthValid && complexityValid;

            submitBtn.disabled = !(isNameEntered && isPhoneEntered && isValidEmail && isCompanyValid && isPasswordValid);
        };

        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                // Reset styling
                roleCards.forEach(c => {
                    c.classList.remove('active');
                    c.style.borderColor = 'var(--border-subtle)';
                    c.style.background = 'var(--bg-base)';
                });

                // Set active styling
                card.classList.add('active');
                card.style.borderColor = 'var(--accent-primary)';
                card.style.background = 'rgba(47, 107, 94, 0.05)';

                // Update input & UI
                const role = card.dataset.role;
                roleInput.value = role;

                if (role === 'entrepreneur') {
                    entrepreneurFields.style.display = 'block';
                    investorFields.style.display = 'none';
                    companyInput.required = true;
                    companyOptional.style.display = 'none';
                } else {
                    entrepreneurFields.style.display = 'none';
                    investorFields.style.display = 'block';
                    companyInput.required = false;
                    companyOptional.style.display = 'inline';
                }
                validateSignupForm();
            });
        });

        // Set initial state from query params if available
        const urlParams = new URLSearchParams(window.location.search);
        const roleQuery = urlParams.get('role');
        if (roleQuery === 'investor') {
            document.querySelector('[data-role="investor"]').click();
        }

        // Bind input events for real-time validation
        [nameInput, phoneInput, emailInput, companyInput].forEach(input => {
            input.addEventListener('input', validateSignupForm);
        });

        passwordInput.addEventListener('input', () => {
            const pwd = passwordInput.value;
            if (!pwd) {
                strengthContainer.style.display = 'none';
                validateSignupForm();
                return;
            }
            strengthContainer.style.display = 'block';

            const hasLower = /[a-z]/.test(pwd);
            const hasUpper = /[A-Z]/.test(pwd);
            const hasNumber = /[0-9]/.test(pwd);
            const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

            let pool = 0;
            if (hasLower) pool += 26;
            if (hasUpper) pool += 26;
            if (hasNumber) pool += 10;
            if (hasSpecial) pool += 32;

            const entropy = pool > 0 ? Math.round(pwd.length * Math.log2(pool)) : 0;
            const isPassphrase = pwd.length >= 20;

            const lengthValid = pwd.length >= 12 || isPassphrase;
            const complexityCount = (hasLower ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);
            const complexityValid = complexityCount >= 3 || isPassphrase;

            const checkLengthSpan = document.getElementById('check-length');
            const checkComplexitySpan = document.getElementById('check-complexity');

            if (lengthValid) {
                checkLengthSpan.innerHTML = '✓';
                checkLengthSpan.style.color = 'var(--success)';
            } else {
                checkLengthSpan.innerHTML = '✗';
                checkLengthSpan.style.color = 'var(--danger)';
            }

            if (complexityValid) {
                checkComplexitySpan.innerHTML = '✓';
                checkComplexitySpan.style.color = 'var(--success)';
            } else {
                checkComplexitySpan.innerHTML = '✗';
                checkComplexitySpan.style.color = 'var(--danger)';
            }

            const bar1 = document.getElementById('strength-bar-1');
            const bar2 = document.getElementById('strength-bar-2');
            const bar3 = document.getElementById('strength-bar-3');
            const label = document.getElementById('strength-label');
            const entropyLabel = document.getElementById('entropy-label');

            if (isPassphrase) {
                entropyLabel.textContent = 'Passphrase';
            } else {
                entropyLabel.textContent = `${entropy} bits`;
            }

            let strength = 'Weak';
            if (lengthValid && complexityValid) {
                strength = 'Strong';
            } else if (pwd.length >= 12 || (pwd.length >= 8 && complexityCount >= 3)) {
                strength = 'Medium';
            }

            if (strength === 'Strong') {
                label.textContent = 'Strong';
                label.style.color = 'var(--success)';
                bar1.style.backgroundColor = 'var(--success)';
                bar2.style.backgroundColor = 'var(--success)';
                bar3.style.backgroundColor = 'var(--success)';
            } else if (strength === 'Medium') {
                label.textContent = 'Medium';
                label.style.color = 'var(--warning)';
                bar1.style.backgroundColor = 'var(--warning)';
                bar2.style.backgroundColor = 'var(--warning)';
                bar3.style.backgroundColor = 'transparent';
            } else {
                label.textContent = 'Weak';
                label.style.color = 'var(--danger)';
                bar1.style.backgroundColor = 'var(--danger)';
                bar2.style.backgroundColor = 'transparent';
                bar3.style.backgroundColor = 'transparent';
            }

            validateSignupForm();
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = roleInput.value;
            // Mock authentication, store state
            localStorage.setItem('userRole', role);
            localStorage.setItem('kycStatus', 'pending');
            window.navigateTo('/onboarding');
        });
    }
}
