import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Success Stories | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 900px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Traction</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">Success Stories</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 700px; margin: 0 auto;">See how top founders are accelerating their fundraises and investors are accessing high-quality, verified deal flow.</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr; gap: 32px; margin-bottom: 80px;">
                    <!-- Story 1 -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 48px; display: flex; gap: 32px; align-items: center;">
                        <div style="flex: 1;">
                            <div style="color: #3A7563; font-size: 1.5rem; margin-bottom: 16px;">"</div>
                            <p style="font-size: 1.1rem; color: #f3ead7; line-height: 1.6; font-style: italic; margin-bottom: 24px;">"Funding Easy cut our seed round timeline from 6 months to just 6 weeks. The quality of intros we received were exactly aligned with our sector and ticket size requirements. It's the most efficient way to raise capital today."</p>
                            <div>
                                <div style="font-weight: 600; color: #f3ead7;">Sarah Jenkins</div>
                                <div style="font-size: 0.85rem; color: #b5c0cd;">CEO, Nexus Health (Raised $2.5M Seed)</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Story 2 -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 48px; display: flex; gap: 32px; align-items: center;">
                        <div style="flex: 1;">
                            <div style="color: #3A7563; font-size: 1.5rem; margin-bottom: 16px;">"</div>
                            <p style="font-size: 1.1rem; color: #f3ead7; line-height: 1.6; font-style: italic; margin-bottom: 24px;">"As an institutional LP, sifting through hundreds of unqualified pitch decks was a massive drain on our resources. Funding Easy's verification and programmatic matching ensures we only look at highly curated, de-risked deal flow."</p>
                            <div>
                                <div style="font-weight: 600; color: #f3ead7;">Michael Chang</div>
                                <div style="font-size: 0.85rem; color: #b5c0cd;">Partner, Horizon Ventures</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; padding: 48px; background: rgba(58,117,99,0.05); border: 1px solid rgba(58,117,99,0.2); border-radius: 12px;">
                    <h2 style="font-size: 1.75rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Ready to be our next success story?</h2>
                    <p style="font-size: 1rem; color: #b5c0cd; margin-bottom: 32px;">Join thousands of founders and investors on the verified network.</p>
                    <a href="/signup" data-link style="display: inline-block; padding: 14px 32px; background: #3A7563; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1rem;">Apply Now</a>
                </div>
            </main>
        `;
    }
}
