const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'js', 'views', 'HomeView.js');

try {
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Route updates
    content = content.replace(/href="\/founder\/start"/g, 'href="/founder/apply" data-link');
    content = content.replace(/href="\/signup\?role=entrepreneur"/g, 'href="/founder/apply" data-link');
    content = content.replace(/href="\/signup\?role=investor"/g, 'href="/investor/apply" data-link');
    content = content.replace(/href="\/investor\/start"/g, 'href="/investor/apply" data-link');

    // 2. Security claims replacement
    const old_sec_1 = 'AES-256 encryption at rest, TLS 1.3 in transit, AWS KMS, role-based permissions, and audit logging.';
    const new_sec_1 = 'Data is encrypted in transit and at rest using controls documented in our Security Overview. Access to platform information is managed according to assigned user roles and permissions.';
    content = content.replace(old_sec_1, new_sec_1);

    const old_sec_2 = 'Only approved founders and investors can enter the network.';
    const new_sec_2 = 'Access to the network is subject to FundingEasy’s onboarding and approval process.';
    content = content.replace(old_sec_2, new_sec_2);

    const old_sec_3 = '<div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Verified participants</div>';
    const new_sec_3 = '<div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Participant Review</div>';
    content = content.replace(old_sec_3, new_sec_3);

    // 3. Traction stats removal
    const old_stats = `                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; text-align: center; margin-bottom: 72px;">
                                <div>
                                    <div style="font-size: 3.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">120+<span style="color: var(--text-muted); font-size: 1.5rem; vertical-align: super;">*</span></div>
                                    <div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Verified Founders</div>
                                </div>
                                <div style="position: relative;">
                                    <div style="position: absolute; left: -24px; top: 20%; bottom: 20%; width: 1px; background: linear-gradient(to bottom, transparent, var(--border), transparent);"></div>
                                    <div style="font-size: 3.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">85+</div>
                                    <div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Active Mandates</div>
                                    <div style="position: absolute; right: -24px; top: 20%; bottom: 20%; width: 1px; background: linear-gradient(to bottom, transparent, var(--border), transparent);"></div>
                                </div>
                                <div>
                                    <div style="font-size: 3.5rem; font-family: 'Lora', serif; color: var(--text); margin-bottom: 8px; opacity: 0.9;">~3<span style="font-size: 1.5rem; vertical-align: super;">wks</span></div>
                                    <div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Median Time to Term Sheet</div>
                                </div>
                            </div>`;

    const new_stats = `                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; text-align: center; margin-bottom: 72px;">
                                <div>
                                    <div style="font-size: 2.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">Verified</div>
                                    <div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Founders</div>
                                </div>
                                <div style="position: relative;">
                                    <div style="position: absolute; left: -24px; top: 20%; bottom: 20%; width: 1px; background: linear-gradient(to bottom, transparent, var(--border), transparent);"></div>
                                    <div style="font-size: 2.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">Active</div>
                                    <div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Mandates</div>
                                    <div style="position: absolute; right: -24px; top: 20%; bottom: 20%; width: 1px; background: linear-gradient(to bottom, transparent, var(--border), transparent);"></div>
                                </div>
                                <div>
                                    <div style="font-size: 2.5rem; font-family: 'Lora', serif; color: var(--text); margin-bottom: 8px; opacity: 0.9;">Matches</div>
                                    <div style="font-size: 1.1rem; color: var(--text); font-weight: 500; margin-bottom: 4px;">Facilitated</div>
                                </div>
                            </div>`;
    
    // Fallback if exact match fails for stats block
    if (content.includes(old_stats)) {
        content = content.replace(old_stats, new_stats);
    } else {
        // More aggressive generic replacements if exact block match fails
        content = content.replace(/120\+<span[^>]*>\*<\/span>/g, 'Verified');
        content = content.replace(/85\+/g, 'Active');
        content = content.replace(/~3<span[^>]*>wks<\/span>/g, 'Matches');
        content = content.replace(/Median Time to Term Sheet/g, 'Facilitated');
    }

    // 4. Success fee references
    content = content.replace(/A 5-7% success fee is charged only after successful funding/g, 'A success fee applies subject to successful funding matching');
    content = content.replace(/A 5-7% success fee applies only on capital closed/g, 'A success fee applies subject to capital closed');
    content = content.replace(/&check; 5-7% success fee/g, '&check; Transparent success fee');
    content = content.replace(/5-7% success fee/g, 'success fee');

    // 5. SOC 2 and Stripe Identity (if they exist)
    content = content.replace(/SOC 2 Type II/g, 'Secure Platform');
    content = content.replace(/Stripe Identity/g, 'Standard Identity Verification');

    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Successfully patched HomeView.js");
} catch (err) {
    console.error("Error patching file:", err);
    process.exit(1);
}
