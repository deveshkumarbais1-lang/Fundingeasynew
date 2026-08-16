$viewsDir = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views"
$views = @(
    "NotFoundView", "FounderApplyView", "InvestorApplyView",
    "HowItWorksView", "WhyUsView", "SuccessView",
    "AboutView", "FAQView", "SecurityView", "ContactView"
)

foreach ($view in $views) {
    $title = $view.Replace("View", "").Replace("Apply", " Apply")
    $content = @"
export default class $view {
    constructor() {
        document.title = "FundingEasy | $title";
    }

    async getHtml() {
        return \`
            <div style="padding: 120px 20px; text-align: center; min-height: 70vh;">
                <h1 style="font-size: 2.5rem; color: var(--text); margin-bottom: 24px;">$title</h1>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">This page is currently being updated to reflect our verified matching processes.</p>
                <div style="margin-top: 32px;">
                    <a href="/" data-link class="btn btn-primary" style="margin-right: 16px;">Return Home</a>
                </div>
            </div>
        \`;
    }
}
"@
    
    if ($view -eq "NotFoundView") {
        $content = @"
export default class NotFoundView {
    constructor() {
        document.title = "FundingEasy | Page Not Found";
    }

    async getHtml() {
        return \`
            <div style="padding: 120px 20px; text-align: center; min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="font-size: 4rem; margin-bottom: 24px;">🔍</div>
                <h1 style="font-size: 2.5rem; color: var(--text); margin-bottom: 16px;">We couldn’t find that page.</h1>
                <p style="color: var(--text-secondary); font-size: 1.1rem; max-width: 500px; margin: 0 auto 32px;">
                    The page may have moved or the link may be temporarily unavailable.
                </p>
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="/" data-link class="btn btn-primary">Go to Homepage</a>
                    <a href="/founder/apply" data-link class="btn btn-secondary">For Founders</a>
                    <a href="/investor/apply" data-link class="btn btn-secondary">For Investors</a>
                    <a href="/contact" data-link class="btn btn-secondary" style="border: none; text-decoration: underline;">Contact FundingEasy</a>
                </div>
            </div>
        \`;
    }
}
"@
    }

    if ($view -eq "FounderApplyView") {
        $content = @"
export default class FounderApplyView {
    constructor() {
        document.title = "FundingEasy | Founder Application";
    }

    async getHtml() {
        return \`
            <div style="padding: 120px 20px; max-width: 800px; margin: 0 auto; min-height: 70vh;">
                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">For Founders</span>
                <h1 style="font-size: 2.5rem; color: var(--text); margin: 16px 0 24px;">Begin Founder Application</h1>
                
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 32px; margin-bottom: 32px;">
                    <h3 style="font-size: 1.25rem; color: var(--text); margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">Process Overview</h3>
                    <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">
                        Submit your company and funding requirements. FundingEasy reviews your profile and, where applicable, completes verification before considering it for mandate-aligned matching.
                    </p>
                </div>
                
                <div style="margin-top: 32px;">
                    <button class="btn btn-primary">Start Application (Coming Soon)</button>
                </div>
            </div>
        \`;
    }
}
"@
    }

    if ($view -eq "InvestorApplyView") {
        $content = @"
export default class InvestorApplyView {
    constructor() {
        document.title = "FundingEasy | Investor Registration";
    }

    async getHtml() {
        return \`
            <div style="padding: 120px 20px; max-width: 800px; margin: 0 auto; min-height: 70vh;">
                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">For Investors</span>
                <h1 style="font-size: 2.5rem; color: var(--text); margin: 16px 0 24px;">Register as an Investor</h1>
                
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 32px; margin-bottom: 32px;">
                    <h3 style="font-size: 1.25rem; color: var(--text); margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">Process Overview</h3>
                    <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">
                        Register your investment preferences and mandate. FundingEasy reviews eligibility and onboarding information before enabling access to relevant opportunities.
                    </p>
                </div>
                
                <div style="margin-top: 32px;">
                    <button class="btn btn-primary">Start Registration (Coming Soon)</button>
                </div>
            </div>
        \`;
    }
}
"@
    }

    $filePath = Join-Path $viewsDir "$view.js"
    Set-Content -Path $filePath -Value $content
}
