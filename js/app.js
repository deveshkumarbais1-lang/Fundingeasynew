import HomeView from './views/HomeView.js';
import LoginView from './views/LoginView.js';
import SignupView from './views/SignupView.js';
import OnboardingView from './views/OnboardingView.js';
import EntrepreneurDashboardView from './views/EntrepreneurDashboardView.js';
import InvestorDashboardView from './views/InvestorDashboardView.js?v=3';
import AdminDashboardView from './views/AdminDashboardView.js';
import PrivacyView from './views/PrivacyView.js';
import TermsView from './views/TermsView.js';
import NotFoundView from './views/NotFoundView.js';
import FounderApplyView from './views/FounderApplyView.js';
import InvestorApplyView from './views/InvestorApplyView.js';
import HowItWorksView from './views/HowItWorksView.js';
import WhyUsView from './views/WhyUsView.js';
import SuccessView from './views/SuccessView.js';
import AboutView from './views/AboutView.js';
import FAQView from './views/FAQView.js';
import SecurityView from './views/SecurityView.js';
import ContactView from './views/ContactView.js';

// Simple SPA Router
const routes = {
    '/': HomeView,
    '/login': LoginView,
    '/signup': SignupView,
    '/onboarding': OnboardingView,
    '/dashboard/entrepreneur': EntrepreneurDashboardView,
    '/dashboard/investor': InvestorDashboardView,
    '/dashboard/admin': AdminDashboardView,
    '/privacy': PrivacyView,
    '/terms': TermsView,
    '/how-it-works': HowItWorksView,
    '/why-us': WhyUsView,
    '/success': SuccessView,
    '/about': AboutView,
    '/faq': FAQView,
    '/security': SecurityView,
    '/contact': ContactView
};

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.currentView = null;
        
        // Session timeout parameters (sandbox simulated 2 minutes)
        this.sessionTimeoutMs = 120000;
        this.warningTimeoutMs = 30000;
        this.idleTimer = null;
        this.warningTimer = null;
        this.countdownInterval = null;
        this.sessionTimerActive = false;
        this.boundResetInactivityTimer = this.resetInactivityTimer.bind(this);

        // Listen for browser navigation
        window.addEventListener('popstate', () => this.route());
        
        // Intercept link clicks
        document.body.addEventListener('click', e => {
            // Handle hamburger menu toggle
            const toggle = e.target.closest('.nav-toggle');
            if (toggle) {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.classList.toggle('mobile-open');
                    toggle.classList.toggle('active');
                }
                return;
            }

            // Close mobile menu when a nav link is clicked
            const navLink = e.target.closest('.nav-links a');
            if (navLink) {
                const navLinks = document.querySelector('.nav-links');
                const toggleBtn = document.querySelector('.nav-toggle');
                if (navLinks && navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                }
                if (toggleBtn && toggleBtn.classList.contains('active')) {
                    toggleBtn.classList.remove('active');
                }
            }

            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('href'));
            } else if (e.target.closest('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.closest('[data-link]').getAttribute('href'));
            }
        });
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.route();
    }

    // Session inactivity timer methods
    checkSessionTimer() {
        const path = location.pathname;
        const requiresAuth = path.startsWith('/dashboard') || path === '/onboarding';
        
        if (requiresAuth && localStorage.getItem('userRole')) {
            this.initSessionTimer();
        } else {
            this.destroySessionTimer();
        }
    }

    initSessionTimer() {
        if (this.sessionTimerActive) return;
        this.sessionTimerActive = true;
        
        // Attach activity listeners
        ['mousemove', 'mousedown', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, this.boundResetInactivityTimer);
        });
        
        this.resetInactivityTimer();
        console.log('[AUDIT] SEC_EVENT_SESSION_TRACKING: Inactivity monitoring initialized (120s limit).');
    }

    resetInactivityTimer() {
        if (!this.sessionTimerActive) return;
        
        clearTimeout(this.idleTimer);
        clearTimeout(this.warningTimer);
        this.removeTimeoutWarning();
        
        // Warning 30 seconds before timeout
        this.warningTimer = setTimeout(() => {
            this.showTimeoutWarning();
        }, this.sessionTimeoutMs - this.warningTimeoutMs);
        
        // Timeout
        this.idleTimer = setTimeout(() => {
            this.expireSession();
        }, this.sessionTimeoutMs);
    }

    showTimeoutWarning() {
        if (document.getElementById('session-timeout-warning-overlay')) return;
        
        console.log('[AUDIT] SEC_EVENT_SESSION_WARNING: User idle threshold reached. Expiring in 30 seconds.');
        
        const overlay = document.createElement('div');
        overlay.id = 'session-timeout-warning-overlay';
        overlay.style = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(10, 13, 16, 0.85); backdrop-filter: blur(8px);
            display: flex; align-items: center; justify-content: center; z-index: 10000;
        `;
        overlay.innerHTML = `
            <div style="background: #171b24; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 32px; max-width: 420px; width: 90%; text-align: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);">
                <div style="font-size: 2.5rem; margin-bottom: 16px;">⏳</div>
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #f3ead7; margin-bottom: 12px;">Session Expiring</h3>
                <p style="color: #B5C0CD; font-size: 0.9rem; line-height: 1.5; margin-bottom: 24px;">
                    You have been idle for a while. For your security, your session will automatically close in <span id="timeout-countdown-number" style="color: #3A7563; font-weight: 700;">30</span> seconds.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="keep-active-btn" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem; background: #3A7563; color: #0f1117; border-radius: 8px; font-weight: 600; border: none; cursor: pointer;">Keep Active</button>
                    <button id="logout-now-btn" class="btn btn-secondary" style="padding: 10px 20px; font-size: 0.9rem; background: transparent; color: #f3ead7; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: pointer;">Log Out</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        document.getElementById('keep-active-btn').addEventListener('click', () => {
            this.resetInactivityTimer();
        });
        document.getElementById('logout-now-btn').addEventListener('click', () => {
            this.expireSession();
        });
        
        let secondsLeft = 30;
        this.countdownInterval = setInterval(() => {
            secondsLeft--;
            const numSpan = document.getElementById('timeout-countdown-number');
            if (numSpan) {
                numSpan.textContent = secondsLeft;
            }
            if (secondsLeft <= 0) {
                clearInterval(this.countdownInterval);
            }
        }, 1000);
    }

    removeTimeoutWarning() {
        const overlay = document.getElementById('session-timeout-warning-overlay');
        if (overlay) overlay.remove();
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    expireSession() {
        console.log('[AUDIT] SEC_EVENT_SESSION_TIMEOUT: Session expired due to user inactivity.');
        this.destroySessionTimer();
        localStorage.removeItem('userRole');
        localStorage.removeItem('kycStatus');
        this.navigateTo('/login?reason=timeout');
    }

    destroySessionTimer() {
        this.sessionTimerActive = false;
        clearTimeout(this.idleTimer);
        clearTimeout(this.warningTimer);
        this.removeTimeoutWarning();
        
        ['mousemove', 'mousedown', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event => {
            document.removeEventListener(event, this.boundResetInactivityTimer);
        });
    }

    async route() {
        // Run checkSessionTimer before matching routes
        this.checkSessionTimer();

        // Find matching route
        let path = location.pathname;
        let ViewClass = routes[path];
        
        // Default to 404 if not found
        if (!ViewClass) {
            ViewClass = NotFoundView;
        }

        // Avoid re-rendering if we are on the same route and hash is changing
        if (this.currentView && this.currentView.constructor === ViewClass) {
            if (location.hash) {
                try {
                    const id = location.hash.startsWith('#') ? location.hash.substring(1) : location.hash;
                    const target = document.getElementById(id);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } catch (e) {
                    console.error("Navigation scroll-to-id error:", e);
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        // When routing to a new view, scroll window to top instantly
        window.scrollTo(0, 0);

        // Initialize view
        const view = new ViewClass();
        
        // If there's an existing view, clean up
        if (this.currentView && this.currentView.cleanup) {
            this.currentView.cleanup();
        }

        this.currentView = view;
        
        // Render view HTML
        this.appElement.innerHTML = await view.getHtml();
        
        // Execute view-specific logic after DOM update
        if (typeof view.init === 'function') {
            try {
                view.init();
            } catch (e) {
                console.error('Error during view.init:', e);
            }
        }
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    // Expose navigate globally for form submissions etc.
    window.navigateTo = app.navigateTo.bind(app);
    app.route();
});
