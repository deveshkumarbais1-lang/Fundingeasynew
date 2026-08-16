import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("How It Works | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 900px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">The Process</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">How Funding Easy Works</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 600px; margin: 0 auto;">A seamless, secure, and programmatic approach to private capital matching.</p>
                </div>

                <div style="position: relative; max-width: 600px; margin: 0 auto;">
                    <!-- Line -->
                    <div style="position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: rgba(58,117,99,0.2);"></div>

                    <!-- Step 1 -->
                    <div style="position: relative; padding-left: 64px; margin-bottom: 48px;">
                        <div style="position: absolute; left: 8px; top: 0; width: 32px; height: 32px; background: #3A7563; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; border: 4px solid #0b0d11;">1</div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px; line-height: 32px;">Create & Verify Profile</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6; margin-bottom: 16px;">Sign up as a Founder or Investor. Complete our mandatory KYC/AML screening and upload necessary corporate or accreditation documents.</p>
                        <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); padding: 16px; border-radius: 8px; font-size: 0.85rem; color: #7a8599;">Est. time: 5-10 minutes. Verification takes 24-48 hours.</div>
                    </div>

                    <!-- Step 2 -->
                    <div style="position: relative; padding-left: 64px; margin-bottom: 48px;">
                        <div style="position: absolute; left: 8px; top: 0; width: 32px; height: 32px; background: #3A7563; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; border: 4px solid #0b0d11;">2</div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px; line-height: 32px;">Algorithmic Matching</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Once verified, our engine aligns startup data (sector, stage, raise amount, traction) with investor mandates (ticket size, geo-preference, stage focus) to generate highly targeted introductions.</p>
                    </div>

                    <!-- Step 3 -->
                    <div style="position: relative; padding-left: 64px; margin-bottom: 48px;">
                        <div style="position: absolute; left: 8px; top: 0; width: 32px; height: 32px; background: #3A7563; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; border: 4px solid #0b0d11;">3</div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px; line-height: 32px;">Secure Data Room Access</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Investors review the teaser and request access to the secure data room. Founders retain granular control over who views their proprietary information, pitch decks, and financial models.</p>
                    </div>

                    <!-- Step 4 -->
                    <div style="position: relative; padding-left: 64px;">
                        <div style="position: absolute; left: 8px; top: 0; width: 32px; height: 32px; background: #3A7563; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; border: 4px solid #0b0d11;">4</div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px; line-height: 32px;">Coordination & Term Sheets</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Upon mutual interest, our platform facilitates the communication layer, standardizes due diligence workflows, and assists in moving the deal toward the term sheet stage efficiently.</p>
                    </div>
                </div>
                
                <div style="margin-top: 80px; text-align: center;">
                    <a href="/signup" data-link style="display: inline-block; padding: 14px 32px; background: #3A7563; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1rem;">Get Started Today</a>
                </div>
            </main>
        `;
    }
}
