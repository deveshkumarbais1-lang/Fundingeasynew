export default function Navbar(options = {}) {
    const isSimplified = options.simplified || location.pathname === '/login' || location.pathname === '/signup';

    if (isSimplified) {
        return `
            <nav class="navbar auth-variant">
                <div class="container">
                    <a href="/" class="logo" data-link>
                        <svg class="logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M6 4V20H8V13H11C13.21 13 15 11.21 15 9C15 6.79 13.21 5 11 5H6Z" fill="#FFFFFF"/>
                            <path d="M14 12L17 15L22 9" stroke="#48c78e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="logo-text">
                            <span class="logo-wordmark-primary">Funding</span>
                            <span class="logo-wordmark-secondary">Easy</span>
                        </div>
                    </a>
                    <div class="nav-links">
                        <a href="/" class="nav-link" data-link>Back to Home</a>
                    </div>
                </div>
            </nav>
        `;
    }

    return `
        <nav class="navbar">
            <div class="container">
                <a href="/" class="logo" data-link>
                    <svg class="logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M6 4V20H8V13H11C13.21 13 15 11.21 15 9C15 6.79 13.21 5 11 5H6Z" fill="#FFFFFF"/>
                        <path d="M14 12L17 15L22 9" stroke="#48c78e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="logo-text">
                        <span class="logo-wordmark-primary">Funding</span>
                        <span class="logo-wordmark-secondary">Easy</span>
                    </div>
                </a>
                <button class="nav-toggle" aria-label="Toggle navigation" type="button">
                    <svg class="hamburger" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <div class="nav-links">
                    <a href="/#how-it-works" class="nav-link nav-link-anchor" data-link>How It Works</a>
                    <a href="/#security" class="nav-link nav-link-anchor" data-link>Security</a>
                    <a href="/#pricing" class="nav-link nav-link-anchor" data-link>Pricing</a>
                    <a href="/#faq" class="nav-link nav-link-anchor" data-link>FAQ</a>
                    <a href="/login" class="nav-link" data-link>Log in</a>
                    <a href="/signup" class="btn btn-nav-filled" data-link>Sign up</a>
                </div>
            </div>
        </nav>
    `;
}
