import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Security | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 900px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Enterprise-Grade Security</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">Protecting Your Data & Capital</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 700px; margin: 0 auto;">We employ bank-level encryption, rigorous access controls, and comprehensive compliance frameworks to ensure the safety of all transactions and proprietary information.</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 64px;">
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Data Encryption</h3>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #b5c0cd; font-size: 0.95rem; line-height: 1.6;">
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> AES-256 encryption for data at rest</li>
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> TLS 1.3 for data in transit</li>
                            <li style="display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Secure key management infrastructure</li>
                        </ul>
                    </div>
                    
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Access Control</h3>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #b5c0cd; font-size: 0.95rem; line-height: 1.6;">
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Role-Based Access Control (RBAC)</li>
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Multi-Factor Authentication (MFA)</li>
                            <li style="display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Comprehensive audit logging of all actions</li>
                        </ul>
                    </div>

                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Compliance & KYC</h3>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #b5c0cd; font-size: 0.95rem; line-height: 1.6;">
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Automated Anti-Money Laundering (AML) checks</li>
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Real-time identity verification</li>
                            <li style="display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> PEP and sanctions list screening</li>
                        </ul>
                    </div>

                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 16px;">Infrastructure Security</h3>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #b5c0cd; font-size: 0.95rem; line-height: 1.6;">
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Hosted on ISO 27001 certified data centers</li>
                            <li style="margin-bottom: 12px; display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Continuous vulnerability scanning</li>
                            <li style="display: flex; gap: 12px;"><span style="color: #3A7563;">✓</span> Annual independent penetration testing</li>
                        </ul>
                    </div>
                </div>
            </main>
        `;
    }
}
