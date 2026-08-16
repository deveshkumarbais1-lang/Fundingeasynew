$file = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\ContactView.js"
$content = @"
import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Contact Us | Funding Easy");
    }

    async getHtml() {
        return `
            <style>
                .contact-page {
                    background-color: #12151d;
                    background-image: radial-gradient(circle at 50% -20%, rgba(58, 117, 99, 0.08) 0%, transparent 70%);
                    min-height: 100vh;
                    padding-bottom: 80px;
                }
                .contact-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 100px 24px;
                    display: grid;
                    grid-template-columns: 1fr 1.1fr;
                    gap: 64px;
                    align-items: start;
                }
                
                @media (max-width: 860px) {
                    .contact-container {
                        grid-template-columns: 1fr;
                        gap: 48px;
                        padding: 80px 24px;
                    }
                }
                
                .contact-info-panel .eyebrow {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--brand-primary);
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    margin-bottom: 16px;
                }
                .contact-info-panel h1 {
                    font-size: 3.2rem;
                    font-weight: 500;
                    font-family: 'Lora', serif;
                    color: var(--text-primary);
                    margin-bottom: 24px;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                .contact-info-panel .reassurance {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 48px;
                    max-width: 480px;
                }
                
                .contact-methods {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .contact-method-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: var(--radius-lg);
                    transition: border-color var(--transition-fast);
                }
                .contact-method-card:hover {
                    border-color: rgba(255, 255, 255, 0.1);
                }
                .method-icon {
                    flex-shrink: 0;
                    color: var(--text-muted);
                    margin-top: 2px;
                }
                .method-content h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 8px;
                }
                .method-content p {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                    margin: 0;
                }
                .method-content a {
                    color: var(--brand-primary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }
                .method-content a:hover {
                    text-decoration: underline;
                    color: var(--brand-primary-hover);
                }

                .contact-form-panel {
                    background: #171b24;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 40px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }
                
                .contact-form-panel h2 {
                    font-size: 1.5rem;
                    font-weight: 500;
                    font-family: 'Lora', serif;
                    color: var(--text-primary);
                    margin-bottom: 32px;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 24px;
                }
                @media (max-width: 600px) {
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                }
                .form-group {
                    margin-bottom: 24px;
                }
                .form-group label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                }
                .form-group input, 
                .form-group select, 
                .form-group textarea {
                    width: 100%;
                    padding: 14px;
                    background: #12151d;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-family: inherit;
                    font-size: 0.95rem;
                    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
                    outline: none;
                }
                .form-group input:focus, 
                .form-group select:focus, 
                .form-group textarea:focus {
                    border-color: var(--brand-primary);
                    box-shadow: 0 0 0 3px rgba(58, 117, 99, 0.15);
                }
                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .submit-btn {
                    width: 100%;
                    padding: 16px;
                    background: var(--accent-primary);
                    color: #0f1117;
                    border: none;
                    border-radius: var(--radius-md);
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-normal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .submit-btn:hover:not(:disabled) {
                    background: var(--brand-primary-hover);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(58, 117, 99, 0.2);
                }
                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .form-footer {
                    margin-top: 24px;
                    text-align: center;
                }
                .form-footer p {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    margin-bottom: 8px;
                }
                .form-footer .legal-links {
                    font-size: 0.75rem;
                }
                .form-footer a {
                    color: var(--text-secondary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }
                .form-footer a:hover {
                    color: var(--text-primary);
                    text-decoration: underline;
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

                .success-state {
                    display: none;
                    text-align: center;
                    padding: 40px 20px;
                }
                .success-state .icon-wrapper {
                    width: 64px;
                    height: 64px;
                    background: rgba(58, 117, 99, 0.1);
                    color: var(--brand-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                }
                .success-state h3 {
                    font-size: 1.5rem;
                    font-family: 'Lora', serif;
                    color: var(--text-primary);
                    margin-bottom: 12px;
                }
                .success-state p {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 32px;
                }
                
                .error-feedback {
                    display: none;
                    color: #e08b8b;
                    font-size: 0.85rem;
                    margin-top: 6px;
                }
            </style>
            
            <div class="contact-page">
                ` + '${Navbar()}' + `
                
                <main class="contact-container">
                    <!-- Left Panel: Info -->
                    <div class="contact-info-panel">
                        <div class="eyebrow">Get In Touch</div>
                        <h1>Contact Our Team</h1>
                        <p class="reassurance">Whether you have a question about the verification process, platform features, or institutional partnerships, we're here to help.</p>
                        
                        <div class="contact-methods">
                            <div class="contact-method-card">
                                <svg class="method-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <div class="method-content">
                                    <h3>Headquarters</h3>
                                    <p>Level 12, Tower B, Cyber City<br>Gurugram, Haryana 122002, India</p>
                                </div>
                            </div>
                            
                            <div class="contact-method-card">
                                <svg class="method-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <div class="method-content">
                                    <h3>Email Support</h3>
                                    <p style="margin-bottom: 8px;">General: <a href="mailto:hello@fundingeasy.in">hello@fundingeasy.in</a></p>
                                    <p style="margin-bottom: 8px;">Compliance: <a href="mailto:kyc@fundingeasy.in">kyc@fundingeasy.in</a></p>
                                    <p>Institutional: <a href="mailto:partners@fundingeasy.in">partners@fundingeasy.in</a></p>
                                </div>
                            </div>
                            
                            <div class="contact-method-card">
                                <svg class="method-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <div class="method-content">
                                    <h3>Business Hours</h3>
                                    <p>Monday - Friday<br>9:00 AM - 6:00 PM (IST)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Panel: Form -->
                    <div class="contact-form-panel">
                        <div id="contactFormWrapper">
                            <h2>Message our team</h2>
                            <form id="contactForm" novalidate>
                                <div class="form-row">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <label for="firstName">First name</label>
                                        <input type="text" id="firstName" required>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <label for="lastName">Last name</label>
                                        <input type="text" id="lastName" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="email">Work email</label>
                                    <input type="email" id="email" required>
                                    <div class="error-feedback" id="emailError">Please enter a valid email address.</div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="subject">Inquiry type</label>
                                    <select id="subject" required>
                                        <option value="" disabled selected>Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="kyc">KYC / Verification Support</option>
                                        <option value="institutional">Institutional Partnership</option>
                                        <option value="technical">Technical Support</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="message">Message</label>
                                    <textarea id="message" placeholder="How can we help?" required></textarea>
                                </div>
                                
                                <button type="submit" id="submitBtn" class="submit-btn">
                                    <span class="spinner" id="btnSpinner"></span>
                                    <span id="btnText">Send message</span>
                                </button>
                                
                                <div class="form-footer">
                                    <p>We typically respond within one business day.</p>
                                    <div class="legal-links">
                                        <a href="/privacy" data-link>Privacy Policy</a> &middot; <a href="/terms" data-link>Terms of Use</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <!-- Success State -->
                        <div id="successState" class="success-state">
                            <div class="icon-wrapper">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h3>Message Sent</h3>
                            <p>Thank you for reaching out to Funding Easy. A member of our support team will review your inquiry and get back to you shortly.</p>
                            <button type="button" id="resetFormBtn" class="submit-btn" style="background: rgba(255,255,255,0.05); color: var(--text-primary); border: 1px solid rgba(255,255,255,0.1);">
                                Send another message
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    init() {
        const form = document.getElementById('contactForm');
        const formWrapper = document.getElementById('contactFormWrapper');
        const successState = document.getElementById('successState');
        const submitBtn = document.getElementById('submitBtn');
        const btnSpinner = document.getElementById('btnSpinner');
        const btnText = document.getElementById('btnText');
        const resetBtn = document.getElementById('resetFormBtn');
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        if (form) {
            const validateEmail = () => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
                if(emailInput.value.trim() !== '' && !isValid) {
                    emailError.style.display = 'block';
                    emailInput.style.borderColor = '#e08b8b';
                } else {
                    emailError.style.display = 'none';
                    emailInput.style.borderColor = '';
                }
                return isValid;
            };

            emailInput.addEventListener('blur', validateEmail);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic validation
                const isEmailValid = validateEmail();
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value.trim();
                const firstName = document.getElementById('firstName').value.trim();
                
                if(!isEmailValid || !subject || !message || !firstName) {
                    // Force native validation tooltips or mark empty required fields if needed
                    // For now, we trust the 'required' attributes natively blocking submit if empty
                    return;
                }

                // Transition to loading state
                submitBtn.disabled = true;
                btnSpinner.style.display = 'inline-block';
                btnText.textContent = 'Sending...';

                // Simulate network request
                setTimeout(() => {
                    // Reset button state silently
                    submitBtn.disabled = false;
                    btnSpinner.style.display = 'none';
                    btnText.textContent = 'Send message';
                    
                    // Show success state
                    formWrapper.style.display = 'none';
                    successState.style.display = 'block';
                    
                    form.reset();
                }, 1200);
            });
            
            resetBtn.addEventListener('click', () => {
                successState.style.display = 'none';
                formWrapper.style.display = 'block';
            });
        }
    }
}
"@
Set-Content $file $content
