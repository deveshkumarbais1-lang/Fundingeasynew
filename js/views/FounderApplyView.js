export default class FounderApplyView {
    constructor() {
        document.title = "FundingEasy | Founder Application";
        this.currentStep = 1;
        this.totalSteps = 3;
    }

    async getHtml() {
        return `
            <div style="padding: 120px 20px; max-width: 800px; margin: 0 auto; min-height: 70vh; font-family: 'Inter', sans-serif; color: var(--text);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;">
                    <div>
                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">For Founders</span>
                        <h1 style="font-size: 2.5rem; color: var(--text); margin: 16px 0 8px;">Founder Application</h1>
                        <p style="color: var(--text-secondary); margin: 0;">Submit your company and funding requirements. FundingEasy reviews your profile and, where applicable, completes verification before considering it for mandate-aligned matching.</p>
                    </div>
                </div>

                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 32px;">
                    <!-- Progress Bar -->
                    <div style="display: flex; margin-bottom: 32px; gap: 8px;">
                        <div id="step-dot-1" style="height: 4px; flex: 1; background: var(--accent); border-radius: 2px;"></div>
                        <div id="step-dot-2" style="height: 4px; flex: 1; background: var(--border); border-radius: 2px;"></div>
                        <div id="step-dot-3" style="height: 4px; flex: 1; background: var(--border); border-radius: 2px;"></div>
                    </div>

                    <form id="founder-apply-form" onsubmit="return false;">
                        <!-- STEP 1 -->
                        <div id="step-1" class="form-step">
                            <h2 style="font-size: 1.5rem; margin-bottom: 24px;">Step 1: Basic Information</h2>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Company Name *</label>
                                <input type="text" id="company-name" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Company Website *</label>
                                <input type="url" id="company-website" placeholder="https://" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Contact Email *</label>
                                <input type="email" id="contact-email" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="display: flex; justify-content: flex-end;">
                                <button type="button" id="btn-next-1" class="btn btn-primary" style="background: var(--accent); color: #111; padding: 10px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Next Step</button>
                            </div>
                        </div>

                        <!-- STEP 2 -->
                        <div id="step-2" class="form-step" style="display: none;">
                            <h2 style="font-size: 1.5rem; margin-bottom: 24px;">Step 2: Business Overview</h2>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Primary Sector *</label>
                                <select id="sector" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                                    <option value="">Select a sector...</option>
                                    <option value="fintech">FinTech</option>
                                    <option value="healthtech">HealthTech</option>
                                    <option value="saas">B2B SaaS</option>
                                    <option value="cleantech">CleanTech</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Current Stage *</label>
                                <select id="stage" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                                    <option value="">Select current stage...</option>
                                    <option value="preseed">Pre-Seed</option>
                                    <option value="seed">Seed</option>
                                    <option value="seriesa">Series A</option>
                                    <option value="seriesb">Series B+</option>
                                </select>
                            </div>
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Pitch Deck Link (Optional)</label>
                                <input type="url" id="deck-link" placeholder="Dropbox, Google Drive, DocSend link..." style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" id="btn-back-2" class="btn" style="background: transparent; color: var(--text); padding: 10px 24px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Back</button>
                                <button type="button" id="btn-next-2" class="btn btn-primary" style="background: var(--accent); color: #111; padding: 10px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Next Step</button>
                            </div>
                        </div>

                        <!-- STEP 3 -->
                        <div id="step-3" class="form-step" style="display: none;">
                            <h2 style="font-size: 1.5rem; margin-bottom: 24px;">Step 3: Funding Ask</h2>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Target Raise Amount ($) *</label>
                                <input type="number" id="target-raise" placeholder="e.g. 1500000" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.95rem;">Minimum Check Size ($) *</label>
                                <input type="number" id="min-check" placeholder="e.g. 50000" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; color: var(--text);">
                            </div>
                            
                            <div style="margin-bottom: 32px; padding: 16px; background: rgba(255,255,255,0.02); border-left: 3px solid var(--accent); font-size: 0.9rem; color: var(--text-secondary);">
                                By submitting this application, you acknowledge that FundingEasy will review this information. Submission does not guarantee acceptance, introductions, or funding.
                            </div>

                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" id="btn-back-3" class="btn" style="background: transparent; color: var(--text); padding: 10px 24px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Back</button>
                                <button type="submit" id="btn-submit" class="btn btn-primary" style="background: var(--accent); color: #111; padding: 10px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Submit Application</button>
                            </div>
                        </div>
                        
                        <!-- SUCCESS STATE -->
                        <div id="step-success" class="form-step" style="display: none; text-align: center; padding: 40px 0;">
                            <div style="font-size: 4rem; margin-bottom: 24px; color: #3A7563;">✓</div>
                            <h2 style="font-size: 2rem; margin-bottom: 16px;">Application Received</h2>
                            <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 32px;">Your application has been successfully submitted and is currently pending verification. We will contact you at the provided email address once the initial review is complete.</p>
                            <a href="/" data-link class="btn btn-secondary" style="background: transparent; color: var(--text); padding: 10px 24px; border: 1px solid var(--border); border-radius: 6px; text-decoration: none;">Return Home</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    init() {
        const form = document.getElementById('founder-apply-form');
        if(!form) return;

        const goToStep = (step) => {
            document.getElementById('step-1').style.display = 'none';
            document.getElementById('step-2').style.display = 'none';
            document.getElementById('step-3').style.display = 'none';
            
            document.getElementById('step-' + step).style.display = 'block';
            
            document.getElementById('step-dot-1').style.background = step >= 1 ? 'var(--accent)' : 'var(--border)';
            document.getElementById('step-dot-2').style.background = step >= 2 ? 'var(--accent)' : 'var(--border)';
            document.getElementById('step-dot-3').style.background = step >= 3 ? 'var(--accent)' : 'var(--border)';
        };

        const validateStep = (step) => {
            if (step === 1) {
                return document.getElementById('company-name').value && 
                       document.getElementById('company-website').value &&
                       document.getElementById('contact-email').value;
            }
            if (step === 2) {
                return document.getElementById('sector').value && 
                       document.getElementById('stage').value;
            }
            return true;
        };

        document.getElementById('btn-next-1').addEventListener('click', () => {
            if (validateStep(1)) {
                this.currentStep = 2;
                goToStep(this.currentStep);
            } else {
                alert("Please fill out all required fields.");
            }
        });

        document.getElementById('btn-next-2').addEventListener('click', () => {
            if (validateStep(2)) {
                this.currentStep = 3;
                goToStep(this.currentStep);
            } else {
                alert("Please fill out all required fields.");
            }
        });

        document.getElementById('btn-back-2').addEventListener('click', () => {
            this.currentStep = 1;
            goToStep(this.currentStep);
        });

        document.getElementById('btn-back-3').addEventListener('click', () => {
            this.currentStep = 2;
            goToStep(this.currentStep);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit');
            btn.textContent = "Submitting...";
            btn.disabled = true;
            
            // Simulate API request
            setTimeout(() => {
                document.getElementById('step-3').style.display = 'none';
                document.getElementById('step-success').style.display = 'block';
            }, 1500);
        });
    }
}
