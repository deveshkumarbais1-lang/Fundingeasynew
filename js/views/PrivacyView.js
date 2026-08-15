import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Privacy Policy | Funding Easy");
        this.docMetadata = {
            version: "2.1",
            lastUpdated: "3 June 2026"
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
                .editorial-doc h3 {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: #2D5446;
                    margin-top: 24px;
                    margin-bottom: 12px;
                }
                .editorial-doc ul {
                    margin-bottom: 24px;
                    padding-left: 20px;
                    color: #555A57;
                }
                .editorial-doc li {
                    margin-bottom: 8px;
                }
                .editorial-doc p {
                    color: #555A57;
                    margin-bottom: 12px;
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
                        <a href="#intro" class="toc-link">1. Introduction and scope</a>
                        <a href="#who-we-are" class="toc-link">2. Who we are and governing law</a>
                        <a href="#who-applies" class="toc-link">3. Who this policy applies to</a>
                        <a href="#info-collect" class="toc-link">4. Information we collect</a>
                        <a href="#how-we-use" class="toc-link">5. How we use your information</a>
                        <a href="#visibility" class="toc-link">6. Data visibility & access</a>
                        <a href="#security" class="toc-link">7. Encryption and security</a>
                        <a href="#cookies" class="toc-link">8. Cookies and tracking</a>
                        <a href="#sharing" class="toc-link">9. Data sharing and third parties</a>
                        <a href="#retention" class="toc-link">10. Data retention</a>
                        <a href="#rights" class="toc-link">11. Your rights and choices</a>
                        <a href="#international" class="toc-link">12. International transfers</a>
                        <a href="#breach" class="toc-link">13. Data breach notification</a>
                        <a href="#children" class="toc-link">14. Children's privacy</a>
                        <a href="#changes" class="toc-link">15. Changes to this policy</a>
                        <a href="#contact" class="toc-link">16. Contact us</a>
                    </aside>
                
                    <!-- Main Content -->
                    <div class="doc-content">
                        <h1 id="top" style="font-size: 2.5rem; margin-bottom: 8px; scroll-margin-top: 100px;">Privacy Policy</h1>
                        <p style="color: #888E8B; font-size: 0.9rem; margin-bottom: 48px;">Last updated: ${this.docMetadata.lastUpdated}</p>
                        
                        <h2 id="intro" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">1. Introduction and scope</h2>
                        <p>Funding Easy operates as a private capital matching infrastructure connecting verified founders and accredited investors. This Privacy Policy describes how we collect, use, store, protect, and share your personal information when you use our websites, applications, and related services (the “Services”).</p>
                        <p>By using the Services, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use the Services.</p>

                        <h2 id="who-we-are" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">2. Who we are and governing law</h2>
                        <p>“Funding Easy”, “we”, “our”, or “us” refers to the entity that operates the Services and is responsible for your personal information.</p>
                        <p>Unless we specify otherwise in a local supplement, this Privacy Policy is governed by the laws of India, including applicable provisions of the Digital Personal Data Protection Act, 2023, while also taking into account global best practices similar to the EU General Data Protection Regulation (GDPR).</p>
                        <p>If you are located outside India, additional rights or obligations may apply under your local laws.</p>

                        <h2 id="who-applies" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">3. Who this policy applies to</h2>
                        <p>This Privacy Policy applies to:</p>
                        <ul>
                            <li>Founders and startup representatives using Funding Easy to discover or connect with investors</li>
                            <li>Accredited or otherwise qualified investors using Funding Easy to review opportunities and connect with founders</li>
                            <li>Partners and third-party service providers who interact with our platform</li>
                            <li>Visitors to our website or individuals who contact us for information or support</li>
                        </ul>
                        <p>This Policy does not apply to third-party websites, platforms, or services that we do not control, even if you access them through our platform.</p>

                        <h2 id="info-collect" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">4. Information we collect</h2>
                        <p>We collect the following categories of information, depending on how you use the Services.</p>

                        <h3>4.1 Account and public profile information</h3>
                        <p>We collect information you provide when creating or updating your account and profile, such as:</p>
                        <ul>
                            <li>Name, company name, role/title</li>
                            <li>LinkedIn profile URL, company website</li>
                            <li>Funding stage, sector, cheque size, geography, and other business-facing trust signals</li>
                        </ul>
                        <p>These elements may be visible to counterparties as part of matching, introductions, and deal workflows.</p>

                        <h3>4.2 Restricted contact information</h3>
                        <p>We collect personal contact and identification details that are not intended for general counterparty visibility, such as:</p>
                        <ul>
                            <li>Private email address and phone number</li>
                            <li>Legal identity details and identifiers required for compliance</li>
                            <li>Other personal identifiers needed for verification and support</li>
                        </ul>
                        <p>This information is stored securely and is not shown to counterparties by default at any stage of profile browsing, matching, or initial diligence.</p>

                        <h3>4.3 Compliance and KYC information</h3>
                        <p>To meet legal and regulatory obligations, we may collect:</p>
                        <ul>
                            <li>Government-issued identification documents</li>
                            <li>Entity formation documents</li>
                            <li>Accreditation or qualified investor proof</li>
                            <li>Bank account or payment details (processed via PCI-compliant third-party gateways)</li>
                            <li>Anti-money laundering (AML) screening results</li>
                        </ul>
                        <p>We may obtain this information directly from you or through third-party verification providers, under appropriate contracts and safeguards.</p>

                        <h3>4.4 Diligence vault data</h3>
                        <p>Founders and investors may upload sensitive documents into a secure “diligence vault”, including:</p>
                        <ul>
                            <li>Pitch decks, cap tables, financial models</li>
                            <li>Legal, corporate, or product documentation</li>
                            <li>Other files shared for due diligence purposes</li>
                        </ul>
                        <p>Diligence vault files are stored in encrypted, permission-gated storage and are never accessible via raw storage URLs.</p>

                        <h3>4.5 Usage and system data</h3>
                        <p>When you use the Services, we automatically collect certain technical and usage information, such as:</p>
                        <ul>
                            <li>Login timestamps and session information</li>
                            <li>Feature usage and interaction patterns</li>
                            <li>Device information, IP address, and browser type</li>
                            <li>Security and administrative events (e.g., failed logins, access attempts)</li>
                        </ul>
                        <p>This helps us operate, secure, and improve the Services, and to investigate issues or incidents.</p>

                        <h3>4.6 Administrative and audit data</h3>
                        <p>We maintain records of administrative actions and access events, including:</p>
                        <ul>
                            <li>System configuration changes</li>
                            <li>Access to restricted data classes (e.g., KYC, vault documents)</li>
                            <li>Compliance review history and trust-and-safety actions</li>
                        </ul>
                        <p>These logs support security, compliance, and accountability obligations.</p>

                        <h3>4.7 Communications and support data</h3>
                        <p>When you contact us or interact with support, we collect:</p>
                        <ul>
                            <li>Your contact details</li>
                            <li>The content of your communications and attachments</li>
                            <li>Metadata such as timestamps and channels used</li>
                        </ul>
                        <p>We use this to respond to your requests, provide support, and improve our Services.</p>

                        <h2 id="how-we-use" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">5. How we use your information</h2>
                        <p>We use your information for purposes including:</p>
                        <ul>
                            <li><span style="font-weight: 600;">Platform operations:</span> To facilitate capital matching, mandate alignment, introductions, and diligence workflows.</li>
                            <li><span style="font-weight: 600;">Verification and compliance:</span> To verify identity, entity status, investor accreditation, and perform KYC/AML checks as required by applicable law or policy.</li>
                            <li><span style="font-weight: 600;">Security and fraud prevention:</span> To detect and prevent duplicate accounts, suspicious activity, fraud, and unauthorized access, supported by encrypted, permission-based access controls.</li>
                            <li><span style="font-weight: 600;">Communication:</span> To mediate introductions, send platform notifications, and manage support interactions through Funding Easy-controlled communication channels.</li>
                            <li><span style="font-weight: 600;">Service improvement:</span> To analyze usage patterns, improve matching algorithms, and enhance user experience and performance.</li>
                            <li><span style="font-weight: 600;">Legal and regulatory compliance:</span> To meet legal, regulatory, and record-keeping obligations, including long-term retention of compliance records where required.</li>
                        </ul>
                        <p>We may also use aggregated or de-identified data (which does not identify individuals) for analytics, product development, and reporting.</p>

                        <h2 id="visibility" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">6. Data visibility and access controls</h2>
                        <p>Funding Easy enforces strict role-based visibility across all data classes.</p>
                        <ul>
                            <li><span style="font-weight: 600;">Counterparties (founders and investors):</span> May view only public profile information of matched parties. Restricted contact information and compliance data are never visible to counterparties by default.</li>
                            <li><span style="font-weight: 600;">Administrators:</span> May access restricted contact and compliance data only for verified introductions, compliance review, trust-and-safety investigations, and support escalation, with access logged.</li>
                            <li><span style="font-weight: 600;">Compliance reviewers:</span> May access KYC documents, verification records, and AML screening results; they cannot initiate commercial introductions or modify deal terms.</li>
                            <li><span style="font-weight: 600;">Support personnel:</span> Have access limited to what is necessary to resolve user tickets and cannot view raw KYC documents or unrestricted diligence vault files.</li>
                            <li><span style="font-weight: 600;">Super admins:</span> Have broader access for system configuration and emergency response, subject to strict “break-glass” procedures and mandatory audit logging.</li>
                        </ul>
                        <p>We maintain audit logs of access to sensitive data and may periodically review them to detect misuse.</p>

                        <h2 id="security" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">7. Data encryption and storage security</h2>
                        <p>We use a range of technical and organizational measures to protect your data.</p>
                        <ul>
                            <li>Personally identifiable information, KYC documents, and diligence files are encrypted at rest using strong encryption (e.g., AES-256).</li>
                            <li>All data transmitted between clients, servers, admin systems, and document delivery endpoints is protected using HTTPS with modern TLS protocols (TLS 1.2 or higher).</li>
                            <li>Diligence vault files are stored in encrypted, permission-gated storage and are not exposed via raw storage URLs.</li>
                            <li>Session authentication uses short-lived tokens with support for revocation and rotation to limit the impact of compromised credentials.</li>
                        </ul>
                        <p>No security measures can be guaranteed to be perfect, but we continuously work to strengthen the security of our platform.</p>

                        <h2 id="cookies" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">8. Cookies and tracking technologies</h2>
                        <p>Funding Easy uses cookies and similar technologies to operate and improve the Services.</p>
                        <ul>
                            <li><span style="font-weight: 600;">Essential cookies:</span> Used for session management, authentication, and security; the Services may not function properly without them.</li>
                            <li><span style="font-weight: 600;">Analytics cookies:</span> Used to understand platform usage patterns and improve product performance and user experience.</li>
                        </ul>
                        <p>We do not use third-party advertising or cross-site tracking cookies.</p>
                        <p>Where required by law, we will present a cookie notice or banner and allow you to manage non-essential cookies. You may also manage cookies through your browser settings, though disabling certain cookies may impact core functionality.</p>

                        <h2 id="sharing" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">9. Data sharing and third parties</h2>
                        <p>We do not sell, rent, or trade personal data for marketing purposes. We may share limited data with third parties in the following situations:</p>
                        <ul>
                            <li><span style="font-weight: 600;">AML and KYC providers:</span> For anti-money laundering screening, sanctions checks, identity verification, and accreditation validation.</li>
                            <li><span style="font-weight: 600;">Payment processors:</span> For subscription billing and fee collection via PCI-compliant payment gateways.</li>
                            <li><span style="font-weight: 600;">Infrastructure providers:</span> For cloud hosting, storage, logging, and email services under data processing agreements.</li>
                            <li><span style="font-weight: 600;">Professional advisors:</span> Such as lawyers, auditors, or consultants, where necessary to protect our rights or comply with obligations.</li>
                            <li><span style="font-weight: 600;">Regulators and authorities:</span> Where required by law, legal process, or to respond to lawful requests.</li>
                            <li><span style="font-weight: 600;">Business transfers:</span> In connection with a merger, acquisition, or sale of all or part of our business, subject to applicable laws and safeguards.</li>
                        </ul>
                        <p>Third-party providers are contractually required to implement security and privacy protections consistent with Funding Easy’s standards and to use data only for the specified purposes.</p>

                        <h2 id="retention" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">10. Data retention</h2>
                        <p>We retain personal data and compliance records only as long as necessary for the purposes described in this Policy or as required by law.</p>
                        <p>In general:</p>
                        <ul>
                            <li><span style="font-weight: 600;">Active accounts:</span> Retained for the duration of account activity.</li>
                            <li><span style="font-weight: 600;">Deleted or inactive accounts:</span> Eligible data is deleted or anonymized within 30 days after account closure or deletion, subject to legal obligations.</li>
                            <li><span style="font-weight: 600;">Compliance and KYC records:</span> Retained for up to 7 years after account closure or deletion where required for legal, regulatory, or legitimate business purposes, including fraud prevention and regulatory compliance.</li>
                            <li><span style="font-weight: 600;">Audit logs:</span> Retained for a defined period (for example, a minimum of 5 years) for security and compliance purposes.</li>
                        </ul>
                        <p>Archived compliance records are stored in restricted-access storage and excluded from normal product surfaces.</p>

                        <h2 id="rights" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">11. Your rights and choices</h2>
                        <p>Depending on your jurisdiction and applicable law, you may have some or all of the following rights:</p>
                        <ul>
                            <li><span style="font-weight: 600;">Access:</span> Request a copy of your personal data we hold.</li>
                            <li><span style="font-weight: 600;">Correction:</span> Request correction of inaccurate or incomplete personal data.</li>
                            <li><span style="font-weight: 600;">Deletion:</span> Request deletion of certain personal data, subject to legal retention requirements.</li>
                            <li><span style="font-weight: 600;">Portability:</span> Request your data in a structured, machine-readable format, where technically feasible.</li>
                            <li><span style="font-weight: 600;">Objection:</span> Object to certain types of processing, where permitted by law.</li>
                            <li><span style="font-weight: 600;">Restriction:</span> Request restriction of processing in specific circumstances.</li>
                        </ul>
                        <p>We may ask you for information to verify your identity before we act on your request. We will respond within a reasonable timeframe, typically within 30 days, subject to applicable law.</p>
                        <p>Some rights may be limited (for example, where fulfilling your request would reveal another person’s data or conflict with legal obligations, including financial crime prevention and record-keeping requirements).</p>
                        <p>To exercise your rights, contact us at <a href="mailto:privacy@fundingeasy.in" style="color: #2D5446;">privacy@fundingeasy.in</a> from your registered email address and describe the nature of your request.</p>

                        <h2 id="international" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">12. International data transfers</h2>
                        <p>We may store and process your data in cloud infrastructure located in countries other than your own. Where we transfer personal data internationally, we take appropriate measures to protect it, such as:</p>
                        <ul>
                            <li>Using contractual safeguards and data processing agreements</li>
                            <li>Applying encryption and strict access controls</li>
                            <li>Following applicable data transfer requirements under relevant laws</li>
                        </ul>

                        <h2 id="breach" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">13. Data breach notification</h2>
                        <p>If a data breach occurs that affects your personal information, we will notify affected users and, where required, relevant authorities in accordance with applicable legal requirements. We maintain an incident response process and will take appropriate remedial steps, including containment, investigation, and notification.</p>

                        <h2 id="children" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">14. Children’s privacy</h2>
                        <p>The Services are not intended for users under 18 years of age, and we do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child, we will take steps to delete it.</p>

                        <h2 id="changes" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">15. Changes to this Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. If we make material changes, we will provide notice through the Services or by other appropriate means (for example, email).</p>
                        <p>The latest version of this Privacy Policy will always be available at <a href="https://fundingeasy.in/privacy" style="color: #2D5446; text-decoration: underline;">https://fundingeasy.in/privacy</a>.</p>

                        <h2 id="contact" style="font-size: 1.5rem; margin-top: 32px; scroll-margin-top: 100px;">16. Contact us</h2>
                        <p>For privacy-related inquiries, data subject requests, or complaints, please contact:</p>
                        <ul>
                            <li><span style="font-weight: 600;">Privacy and data protection:</span> privacy@fundingeasy.in</li>
                            <li><span style="font-weight: 600;">General support:</span> support@fundingeasy.in</li>
                        </ul>
                        <p>We will do our best to work with you to resolve any questions or concerns about your privacy.</p>

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
