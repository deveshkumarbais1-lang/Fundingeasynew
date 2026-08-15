import sys

path = r'C:/Users/user/.gemini/antigravity/scratch/funding-easy/js/views/HomeView.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hero
content = content.replace("PLATFORM FOR VERIFIED FOUNDERS & VCS", "Private capital matching for verified founders & VCs.")
content = content.replace("Private capital, matched with discipline.", "Move from qualified intro to active diligence in one permissioned funnel.")
content = content.replace("Verified founders. Mandate-aligned investors. One permissioned workflow for introductions and diligence.", "Verified founders and mandate-aligned investors share a double opt-in workspace for intros, meetings, and secure diligence vaults—without public profile leakage or cold broker noise.")

# 2. Hero CTAs
content = content.replace(">Join as Founder<", ">Start as Founder<")
content = content.replace(">Apply as Investor<", ">Start as Investor<")

# 3. Funnel section "so that..."
content = content.replace(
    "Identity, entity, and mandate verification required before accessing the network.",
    "Identity, entity, and readiness checks are completed before founders and investors can participate in the network, so conversations start past basic approvals and into actual terms."
)
content = content.replace(
    "Introductions driven by stage, sector, and check-size criteria, not cold outreach.",
    "Introductions are generated only when stage, sector, and check-size criteria align on both sides, reducing time spent on misaligned conversations."
)
content = content.replace(
    "Double opt-in workflow for meetings and secure diligence vault access.",
    "Meetings and diligence milestones move through one unified, permissioned workflow, instead of being lost in email threads and shared drives."
)

# 4. "Quieter path" narrative
content = content.replace(
    "Funding Easy provides a secure, encrypted matching environment that eliminates cold broker spam and public data exposure.",
    "Funding Easy replaces cold broker spam and public data exposure with a controlled, double opt-in capital matching workspace."
)
content = content.replace(
    "Introductions are mediated, and progress milestones are backed by clear expectations on response and follow-up.",
    "Each introduction carries shared expectations on response times and next steps, so matches either move forward or close out—without lingering in inboxes."
)

# 5. Feature trio
content = content.replace(
    "Sensitive files are unlocked only by mutual agreement.",
    "Sensitive files are unlocked only by mutual agreement. Founders keep cap tables and models off public platforms until both sides agree to proceed, preserving round confidentiality."
)
content = content.replace(
    "Funding Easy generates introductions only when founder and investor criteria show strong mandate alignment.",
    "Funding Easy generates introductions only when founder and investor criteria show strong mandate alignment. Investors see fewer but more relevant introductions that match their ticket sizes and themes, reducing triage time."
)
content = content.replace(
    "Auto-scheduling and coordination milestones help introductions stay active, so promising cases do not stall in inboxes.",
    "Auto-scheduling and coordination milestones help introductions stay active. Introductions have built-in follow-up expectations and scheduling nudges so promising cases don’t stall at ‘we should talk.’"
)

# 6. Outcomes
content = content.replace(
    "Algorithmic mandate matching and integrated scheduling compress weeks of back-and-forth into structured milestones.",
    "Faster match-to-diligence progression (weeks of email compressed into structured days)."
)

content = content.replace(
    "Intros are based on mandate filters rather than cold outreach, reducing time spent on misaligned conversations.",
    "Higher-quality opt-in matches, with intros driven by mandate filters instead of cold outreach."
)

content = content.replace(
    "Investors spend more time evaluating aligned opportunities and less time triaging unqualified inbound.",
    "Less manual sourcing drag, so investors spend more time evaluating aligned opportunities and less time triaging unqualified inbound."
)

content = content.replace(
    "The network is designed for institutional demand and supply, not spray-and-pray volume.",
    "Meaningful capital matched, with a network designed for institutional round sizes, not spray-and-pray volume."
)

# 7. Testimonials
content = content.replace(
    "Partner at Apex Syndicate",
    "Partner at Apex Syndicate<br><span style='color:#3A7563; font-weight:600; font-size:0.75rem; text-transform:uppercase;'>Mandate-aligned sourcing</span>"
)
content = content.replace(
    "Founder at FinFlow",
    "Founder at FinFlow<br><span style='color:#3A7563; font-weight:600; font-size:0.75rem; text-transform:uppercase;'>Confidential, controlled fundraising</span>"
)
content = content.replace(
    "Managing Director at Oakwood Equity",
    "Managing Director at Oakwood Equity<br><span style='color:#3A7563; font-weight:600; font-size:0.75rem; text-transform:uppercase;'>Structured diligence handoffs</span>"
)
content = content.replace(
    "Founder at SynthOS",
    "Founder at SynthOS<br><span style='color:#3A7563; font-weight:600; font-size:0.75rem; text-transform:uppercase;'>Verified, institution-ready founders</span>"
)

# 8. Pricing framing line
content = content.replace(
    "Transparent pricing for institutional discipline.</p>",
    "Transparent pricing for institutional discipline.</p>\n                                    <p style=\"font-size: 1.1rem; color: #8E959E; max-width: 600px; margin: 0 auto; line-height: 1.6;\">We align fees with institutional behavior: founders pay only on completed transactions, investors subscribe for mandate-based deal flow and workflow.</p>"
)

# 9. Enrollment
content = content.replace(
    "Raise with more control.",
    "Raise with more control, or source with more discipline."
)
content = content.replace(
    "Join a growing network of institutional founders and accredited investors. Get verified and begin mandate-aligned matching today.",
    "Get verified once, set your mandate, and move from qualified intro to active diligence in a controlled, double opt-in workspace."
)
content = content.replace(
    """<p style="font-size: 0.85rem; color: rgba(250, 248, 245, 0.7); margin-bottom: 36px; font-weight: 500; letter-spacing: 0.02em;">
                                Verification is designed to be fast, with no credit card required to begin matching.
                            </p>""",
    ""
)

# Replacing the bottom CTAs exactly:
bottom_cta_old = """                            <div class="flex justify-center">
                                <a href="/signup" class="btn btn-light" style="padding: 16px 36px;" data-link>Get Started Now</a>
                            </div>"""

bottom_cta_new = """                            <div class="flex justify-center" style="gap: 16px;">
                                <a href="/signup?role=entrepreneur" class="btn btn-primary" style="padding: 16px 36px;" data-link>Start as Founder</a>
                                <a href="/signup?role=investor" class="btn btn-secondary" style="padding: 16px 36px;" data-link>Start as Investor</a>
                            </div>"""

content = content.replace(bottom_cta_old, bottom_cta_new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("HomeView.js patched successfully.")
