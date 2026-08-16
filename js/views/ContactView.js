import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Contact Us | Funding Easy");
    }

    async getHtml() {
        return `
            ${Navbar()}
            <main class="container" style="padding: 100px 0; max-width: 1000px;">
                <div style="text-align: center; margin-bottom: 64px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #3A7563; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Get In Touch</div>
                    <h1 style="font-size: 3rem; font-weight: 600; color: #f3ead7; margin-bottom: 24px; letter-spacing: -0.02em;">Contact Our Team</h1>
                    <p style="font-size: 1.1rem; color: #b5c0cd; line-height: 1.6; max-width: 600px; margin: 0 auto;">Whether you have a question about the verification process, platform features, or institutional partnerships, we're here to help.</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px;">
                    <!-- Contact Info -->
                    <div>
                        <div style="margin-bottom: 40px;">
                            <h3 style="font-size: 1.1rem; font-weight: 600; color: #f3ead7; margin-bottom: 8px;">Corporate Headquarters</h3>
                            <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Level 12, Tower B, Cyber City<br>Gurugram, Haryana 122002<br>India</p>
                        </div>
                        
                        <div style="margin-bottom: 40px;">
                            <h3 style="font-size: 1.1rem; font-weight: 600; color: #f3ead7; margin-bottom: 8px;">Email Support</h3>
                            <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">
                                General: <a href="mailto:hello@fundingeasy.in" style="color: #3A7563; text-decoration: none;">hello@fundingeasy.in</a><br>
                                Compliance: <a href="mailto:kyc@fundingeasy.in" style="color: #3A7563; text-decoration: none;">kyc@fundingeasy.in</a><br>
                                Institutional: <a href="mailto:partners@fundingeasy.in" style="color: #3A7563; text-decoration: none;">partners@fundingeasy.in</a>
                            </p>
                        </div>
                        
                        <div>
                            <h3 style="font-size: 1.1rem; font-weight: 600; color: #f3ead7; margin-bottom: 8px;">Business Hours</h3>
                            <p style="font-size: 0.95rem; color: #b5c0cd; line-height: 1.6;">Monday - Friday<br>9:00 AM - 6:00 PM (IST)</p>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div style="background: #171b24; border: 1px solid rgba(243,234,215,0.08); border-radius: 12px; padding: 40px;">
                        <form id="contactForm">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                <div>
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #b5c0cd; margin-bottom: 8px;">First Name</label>
                                    <input type="text" style="width: 100%; padding: 12px; background: #12151d; border: 1px solid rgba(243,234,215,0.08); border-radius: 8px; color: #f3ead7;" required>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #b5c0cd; margin-bottom: 8px;">Last Name</label>
                                    <input type="text" style="width: 100%; padding: 12px; background: #12151d; border: 1px solid rgba(243,234,215,0.08); border-radius: 8px; color: #f3ead7;" required>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #b5c0cd; margin-bottom: 8px;">Business Email</label>
                                <input type="email" style="width: 100%; padding: 12px; background: #12151d; border: 1px solid rgba(243,234,215,0.08); border-radius: 8px; color: #f3ead7;" required>
                            </div>
                            
                            <div style="margin-bottom: 24px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #b5c0cd; margin-bottom: 8px;">Subject</label>
                                <select style="width: 100%; padding: 12px; background: #12151d; border: 1px solid rgba(243,234,215,0.08); border-radius: 8px; color: #f3ead7;">
                                    <option>General Inquiry</option>
                                    <option>KYC / Verification Support</option>
                                    <option>Institutional Partnership</option>
                                    <option>Technical Support</option>
                                </select>
                            </div>
                            
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #b5c0cd; margin-bottom: 8px;">Message</label>
                                <textarea rows="5" style="width: 100%; padding: 12px; background: #12151d; border: 1px solid rgba(243,234,215,0.08); border-radius: 8px; color: #f3ead7; resize: vertical;" required></textarea>
                            </div>
                            
                            <button type="submit" style="width: 100%; padding: 14px; background: #3A7563; color: #fff; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Send Message</button>
                        </form>
                    </div>
                </div>
            </main>
        `;
    }

    init() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for contacting Funding Easy. Our team will review your message and respond shortly.');
                form.reset();
            });
        }
    }
}
