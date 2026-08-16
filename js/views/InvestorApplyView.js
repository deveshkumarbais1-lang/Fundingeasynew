export default class InvestorApplyView {
    constructor() {
        document.title = "FundingEasy | Investor Registration";
        this.currentStep = 1;
        this.totalSteps = 3;
    }

    async getHtml() {
        return `
            <div style="padding: 120px 20px; max-width: 800px; margin: 0 auto; min-height: 70vh; font-family: 'Inter', sans-serif; color: var(--text);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;">
                    <div>
                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">For Investors</span>
                        <h1 style="font-size: 2.5rem; color: var(--text); margin: 16px 0 8px;">Investor Registration</h1>
                        <p style="color: var(--text-secondary); margin: 0;">Register your investment preferences and mandate. FundingEasy reviews eligibility and onboarding information before enabling access to relevant opportunities.</p>
                    </div>
                </div>

                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 32px;">
                    <!-- Progress Bar -->
                    <div style="display: flex; margin-bottom: 32px; gap: 8px;">
                        <div id="istep-dot-1" style="height: 4px; flex: 1; background: var(--accent); border-radius: 2px;"></div>
                        <div id="istep-dot-2" style="height: 4px; flex: 1; background: var(--border); border-radius: 2px;"></div>
                        <div id="istep-dot-3" style="height: 4px; flex: 1; background: var(--border); border-radius: 2px;"></div>
                    </div>

                    <form id="investor-apply-form" onsubmit="return false;">
                        <!-- STEP 1 -->
                        <div id="istep-1" class="form-step">
                            <h2 style="font-size: 1.5rem; margin-bottom: 24px;">Step 1: Registration Details</h2>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Full Name / Entity Name *</label>
                                <input type="text" id="inv-name" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Primary Jurisdiction *</label>
                                <select id="inv-jurisdiction" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                                    <option value="">Select jurisdiction...</option>
                                    <option value="us">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="eu">European Union</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Contact Email *</label>
                                <input type="email" id="inv-email" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="display: flex; justify-content: flex-end;">
                                <button type="button" id="ibtn-next-1" class="btn btn-primary" style="background: var(--accent); color: #111; padding: 10px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Next Step</button>
                            </div>
                        </div>

                        <!-- STEP 2 -->
                        <div id="istep-2" class="form-step" style="display: none;">
                            <h2 style="font-size: 1.5rem; margin-bottom: 24px;">Step 2: Eligibility & KYC</h2>
                            
                            <div style="margin-bottom: 32px; padding: 20px; background: rgba(255,255,255,0.02); border-left: 3px solid var(--accent);">
                                <h4 style="margin-top: 0; margin-bottom: 12px; font-size: 1.05rem;">Accreditation Acknowledgment</h4>
                                <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; margin-bottom: 16px;">
                                    FundingEasy operates a private matching platform. Access to opportunities is strictly subject to eligibility, verification, and platform approval.
                                </p>
                                <label style="display: flex; align-items: flex-start; gap: 12px; cursor: pointer;">
                                    <input type="checkbox" id="inv-accreditation" required style="margin-top: 4px; width: 16px; height: 16px;">
                                    <span style="font-size: 0.9rem; color: var(--text);">I acknowledge that I am an accredited investor (e.g., meeting SEC Rule 501 requirements or equivalent local regulations) and understand that identity verification may be required as part of onboarding.</span>
                                </label>
                            </div>

                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" id="ibtn-back-2" class="btn" style="background: transparent; color: var(--text); padding: 10px 24px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Back</button>
                                <button type="button" id="ibtn-next-2" class="btn btn-primary" style="background: var(--accent); color: #111; padding: 10px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Next Step</button>
                            </div>
                        </div>

                        <!-- STEP 3 -->
                        <div id="istep-3" class="form-step" style="display: none;">
                            <h2 style="font-size: 1.5rem; margin-bottom: 24px;">Step 3: Mandate Setup</h2>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Target Sector Focus *</label>
                                <select id="inv-sector" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                                    <option value="">Select sector preference...</option>
                                    <option value="agnostic">Sector Agnostic</option>
                                    <option value="fintech">FinTech</option>
                                    <option value="healthtech">HealthTech</option>
                                    <option value="saas">B2B SaaS</option>
                                    <option value="cleantech">CleanTech</option>
                                </select>
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Preferred Stage *</label>
                                <select id="inv-stage" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                                    <option value="">Select preferred stage...</option>
                                    <option value="preseed">Pre-Seed / Seed</option>
                                    <option value="seriesa">Series A / B</option>
                                    <option value="growth">Growth Stage</option>
                                </select>
                            </div>
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Typical Check Size ($) *</label>
                                <input type="number" id="inv-checksize" placeholder="e.g. 250000" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            
                            <div style="margin-bottom: 32px; padding: 16px; background: rgba(255,255,255,0.02); border-left: 3px solid var(--accent); font-size: 0.9rem; color: var(--text-secondary);">
                                Verification is part of FundingEasy’s onboarding process. It helps us maintain a more trusted network, but it does not guarantee a participant’s suitability, conduct, funding outcome, or investment outcome.
                            </div>

                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" id="ibtn-back-3" class="btn" style="background: transparent; color: var(--text); padding: 10px 24px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Back</button>
                                <button type="submit" id="ibtn-submit" class="btn btn-primary" style="background: var(--accent); color: #111; padding: 10px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Complete Registration</button>
                            </div>
                        </div>
                        
                        <!-- SUCCESS STATE -->
                        <div id="istep-success" class="form-step" style="display: none; text-align: center; padding: 40px 0;">
                            <div style="font-size: 4rem; margin-bottom: 24px; color: #3A7563;">✓</div>
                            <h2 style="font-size: 2rem; margin-bottom: 16px;">Registration Received</h2>
                            <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 32px;">Your registration and mandate preferences have been submitted. We will contact you at the provided email address once your eligibility review is complete.</p>
                            <a href="/" data-link class="btn btn-secondary" style="background: transparent; color: var(--text); padding: 10px 24px; border: 1px solid var(--border); border-radius: 6px; text-decoration: none;">Return Home</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    init() {
        const form = document.getElementById('investor-apply-form');
        if(!form) return;

        const goToStep = (step) => {
            document.getElementById('istep-1').style.display = 'none';
            document.getElementById('istep-2').style.display = 'none';
            document.getElementById('istep-3').style.display = 'none';
            
            document.getElementById('istep-' + step).style.display = 'block';
            
            document.getElementById('istep-dot-1').style.background = step >= 1 ? 'var(--accent)' : 'var(--border)';
            document.getElementById('istep-dot-2').style.background = step >= 2 ? 'var(--accent)' : 'var(--border)';
            document.getElementById('istep-dot-3').style.background = step >= 3 ? 'var(--accent)' : 'var(--border)';
        };

        const validateStep = (step) => {
            if (step === 1) {
                return document.getElementById('inv-name').value && 
                       document.getElementById('inv-jurisdiction').value &&
                       document.getElementById('inv-email').value;
            }
            if (step === 2) {
                return document.getElementById('inv-accreditation').checked;
            }
            if (step === 3) {
                return document.getElementById('inv-sector').value && 
                       document.getElementById('inv-stage').value &&
                       document.getElementById('inv-checksize').value;
            }
            return true;
        };

        document.getElementById('ibtn-next-1').addEventListener('click', () => {
            if (validateStep(1)) {
                this.currentStep = 2;
                goToStep(this.currentStep);
            } else {
                alert("Please fill out all required fields.");
            }
        });

        document.getElementById('ibtn-next-2').addEventListener('click', () => {
            if (validateStep(2)) {
                this.currentStep = 3;
                goToStep(this.currentStep);
            } else {
                alert("You must acknowledge the accreditation requirements.");
            }
        });

        document.getElementById('ibtn-back-2').addEventListener('click', () => {
            this.currentStep = 1;
            goToStep(this.currentStep);
        });

        document.getElementById('ibtn-back-3').addEventListener('click', () => {
            this.currentStep = 2;
            goToStep(this.currentStep);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('ibtn-submit');
            btn.textContent = "Submitting...";
            btn.disabled = true;
            
            // Simulate API request
            setTimeout(() => {
                document.getElementById('istep-3').style.display = 'none';
                document.getElementById('istep-success').style.display = 'block';
            }, 1500);
        });
    }
}
