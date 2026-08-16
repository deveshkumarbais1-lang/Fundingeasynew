import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("FAQ | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 800px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Support & Knowledge</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">Frequently Asked Questions</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 600px; margin: 0 auto;">Everything you need to know about the platform, our verification process, and matching algorithms.</p>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- FAQ 1 -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 32px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">How does Funding Easy verify startups and investors?</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Our multi-step verification process involves checking corporate registrations (CIN/GST) for startups and conducting KYC/AML checks for investors. We also verify proof of funds and operational history to ensure all participants meet our stringent criteria.</p>
                    </div>
                    
                    <!-- FAQ 2 -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 32px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">What is the typical timeline for matching?</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Once your profile is verified (typically 24-48 hours), our matching algorithm begins identifying suitable counterparts. First introductions generally happen within 5-7 business days, depending on your sector and funding requirements.</p>
                    </div>
                    
                    <!-- FAQ 3 -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 32px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Is my data secure?</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Absolutely. All documents are encrypted at rest using AES-256 and data in transit is protected via TLS 1.3. We operate a zero-tolerance policy for data leaks and never share your proprietary information with unauthorized third parties.</p>
                    </div>
                    
                    <!-- FAQ 4 -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 32px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">What are the fees associated with Funding Easy?</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Founders pay zero upfront fees to be listed. We operate on a success-fee model upon successful fundraise. Institutional investors pay a SaaS subscription for platform access and deal-flow syndication. <a href="/#pricing" data-link style="color: #3A7563; text-decoration: none; font-weight: 500;">View Pricing</a></p>
                    </div>
                </div>
                
                <div style="margin-top: 64px; text-align: center; padding: 48px; background: rgba(58,117,99,0.05); border: 1px solid rgba(58,117,99,0.2); border-radius: 12px;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px;">Still have questions?</h3>
                    <p style="font-size: 0.95rem; color: #b5c0cd; margin-bottom: 24px;">Our support team is available 24/7 to assist you.</p>
                    <a href="/contact" data-link style="display: inline-block; padding: 12px 24px; background: #3A7563; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.95rem;">Contact Support</a>
                </div>
            </main>
        `;
    }
}
