import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Funding Easy — Verified Private Capital Matching");
    }

    async getHtml() {
        return `
            ${Navbar()}

            <style>
            /* ═══════════════════════════════════════════════════════════
               FUNDING EASY — PREMIUM LANDING PAGE STYLES
               10-section institutional homepage
            ═══════════════════════════════════════════════════════════ */

            /* ── Base & Resets ───────────────────────────────────── */
            .fe-home *, .fe-home *::before, .fe-home *::after {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            .fe-home {
                --bg-dark: #0b0d11;
                --bg-surface: #12151d;
                --bg-surface-2: #171b24;
                --bg-surface-3: #1d2230;
                --text-primary: #f3ead7;
                --text-secondary: #b5c0cd;
                --text-muted: #7a8599;
                --accent: #3A7563;
                --accent-hover: #2e5e50;
                --accent-soft: rgba(58,117,99,0.14);
                --accent-glow: rgba(58,117,99,0.25);
                --border: rgba(243,234,215,0.08);
                --border-strong: rgba(243,234,215,0.14);
                --radius: 12px;
                --radius-sm: 8px;
                --radius-xs: 6px;
                --font: 'Inter', system-ui, -apple-system, sans-serif;
                --shadow-card: 0 4px 24px rgba(0,0,0,0.35);
                --shadow-glow: 0 0 40px var(--accent-glow);
                --transition: 200ms ease;

                font-family: var(--font);
                background: var(--bg-dark);
                color: var(--text-primary);
                line-height: 1.6;
                overflow-x: hidden;
                -webkit-font-smoothing: antialiased;
            }

            /* Grid texture background */
            .fe-home::before {
                content: '';
                position: fixed;
                inset: 0;
                background-image:
                    linear-gradient(rgba(243,234,215,0.015) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(243,234,215,0.015) 1px, transparent 1px);
                background-size: 60px 60px;
                pointer-events: none;
                z-index: 0;
            }

            .fe-home section, .fe-home footer {
                position: relative;
                z-index: 1;
            }

            .fe-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 24px;
            }

            .fe-section-label {
                font-size: 0.7rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                color: var(--accent);
                margin-bottom: 12px;
            }

            .fe-section-title {
                font-size: clamp(2rem, 4vw, 2.75rem);
                font-weight: 600;
                letter-spacing: -0.025em;
                line-height: 1.15;
                color: var(--text-primary);
                margin-bottom: 16px;
            }

            .fe-section-subtitle {
                font-size: 1.05rem;
                color: var(--text-secondary);
                max-width: 600px;
                line-height: 1.65;
            }

            /* ── Navbar Overrides ────────────────────────────────── */
            .navbar {
                position: sticky;
                top: 0;
                z-index: 100;
                background: rgba(11,13,17,0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-bottom: 1px solid var(--border);
                padding: 0;
            }

            .navbar .container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 64px;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 24px;
            }

            .btn-nav-outline {
                padding: 7px 18px !important;
                border: 1px solid var(--border-strong) !important;
                border-radius: var(--radius-sm) !important;
                color: var(--text-primary) !important;
                background: transparent !important;
                font-size: 0.85rem !important;
                font-weight: 500 !important;
                transition: var(--transition) !important;
                text-decoration: none;
            }

            .btn-nav-outline:hover {
                border-color: var(--accent) !important;
                color: var(--accent) !important;
                background: var(--accent-soft) !important;
            }

            .btn-nav-filled {
                padding: 7px 18px !important;
                border: 1px solid var(--accent) !important;
                border-radius: var(--radius-sm) !important;
                color: #fff !important;
                background: var(--accent) !important;
                font-size: 0.85rem !important;
                font-weight: 600 !important;
                transition: var(--transition) !important;
                text-decoration: none;
            }

            .btn-nav-filled:hover {
                background: var(--accent-hover) !important;
                box-shadow: var(--shadow-glow) !important;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 1: HERO
            ════════════════════════════════════════════════════════ */
            .fe-hero {
                padding: 100px 0 80px;
                position: relative;
                overflow: hidden;
            }

            .fe-hero::before {
                content: '';
                position: absolute;
                top: -200px;
                right: -150px;
                width: 700px;
                height: 700px;
                background: radial-gradient(circle, var(--accent-glow) 0%, transparent 65%);
                pointer-events: none;
                opacity: 0.4;
            }

            .fe-hero-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 80px;
                align-items: center;
            }

            .fe-hero-eyebrow {
                font-size: 0.7rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.14em;
                color: var(--accent);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .fe-hero-eyebrow::before {
                content: '';
                width: 24px;
                height: 1px;
                background: var(--accent);
            }

            .fe-hero-headline {
                font-size: clamp(2.5rem, 5vw, 3.5rem);
                font-weight: 700;
                letter-spacing: -0.03em;
                line-height: 1.08;
                margin-bottom: 24px;
                color: var(--text-primary);
            }

            .fe-hero-headline em {
                font-style: normal;
                color: var(--accent);
            }

            .fe-hero-desc {
                font-size: 1.1rem;
                color: var(--text-secondary);
                line-height: 1.7;
                margin-bottom: 36px;
                max-width: 520px;
            }

            .fe-hero-ctas {
                display: flex;
                gap: 16px;
                margin-bottom: 48px;
                flex-wrap: wrap;
            }

            .fe-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 14px 28px;
                border-radius: var(--radius-sm);
                font-size: 0.95rem;
                font-weight: 600;
                text-decoration: none;
                transition: all var(--transition);
                cursor: pointer;
                border: 1px solid transparent;
                gap: 8px;
            }

            .fe-btn-primary {
                background: var(--accent);
                color: #fff;
                border-color: var(--accent);
            }

            .fe-btn-primary:hover {
                background: var(--accent-hover);
                box-shadow: var(--shadow-glow);
                transform: translateY(-2px);
            }

            .fe-btn-secondary {
                background: transparent;
                color: var(--text-primary);
                border-color: var(--border-strong);
            }

            .fe-btn-secondary:hover {
                border-color: var(--accent);
                color: var(--accent);
                background: var(--accent-soft);
            }

            /* Hero trust metrics */
            .fe-hero-metrics {
                display: flex;
                gap: 40px;
                flex-wrap: wrap;
            }

            .fe-hero-metric {
                display: flex;
                flex-direction: column;
            }

            .fe-hero-metric-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
            }

            .fe-hero-metric-label {
                font-size: 0.75rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.06em;
            }

            /* Hero product mockup */
            .fe-hero-mockup {
                position: relative;
            }

            .fe-mockup-glow {
                position: absolute;
                inset: -40px;
                background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%);
                opacity: 0.35;
                pointer-events: none;
                border-radius: 50%;
            }

            .fe-mockup-card {
                position: relative;
                background: var(--bg-surface);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 0;
                overflow: hidden;
                box-shadow: var(--shadow-card);
            }

            .fe-mockup-header {
                padding: 16px 20px;
                border-bottom: 1px solid var(--border);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .fe-mockup-dots {
                display: flex;
                gap: 6px;
            }

            .fe-mockup-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
            }

            .fe-mockup-body {
                padding: 24px 20px;
            }

            .fe-match-card {
                background: var(--bg-surface-2);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                padding: 20px;
                margin-bottom: 12px;
            }

            .fe-match-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 14px;
            }

            .fe-match-name {
                font-weight: 600;
                font-size: 0.95rem;
            }

            .fe-match-badge {
                font-size: 0.65rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                padding: 3px 10px;
                border-radius: var(--radius-xs);
            }

            .fe-badge-accepted {
                background: rgba(63,138,87,0.15);
                color: #5cb87a;
            }

            .fe-badge-reviewing {
                background: rgba(207,139,46,0.15);
                color: #cf8b2e;
            }

            .fe-badge-pending {
                background: rgba(75,125,184,0.15);
                color: #6ba3d6;
            }

            .fe-match-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }

            .fe-match-detail {
                font-size: 0.78rem;
            }

            .fe-match-detail-label {
                color: var(--text-muted);
            }

            .fe-match-detail-value {
                color: var(--text-secondary);
                font-weight: 500;
            }

            .fe-mockup-notification {
                background: var(--accent-soft);
                border: 1px solid rgba(58,117,99,0.2);
                border-radius: var(--radius-sm);
                padding: 14px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 0.82rem;
            }

            .fe-notif-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--accent);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .fe-notif-icon svg {
                width: 16px;
                height: 16px;
                color: #fff;
            }

            .fe-notif-text {
                color: var(--text-secondary);
                line-height: 1.4;
            }

            .fe-notif-text strong {
                color: var(--text-primary);
            }


            /* ════════════════════════════════════════════════════════
               SECTION 2: TRUSTED BY
            ════════════════════════════════════════════════════════ */
            .fe-trusted {
                padding: 56px 0;
                border-top: 1px solid var(--border);
                border-bottom: 1px solid var(--border);
                background: var(--bg-surface);
            }

            .fe-trusted-inner {
                text-align: center;
            }

            .fe-trusted-label {
                font-size: 0.65rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.18em;
                color: var(--text-muted);
                margin-bottom: 32px;
            }

            .fe-trusted-logos {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 56px;
                flex-wrap: wrap;
                opacity: 0.4;
            }

            .fe-trusted-logo {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-primary);
                letter-spacing: 0.04em;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .fe-trusted-logo svg {
                width: 20px;
                height: 20px;
                opacity: 0.7;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 3: HOW IT WORKS
            ════════════════════════════════════════════════════════ */
            .fe-how {
                padding: 120px 0;
            }

            .fe-how-header {
                text-align: center;
                margin-bottom: 72px;
            }

            .fe-how-header .fe-section-subtitle {
                margin: 0 auto;
            }

            .fe-steps {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 32px;
            }

            .fe-step {
                position: relative;
                background: var(--bg-surface);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 36px 28px 32px;
                transition: all var(--transition);
            }

            .fe-step:hover {
                border-color: var(--accent);
                box-shadow: var(--shadow-glow);
                transform: translateY(-4px);
            }

            .fe-step-number {
                font-size: 0.65rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                color: var(--accent);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .fe-step-number::after {
                content: '';
                flex: 1;
                height: 1px;
                background: var(--border);
            }

            .fe-step-icon {
                width: 44px;
                height: 44px;
                border-radius: 10px;
                background: var(--accent-soft);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }

            .fe-step-icon svg {
                width: 22px;
                height: 22px;
                color: var(--accent);
                stroke-width: 1.5;
            }

            .fe-step-title {
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 14px;
                color: var(--text-primary);
            }

            .fe-step-bullets {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .fe-step-bullets li {
                font-size: 0.88rem;
                color: var(--text-secondary);
                display: flex;
                align-items: flex-start;
                gap: 8px;
                line-height: 1.5;
            }

            .fe-step-bullets li::before {
                content: '';
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: var(--accent);
                flex-shrink: 0;
                margin-top: 8px;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 4: PRODUCT BENEFITS
            ════════════════════════════════════════════════════════ */
            .fe-benefits {
                padding: 120px 0;
                background: var(--bg-surface);
                border-top: 1px solid var(--border);
                border-bottom: 1px solid var(--border);
            }

            .fe-benefits-header {
                text-align: center;
                margin-bottom: 72px;
            }

            .fe-benefits-header .fe-section-subtitle {
                margin: 0 auto;
            }

            .fe-benefits-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
            }

            .fe-benefit-card {
                background: var(--bg-surface-2);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 40px 32px;
                transition: all var(--transition);
                position: relative;
                overflow: hidden;
            }

            .fe-benefit-card:first-child {
                grid-row: 1 / 3;
            }

            .fe-benefit-card:hover {
                border-color: var(--border-strong);
                transform: translateY(-2px);
                box-shadow: var(--shadow-card);
            }

            .fe-benefit-stat {
                font-size: 2.5rem;
                font-weight: 800;
                color: var(--accent);
                margin-bottom: 8px;
                line-height: 1;
            }

            .fe-benefit-stat-label {
                font-size: 0.7rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin-bottom: 24px;
            }

            .fe-benefit-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 12px;
                line-height: 1.3;
            }

            .fe-benefit-desc {
                font-size: 0.92rem;
                color: var(--text-secondary);
                line-height: 1.65;
                margin-bottom: 20px;
            }

            .fe-benefit-features {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .fe-benefit-features li {
                font-size: 0.85rem;
                color: var(--text-secondary);
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .fe-benefit-features li svg {
                width: 16px;
                height: 16px;
                color: var(--accent);
                flex-shrink: 0;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 5: SECURITY
            ════════════════════════════════════════════════════════ */
            .fe-security {
                padding: 120px 0;
                position: relative;
                overflow: hidden;
            }

            .fe-security::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 800px;
                height: 400px;
                background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%);
                opacity: 0.2;
                pointer-events: none;
            }

            .fe-security-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 80px;
                align-items: center;
            }

            .fe-security-features {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }

            .fe-sec-feature {
                background: var(--bg-surface);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                padding: 24px 20px;
                transition: all var(--transition);
            }

            .fe-sec-feature:hover {
                border-color: var(--accent);
            }

            .fe-sec-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                background: var(--accent-soft);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 14px;
            }

            .fe-sec-icon svg {
                width: 18px;
                height: 18px;
                color: var(--accent);
            }

            .fe-sec-title {
                font-size: 0.92rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 6px;
            }

            .fe-sec-desc {
                font-size: 0.8rem;
                color: var(--text-muted);
                line-height: 1.5;
            }

            /* Security dashboard mockup */
            .fe-sec-dashboard {
                background: var(--bg-surface);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                overflow: hidden;
                box-shadow: var(--shadow-card);
            }

            .fe-sec-dash-header {
                padding: 14px 20px;
                border-bottom: 1px solid var(--border);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .fe-sec-dash-title {
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--text-muted);
            }

            .fe-sec-dash-badge {
                font-size: 0.65rem;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 4px;
                background: rgba(63,138,87,0.15);
                color: #5cb87a;
                text-transform: uppercase;
                letter-spacing: 0.06em;
            }

            .fe-sec-dash-body {
                padding: 20px;
            }

            .fe-sec-dash-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid var(--border);
                font-size: 0.82rem;
            }

            .fe-sec-dash-row:last-child {
                border-bottom: none;
            }

            .fe-sec-dash-label {
                color: var(--text-muted);
            }

            .fe-sec-dash-value {
                color: var(--text-secondary);
                font-weight: 500;
            }

            .fe-sec-dash-value.green {
                color: #5cb87a;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 6: TRACTION & TESTIMONIALS
            ════════════════════════════════════════════════════════ */
            .fe-traction {
                padding: 120px 0;
                background: var(--bg-surface);
                border-top: 1px solid var(--border);
                border-bottom: 1px solid var(--border);
            }

            .fe-traction-header {
                text-align: center;
                margin-bottom: 64px;
            }

            .fe-traction-header .fe-section-subtitle {
                margin: 0 auto;
            }

            /* Metrics row */
            .fe-metrics-row {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
                margin-bottom: 64px;
            }

            .fe-metric-card {
                text-align: center;
                background: var(--bg-surface-2);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 36px 20px;
            }

            .fe-metric-value {
                font-size: 2.5rem;
                font-weight: 800;
                color: var(--text-primary);
                line-height: 1;
                margin-bottom: 8px;
            }

            .fe-metric-label {
                font-size: 0.8rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.06em;
            }

            /* Featured testimonials */
            .fe-testimonials-featured {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                margin-bottom: 24px;
            }

            .fe-testimonial {
                background: var(--bg-surface-2);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 32px;
                position: relative;
            }

            .fe-testimonial-quote {
                font-size: 1.05rem;
                color: var(--text-secondary);
                line-height: 1.7;
                margin-bottom: 24px;
                font-style: italic;
            }

            .fe-testimonial-quote::before {
                content: '"';
                font-size: 3rem;
                font-weight: 800;
                color: var(--accent);
                line-height: 1;
                display: block;
                margin-bottom: 8px;
                font-style: normal;
            }

            .fe-testimonial-author {
                display: flex;
                align-items: center;
                gap: 14px;
            }

            .fe-testimonial-avatar {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: var(--accent-soft);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                font-weight: 700;
                color: var(--accent);
                flex-shrink: 0;
            }

            .fe-testimonial-name {
                font-size: 0.92rem;
                font-weight: 600;
                color: var(--text-primary);
            }

            .fe-testimonial-role {
                font-size: 0.78rem;
                color: var(--text-muted);
            }

            .fe-testimonial-meta {
                font-size: 0.7rem;
                color: var(--text-muted);
                margin-top: 2px;
            }

            /* Small testimonials */
            .fe-testimonials-small {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
            }

            .fe-testimonial-sm {
                background: var(--bg-surface-3);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                padding: 24px;
            }

            .fe-testimonial-sm .fe-testimonial-quote {
                font-size: 0.88rem;
                margin-bottom: 16px;
            }

            .fe-testimonial-sm .fe-testimonial-quote::before {
                font-size: 2rem;
                margin-bottom: 4px;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 7: PRICING
            ════════════════════════════════════════════════════════ */
            .fe-pricing {
                padding: 120px 0;
            }

            .fe-pricing-header {
                text-align: center;
                margin-bottom: 64px;
            }

            .fe-pricing-header .fe-section-subtitle {
                margin: 0 auto;
            }

            .fe-pricing-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                max-width: 900px;
                margin: 0 auto;
            }

            .fe-pricing-card {
                background: var(--bg-surface);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 40px 32px;
                display: flex;
                flex-direction: column;
                transition: all var(--transition);
                position: relative;
            }

            .fe-pricing-card:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-card);
            }

            .fe-pricing-card.featured {
                border-color: var(--accent);
            }

            .fe-pricing-popular {
                position: absolute;
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.65rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                padding: 4px 16px;
                border-radius: var(--radius-xs);
                background: var(--accent);
                color: #fff;
                white-space: nowrap;
            }

            .fe-pricing-plan {
                font-size: 1.3rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 8px;
            }

            .fe-pricing-model {
                font-size: 0.88rem;
                color: var(--text-muted);
                margin-bottom: 28px;
                padding-bottom: 28px;
                border-bottom: 1px solid var(--border);
                min-height: 60px;
            }

            .fe-pricing-features {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 14px;
                margin-bottom: 32px;
                flex-grow: 1;
            }

            .fe-pricing-features li {
                font-size: 0.88rem;
                color: var(--text-secondary);
                display: flex;
                align-items: flex-start;
                gap: 10px;
                line-height: 1.4;
            }

            .fe-pricing-features li svg {
                width: 16px;
                height: 16px;
                color: var(--accent);
                flex-shrink: 0;
                margin-top: 2px;
            }


            /* ════════════════════════════════════════════════════════
               SECTION 8: FINAL CTA
            ════════════════════════════════════════════════════════ */
            .fe-cta {
                padding: 120px 0;
                text-align: center;
                position: relative;
                overflow: hidden;
                background: var(--bg-surface);
                border-top: 1px solid var(--border);
            }

            .fe-cta::before {
                content: '';
                position: absolute;
                bottom: -100px;
                left: 50%;
                transform: translateX(-50%);
                width: 600px;
                height: 400px;
                background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 65%);
                opacity: 0.25;
                pointer-events: none;
            }

            .fe-cta .fe-section-title {
                max-width: 700px;
                margin: 0 auto 16px;
            }

            .fe-cta .fe-section-subtitle {
                margin: 0 auto 40px;
                text-align: center;
            }

            .fe-cta-buttons {
                display: flex;
                gap: 16px;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 56px;
            }

            .fe-newsletter {
                max-width: 480px;
                margin: 0 auto;
                padding-top: 56px;
                border-top: 1px solid var(--border);
            }

            .fe-newsletter-title {
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 8px;
            }

            .fe-newsletter-desc {
                font-size: 0.85rem;
                color: var(--text-muted);
                margin-bottom: 20px;
            }

            .fe-newsletter-form {
                display: flex;
                gap: 10px;
            }

            .fe-newsletter-input {
                flex: 1;
                padding: 12px 16px;
                background: var(--bg-surface-2);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                color: var(--text-primary);
                font-family: var(--font);
                font-size: 0.88rem;
                transition: border-color var(--transition);
            }

            .fe-newsletter-input:focus {
                outline: none;
                border-color: var(--accent);
            }

            .fe-newsletter-btn {
                padding: 12px 24px;
                background: var(--accent);
                color: #fff;
                border: none;
                border-radius: var(--radius-sm);
                font-weight: 600;
                font-size: 0.88rem;
                cursor: pointer;
                transition: all var(--transition);
                font-family: var(--font);
            }

            .fe-newsletter-btn:hover {
                background: var(--accent-hover);
            }


            /* ════════════════════════════════════════════════════════
               SECTION 9: FOOTER
            ════════════════════════════════════════════════════════ */
            .fe-footer {
                padding: 80px 0 40px;
                border-top: 1px solid var(--border);
                background: #080a0e;
            }

            .fe-footer-grid {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
                gap: 40px;
                margin-bottom: 56px;
            }

            .fe-footer-brand p {
                font-size: 0.85rem;
                color: var(--text-muted);
                line-height: 1.6;
                margin-bottom: 8px;
            }

            .fe-footer-heading {
                font-size: 0.72rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: var(--text-primary);
                margin-bottom: 20px;
            }

            .fe-footer-links {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .fe-footer-links a {
                font-size: 0.85rem;
                color: var(--text-muted);
                text-decoration: none;
                transition: color var(--transition);
            }

            .fe-footer-links a:hover {
                color: var(--accent);
            }

            .fe-footer-bottom {
                padding-top: 32px;
                border-top: 1px solid var(--border);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 16px;
            }

            .fe-footer-copy {
                font-size: 0.78rem;
                color: var(--text-muted);
            }

            .fe-footer-badges {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            .fe-footer-badge {
                font-size: 0.68rem;
                color: var(--text-muted);
                padding: 4px 12px;
                border: 1px solid var(--border);
                border-radius: 4px;
                background: rgba(255,255,255,0.02);
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .fe-footer-badge svg {
                width: 12px;
                height: 12px;
                color: var(--accent);
            }

            /* ── Check icon reusable ──────────────────────────────── */
            .fe-check {
                width: 16px;
                height: 16px;
                color: var(--accent);
                flex-shrink: 0;
            }


            /* ════════════════════════════════════════════════════════
               RESPONSIVE
            ════════════════════════════════════════════════════════ */
            @media (max-width: 1024px) {
                .fe-hero-grid {
                    grid-template-columns: 1fr;
                    gap: 48px;
                }
                .fe-hero-mockup {
                    max-width: 520px;
                }
                .fe-security-grid {
                    grid-template-columns: 1fr;
                    gap: 48px;
                }
                .fe-benefits-grid {
                    grid-template-columns: 1fr;
                }
                .fe-benefit-card:first-child {
                    grid-row: auto;
                }
                .fe-footer-grid {
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                }
            }

            @media (max-width: 768px) {
                .fe-hero-ctas {
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                .fe-hero-cta-col {
                    width: 100%;
                    max-width: 100%;
                }
                .fe-hero {
                    padding: 72px 0 56px;
                }
                .fe-steps {
                    grid-template-columns: 1fr;
                }
                .fe-metrics-row {
                    grid-template-columns: 1fr;
                }
                .fe-testimonials-featured {
                    grid-template-columns: 1fr;
                }
                .fe-testimonials-small {
                    grid-template-columns: 1fr;
                }
                .fe-pricing-grid {
                    grid-template-columns: 1fr;
                }
                .fe-security-features {
                    grid-template-columns: 1fr;
                }
                .fe-hero-metrics {
                    gap: 24px;
                }
                .fe-cta-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                .fe-newsletter-form {
                    flex-direction: column;
                }
                .fe-footer-grid {
                    grid-template-columns: 1fr;
                }
                .fe-footer-bottom {
                    flex-direction: column;
                    text-align: center;
                }
                .fe-trusted-logos {
                    gap: 32px;
                }
            }

            /* ── Scroll reveal animations ─────────────────────────── */
            .fe-reveal {
                opacity: 0;
                transform: translateY(24px);
                transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
            }

            .fe-reveal.fe-visible {
                opacity: 1;
                transform: translateY(0);
            }

            </style>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 1: HERO
            ════════════════════════════════════════════════════════ -->
            <div class="fe-home" id="main">

            <section class="fe-hero" id="hero">
                <div class="fe-container">
                    <div class="fe-hero-grid">
                        <div class="fe-hero-content">
                            <div class="fe-hero-eyebrow">KYC-Verified Private Capital Matching</div>
                            <h1 class="fe-hero-headline">Clear the path from introduction to <em>committed capital</em>.</h1>
                            <p class="fe-hero-desc">Connect with verified, mandate-fit founders and investors through private, consent-based introductions and secure diligence workspaces.</p>
                            <div class="fe-hero-ctas" style="align-items:flex-start;">
                                <div class="fe-hero-cta-col" style="display:flex; flex-direction:column; gap:8px; max-width:240px; flex:1;">
                                    <a href="/signup?role=founder" class="fe-btn fe-btn-primary" data-link style="justify-content:center;">Apply as Founder</a>
                                    <div class="fe-hero-cta-desc" style="font-size:0.7rem; color:var(--text-muted); text-align:center; line-height:1.3;">For venture-backable companies raising private capital</div>
                                </div>
                                <div class="fe-hero-cta-col" style="display:flex; flex-direction:column; gap:8px; max-width:240px; flex:1;">
                                    <a href="/signup?role=investor" class="fe-btn fe-btn-secondary" data-link style="justify-content:center;">Apply as Investor</a>
                                    <div class="fe-hero-cta-desc" style="font-size:0.7rem; color:var(--text-muted); text-align:center; line-height:1.3;">For accredited and institutional investors</div>
                                </div>
                            </div>
                            <div class="fe-hero-microcopy" style="font-size:0.78rem;color:var(--text-muted);letter-spacing:0.02em;">Free to apply · Private by default · No public profiles</div>
                            <div class="fe-hero-metrics">
                                <div class="fe-hero-metric">
                                    <span class="fe-hero-metric-value">340+</span>
                                    <span class="fe-hero-metric-label">Verified Members</span>
                                </div>
                                <div class="fe-hero-metric">
                                    <span class="fe-hero-metric-value">$28M</span>
                                    <span class="fe-hero-metric-label">Capital Matched</span>
                                </div>
                                <div class="fe-hero-metric">
                                    <span class="fe-hero-metric-value">14 days</span>
                                    <span class="fe-hero-metric-label">Avg. Time to Intro</span>
                                </div>
                            </div>
                        </div>
                        <div class="fe-hero-mockup">
                            <div class="fe-mockup-glow"></div>
                            <div class="fe-mockup-card">
                                <div class="fe-mockup-header">
                                    <div class="fe-mockup-dots">
                                        <div class="fe-mockup-dot" style="background:#ef4444"></div>
                                        <div class="fe-mockup-dot" style="background:#f59e0b"></div>
                                        <div class="fe-mockup-dot" style="background:#22c55e"></div>
                                    </div>
                                    <span style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:600">Match Dashboard</span>
                                </div>
                                <div class="fe-mockup-body">
                                    <div class="fe-match-card">
                                        <div class="fe-match-header">
                                            <span class="fe-match-name">Meridian Ventures</span>
                                            <span class="fe-match-badge fe-badge-accepted">Accepted</span>
                                        </div>
                                        <div class="fe-match-details">
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Stage</span><br><span class="fe-match-detail-value">Series A</span></div>
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Cheque</span><br><span class="fe-match-detail-value">$500K–$2M</span></div>
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Sector</span><br><span class="fe-match-detail-value">FinTech, SaaS</span></div>
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Geo</span><br><span class="fe-match-detail-value">US, India</span></div>
                                        </div>
                                    </div>
                                    <div class="fe-match-card">
                                        <div class="fe-match-header">
                                            <span class="fe-match-name">Greenfield Capital</span>
                                            <span class="fe-match-badge fe-badge-reviewing">Reviewing</span>
                                        </div>
                                        <div class="fe-match-details">
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Stage</span><br><span class="fe-match-detail-value">Pre-Seed</span></div>
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Cheque</span><br><span class="fe-match-detail-value">$100K–$500K</span></div>
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Sector</span><br><span class="fe-match-detail-value">ClimateTech</span></div>
                                            <div class="fe-match-detail"><span class="fe-match-detail-label">Geo</span><br><span class="fe-match-detail-value">India, SEA</span></div>
                                        </div>
                                    </div>
                                    <div class="fe-mockup-notification">
                                        <div class="fe-notif-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                        </div>
                                        <div class="fe-notif-text"><strong>Vault access granted</strong> — Meridian Ventures opened your data room. Both parties opted in.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 2: TRUSTED BY
            ════════════════════════════════════════════════════════ -->
            <section class="fe-trusted" id="trusted">
                <div class="fe-container">
                    <div class="fe-trusted-inner fe-reveal">
                        <div class="fe-trusted-label">Trusted by teams backed by</div>
                        <div class="fe-trusted-logos">
                            <div class="fe-trusted-logo">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                Sequoia
                            </div>
                            <div class="fe-trusted-logo">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
                                Accel
                            </div>
                            <div class="fe-trusted-logo">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                Lightspeed
                            </div>
                            <div class="fe-trusted-logo">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                                Matrix Partners
                            </div>
                            <div class="fe-trusted-logo">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                Peak XV
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 3: HOW IT WORKS
            ════════════════════════════════════════════════════════ -->
            <section class="fe-how" id="how-it-works">
                <div class="fe-container">
                    <div class="fe-how-header fe-reveal">
                        <div class="fe-section-label">How It Works</div>
                        <h2 class="fe-section-title">Four steps from verification to committed capital</h2>
                        <p class="fe-section-subtitle">A structured, private workflow that replaces cold outreach with verified, consent-based introductions.</p>
                    </div>
                    <div class="fe-steps">
                        <div class="fe-step fe-reveal">
                            <div class="fe-step-number">Step 01</div>
                            <div class="fe-step-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            <h3 class="fe-step-title">Profile</h3>
                            <ul class="fe-step-bullets">
                                <li>Complete KYC/AML identity verification</li>
                                <li>Build your secure, constrained profile</li>
                            </ul>
                        </div>
                        <div class="fe-step fe-reveal">
                            <div class="fe-step-number">Step 02</div>
                            <div class="fe-step-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                            <h3 class="fe-step-title">Pitch Materials</h3>
                            <ul class="fe-step-bullets">
                                <li>Upload diligence documents</li>
                                <li>Include an optional secure video pitch</li>
                            </ul>
                        </div>
                        <div class="fe-step fe-reveal">
                            <div class="fe-step-number">Step 03</div>
                            <div class="fe-step-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </div>
                            <h3 class="fe-step-title">Matching</h3>
                            <ul class="fe-step-bullets">
                                <li>Get algorithmic mandate-fit matching</li>
                                <li>Blind review based strictly on criteria</li>
                            </ul>
                        </div>
                        <div class="fe-step fe-reveal">
                            <div class="fe-step-number">Step 04</div>
                            <div class="fe-step-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                            <h3 class="fe-step-title">Introduction</h3>
                            <ul class="fe-step-bullets">
                                <li>Mutual opt-in required to connect</li>
                                <li>Unlocks the private data room vault</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 4: PRODUCT BENEFITS
            ════════════════════════════════════════════════════════ -->
            <section class="fe-benefits" id="benefits">
                <div class="fe-container">
                    <div class="fe-benefits-header fe-reveal">
                        <div class="fe-section-label">Platform Advantages</div>
                        <h2 class="fe-section-title">Built for founders who protect their cap table and investors who value signal over noise</h2>
                    </div>
                    <div class="fe-benefits-grid">
                        <!-- Card 1: Tall left card -->
                        <div class="fe-benefit-card fe-reveal">
                            <div class="fe-benefit-stat">5×</div>
                            <div class="fe-benefit-stat-label">Fewer Irrelevant Leads</div>
                            <h3 class="fe-benefit-title">Verified, Mandate-Fit Matching</h3>
                            <p class="fe-benefit-desc">Every participant is KYC-verified. Our matching engine filters on stage, sector, geography, cheque size, and investment thesis — so investors only review deals within their mandate, and founders only see relevant capital.</p>
                            <ul class="fe-benefit-features">
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Identity-verified founders and investors</li>
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Multi-parameter mandate matching</li>
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Double opt-in before data disclosure</li>
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> No public profiles or spray-and-pray outreach</li>
                            </ul>
                        </div>

                        <!-- Card 2: Top right -->
                        <div class="fe-benefit-card fe-reveal">
                            <div class="fe-benefit-stat">80%</div>
                            <div class="fe-benefit-stat-label">Faster Review Cycles</div>
                            <h3 class="fe-benefit-title">Secure Data Rooms & Document Vaults</h3>
                            <p class="fe-benefit-desc">Once both parties opt in, a shared encrypted workspace opens automatically. Upload pitch decks, financials, and term sheets with granular access controls.</p>
                            <ul class="fe-benefit-features">
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> AES-256 encryption at rest and in transit</li>
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Expiring and revocable access links</li>
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Watermarked document previews</li>
                            </ul>
                        </div>

                        <!-- Card 3: Bottom right -->
                        <div class="fe-benefit-card fe-reveal">
                            <div class="fe-benefit-stat">1</div>
                            <div class="fe-benefit-stat-label">Centralized Workspace</div>
                            <h3 class="fe-benefit-title">Diligence & Workflow in One Place</h3>
                            <p class="fe-benefit-desc">Replace scattered email threads and Dropbox folders. Track introduction status, diligence progress, and term negotiations from a single dashboard.</p>
                            <ul class="fe-benefit-features">
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Real-time introduction pipeline tracking</li>
                                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Complete audit history for compliance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 5: SECURITY & PRIVACY
            ════════════════════════════════════════════════════════ -->
            <section class="fe-security" id="security">
                <div class="fe-container">
                    <div class="fe-security-grid">
                        <div class="fe-reveal">
                            <div class="fe-section-label">Security & Privacy</div>
                            <h2 class="fe-section-title">Your data stays under your control at every stage</h2>
                            <p class="fe-section-subtitle" style="margin-bottom:40px;">Funding Easy is built on the principle that fundraising data is sensitive. Every interaction is gated, encrypted, and auditable.</p>
                            <div class="fe-security-features">
                                <div class="fe-sec-feature">
                                    <div class="fe-sec-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    </div>
                                    <div class="fe-sec-title">Verified Participants</div>
                                    <div class="fe-sec-desc">KYC/AML checks for every user on the platform before any introduction.</div>
                                </div>
                                <div class="fe-sec-feature">
                                    <div class="fe-sec-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    </div>
                                    <div class="fe-sec-title">Permission-Based Access</div>
                                    <div class="fe-sec-desc">Documents only visible after mutual opt-in. Granular read/download controls.</div>
                                </div>
                                <div class="fe-sec-feature">
                                    <div class="fe-sec-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </div>
                                    <div class="fe-sec-title">Expiring & Revocable</div>
                                    <div class="fe-sec-desc">Set time limits on document access. Revoke permissions instantly at any time.</div>
                                </div>
                                <div class="fe-sec-feature">
                                    <div class="fe-sec-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                                    </div>
                                    <div class="fe-sec-title">Full Audit Trail</div>
                                    <div class="fe-sec-desc">Every view, download, and access event is logged with timestamps and IP metadata.</div>
                                </div>
                            </div>
                        </div>
                        <div class="fe-reveal">
                            <div style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--text-muted);margin-bottom:12px">Technical Controls</div>
                            <div class="fe-sec-dashboard">
                                <div class="fe-sec-dash-header">
                                    <span class="fe-sec-dash-title">Security Status</span>
                                    <span class="fe-sec-dash-badge">All Systems Operational</span>
                                </div>
                                <div class="fe-sec-dash-body">
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">Data Encryption</span>
                                        <span class="fe-sec-dash-value green">AES-256 · Active</span>
                                    </div>
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">Transit Security</span>
                                        <span class="fe-sec-dash-value green">TLS 1.3 · Active</span>
                                    </div>
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">Identity Provider</span>
                                        <span class="fe-sec-dash-value">KYC/AML Verified</span>
                                    </div>
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">SOC 2 Type II</span>
                                        <span class="fe-sec-dash-value green">Compliant</span>
                                    </div>
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">Uptime (90d)</span>
                                        <span class="fe-sec-dash-value green">99.97%</span>
                                    </div>
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">Last Audit</span>
                                        <span class="fe-sec-dash-value">June 2026</span>
                                    </div>
                                    <div class="fe-sec-dash-row">
                                        <span class="fe-sec-dash-label">SEBI Compliance</span>
                                        <span class="fe-sec-dash-value green">Registered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 6: TRACTION & TESTIMONIALS
            ════════════════════════════════════════════════════════ -->
            <section class="fe-traction" id="traction">
                <div class="fe-container">
                    <div class="fe-traction-header fe-reveal">
                        <div class="fe-section-label">Results</div>
                        <h2 class="fe-section-title">What founders and investors are saying</h2>
                        <p class="fe-section-subtitle">Real outcomes from verified participants on the Funding Easy network.</p>
                    </div>

                    <div class="fe-metrics-row fe-reveal">
                        <div class="fe-metric-card">
                            <div class="fe-metric-value">$28M+</div>
                            <div class="fe-metric-label">Capital Facilitated</div>
                        </div>
                        <div class="fe-metric-card">
                            <div class="fe-metric-value">92%</div>
                            <div class="fe-metric-label">Intro Acceptance Rate</div>
                        </div>
                        <div class="fe-metric-card">
                            <div class="fe-metric-value">14 days</div>
                            <div class="fe-metric-label">Avg. First Introduction</div>
                        </div>
                    </div>

                    <div class="fe-testimonials-featured fe-reveal">
                        <div class="fe-testimonial">
                            <p class="fe-testimonial-quote">We closed our seed round in six weeks. The double opt-in meant every investor we spoke with had already reviewed our mandate and confirmed interest. No wasted meetings.</p>
                            <div class="fe-testimonial-author">
                                <div class="fe-testimonial-avatar">RK</div>
                                <div>
                                    <div class="fe-testimonial-name">Ravi Krishnan</div>
                                    <div class="fe-testimonial-role">Co-founder & CEO, NovaPay</div>
                                    <div class="fe-testimonial-meta">FinTech · Seed · Bangalore, India</div>
                                </div>
                            </div>
                        </div>
                        <div class="fe-testimonial">
                            <p class="fe-testimonial-quote">As a fund deploying into Southeast Asian fintech, the signal-to-noise ratio here is unlike anything we've used. Every profile is pre-screened and mandate-fit. It saves our team 15+ hours a week.</p>
                            <div class="fe-testimonial-author">
                                <div class="fe-testimonial-avatar">SL</div>
                                <div>
                                    <div class="fe-testimonial-name">Sarah Lim</div>
                                    <div class="fe-testimonial-role">Partner, Horizon Ventures</div>
                                    <div class="fe-testimonial-meta">Early-Stage VC · $45M AUM · Singapore</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="fe-testimonials-small fe-reveal">
                        <div class="fe-testimonial-sm">
                            <p class="fe-testimonial-quote">The vault feature alone replaced three tools we were using for diligence. Watermarked previews and revocable access give us real control.</p>
                            <div class="fe-testimonial-author">
                                <div class="fe-testimonial-avatar">AP</div>
                                <div>
                                    <div class="fe-testimonial-name">Arjun Patel</div>
                                    <div class="fe-testimonial-role">CTO, HealthStack</div>
                                    <div class="fe-testimonial-meta">HealthTech · Pre-Seed</div>
                                </div>
                            </div>
                        </div>
                        <div class="fe-testimonial-sm">
                            <p class="fe-testimonial-quote">I've been angel investing for eight years. This is the first platform where I'm not drowning in off-mandate cold decks. The KYC layer matters.</p>
                            <div class="fe-testimonial-author">
                                <div class="fe-testimonial-avatar">DM</div>
                                <div>
                                    <div class="fe-testimonial-name">Diana Morales</div>
                                    <div class="fe-testimonial-role">Angel Investor</div>
                                    <div class="fe-testimonial-meta">40+ investments · San Francisco</div>
                                </div>
                            </div>
                        </div>
                        <div class="fe-testimonial-sm">
                            <p class="fe-testimonial-quote">From verification to first investor call: 11 days. The structured process removed all the guesswork from our fundraise.</p>
                            <div class="fe-testimonial-author">
                                <div class="fe-testimonial-avatar">JW</div>
                                <div>
                                    <div class="fe-testimonial-name">James Wu</div>
                                    <div class="fe-testimonial-role">Founder, GridSync</div>
                                    <div class="fe-testimonial-meta">ClimateTech · Seed · New York</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 7: PRICING
            ════════════════════════════════════════════════════════ -->
            <section class="fe-pricing" id="pricing">
                <div class="fe-container">
                    <div class="fe-pricing-header fe-reveal">
                        <div class="fe-section-label">Pricing</div>
                        <h2 class="fe-section-title">Transparent, outcome-aligned pricing</h2>
                        <p class="fe-section-subtitle">No hidden fees. Founders pay nothing until introductions deliver results. Investors access a curated, verified pipeline.</p>
                    </div>

                    <div class="fe-pricing-grid fe-reveal">
                        <!-- Founder Pricing -->
                        <div class="fe-pricing-card featured">
                            <div class="fe-pricing-popular">Most Popular</div>
                            <div class="fe-pricing-plan">For Founders</div>
                            <div class="fe-pricing-model">Free to apply. Success fee applies only upon committed capital from a platform introduction. Fee terms disclosed in writing before you accept.</div>
                            <ul class="fe-pricing-features">
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> KYC verification and profile creation</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Mandate-fit investor matching</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Encrypted data room & document vault</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Double opt-in introductions</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Real-time pipeline dashboard</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Email support during onboarding</li>
                            </ul>
                            <a href="/signup?role=founder" class="fe-btn fe-btn-primary" data-link style="width:100%">Apply as Founder</a>
                        </div>

                        <!-- Investor Pricing -->
                        <div class="fe-pricing-card">
                            <div class="fe-pricing-plan">For Investors</div>
                            <div class="fe-pricing-model">Eligibility thresholds, pricing, and verification requirements provided upon application review. Accredited and institutional investors only.</div>
                            <ul class="fe-pricing-features">
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Access to verified founder network</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Mandate-filtered deal flow</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Secure diligence vault per match</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> No public association until you opt in</li>
                                <li><svg class="fe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Full audit trail and compliance logs</li>
                            </ul>
                            <a href="/signup?role=investor" class="fe-btn fe-btn-secondary" data-link style="width:100%">Apply as Investor</a>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 8: FINAL CTA
            ════════════════════════════════════════════════════════ -->
            <section class="fe-cta" id="cta">
                <div class="fe-container">
                    <div class="fe-reveal">
                        <div class="fe-section-label">Get Started</div>
                        <h2 class="fe-section-title">Get verified once. Define your raise. Connect with the right capital.</h2>
                        <p class="fe-section-subtitle" style="text-align:center">Join a private, KYC-verified network where founders and investors connect through structured, consent-based introductions.</p>
                    </div>

                    <div class="fe-cta-buttons fe-reveal">
                        <a href="/signup?role=founder" class="fe-btn fe-btn-primary" data-link>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                            Apply as Founder
                        </a>
                        <a href="/signup?role=investor" class="fe-btn fe-btn-secondary" data-link>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            Apply as Investor
                        </a>
                    </div>

                    <div class="fe-newsletter fe-reveal">
                        <div class="fe-newsletter-title">Stay informed</div>
                        <div class="fe-newsletter-desc">Monthly private-market insights, active sector themes, and fundraising guidance.</div>
                        <form class="fe-newsletter-form" onsubmit="event.preventDefault(); this.querySelector('button').textContent='Subscribed ✓'; this.querySelector('button').style.background='#2e5e50';">
                            <input type="email" class="fe-newsletter-input" placeholder="Work email address" required aria-label="Email address">
                            <button type="submit" class="fe-newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>


            <!-- ═══════════════════════════════════════════════════════
                 SECTION 9: FOOTER
            ════════════════════════════════════════════════════════ -->
            <footer class="fe-footer">
                <div class="fe-container">
                    <div class="fe-footer-grid">
                        <div class="fe-footer-brand">
                            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 4V20H8V13H11C13.21 13 15 11.21 15 9C15 6.79 13.21 5 11 5H6Z" fill="#FFFFFF"/>
                                    <path d="M14 12L17 15L22 9" stroke="#48c78e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span style="font-weight:700;font-size:1.1rem;color:var(--text-primary)">Funding</span><span style="font-weight:400;font-size:1.1rem;color:var(--text-secondary)">Easy</span>
                            </div>
                            <p>A private, KYC-verified matchmaking platform connecting founders with mandate-fit investors.</p>
                            <p>Funding Easy Technologies Pvt Ltd · India</p>
                            <p style="margin-top:8px;">support@fundingeasy.in</p>
                        </div>
                        <div>
                            <div class="fe-footer-heading">Product</div>
                            <ul class="fe-footer-links">
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#security">Security</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="/signup?role=founder" data-link>Apply as Founder</a></li>
                                <li><a href="/signup?role=investor" data-link>Apply as Investor</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="fe-footer-heading">Company</div>
                            <ul class="fe-footer-links">
                                <li><a href="/about" data-link>About</a></li>
                                <li><a href="/contact" data-link>Contact</a></li>
                                <li><a href="/faq" data-link>FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="fe-footer-heading">Legal</div>
                            <ul class="fe-footer-links">
                                <li><a href="/privacy" data-link>Privacy Policy</a></li>
                                <li><a href="/terms" data-link>Terms of Service</a></li>
                                <li><a href="/security" data-link>Security Overview</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="fe-footer-heading">Connect</div>
                            <ul class="fe-footer-links">
                                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
                                <li><a href="mailto:support@fundingeasy.in">Email Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="fe-footer-bottom">
                        <div class="fe-footer-copy">&copy; 2026 Funding Easy Technologies Pvt Ltd All rights reserved.</div>
                        <div class="fe-footer-badges">
                            <div class="fe-footer-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                SOC 2 Type II
                            </div>
                            <div class="fe-footer-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                AES-256 Encrypted
                            </div>
                            <div class="fe-footer-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                KYC/AML Verified
                            </div>
                            <div class="fe-footer-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                SEBI Registered
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            </div><!-- /.fe-home -->
        `;
    }

    init() {
        // Scroll-reveal observer
        const reveals = document.querySelectorAll('.fe-reveal');
        if (reveals.length && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('fe-visible');
                        }, i * 80);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

            reveals.forEach(el => observer.observe(el));
        } else {
            reveals.forEach(el => el.classList.add('fe-visible'));
        }

        // Smooth anchor scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const id = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}
