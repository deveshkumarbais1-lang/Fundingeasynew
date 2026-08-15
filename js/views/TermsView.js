import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Terms of Service | Funding Easy");
        this.docMetadata = {
            version: "2.0",
            lastUpdated: "2026-06-03"
        };
    }

    async getHtml() {
        return `
            <style>
                body.homepage-active {
                    background-color: #FAF8F5 !important;
                    color: #1A1D1C !important;
                }
                .homepage-active .navbar {
                    background-color: #FAF8F5 !important;
                    border-bottom: 1px solid rgba(45, 84, 70, 0.08) !important;
                }
                .homepage-active .navbar .logo { color: #1A1D1C !important; }
                .homepage-active .navbar .logo-icon { color: #2D5446 !important; }
                .homepage-active .navbar .nav-link { color: #555A57 !important; }
                .homepage-active .navbar .nav-link:hover { color: #1A1D1C !important; }
                .homepage-active .navbar .btn-primary {
                    background-color: #2D5446 !important;
                    color: #FAF8F5 !important;
                }
                .homepage-active .navbar .btn-secondary {
                    background-color: transparent !important;
                    color: #1A1D1C !important;
                    border: 1px solid rgba(0, 0, 0, 0.15) !important;
                }
                .editorial-doc {
                    font-family: 'Inter', sans-serif;
                    background-color: #FAF8F5;
                    color: #1A1D1C;
                    line-height: 1.8;
                    padding: 100px 0;
                }
                .editorial-doc h1, .editorial-doc h2 {
                    font-family: 'Lora', Georgia, serif;
                    font-weight: 400;
                    color: #1A1D1C;
                    margin-bottom: 16px;
                }
                .spec-ref {
                    font-size: 0.85rem;
                    color: #888E8B;
                    font-style: italic;
                    margin-bottom: 24px;
                    display: block;
                    padding-left: 12px;
                    border-left: 2px solid rgba(45, 84, 70, 0.2);
                }
                
                /* Layout */
                .doc-layout {
                    display: flex;
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 24px;
                    gap: 64px;
                }
                .doc-sidebar {
                    display: none;
                    width: 240px;
                    flex-shrink: 0;
                    position: sticky;
                    top: 100px;
                    max-height: calc(100vh - 120px);
                    overflow-y: auto;
                    align-self: flex-start;
                    border-left: 1px solid rgba(45, 84, 70, 0.1);
                    padding-left: 16px;
                }
                @media (min-width: 900px) {
                    .doc-sidebar {
                        display: block;
                    }
                }
                .doc-content {
                    flex: 1;
                    max-width: 700px;
                }
                
                /* TOC Styles */
                .toc-link {
                    display: block;
                    font-size: 0.85rem;
                    color: #888E8B;
                    text-decoration: none;
                    margin-bottom: 10px;
                    transition: color 0.2s;
                    line-height: 1.4;
                }
                .toc-link:hover {
                    color: #2D5446;
                }
            </style>
            ${Navbar()}
            <div class="editorial-doc">
                <div class="doc-layout">
                    <!-- Table of Contents Sidebar -->
                    <aside class="doc-sidebar">
                        <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #1A1D1C; margin-bottom: 16px;">Contents</h4>
                        <a href="#acceptance" class="toc-link">1. Acceptance of Terms</a>
                        <a href="#eligibility" class="toc-link">2. Eligibility and Account Requirements</a>
                        <a href="#verification" class="toc-link">3. Verification Requirements</a>
                        <a href="#confidentiality" class="toc-link">4. Confidentiality and Non-Disclosure</a>
                        <a href="#vault" class="toc-link">5. Diligence Vault and Encryption</a>
                        <a href="#introductions" class="toc-link">6. Introductions and Mediated Comms</a>
                        <a href="#no-advice" class="toc-link">7. No Investment Advice or Endorsement</a>
                        <a href="#matching" class="toc-link">8. Matching and Algorithmic Workflow</a>
                        <a href="#payments" class="toc-link">9. Payment Terms and Success Fees</a>
                        <a href="#ip" class="toc-link">10. Intellectual Property</a>
                        <a href="#retention" class="toc-link">11. Data Retention and Deletion</a>
                        <a href="#security" class="toc-link">12. Security and Access Controls</a>
                        <a href="#liability" class="toc-link">13. Limitation of Liability</a>
                        <a href="#indemnification" class="toc-link">14. Indemnification</a>
                        <a href="#third-party" class="toc-link">15. Third-Party Services and AML</a>
                        <a href="#suspension" class="toc-link">16. Account Suspension and Termination</a>
                        <a href="#disputes" class="toc-link">17. Dispute Resolution and Governing Law</a>
                        <a href="#changes" class="toc-link">18. Changes to Terms</a>
                        <a href="#contact" class="toc-link">19. Contact</a>
                        <a href="#founder-agreement" class="toc-link">20. Founder Agreement</a>
                        <a href="#investor-agreement" class="toc-link">21. Investor Agreement</a>
                    </aside>
                    
                    <!-- Main Content -->
                    <div class="doc-content">
                        <h1 id="top" style="font-size: 2.5rem; margin-bottom: 8px; scroll-margin-top: 100px;">Terms of Service</h1>
                        <p style="color: #888E8B; font-size: 0.9rem; margin-bottom: 48px;">Last updated: ${this.docMetadata.lastUpdated}</p>
                        
                        <h2 id="acceptance" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">1. Acceptance of Terms</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">By accessing or using Funding Easy, you agree to be bound by these Terms of Service. If you do not agree, you must not use the platform. Funding Easy reserves the right to modify these terms at any time, with notice provided via email or in-platform notification. Continued use after changes constitutes acceptance of the updated terms.</p>

                        <h2 id="eligibility" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">2. Eligibility and Account Requirements</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">You must be at least 18 years of age and legally authorized to enter into binding agreements. Founders must represent a duly organized and active business entity. Investors must represent themselves as accredited or institutional investors, or as a registered investment vehicle, in accordance with applicable securities laws. You are prohibited from creating duplicate accounts, using false or misleading information, or accessing the platform through automated or scripted means.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; KYC and Compliance</span>

                        <h2 id="verification" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">3. Verification Requirements</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">All participants must complete identity, entity, and mandate verification before accessing matchmaking or diligence features. Funding Easy reserves the right to suspend or terminate access for inaccurate, incomplete, or fraudulent declarations. Verification status may be reviewed periodically and is subject to revalidation at Funding Easy's discretion. Duplicate or suspicious accounts will be flagged for manual review and may be restricted pending investigation.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; KYC and Compliance; duplicate/suspicious account detection</span>

                        <h2 id="confidentiality" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">4. Confidentiality and Non-Disclosure</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Information exchanged within Match Rooms, diligence vaults, and mediator-assisted introductions is strictly confidential. Unauthorized dissemination of pitch decks, cap tables, financial models, or any other third-party material without explicit permission constitutes a material breach of these Terms. Founders and investors agree not to share diligence materials outside the platform without written consent from the counterparty. Funding Easy does not guarantee the confidentiality of information shared outside the platform.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; Data Protection &rarr; encrypted diligence vaults and permissioned access</span>

                        <h2 id="vault" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">5. Diligence Vault and Encrypted File Handling</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy provides an encrypted diligence vault for sensitive documents including cap tables, financial models, and pitch decks. All diligence files are encrypted at rest and transmitted over secure encrypted channels. Files are unlocked only when both founder and investor confirm mandate fit through the platform's double opt-in workflow. Access to diligence files is stage-based and permission-gated at the record level. Users retain ownership of all materials they upload.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; KYC and Compliance &rarr; AES-256 encryption; &rarr; Data Protection &rarr; permissioned diligence vault permissions</span>

                        <h2 id="introductions" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">6. Introductions and Mediated Communications</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy mediates initial communications between matched parties. Personal email addresses and phone numbers are not disclosed to counterparties by default during the introduction phase. Communication is routed through Funding Easy-controlled channels until both parties explicitly confirm progression to direct contact. Funding Easy does not guarantee that any introduction will result in a formal investment relationship, term sheet, or closed transaction.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; Contact Privacy; &rarr; Mediated Introductions</span>

                        <h2 id="no-advice" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">7. No Investment Advice or Endorsement</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy is a capital matching infrastructure provider, not a financial advisor, broker-dealer, investment advisor, or securities issuer. All introductions are algorithmically generated based on mandate filters and are not investment recommendations, endorsements, or solicitations. Users are solely responsible for conducting their own due diligence, evaluating investment risks, and consulting independent legal, financial, and tax advisors before engaging in any transaction. Funding Easy makes no representation regarding the investment quality, financial health, or regulatory compliance of any party on the platform.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; No financial advisory capacity</span>

                        <h2 id="matching" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">8. Matching and Algorithmic Workflow</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy generates introductions based on criteria including funding stage, sector, check size, and other mandate filters set by investors and founders. Matches are not guaranteed and are subject to availability, verification status, and platform discretion. Funding Easy reserves the right to adjust matching algorithms, filters, and thresholds at any time. The platform does not guarantee any specific matching frequency, outcome, or conversion rate.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; algorithmic mandate-fit matching logic</span>

                        <h2 id="payments" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">9. Payment Terms and Success Fees</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy accepts payment for subscription plans and may charge a success fee for closed transactions as disclosed in the applicable pricing plan. All payments are processed through secure, PCI-compliant third-party payment processors. Refund eligibility is determined by the terms of the specific plan. Founders agree to report material fundraising outcomes that may trigger success fee obligations. Failure to report or pay applicable fees may result in account suspension.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; homepage pricing section &rarr; success fee and subscription mechanics</span>

                        <h2 id="ip" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">10. Intellectual Property</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">Funding Easy retains all rights, title, and interest in the platform, its software, branding, matching algorithms, and proprietary workflows. Users retain ownership of all content they upload, including pitch decks, financial models, and due diligence documents. By uploading content, users grant Funding Easy a limited, non-exclusive, revocable license to store, process, and display such content within the platform for the duration of the user's participation. Users must not infringe third-party rights when uploading materials.</p>

                        <h2 id="retention" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">11. Data Retention and Account Deletion</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Personal data and compliance records may be retained for up to 7 years after account deletion where required by applicable law, regulation, or legitimate business necessity including fraud prevention, dispute resolution, and regulatory compliance. Users may request deletion of their account and eligible data through the platform or by contacting Funding Easy. Deletion requests are processed within a commercially reasonable timeframe, subject to applicable legal retention obligations. Archived compliance records are stored in restricted-access storage and are excluded from normal product surfaces.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; Retention and Auditability &rarr; 7-year retention; &rarr; Deletion and Auditability</span>

                        <h2 id="security" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">12. Security and Access Controls</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy implements encryption at rest and in transit, role-based access controls, session management, and audit logging as described in the platform's technical documentation. Users are responsible for maintaining the security of their account credentials and for all activity occurring under their account. Users must immediately notify Funding Easy of any suspected unauthorized access. Funding Easy logs all privileged administrative actions with actor identity and timestamp. Users do not have access to audit logs but may request confirmation of specific actions through a support channel.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; AES-256, TLS 1.2+, JWT sessions, audit logging</span>

                        <h2 id="liability" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">13. Limitation of Liability</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">TO THE MAXIMUM EXTENT PERMITTED BY LAW, FUNDING EASY AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR INVESTMENT CAPITAL ARISING OUT OF OR RELATING TO THE USE OF OR INABILITY TO USE THE PLATFORM. FUNDING EASY'S TOTAL LIABILITY FOR ANY CLAIM ARISING UNDER THESE TERMS SHALL NOT EXCEED THE TOTAL FEES PAID BY THE USER IN THE 12 MONTHS PRECEDING THE CLAIM.</p>

                        <h2 id="indemnification" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">14. Indemnification</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">You agree to indemnify, defend, and hold harmless Funding Easy and its affiliates, officers, employees, and agents from any claims, liabilities, losses, damages, costs, or expenses (including reasonable attorneys' fees) arising out of your use of the platform, your breach of these Terms, your violation of applicable law, or your infringement of third-party rights including intellectual property, privacy, or confidentiality obligations.</p>

                        <h2 id="third-party" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">15. Third-Party Services and AML Integration</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">Funding Easy may integrate with third-party AML vendors, payment processors, identity verification providers, and other compliance services. By using the platform, you consent to the sharing of necessary data with such third parties for compliance, verification, and operational purposes. Funding Easy is not responsible for the privacy practices or security measures of third-party providers beyond what is contractually required.</p>
                        <span class="spec-ref">Spec reference: PRODUCT_SPEC.md &rarr; Security, Privacy & Compliance &rarr; AML vendor integration (Phase 1.5+)</span>

                        <h2 id="suspension" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">16. Account Suspension and Termination</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">Funding Easy may suspend or terminate your account at any time, with or without notice, for violation of these Terms, fraudulent activity, suspicious behavior, failure to complete verification, or any other reason at Funding Easy's sole discretion. Suspended accounts may be reactivated upon review. Terminated accounts are subject to data retention policies as described above. Users may terminate their account at any time through the platform settings.</p>

                        <h2 id="disputes" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">17. Dispute Resolution and Governing Law</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">These Terms are governed by the laws of India. Any disputes arising under or in connection with these Terms shall be resolved through binding arbitration in the jurisdiction of the user's primary place of business, or alternatively in New Delhi, India, under the rules of a recognized arbitration institution. Neither party may bring a class action or representative proceeding. This section does not preclude either party from seeking injunctive relief in a court of competent jurisdiction.</p>

                        <h2 id="changes" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">18. Changes to Terms</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">Funding Easy may update these Terms at any time. Material changes will be communicated via email or in-platform notification at least 14 days prior to taking effect, except for changes required by law or for urgent security purposes. Your continued use of the platform after changes take effect constitutes acceptance of the updated Terms.</p>

                        <h2 id="contact" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">19. Contact</h2>
                        <p style="color: #555A57; margin-bottom: 24px;">For questions regarding these Terms, contact: support@fundingeasy.in</p>

                        <h2 id="founder-agreement" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">20. Founder Agreement Addendum</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">By registering as a Founder on Funding Easy, you agree to the terms of this Founder Agreement Addendum. Founders agree that the platform serves as a capital matching utility and that any success fee (typically 5–7% of closed capital) is due and payable strictly post-closing, contingent on funds clearing. You agree to upload accurate information to your secure Diligence Vault and grant mandate-based matching access to verified investors.</p>

                        <h2 id="investor-agreement" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">21. Investor Agreement Addendum</h2>
                        <p style="color: #555A57; margin-bottom: 12px;">By registering as an Investor on Funding Easy, you agree to the terms of this Investor Agreement Addendum. Investors agree that matchmaking is mandate-fit based on their declared preferences and check sizes. All diligence materials accessed via the secure Diligence Vault are strictly confidential and must not be distributed without counterparty consent. Free plan accounts are limited to three pitch views per month, and upgrades to Pro are subject to the active subscription terms.</p>
                        
                        <div style="margin-top: 64px; border-top: 1px solid rgba(45, 84, 70, 0.08); padding-top: 32px; padding-bottom: 64px;">
                            <a href="/" class="btn" style="font-size: 0.95rem; font-weight: 500; padding: 12px 28px; border-radius: 6px; background-color: #2D5446; color: #FAF8F5; text-decoration: none; display: inline-block; transition: all 0.2s; box-shadow: 0 4px 12px rgba(45, 84, 70, 0.2);" data-link>Back to Home</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        document.body.classList.add('homepage-active');
    }

    cleanup() {
        document.body.classList.remove('homepage-active');
    }
}
