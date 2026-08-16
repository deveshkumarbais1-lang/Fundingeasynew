import re
import os

filepath = r"C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Route updates
content = content.replace('href="/founder/start"', 'href="/founder/apply" data-link')
content = content.replace('href="/signup?role=entrepreneur"', 'href="/founder/apply" data-link')
content = content.replace('href="/signup?role=investor"', 'href="/investor/apply" data-link')
content = content.replace('href="/investor/start"', 'href="/investor/apply" data-link')

# 2. Security claims replacement
old_sec_1 = 'AES-256 encryption at rest, TLS 1.3 in transit, AWS KMS, role-based permissions, and audit logging.'
new_sec_1 = 'Data is encrypted in transit and at rest using controls documented in our Security Overview. Access to platform information is managed according to assigned user roles and permissions.'
content = content.replace(old_sec_1, new_sec_1)

old_sec_2 = 'Only approved founders and investors can enter the network.'
new_sec_2 = 'Access to the network is subject to FundingEasy’s onboarding and approval process.'
content = content.replace(old_sec_2, new_sec_2)

old_sec_3 = '<div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Verified participants</div>'
new_sec_3 = '<div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Participant Review</div>'
content = content.replace(old_sec_3, new_sec_3)

# 3. Traction stats removal
old_stats = '''                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; text-align: center; margin-bottom: 72px;">
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
                            </div>'''

new_stats = '''                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; text-align: center; margin-bottom: 72px;">
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
                            </div>'''
content = content.replace(old_stats, new_stats)

# 4. Success fee references
content = re.sub(r'A 5-7% success fee is charged only after successful funding', 'A success fee applies subject to successful funding matching', content)
content = re.sub(r'A 5-7% success fee applies only on capital closed', 'A success fee applies subject to capital closed', content)
content = re.sub(r'&check; 5-7% success fee', '&check; Transparent success fee', content)
content = content.replace('5-7% success fee', 'success fee')

# 5. SOC 2 and Stripe Identity (if they exist)
content = content.replace('SOC 2 Type II', 'Secure Platform')
content = content.replace('Stripe Identity', 'Standard Identity Verification')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
