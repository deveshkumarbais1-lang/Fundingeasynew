export default class NotFoundView {
    constructor() {
        document.title = "FundingEasy | Page Not Found";
    }

    async getHtml() {
        return `
            <div style="padding: 120px 20px; text-align: center; min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="font-size: 4rem; margin-bottom: 24px;">🔍</div>
                <h1 style="font-size: 2.5rem; color: var(--text); margin-bottom: 16px;">We couldn’t find that page.</h1>
                <p style="color: var(--text-secondary); font-size: 1.1rem; max-width: 500px; margin: 0 auto 32px;">
                    The page may have moved or the link may be temporarily unavailable.
                </p>
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="/" data-link class="btn btn-primary">Go to Homepage</a>
                    <a href="/signup?role=founder" data-link class="btn btn-secondary">For Founders</a>
                    <a href="/signup?role=investor" data-link class="btn btn-secondary">For Investors</a>
                    <a href="/contact" data-link class="btn btn-secondary" style="border: none; text-decoration: underline;">Contact FundingEasy</a>
                </div>
            </div>
        `;
    }
}
