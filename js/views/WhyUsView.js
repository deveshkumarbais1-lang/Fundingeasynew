import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Why Us | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 900px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">The Funding Easy Advantage</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">Why Top Founders & Investors Choose Us</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 700px; margin: 0 auto;">We don't just provide a directory; we offer a highly curated, secure, and programmatic matching environment that drastically reduces time-to-close.</p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 32px; margin-bottom: 80px;">
                    <!-- Reason 1 -->
                    <div style="display: flex; gap: 32px; align-items: flex-start; background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <div style="width: 48px; height: 48px; flex-shrink: 0; background: rgba(58,117,99,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #3A7563;">1</div>
                        <div>
                            <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px;">Zero Noise, Maximum Signal</h3>
                            <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Unlike open platforms where anyone can message you, our algorithmic matching ensures that you only interact with counterparties who meet your specific criteria, deal size, and sector focus.</p>
                        </div>
                    </div>
                    
                    <!-- Reason 2 -->
                    <div style="display: flex; gap: 32px; align-items: flex-start; background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <div style="width: 48px; height: 48px; flex-shrink: 0; background: rgba(58,117,99,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #3A7563;">2</div>
                        <div>
                            <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px;">Institutional-Grade Security</h3>
                            <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Your pitch decks and financial models are stored in encrypted data rooms. You have granular control over who can view them and can revoke access instantly, ensuring your intellectual property remains safe.</p>
                        </div>
                    </div>

                    <!-- Reason 3 -->
                    <div style="display: flex; gap: 32px; align-items: flex-start; background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <div style="width: 48px; height: 48px; flex-shrink: 0; background: rgba(58,117,99,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #3A7563;">3</div>
                        <div>
                            <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px;">Verified Ecosystem</h3>
                            <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Every user undergoes rigorous KYC/AML checks. Founders can be confident they are speaking to accredited investors with actual deployed capital, and investors know the startups are legally verified entities.</p>
                        </div>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="/signup" data-link style="display: inline-block; padding: 14px 32px; background: #3A7563; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1rem;">Join the Network</a>
                </div>
            </main>
        `;
    }
}
