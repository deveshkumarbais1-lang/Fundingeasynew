import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("KYC & Verification | Funding Easy");
    }

    async getHtml() {
        const role = localStorage.getItem('userRole') || 'entrepreneur';
        
        return `
            ${Navbar()}
            <main class="container" style="padding: 96px 0; max-width: 800px;">
                <div style="text-align: center; margin-bottom: 48px;">
                    <div style="font-size: 0.75rem; font-weight: 600; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 16px; letter-spacing: 0.05em;">KYC/AML Secure Enrollment</div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 16px; font-weight: 500; color: var(--text-primary);">Secure Onboarding & Verification</h2>
                    <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.6;">
                        Funding Easy operates a zero-tolerance policy for unverified profiles. <br>
                        Please complete the required KYC/AML verification steps below to enroll in the secure network.
                    </p>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden;">
                    
                    <!-- Progress Header -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border-subtle); background: var(--bg-surface-hover);">
                        <div id="step1-tab" style="padding: 24px; border-bottom: 2px solid var(--accent-primary); color: var(--text-primary); font-weight: 600; text-align: center;">
                            Step 2 of 3: Verify Identity
                        </div>
                        <div id="step2-tab" style="padding: 24px; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 500; text-align: center;">
                            Step 3 of 3: Entity Verification
                        </div>
                    </div>

                    <div style="padding: 48px;">
                        
                        <!-- STEP 1: Personal KYC -->
                        <div id="step1-content">
                            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 24px; color: var(--text-primary);">Proof of Identity</h3>
                            
                            <form id="kycForm1">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                                    <div>
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Government ID Type</label>
                                        <select style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                            <option>Aadhaar Card (India)</option>
                                            <option>PAN Card (India)</option>
                                            <option>Passport (Global)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">ID Number</label>
                                        <input type="text" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);" required>
                                    </div>
                                </div>

                                <div style="margin-bottom: 32px;">
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Upload ID Document (Front & Back)</label>
                                    <div style="border: 1px dashed var(--border-subtle); padding: 48px; text-align: center; border-radius: var(--radius-sm); background: var(--bg-base);">
                                        <div style="font-size: 2rem; color: var(--text-muted); margin-bottom: 16px;">📄</div>
                                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 16px;">Drag and drop files here or click to browse.</p>
                                        <input type="file" required style="font-size: 0.875rem;">
                                    </div>
                                </div>

                                <button type="submit" class="kyc-submit-btn" style="background: var(--accent-primary); color: #fff; border: none; padding: 12px 32px; border-radius: var(--radius-sm); font-size: 1rem; font-weight: 500; cursor: pointer; width: 100%;">
                                    Submit Phase 1
                                </button>
                            </form>
                        </div>

                        <!-- STEP 2: Business/Entity KYC -->
                        <div id="step2-content" style="display: none;">
                            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 24px; color: var(--text-primary);">
                                ${role === 'entrepreneur' ? 'Startup Operations Verification' : 'Investor Entity & Funds Verification'}
                            </h3>
                            
                            <form id="kycForm2">
                                ${role === 'entrepreneur' ? `
                                    <div style="margin-bottom: 24px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Business Registration Document (CIN/GST/Incorporation)</label>
                                        <input type="file" required style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                    <div style="margin-bottom: 24px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Proof of Business Operations (Bank Statement/Invoice)</label>
                                        <input type="file" required style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                ` : `
                                    <div style="margin-bottom: 24px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Net Worth Declaration or Fund Structure Document</label>
                                        <input type="file" required style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                    <div style="margin-bottom: 24px;">
                                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Bank Account Verification Statement</label>
                                        <input type="file" required style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                `}

                                <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 32px; padding: 16px; background: rgba(184, 154, 94, 0.05); border-left: 3px solid var(--accent-gold);">
                                    <div style="color: var(--accent-gold); font-size: 1.25rem;">🔒</div>
                                    <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                                        All documents are encrypted at rest via AES-256 and only accessible by compliance administrators. Your data will never be shared with other users.
                                    </p>
                                </div>

                                <button type="submit" class="kyc-submit-btn" style="background: var(--accent-primary); color: #fff; border: none; padding: 12px 32px; border-radius: var(--radius-sm); font-size: 1rem; font-weight: 500; cursor: pointer; width: 100%;">
                                    Complete Verification
                                </button>
                            </form>
                        </div>
                        
                        <!-- PENDING STATE -->
                        <div id="pending-content" style="display: none; text-align: center; padding: 48px 0;">
                            <div style="font-size: 3rem; margin-bottom: 24px;">⏳</div>
                            <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">Verification in Progress</h3>
                            <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; max-width: 400px; margin: 0 auto 32px auto;">
                                Our compliance team is reviewing your documents. This usually takes between 24 and 48 hours.
                            </p>
                            <!-- Simulating approval for MVP purposes -->
                            <button id="simulateApprovalBtn" style="background: transparent; color: var(--text-muted); border: 1px solid var(--border-subtle); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.875rem; cursor: pointer;">
                                [Dev Tool: Simulate Approval]
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        `;
    }

    init() {
        const form1 = document.getElementById('kycForm1');
        const form2 = document.getElementById('kycForm2');
        
        const step1Tab = document.getElementById('step1-tab');
        const step2Tab = document.getElementById('step2-tab');
        
        const step1Content = document.getElementById('step1-content');
        const step2Content = document.getElementById('step2-content');
        const pendingContent = document.getElementById('pending-content');
        
        const simulateApprovalBtn = document.getElementById('simulateApprovalBtn');

        // Check if already in pending state
        if (localStorage.getItem('kycStatus') === 'pending_review') {
            showPendingState();
        }

        form1.addEventListener('submit', (e) => {
            e.preventDefault();
            // Transition to Step 2
            step1Content.style.display = 'none';
            step2Content.style.display = 'block';
            
            step1Tab.style.borderBottomColor = 'transparent';
            step1Tab.style.color = 'var(--text-muted)';
            
            step2Tab.style.borderBottomColor = 'var(--accent-primary)';
            step2Tab.style.color = 'var(--text-primary)';
        });

        form2.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('kycStatus', 'pending_review');
            showPendingState();
        });

        simulateApprovalBtn.addEventListener('click', () => {
            localStorage.setItem('kycStatus', 'verified');
            const role = localStorage.getItem('userRole') || 'entrepreneur';
            window.navigateTo(`/dashboard/${role}`);
        });

        function showPendingState() {
            step1Tab.style.borderBottomColor = 'transparent';
            step2Tab.style.borderBottomColor = 'transparent';
            step1Content.style.display = 'none';
            step2Content.style.display = 'none';
            pendingContent.style.display = 'block';
            
            document.querySelector('.container h2').innerText = "We're verifying your profile";
        }
    }
}
