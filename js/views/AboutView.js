import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("About Us | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 900px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Our Mission</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">Democratizing Private Capital</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 700px; margin: 0 auto;">We are building the definitive infrastructure for verified private market transactions, connecting high-growth startups with institutional and accredited investors through a secure, algorithmic matching engine.</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 80px;">
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <div style="width: 48px; height: 48px; background: rgba(58,117,99,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A7563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        </div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">The Problem</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">The private market is historically opaque, fragmented, and inefficient. Founders spend 6-9 months raising capital, while investors sift through thousands of unqualified pitch decks. Trust is low, and transaction costs are incredibly high.</p>
                    </div>
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <div style="width: 48px; height: 48px; background: rgba(58,117,99,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A7563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        </div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Our Solution</h3>
                        <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Funding Easy replaces cold outreach with programmatic matching. By enforcing strict KYC/AML on both sides and utilizing a secure data vault, we ensure that every introduction is highly relevant, verified, and ready for due diligence.</p>
                    </div>
                </div>

                <div style="text-align: center; margin-bottom: 64px;">
                    <h2 style="font-size: 2rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px;">By the Numbers</h2>
                    <div style="display: flex; justify-content: space-around; background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 48px;">
                        <div>
                            <div style="font-size: 2.5rem; font-weight: 700; color: #3A7563; margin-bottom: 8px;">$2.4B+</div>
                            <div style="font-size: 0.85rem; color: #b5c0cd; text-transform: uppercase; letter-spacing: 0.05em;">Capital Deployed</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; font-weight: 700; color: #3A7563; margin-bottom: 8px;">4,500+</div>
                            <div style="font-size: 0.85rem; color: #b5c0cd; text-transform: uppercase; letter-spacing: 0.05em;">Verified Investors</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; font-weight: 700; color: #3A7563; margin-bottom: 8px;">12,000+</div>
                            <div style="font-size: 0.85rem; color: #b5c0cd; text-transform: uppercase; letter-spacing: 0.05em;">Curated Startups</div>
                        </div>
                    </div>
                </div>
                
            </main>
        `;
    }
}
