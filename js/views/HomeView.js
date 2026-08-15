import AbstractView from './AbstractView.js';
import Navbar from '../components/Navbar.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Funding Easy | Verified Startup Matchmaking");
        // Activate homepage styling
        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.add('homepage-active');
        }
    }

    async getHtml() {
        return `
            <style>
                /* --- PREMIUM DARK MODE SYSTEM --- */
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

                 .pricing-toggle-container {
                     display: inline-flex;
                     background: rgba(255, 255, 255, 0.02);
                     padding: 6px;
                     border-radius: var(--radius-full);
                     border: 1px solid rgba(255, 255, 255, 0.06);
                     box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
                     align-items: center;
                 }
                 .pricing-toggle-btn {
                     padding: 10px 28px;
                     background: transparent;
                     border: none;
                     border-radius: var(--radius-full);
                     color: #8E959E;
                     font-size: 0.95rem;
                     font-weight: 600;
                     cursor: pointer;
                     transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                     outline: none;
                 }
                 .pricing-toggle-btn:hover {
                     color: #FAF8F5;
                 }
                 .pricing-toggle-btn.active {
                     background: #3A7563;
                     color: #FAF8F5;
                     box-shadow: 0 4px 12px rgba(58, 117, 99, 0.4);
                 }
                 .editorial-layout summary:hover {
                    color: #3A7563;
                }
                .editorial-layout summary::-webkit-details-marker {
                    display: none;
                }
                .faq-item {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    transition: background-color 0.2s ease;
                    border-radius: 6px;
                    padding: 0 16px;
                }
                .faq-item:hover {
                    background-color: rgba(255, 255, 255, 0.02);
                }
                .faq-trigger {
                    transition: padding-left 0.2s ease, color 0.2s ease !important;
                }
                .faq-item:hover .faq-trigger {
                    padding-left: 8px;
                    color: #3A7563 !important;
                }
                .faq-item:hover .faq-icon {
                    stroke: #FAF8F5 !important;
                }
                .pricing-view {
                    display: none;
                }
                .pricing-view.active {
                    display: grid;
                    animation: fadeIn 0.4s ease forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                *:focus-visible {
                    outline: 2px solid #3A7563 !important;
                    outline-offset: 2px !important;
                }

                body.homepage-active {
                    background-color: #0A0D10 !important;
                    color: #FAF8F5 !important;
                }

                /* Deep glassmorphism treatment for premium navbar with active state glow styling */
                .homepage-active .navbar {
                    background-color: transparent !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    border-bottom: 1px solid transparent !important;
                    transition: background-color 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease, border-bottom 0.3s ease !important;
                    padding: 24px 0 !important;
                }
                .homepage-active .navbar.navbar-scrolled {
                    background-color: rgba(10, 13, 16, 0.85) !important;
                    backdrop-filter: blur(16px) !important;
                    -webkit-backdrop-filter: blur(16px) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                    padding: 12px 0 !important;
                }

                .homepage-active .navbar .logo {
                    color: #FAF8F5 !important;
                }

                .homepage-active .navbar .logo-icon {
                    color: #3A7563 !important;
                }

                .homepage-active .navbar .nav-link {
                    color: #8E959E !important;
                    position: relative;
                    padding: 6px 0;
                    transition: color 0.25s ease;
                }

                .homepage-active .navbar .nav-link:hover {
                    color: #FAF8F5 !important;
                }

                .homepage-active .navbar .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #3A7563;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                .homepage-active .navbar .nav-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                /* Active Link state glow style */
                .homepage-active .navbar .nav-link.active {
                    color: #FAF8F5 !important;
                    text-shadow: 0 0 8px rgba(58, 117, 99, 0.8);
                }

                .homepage-active .navbar .nav-link.active::after {
                    transform: scaleX(1) !important;
                    background-color: #3A7563 !important;
                    box-shadow: 0 0 10px rgba(58, 117, 99, 0.9) !important;
                }

                .homepage-active .navbar .btn-secondary {
                    background: transparent !important;
                    color: var(--text) !important;
                    border: 1px solid var(--border) !important;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
                }

                .homepage-active .navbar .btn-secondary:hover {
                    background: rgba(246, 241, 232, 0.06) !important;
                    border-color: var(--border) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
                }

                .homepage-active .navbar .btn-primary {
                    background: var(--accent) !important;
                    color: #111827 !important;
                    border: 1px solid transparent !important;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
                }

                .homepage-active .navbar .btn-primary:hover {
                    background: var(--accent-hover) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(200, 164, 93, 0.3) !important;
                }

                /* Editorial styling */
                .editorial-layout {
                    background-color: #0A0D10;
                    color: #FAF8F5;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    line-height: 1.6;
                }

                /* Mesh Grid Design Background */
                .homepage-active .mesh-grid {
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(58, 117, 99, 0.07) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(184, 154, 94, 0.04) 0px, transparent 50%),
                        linear-gradient(rgba(255, 255, 255, 0.003) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.003) 1px, transparent 1px);
                    background-size: 100% 100%, 100% 100%, 64px 64px, 64px 64px;
                }

                /* Subtle Shifting Ambient Radial Gradients */
                .homepage-active .hero-gradient-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 20% 30%, rgba(58, 117, 99, 0.16) 0%, transparent 60%),
                                radial-gradient(circle at 80% 70%, rgba(184, 154, 94, 0.1) 0%, transparent 60%);
                    filter: blur(40px);
                    z-index: 0;
                    animation: gradientShift 16s ease-in-out infinite alternate;
                }

                @keyframes gradientShift {
                    0% {
                        transform: scale(1) translate(0px, 0px);
                    }
                    50% {
                        transform: scale(1.1) translate(15px, -15px);
                    }
                    100% {
                        transform: scale(1) translate(0px, 0px);
                    }
                }

                .editorial-layout h1, 
                .editorial-layout h2, 
                .editorial-layout h3 {
                    font-family: 'Lora', Georgia, serif;
                    font-weight: 400;
                    color: #FAF8F5;
                    letter-spacing: -0.02em;
                    margin-bottom: 24px;
                }

                .editorial-layout h1 {
                    font-size: 3.5rem;
                    line-height: 1.15;
                }

                .editorial-layout h2 {
                    font-size: 2.25rem;
                    line-height: 1.25;
                }

                .editorial-layout h3 {
                    font-size: 1.35rem;
                    line-height: 1.3;
                }

                .editorial-layout p {
                    color: #8E959E;
                    font-size: 1.05rem;
                    line-height: 1.65;
                }

                /* Layout overrides */
                .editorial-layout .container {
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Light buttons */
                .editorial-layout .btn {
                    font-family: 'Inter', sans-serif;
                    padding: 14px 28px;
                    border-radius: var(--radius-sm);
                    font-size: 0.95rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .editorial-layout .btn-primary {
                    background: var(--accent) !important;
                    color: #111827 !important;
                    border: 1px solid transparent !important;
                }

                .editorial-layout .btn-primary:hover {
                    background: var(--accent-hover) !important;
                }

                .editorial-layout .btn-secondary {
                    background: transparent !important;
                    color: var(--text) !important;
                    border: 1px solid var(--border) !important;
                }

                .editorial-layout .btn-secondary:hover {
                    background: rgba(246, 241, 232, 0.06) !important;
                }

                .editorial-layout .bordered-block {
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    background-color: #12171E;
                    border-radius: var(--radius-sm);
                    padding: 48px;
                    transition: box-shadow 0.3s ease, border-color 0.3s ease;
                    position: relative;
                }

                .editorial-layout .bordered-block:hover {
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                    border-color: rgba(58, 117, 99, 0.3);
                }

                /* Dynamic specular light reflection sheen */
                .editorial-layout .card-light-reflection {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(58, 117, 99, 0.12) 0%, rgba(255, 255, 255, 0) 70%);
                    pointer-events: none;
                    border-radius: inherit;
                    z-index: 10;
                }

                /* Polished Mock Panel */
                .mock-panel {
                    background: #12171E;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: var(--radius-sm);
                    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
                    padding: 40px;
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                .mock-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                }

                .mock-row:last-child {
                    border-bottom: none;
                }

                /* Step Columns */
                .step-column {
                    flex: 1;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    padding-right: 48px;
                    padding-left: 0;
                }

                .step-column:nth-child(2) {
                    padding-left: 48px;
                    padding-right: 48px;
                }

                .step-column:last-child {
                    border-right: none;
                    padding-right: 0;
                    padding-left: 48px;
                }

                .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr; /* Strict 50/50 split */
                    gap: 2rem;
                    align-items: center; /* Vertically center everything */
                    min-height: 80vh; /* Keep it mostly above the fold */
                    padding: 4rem 0; /* Updated from 4rem 2rem since container already has padding */
                    position: relative;
                    z-index: 2;
                }
                
                .hero-grid .mock-panel img {
                    width: 100%;
                    height: auto;
                    max-height: 65vh; /* Prevent it from pushing below the screen */
                    object-fit: contain;
                    object-position: top;
                }

                .timeline-line {
                    position: absolute;
                    top: 60px;
                    left: 10%;
                    right: 10%;
                    height: 1px;
                    border-top: 1px dashed rgba(58, 117, 99, 0.3);
                    z-index: 1;
                }

                /* 3D perspective and sheen transitions */
                .verify-card-3d, .stepper-card-3d, .bordered-block, .mock-panel {
                    transform-style: preserve-3d;
                    will-change: transform;
                    transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s ease, border-color 0.3s ease;
                }
                
                .verify-card-3d:hover, .stepper-card-3d:hover, .bordered-block:hover, .mock-panel:hover {
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;
                    border-color: rgba(58, 117, 99, 0.35) !important;
                }

                @keyframes float3D {
                    0% {
                        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0);
                    }
                    25% {
                        transform: perspective(1000px) rotateX(1.5deg) rotateY(-1.5deg) translateY(-6px);
                    }
                    50% {
                        transform: perspective(1000px) rotateX(-1deg) rotateY(1deg) translateY(-2px);
                    }
                    75% {
                        transform: perspective(1000px) rotateX(1deg) rotateY(1.5deg) translateY(-7px);
                    }
                    100% {
                        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0);
                    }
                }
                
                .mock-panel-float {
                    animation: float3D 8s ease-in-out infinite;
                }
                
                /* Highlight the recommended plans using an elegant forest green gradient and shadow */
                .pricing-recommended {
                    position: relative;
                    border: 1.5px solid rgba(58, 117, 99, 0.4) !important;
                    background: linear-gradient(135deg, rgba(18, 28, 25, 0.95) 0%, rgba(10, 13, 16, 0.95) 100%) !important;
                    box-shadow: 0 20px 45px rgba(58, 117, 99, 0.25), 0 0 20px rgba(58, 117, 99, 0.1) !important;
                    transition: all 0.3s ease-in-out !important;
                }

                .pricing-recommended:hover {
                    transform: translateY(-5px);
                    border-color: rgba(58, 117, 99, 0.7) !important;
                    box-shadow: 0 30px 60px rgba(58, 117, 99, 0.35), 0 0 30px rgba(58, 117, 99, 0.2) !important;
                }

                .pricing-recommended::after {
                    content: '';
                    position: absolute;
                    top: -1.5px;
                    left: -1.5px;
                    right: -1.5px;
                    height: 5px;
                    background: linear-gradient(90deg, #3A7563 0%, #B89A5E 100%);
                    border-top-left-radius: 7px;
                    border-top-right-radius: 7px;
                    z-index: 5;
                }
                
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr 1fr 1fr;
                    gap: 48px;
                }

                /* Dark Forest Green CTA overrides */
                .cta-dark-section {
                    background: linear-gradient(135deg, #112820 0%, #06110D 100%) !important;
                    color: #FAF8F5 !important;
                    position: relative;
                    overflow: hidden;
                }
                .cta-dark-section h2 {
                    color: #FAF8F5 !important;
                }
                .cta-dark-section p {
                    color: rgba(250, 248, 245, 0.85) !important;
                }
                .cta-dark-section .btn-light {
                    background-color: #FAF8F5 !important;
                    color: #06110D !important;
                    border: 1px solid transparent !important;
                    font-weight: 600 !important;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
                }
                .cta-dark-section .btn-light:hover {
                    background-color: #FFFFFF !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 24px rgba(58, 117, 99, 0.25) !important;
                }
                .cta-dark-section .btn-light:active {
                    transform: translateY(0) scale(0.98) !important;
                }
                
                /* Elevated testimonial cards on background */
                .testimonial-card-elevated {
                    background-color: rgba(18, 23, 30, 0.4) !important;
                    border: 1px solid rgba(255, 255, 255, 0.03) !important;
                    backdrop-filter: blur(12px);
                    border-radius: var(--radius-sm);
                    padding: 32px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }

                .testimonial-card-elevated:hover {
                    border-color: rgba(58, 117, 99, 0.25) !important;
                    background-color: rgba(18, 23, 30, 0.75) !important;
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4) !important;
                }

                /* Features section item styling */
                .homepage-active .feature-item {
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                    padding: 24px;
                    background: rgba(18, 23, 30, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    overflow: hidden;
                    text-align: left;
                }
                .homepage-active .feature-item:hover {
                    background: rgba(18, 23, 30, 0.75);
                    border-color: rgba(58, 117, 99, 0.3);
                    transform: translateX(6px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
                }
                .homepage-active .feature-item-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at 0% 50%, rgba(58, 117, 99, 0.1) 0%, transparent 50%);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .homepage-active .feature-item:hover .feature-item-glow {
                    opacity: 1;
                }

                /* Stereoscopic parallax lift for annotations */
                .mockup-annotation {
                    font-family: 'Inter', sans-serif;
                    letter-spacing: 0.04em;
                    transform: translateZ(32px) scale(0.95);
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
                }
                .mock-panel:hover .mockup-annotation {
                    transform: translateZ(48px) scale(1.02);
                    box-shadow: 0 8px 24px rgba(58, 117, 99, 0.3);
                }

                /* Scroll reveal styling */
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(28px);
                    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: opacity, transform;
                }
                .reveal-on-scroll.revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .reveal-stagger > * {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: opacity, transform;
                }
                .reveal-stagger.revealed > * {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }

                /* Trust Strip Styling for real VC funds */
                .trust-logos-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 32px;
                }
                .trust-logo-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #5A626A;
                    transition: color 0.3s ease, transform 0.3s ease;
                }
                .trust-logo-item:hover {
                    color: #FAF8F5;
                    transform: translateY(-2px);
                }
                .trust-logo-item svg {
                    stroke: currentColor;
                    fill: none;
                    transition: stroke 0.3s ease, fill 0.3s ease;
                }

                /* Accordion Details/Summary styling */
                .editorial-layout details {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 20px 0;
                }
                .editorial-layout summary {
                    font-family: 'Lora', serif;
                    font-size: 1.15rem;
                    color: #FAF8F5;
                    cursor: pointer;
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    user-select: none;
                    transition: color 0.25s ease;
                }

                .editorial-layout details p {
                    margin-top: 12px;
                    font-size: 0.95rem;
                    color: #8E959E;
                    line-height: 1.6;
                    padding-right: 24px;
                }

                @media (max-width: 900px) {
                    .editorial-layout .container .grid {
                        grid-template-columns: 1fr !important;
                        gap: 48px !important;
                    }
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 48px !important;
                    }
                    .hero-content {
                        text-align: center !important;
                    }
                    .hero-content p {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .flex.gap-4.mb-12 {
                        justify-content: center;
                    }
                    .hero-strip {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                        justify-items: center;
                    }
                    .step-column {
                        border-right: none;
                        padding: 0 0 32px 0 !important;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    .step-column:nth-child(2) {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }
                    .step-column:last-child {
                        border-bottom: none;
                        padding-bottom: 0 !important;
                        padding-left: 0 !important;
                    }
                    .how-it-works-flex {
                        flex-direction: column !important;
                        gap: 32px !important;
                    }
                    .timeline-line {
                        display: none !important;
                    }
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                    .product-features-container {
                        grid-template-columns: 1fr !important;
                        gap: 48px !important;
                    }
                    .trust-logos-container {
                        justify-content: center;
                        gap: 32px;
                    }
                    /* Base state: Hidden, pushed down, and scaled down slightly */
                    .ui-card {
                        opacity: 0;
                        transform: translateY(40px) scale(0.98);
                        transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                                    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                        will-change: transform, opacity;
                    }
                    
                    /* Active state: Triggered via JS Intersection Observer */
                    .ui-card.visible {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    
                    /* The Staggering Effect */
                    .ui-card:nth-child(1) { transition-delay: 0.1s; }
                    .ui-card:nth-child(2) { transition-delay: 0.25s; }
                    .ui-card:nth-child(3) { transition-delay: 0.4s; }
                    
                    .trust-logo { opacity: 0.6; filter: grayscale(100%); transition: all 0.3s ease; height: 28px; cursor: default; }
                    .trust-logo:hover { opacity: 1; filter: grayscale(0%); }
                }

                /* --- NAVY, IVORY & GOLD PALETTE OVERRIDES --- */
                body.homepage-active {
                    --bg: #0E1525;
                    --surface: #131C31;
                    --surface-2: #1A2540;
                    --surface-3: #0B1120;

                    --text: #F6F1E8;
                    --text-secondary: #C8C1B6;
                    --text-muted: #9A948B;

                    --accent: #C8A45D;
                    --accent-hover: #B68F43;
                    --accent-soft: #E8D7B2;

                    --border: rgba(246, 241, 232, 0.12);
                    --divider: rgba(246, 241, 232, 0.08);
                    --success: #6E8F7A;
                    --footer: #09101C;

                    --light-bg: #F6F1E8;
                    --light-surface: #EFE7DA;
                    --light-text: #172033;
                    --light-text-secondary: #4B5565;

                    background-color: var(--bg) !important;
                    color: var(--text) !important;
                }

                /* 70/20/10 Layout & Structure Overrides */
                .homepage-active .editorial-layout {
                    background-color: var(--bg) !important;
                    color: var(--text) !important;
                }

                .homepage-active .editorial-layout h1,
                .homepage-active .editorial-layout h2,
                .homepage-active .editorial-layout h3 {
                    color: var(--text) !important;
                }

                .homepage-active .editorial-layout p {
                    color: var(--text-muted) !important;
                }

                /* Hero section overrides */
                body.homepage-active #hero-section {
                    background-color: var(--bg) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                .homepage-active .hero-gradient-bg {
                    background: radial-gradient(circle at 20% 30%, rgba(200, 164, 93, 0.06) 0%, transparent 60%),
                                radial-gradient(circle at 80% 70%, rgba(232, 215, 178, 0.03) 0%, transparent 60%) !important;
                }

                .homepage-active .mesh-grid {
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(200, 164, 93, 0.03) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(232, 215, 178, 0.02) 0px, transparent 50%),
                        linear-gradient(rgba(246, 241, 232, 0.01) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(246, 241, 232, 0.01) 1px, transparent 1px) !important;
                }

                /* Hero trust strip under CTAs */
                body.homepage-active #trust-banner-trigger {
                    background-color: var(--surface-3) !important;
                    border-top: 1px solid var(--border) !important;
                    border-bottom: 1px solid var(--border) !important;
                    padding-left: 24px !important;
                    padding-right: 24px !important;
                    border-radius: var(--radius-md) !important;
                }

                body.homepage-active #trust-banner-trigger span {
                    color: var(--text-muted) !important;
                }

                body.homepage-active #trust-banner-trigger a {
                    color: var(--primary) !important;
                }

                /* Hero mockup panel */
                body.homepage-active .hero-grid .mock-panel {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-md) !important;
                }

                body.homepage-active .hero-grid .mock-panel > div:first-of-type {
                    background-color: var(--surface-2) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                /* Button Component Rules */
                .homepage-active .btn-primary {
                    background: var(--accent) !important;
                    color: #111827 !important;
                    border: 1px solid transparent !important;
                }

                .homepage-active .btn-primary:hover {
                    background: var(--accent-hover) !important;
                    box-shadow: 0 4px 12px rgba(200, 164, 93, 0.2) !important;
                }

                .homepage-active .btn-secondary {
                    background: transparent !important;
                    color: var(--text) !important;
                    border: 1px solid var(--border) !important;
                }

                .homepage-active .btn-secondary:hover {
                    background: rgba(246, 241, 232, 0.06) !important;
                    border-color: var(--border) !important;
                }
                .homepage-active .btn-text {
                    background: transparent !important;
                    color: var(--text) !important;
                    border: none !important;
                    padding: 0.875rem 0 !important;
                    font-size: 0.95rem !important;
                    font-weight: 500 !important;
                    cursor: pointer !important;
                    transition: color 0.2s ease !important;
                }
                .homepage-active .btn-text:hover {
                    color: var(--accent-soft) !important;
                }

                /* Persona cards overrides */
                body.homepage-active #personas-section {
                    background-color: var(--bg) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                body.homepage-active #founders,
                body.homepage-active #investors {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-sm) !important;
                }

                body.homepage-active #founders h2,
                body.homepage-active #investors h2 {
                    color: var(--text) !important;
                }

                body.homepage-active #founders li,
                body.homepage-active #investors li {
                    color: var(--text-muted) !important;
                }

                body.homepage-active #founders li svg,
                body.homepage-active #investors li svg {
                    stroke: var(--primary) !important;
                }

                /* How it works funnel overrides */
                body.homepage-active #how-it-works {
                    background-color: var(--surface-2) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                body.homepage-active #how-it-works .bordered-block {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-sm) !important;
                }

                body.homepage-active #how-it-works .bordered-block:hover {
                    border-color: var(--primary) !important;
                    box-shadow: var(--shadow-md) !important;
                }

                body.homepage-active #how-it-works .bordered-block div[style*="border-radius: 50%"] {
                    background-color: var(--primary-soft) !important;
                    color: var(--primary-strong) !important;
                }

                .homepage-active .timeline-line {
                    border-top-color: var(--primary) !important;
                    opacity: 0.3 !important;
                }

                /* Outcomes / Platform intro overrides */
                body.homepage-active #outcomes-intro-section {
                    background-color: var(--bg) !important;
                }

                body.homepage-active #outcomes-intro-section div[style*="background: rgba(18, 23, 30, 0.4)"] {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-sm) !important;
                }

                body.homepage-active #outcomes-intro-section div[style*="font-size: 2.5rem"] {
                    color: var(--primary-strong) !important;
                }

                body.homepage-active #outcomes-intro-section svg {
                    stroke: var(--primary) !important;
                }

                /* Outcomes / Platform grid overrides */
                body.homepage-active #outcomes-grid-section {
                    background-color: var(--surface-2) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                body.homepage-active #outcomes-grid-section .mock-panel {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-sm) !important;
                }

                body.homepage-active #outcomes-grid-section .mock-panel > div:first-of-type {
                    background-color: var(--surface-2) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                body.homepage-active #outcomes-grid-section svg {
                    stroke: var(--primary) !important;
                }

                /* Testimonials intro / stats section overrides */
                body.homepage-active #testimonials-intro-section {
                    background-color: var(--bg) !important;
                }

                body.homepage-active #testimonials-intro-section div[style*="border-top: 1px solid rgba(255,255,255,0.05)"] {
                    border-top-color: var(--border) !important;
                }

                body.homepage-active #testimonials-intro-section div[style*="font-size: 3rem"] {
                    color: var(--primary-strong) !important;
                }

                /* Testimonials grid section overrides */
                body.homepage-active #testimonials-grid-section {
                    background-color: var(--surface-2) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                .homepage-active .testimonial-card-elevated {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-sm) !important;
                }

                .homepage-active .testimonial-card-elevated:hover {
                    background-color: var(--surface) !important;
                    border-color: var(--accent) !important;
                    box-shadow: var(--shadow-md) !important;
                }

                body.homepage-active #testimonials-grid-section span[title="Verified Profile"] {
                    background-color: var(--accent) !important;
                    border-color: var(--surface) !important;
                }

                body.homepage-active #testimonials-grid-section span[title="Verified Profile"] svg {
                    stroke: #FFFFFF !important;
                }

                /* Pricing section overrides */
                body.homepage-active #pricing {
                    background-color: var(--light-bg) !important;
                    color: var(--light-text) !important;
                    border-bottom: 1px solid rgba(23, 32, 51, 0.1) !important;
                }

                body.homepage-active #pricing h2,
                body.homepage-active #pricing h3 {
                    color: var(--light-text) !important;
                }

                body.homepage-active #pricing p {
                    color: var(--light-text-secondary) !important;
                }

                .homepage-active .pricing-toggle-container {
                    background-color: var(--light-surface) !important;
                    border: 1px solid rgba(23, 32, 51, 0.1) !important;
                    border-radius: var(--radius-full) !important;
                    padding: 4px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 4px !important;
                }

                .homepage-active .pricing-toggle-btn {
                    border: none !important;
                    background: transparent !important;
                    color: var(--light-text-secondary) !important;
                    padding: 8px 24px !important;
                    font-size: 0.9rem !important;
                    font-weight: 600 !important;
                    border-radius: var(--radius-full) !important;
                    cursor: pointer !important;
                    transition: all 0.25s ease !important;
                }

                .homepage-active .pricing-toggle-btn:hover {
                    color: var(--light-text) !important;
                }

                .homepage-active .pricing-toggle-btn.active {
                    background-color: var(--light-text) !important;
                    color: #FFFFFF !important;
                    box-shadow: none !important;
                }

                body.homepage-active #pricing .btn-primary {
                    background: var(--accent) !important;
                    color: #111827 !important;
                    border: 1px solid transparent !important;
                    font-weight: 600 !important;
                }

                body.homepage-active #pricing .btn-primary:hover {
                    background: var(--accent-hover) !important;
                    box-shadow: 0 4px 12px rgba(200, 164, 93, 0.15) !important;
                }

                body.homepage-active #pricing .btn-secondary {
                    background: transparent !important;
                    color: var(--light-text) !important;
                    border: 1px solid rgba(23, 32, 51, 0.2) !important;
                    font-weight: 600 !important;
                }

                body.homepage-active #pricing .btn-secondary:hover {
                    background: rgba(23, 32, 51, 0.04) !important;
                    border-color: var(--light-text) !important;
                }

                body.homepage-active #pricing span[style*="background: rgba(184, 154, 94, 0.15)"],
                body.homepage-active #pricing span[style*="background: rgba(58, 117, 99, 0.1)"] {
                    background-color: var(--accent-soft) !important;
                    color: var(--accent-hover) !important;
                }

                body.homepage-active #pricing .bordered-block {
                    background-color: #FFFFFF !important;
                    border: 1px solid rgba(23, 32, 51, 0.1) !important;
                    box-shadow: 0 4px 20px rgba(23, 32, 51, 0.04) !important;
                }

                .homepage-active .pricing-view {
                    display: none !important;
                }

                .homepage-active .pricing-view.active {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                    gap: 32px !important;
                    max-width: 900px !important;
                    margin: 0 auto !important;
                }

                .homepage-active .pricing-recommended {
                    background: #FFFFFF !important;
                    border: 2px solid var(--accent) !important;
                    box-shadow: 0 10px 30px rgba(23, 32, 51, 0.08) !important;
                }

                .homepage-active .pricing-recommended::after {
                    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-hover) 100%) !important;
                }

                body.homepage-active #pricing div[style*="font-size: 2.25rem"] {
                    color: var(--light-text) !important;
                }

                body.homepage-active #pricing ul li {
                    color: var(--light-text-secondary) !important;
                }

                body.homepage-active #pricing ul li svg {
                    stroke: var(--light-text-secondary) !important;
                }

                /* Pricing FAQ overrides */
                .homepage-active .faq-item {
                    border-bottom: 1px solid rgba(23, 32, 51, 0.08) !important;
                }

                .homepage-active .faq-item:hover {
                    background-color: rgba(23, 32, 51, 0.03) !important;
                }

                .homepage-active .faq-item:hover .faq-trigger {
                    color: var(--accent) !important;
                }

                .homepage-active .faq-item:hover .faq-icon {
                    stroke: var(--accent) !important;
                }

                .homepage-active details p {
                    color: var(--light-text-secondary) !important;
                }

                .homepage-active summary {
                    color: var(--light-text) !important;
                }

                .homepage-active #faqSearchInput {
                    background-color: var(--light-surface) !important;
                    border: 1px solid rgba(23, 32, 51, 0.15) !important;
                    color: var(--light-text) !important;
                }

                .homepage-active #faqSearchInput:focus {
                    border-color: var(--accent) !important;
                }

                .homepage-active #faqSearchInput::placeholder {
                    color: var(--light-text-secondary) !important;
                    opacity: 0.6 !important;
                }

                .homepage-active .faq-icon {
                    stroke: var(--light-text-secondary) !important;
                }

                /* Enrollment CTA Section overrides */
                .homepage-active .cta-dark-section {
                    background: var(--surface-2) !important;
                    color: var(--text) !important;
                    border-bottom: none !important;
                }

                .homepage-active .cta-dark-section h2 {
                    color: var(--text) !important;
                }

                .homepage-active .cta-dark-section p {
                    color: var(--text-secondary) !important;
                }

                /* Security section overrides */
                body.homepage-active #security {
                    background-color: var(--surface-3) !important;
                    border-bottom: 1px solid var(--border) !important;
                }

                body.homepage-active #security div[style*="background: rgba(18, 23, 30, 0.4)"] {
                    background-color: var(--surface) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: var(--shadow-sm) !important;
                }

                body.homepage-active #security div[style*="background: rgba(18, 23, 30, 0.4)"] svg {
                    stroke: var(--accent) !important;
                }

                body.homepage-active #security div[style*="background: rgba(18, 23, 30, 0.4)"] h3 {
                    color: var(--text) !important;
                }

                body.homepage-active #security div[style*="background: rgba(18, 23, 30, 0.4)"] p {
                    color: var(--text-secondary) !important;
                }

                /* Footer overrides */
                .homepage-active footer {
                    background-color: var(--footer) !important;
                    border-top: 1px solid var(--border) !important;
                    color: var(--text-secondary) !important;
                }

                .homepage-active .footer-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
                    gap: 40px !important;
                }

                .homepage-active footer h4 {
                    color: var(--text) !important;
                }

                .homepage-active footer p, .homepage-active footer span {
                    color: var(--text-muted) !important;
                }

                .homepage-active footer a {
                    color: var(--text-muted) !important;
                }

                .homepage-active footer a:hover {
                    color: var(--accent) !important;
                }

                .homepage-active footer span[style*="background: rgba(58, 117, 99, 0.1)"] {
                    background-color: var(--accent-soft) !important;
                    border-color: var(--accent) !important;
                    color: #111827 !important;
                }

                .homepage-active footer span[style*="background: rgba(184, 154, 94, 0.1)"] {
                    background-color: var(--accent-soft) !important;
                    border-color: var(--accent) !important;
                    color: #111827 !important;
                }

                .homepage-active footer span[style*="background: rgba(255, 255, 255, 0.03)"] {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: var(--text-muted) !important;
                }
            </style>

            <a href="#main-content" class="skip-link">Skip to main content</a>
            ${Navbar()}
            
            <div class="editorial-layout mesh-grid">
                <main id="main-content">
                    <!-- 1. Premium Dark Hero -->
                    <section id="hero-section" class="reveal-on-scroll" style="position: relative; padding: 180px 0 200px 0; background: var(--bg); border-bottom: 1px solid var(--border); overflow: hidden;">
                        <!-- Shifting ambient gradient backing -->
                        <div class="hero-gradient-bg"></div>
                        
                        <!-- Interactive Canvas Background -->
                        <canvas id="hero-network-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; opacity: 0.70;"></canvas>
                        
                        <div class="container" style="max-width: 1200px; position: relative; z-index: 2;">
                            <div class="hero-grid">
                                <div class="hero-content" style="text-align: left;">
                                    <span style="display: inline-block; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); margin-bottom: 16px; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 16px; border-radius: var(--radius-full);">Verified Investor–Founder Platform</span>
                                    <h1 style="font-size: clamp(2.5rem, 4vw, 4.5rem); max-width: 600px; font-weight: 500; line-height: 1.1; margin: 0 0 20px 0; letter-spacing: -0.02em; font-family: 'Lora', serif; color: var(--text);">
                                        Raise Capital Faster.<br>Invest Smarter.
                                    </h1>
                                    <p style="font-size: 1.25rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 40px; max-width: 540px; font-weight: 300;">
                                        <strong style="color: var(--text); font-weight: 500;">3 weeks average to term sheet.</strong> Funding Easy securely connects verified founders with qualified investors through structured workflows, private document sharing, and intelligent mandate matching.
                                    </p>
                                    
                                    <div class="flex mb-12" style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; align-items: center;">
                                        <a href="/founder/start" class="btn btn-primary" style="padding: 16px 32px; font-size: 1rem; border-radius: var(--radius-sm);" data-link>Apply as Founder</a>
                                        <a href="/investor/join" class="btn btn-secondary btn-outline" style="padding: 16px 32px; font-size: 1rem; border-radius: var(--radius-sm); border-color: var(--text-muted); color: var(--text-primary); background: transparent;" data-link>Apply as Investor</a>
                                    </div>
                                    
                                    <!-- Real Trust Strip Architecture -->
                                    <div id="trust-banner-trigger" style="margin-top: 48px; padding: 24px 0; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 16px;">
                                        <div style="font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">Powering top private market raises:</div>
                                        <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                                            <span style="display: flex; flex-direction: column; gap: 4px;">
                                                <span style="font-size: 1.25rem; font-weight: 600; color: var(--accent); line-height: 1;">120+</span>
                                                <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Verified Founders</span>
                                            </span>
                                            <span style="width: 1px; height: 24px; background-color: var(--border);"></span>
                                            <span style="display: flex; flex-direction: column; gap: 4px;">
                                                <span style="font-size: 1.25rem; font-weight: 600; color: var(--accent); line-height: 1;">85+</span>
                                                <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Qualified Investors</span>
                                            </span>
                                            <span style="width: 1px; height: 24px; background-color: var(--border);"></span>
                                            <span style="display: flex; flex-direction: column; gap: 4px;">
                                                <span style="font-size: 1.25rem; font-weight: 600; color: var(--text); line-height: 1;">3 Weeks</span>
                                                <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Avg. Match Time</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="position: relative; width: 100%; min-height: 480px; margin-top: 32px; display: flex; align-items: center; justify-content: center; padding: 20px;">
                                    <div class="ui-card mock-panel mock-panel-float" style="position: relative; width: 100%; max-width: 720px; padding: 0; background: var(--surface); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; text-align: left;">
                                        <div class="card-light-reflection" style="position: absolute; top: 0; left: 0; right: 0; height: 40%; background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%); pointer-events: none;"></div>
                                        <div style="display: flex; align-items: center; gap: 6px; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px);">
                                            <span style="width: 12px; height: 12px; border-radius: 50%; background-color: #EF4444; display: inline-block;"></span>
                                            <span style="width: 12px; height: 12px; border-radius: 50%; background-color: #F59E0B; display: inline-block;"></span>
                                            <span style="width: 12px; height: 12px; border-radius: 50%; background-color: #10B981; display: inline-block;"></span>
                                        </div>
                                        <img src="/hero_dashboard_mockup_1784969299837.jpg" alt="Funding Easy Platform Preview" style="width: 100%; height: auto; display: block; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;" />
                                    </div>
                                    
                                    <!-- Floating verification notification -->
                                    <div style="position: absolute; bottom: 40px; right: 5%; background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 12px; animation: slideUpFade 1s ease 0.5s both; z-index: 10;">
                                        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); display: flex; align-items: center; justify-content: center; color: #10B981;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text);">New Match Accepted</div>
                                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Apex Syndicate requested access</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            
                    <!-- Real Social Proof Logo Strip -->
                    <section style="background: var(--surface); padding: 40px 0; border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px; text-align: center;">
                            <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 24px; font-weight: 600;">Trusted by founders backed by leading networks</p>
                            <div style="display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; opacity: 0.6; filter: grayscale(100%) brightness(1.5);">
                                <!-- Minimal SVG placeholder logos -->
                                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1.25rem; font-family: 'Lora', serif; color: var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> Apex Syndicate</div>
                                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1.25rem; font-family: var(--font-sans); color: var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M16 12l-4-4-4 4M12 8v8"></path></svg> FinFlow</div>
                                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1.25rem; font-family: 'Lora', serif; color: var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> Oakwood Equity</div>
                                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1.25rem; font-family: var(--font-sans); color: var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> SynthOS Network</div>
                            </div>
                        </div>
                    </section>

            
                    <!-- 5. Product Visuals -->
                    <section id="outcomes-grid-section" class="reveal-on-scroll" style="padding: 140px 0; background: var(--surface-2); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px;">
                                                        <div style="text-align: center; margin-bottom: 72px;">
                                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">The Funnel</span>
                                <h2 style="font-size: 2.25rem; margin-top: 16px; font-weight: 400; color: var(--text);">A controlled, invite-only pipeline</h2>
                            </div>
                            
                            <!-- Timeline container -->
                            <div class="how-it-works-flex reveal-stagger" style="display: flex; gap: 48px; justify-content: space-between; align-items: stretch; position: relative;">
                                <!-- Connecting line for desktop -->
                                <div class="timeline-line"></div>
                                
                                <!-- Step 1 -->
                                <div class="step-column" style="position: relative; z-index: 2; flex: 1; padding: 0; display: flex;">
                                    <div class="stepper-card-3d bordered-block" style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 32px 24px; text-align: center; height: 100%; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); backdrop-filter: blur(8px); flex: 1; display: flex; flex-direction: column;">
                                        <div class="card-light-reflection"></div>
                                        <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--surface-2); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; font-family: 'Lora', serif; font-size: 1.35rem; color: var(--accent); font-weight: 600; flex-shrink: 0;">
                                            01
                                        </div>
                                        <h3 style="font-size: 1.25rem; margin-bottom: 12px; font-weight: 500; color: var(--text);">Step 1: Verify &amp; Profile</h3>
                                        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; text-align: left;">
                                            <li style="display: flex; gap: 8px; align-items: flex-start; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 3px; flex-shrink: 0;" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 11 2 2 4-4"></path></svg>
                                                Founders submit KYC and deal details.
                                            </li>
                                            <li style="display: flex; gap: 8px; align-items: flex-start; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 3px; flex-shrink: 0;" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                                Investors set stage, sector, and check-size mandates.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Step 2 -->
                                <div class="step-column" style="position: relative; z-index: 2; flex: 1; padding: 0; display: flex;">
                                    <div class="stepper-card-3d bordered-block" style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 32px 24px; text-align: center; height: 100%; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); backdrop-filter: blur(8px); flex: 1; display: flex; flex-direction: column;">
                                        <div class="card-light-reflection"></div>
                                        <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--surface-2); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; font-family: 'Lora', serif; font-size: 1.35rem; color: var(--accent); font-weight: 600; flex-shrink: 0;">
                                            02
                                        </div>
                                        <h3 style="font-size: 1.25rem; margin-bottom: 12px; font-weight: 500; color: var(--text);">Step 2: Mandate-Based Matching</h3>
                                        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; text-align: left;">
                                            <li style="display: flex; gap: 8px; align-items: flex-start; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 3px; flex-shrink: 0;" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                                We introduce founder and investor only when criteria align.
                                            </li>
                                            <li style="display: flex; gap: 8px; align-items: flex-start; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 3px; flex-shrink: 0;" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                                No spray-and-pray, no cold outreach.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Step 3 -->
                                <div class="step-column" style="position: relative; z-index: 2; flex: 1; padding: 0; display: flex;">
                                    <div class="stepper-card-3d bordered-block" style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 32px 24px; text-align: center; height: 100%; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); backdrop-filter: blur(8px); flex: 1; display: flex; flex-direction: column;">
                                        <div class="card-light-reflection"></div>
                                        <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--surface-2); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; font-family: 'Lora', serif; font-size: 1.35rem; color: var(--accent); font-weight: 600; flex-shrink: 0;">
                                            03
                                        </div>
                                        <h3 style="font-size: 1.25rem; margin-bottom: 12px; font-weight: 500; color: var(--text);">Step 3: Permissioned Diligence</h3>
                                        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; text-align: left;">
                                            <li style="display: flex; gap: 8px; align-items: flex-start; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 3px; flex-shrink: 0;" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M12 11v4"></path><path d="M10 13h4"></path></svg>
                                                Both parties share a secure workspace for decks and data room.
                                            </li>
                                            <li style="display: flex; gap: 8px; align-items: flex-start; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 3px; flex-shrink: 0;" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                Q&amp;A and structured follow-ups organized in one place.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- 4. Outcomes / Benefits Strip -->
                    <section id="outcomes-intro-section" class="reveal-on-scroll" style="padding: 100px 0; background: var(--surface); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px; text-align: center;">
                            <h2 style="font-size: 2.25rem; margin-bottom: 64px; font-weight: 400; color: var(--text);">What funding teams and investors get back</h2>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; text-align: left; align-items: stretch;">
                                <!-- Outcome 1 (Tagged Card) -->
                                <div style="padding: 32px; background: var(--surface-2); border-radius: 12px; border: 1px solid var(--border);">
                                    <div style="margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap;">
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 4px 10px; border-radius: 12px;">Verified Matching</span>
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 500; border: 1px solid var(--border); padding: 4px 10px; border-radius: 12px;">Zero Spam</span>
                                    </div>
                                    <div style="font-size: 2.5rem; color: var(--text); font-family: 'Lora', serif; margin-bottom: 8px;">5x</div>
                                    <div style="font-size: 1.15rem; font-weight: 500; color: var(--text); margin-bottom: 8px;">Fewer Cold Emails</div>
                                    <p style="color: var(--text-secondary); line-height: 1.6;">Our double opt-in mandate matching ensures you only see deal flow that perfectly aligns with your thesis.</p>
                                </div>
                                <!-- Outcome 2 (Tagged Card) -->
                                <div style="padding: 32px; background: var(--surface-2); border-radius: 12px; border: 1px solid var(--border);">
                                    <div style="margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap;">
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 4px 10px; border-radius: 12px;">Secure Data Rooms</span>
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 500; border: 1px solid var(--border); padding: 4px 10px; border-radius: 12px;">Centralized Q&amp;A</span>
                                    </div>
                                    <div style="font-size: 2.5rem; color: var(--text); font-family: 'Lora', serif; margin-bottom: 8px;">80%</div>
                                    <div style="font-size: 1.15rem; font-weight: 500; color: var(--text); margin-bottom: 8px;">Faster Diligence</div>
                                    <p style="color: var(--text-secondary); line-height: 1.6;">Secure, integrated data rooms eliminate fragmented email threads and scattered document links.</p>
                                </div>
                                <!-- Outcome 3 (Tagged Card) -->
                                <div style="padding: 32px; background: var(--surface-2); border-radius: 12px; border: 1px solid var(--border);">
                                    <div style="margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap;">
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 4px 10px; border-radius: 12px;">KYC/AML Checked</span>
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 500; border: 1px solid var(--border); padding: 4px 10px; border-radius: 12px;">Accreditation</span>
                                    </div>
                                    <div style="font-size: 2.5rem; color: var(--text); font-family: 'Lora', serif; margin-bottom: 8px;">100%</div>
                    
                    <!-- 5. Enterprise Security Grid -->
                    <section id="security" class="reveal-on-scroll" style="padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px;">
                            <div style="text-align: center; max-width: 800px; margin: 0 auto 64px;">
                                <h2 style="font-size: 2.25rem; font-weight: 400; color: var(--text); margin-bottom: 16px;">Your deal data stays private.</h2>
                                <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6;">
                                    Every document, introduction, and diligence interaction is protected by verified identity checks, permissioned access, and full activity tracking.
                                </p>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">
                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Verified participants</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">Only approved founders and investors can enter the network.</div>
                                </div>
                                
                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Private document access</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">Choose who can view, download, or comment on each file.</div>
                                </div>

                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Access that expires</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">Revoke or automatically expire access when diligence ends.</div>
                                </div>

                                <div style="padding: 32px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border);">
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">Complete activity history</div>
                                    </div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">See who opened, downloaded, or interacted with your information.</div>
                                </div>
                            </div>
                            
                            <div style="max-width: 800px; margin: 0 auto;">
                                <details style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; cursor: pointer;">
                                    <summary style="padding: 20px 24px; font-weight: 500; color: var(--text); display: flex; align-items: center; justify-content: space-between; user-select: none; list-style: none;">
                                        <span style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                            Technical controls
                                        </span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </summary>
                                    <div style="padding: 0 24px 24px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; border-top: 1px solid var(--border-subtle); margin-top: 4px; padding-top: 20px;">
                                        AES-256 encryption at rest, TLS 1.3 in transit, AWS KMS, role-based permissions, and audit logging.
                                    </div>
                                </details>
                            </div>
                        </div>
                    </section>


<div style="text-align: center; margin-bottom: 48px; position: relative;">
                                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">Traction & Proof</span>
                                <h2 style="font-size: 2.25rem; margin-top: 16px; font-weight: 400; color: var(--text);">Our network members speak for themselves</h2>
                                

                            </div>
                            
                            <!-- Stats Strip -->
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; text-align: center; margin-bottom: 72px;">
                                <div>
                                    <div style="font-size: 3.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">120+<span style="color: var(--text-muted); font-size: 1.5rem; vertical-align: super;">*</span></div>
                                    <div style="font-size: 1rem; color: var(--text-secondary); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Verified founders</div>
                                </div>
                                <div>
                                    <div style="font-size: 3.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">85+<span style="color: var(--text-muted); font-size: 1.5rem; vertical-align: super;">&dagger;</span></div>
                                    <div style="font-size: 1rem; color: var(--text-secondary); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Active mandates</div>
                                </div>
                                <div>
                                    <div style="font-size: 3.5rem; font-family: 'Lora', serif; color: var(--accent); margin-bottom: 8px;">3-week<span style="color: var(--text-muted); font-size: 1.5rem; vertical-align: super;">&Dagger;</span></div>
                                    <div style="font-size: 1rem; color: var(--text-secondary); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Average to term sheet</div>
                                </div>
                            </div>
                            
                            <!-- Testimonials Grid -->
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">
                                
                                <!-- Testimonial 1 (Featured) -->
                                <div class="testimonial-card-elevated" style="position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 32px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px;">
                                    <div>
                                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 4px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">Verified Investor</div>
                                            <div style="display:flex; gap:2px; color:var(--accent);"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                                        </div>
                                        <blockquote style="font-family: 'Lora', serif; font-size: 1.1rem; line-height: 1.5; color: var(--text); margin-bottom: 24px;">
                                            "Funding Easy's matching protocol meant every intro reflected our exact ticket size. <strong style="color: var(--accent); font-weight:500;">Our deal-sourcing team saved over 15 hours a week</strong> in upfront sorting time."
                                        </blockquote>
                                    </div>
                                    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: auto;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                                            <div>
                                                <div style="color: var(--text); font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">Michael Chen</div>
                                                <div style="font-size: 0.8rem; color: var(--text-secondary);">Partner, Apex Syndicate</div>
                                            </div>
                                            <div style="text-align: right;">
                                                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted);">Sector: SaaS</div>
                                                <div style="font-size: 0.8rem; font-weight: 600; color: var(--accent);">$50M AUM</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Testimonial 2 (Featured) -->
                                <div class="testimonial-card-elevated" style="position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 32px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px;">
                                    <div>
                                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 4px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">Verified Founder</div>
                                            <div style="display:flex; gap:2px; color:var(--accent);"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                                        </div>
                                        <blockquote style="font-family: 'Lora', serif; font-size: 1.1rem; line-height: 1.5; color: var(--text); margin-bottom: 24px;">
                                            "Our seed round stayed confidential end-to-end. By avoiding public profile leakage, <strong style="color: var(--accent); font-weight:500;">we closed our lead investor 3 weeks faster</strong> than our previous rounds."
                                        </blockquote>
                                    </div>
                                    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: auto;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                                            <div>
                                                <div style="color: var(--text); font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">Sarah Jenkins</div>
                                                <div style="font-size: 0.8rem; color: var(--text-secondary);">Founder, FinFlow</div>
                                            </div>
                                            <div style="text-align: right;">
                                                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted);">Sector: FinTech</div>
                                                <div style="font-size: 0.8rem; font-weight: 600; color: var(--accent);">$2.5M Seed</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Short Quote 1 -->
                                <div style="display: flex; flex-direction: column; justify-content: space-between; padding: 24px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px;">
                                    <blockquote style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 20px;">
                                        "The integrated data room feature alone is worth the success fee. Absolutely seamless due diligence."
                                    </blockquote>
                                    <div>
                                        <div style="color: var(--text); font-weight: 600; font-size: 0.85rem;">David R.</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">Angel Investor</div>
                                    </div>
                                </div>

                                <!-- Short Quote 2 -->
                                <div style="display: flex; flex-direction: column; justify-content: space-between; padding: 24px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px;">
                                    <blockquote style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 20px;">
                                        "Finally, a platform that respects the founder's time. Zero spam, just highly targeted, double-opt-in intros."
                                    </blockquote>
                                    <div>
                                        <div style="color: var(--text); font-weight: 600; font-size: 0.85rem;">Elena K.</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">CEO, BioSync</div>
                                    </div>
                                </div>

                                <!-- Short Quote 3 -->
                                <div style="display: flex; flex-direction: column; justify-content: space-between; padding: 24px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px;">
                                    <blockquote style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 20px;">
                                        "Funding Easy's KYC enforcement gives us the confidence to move quickly on new deals."
                                    </blockquote>
                                    <div>
                                        <div style="color: var(--text); font-weight: 600; font-size: 0.85rem;">Marcus T.</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">Managing Partner</div>
                                    </div>
                                </div>

                            </div>
                            
                            <!-- Footnotes strip -->
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; line-height: 1.6;">
                                * Active founder profiles in network as of Q2 2026. &middot; 
                                &dagger; Verified accredited allocators with active deployment mandates. &middot; 
                                &Dagger; Median time from double opt-in intro to term sheet issuance.
                            </div>
                        </div>
                    </section>
                    

<!-- 7. Pricing & FAQ -->
                    <section id="pricing" class="reveal-on-scroll" style="padding: 140px 0; background: var(--bg); border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1000px; margin: 0 auto;">
                            <div style="text-align: center; max-width: 600px; margin: 0 auto 72px auto;">
                                <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600; background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.2); padding: 6px 12px; border-radius: var(--radius-full);">TRANSPARENT PRICING</span>
                                <h2 style="font-size: 2.5rem; font-weight: 400; margin-top: 16px; margin-bottom: 16px; color: var(--text);">Aligned with your success.</h2>
                                <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.6;">No complex tiers or hidden fees. Just simple pricing based on outcomes.</p>
                            </div>
                            
                                                        <!-- Detailed Pricing Comparison Matrix -->
                            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); overflow: hidden; margin-bottom: 80px;">
                                <!-- Header Row -->
                                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; border-bottom: 1px solid var(--border); background: var(--surface-2);">
                                    <div style="padding: 32px; display: flex; align-items: flex-end;">
                                        <h3 style="font-size: 1.5rem; color: var(--text); font-family: 'Lora', serif; margin: 0;">Compare Features</h3>
                                    </div>
                                    <div style="padding: 32px; text-align: center; border-left: 1px solid var(--border);">
                                        <div style="font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 8px;">For Investors</div>
                                        <div style="font-size: 2rem; font-weight: 300; color: var(--text); margin-bottom: 16px;">Free</div>
                                        <a href="/signup?role=investor" class="btn btn-secondary" style="width: 100%; justify-content: center; padding: 12px 0; font-size: 0.9rem;" data-link>Register as Investor</a>
                                    </div>
                                    <div style="padding: 32px; text-align: center; border-left: 1px solid var(--border); position: relative; overflow: hidden; background: rgba(200, 164, 93, 0.05);">
                                        <div style="position: absolute; top: 0; right: 0; background: var(--accent); color: var(--bg); font-weight: 700; font-size: 0.65rem; padding: 4px 12px; border-bottom-left-radius: 8px; text-transform: uppercase;">Most Popular</div>
                                        <div style="font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); margin-bottom: 8px;">For Founders</div>
                                        <div style="font-size: 2rem; font-weight: 300; color: var(--text); margin-bottom: 16px;">Success Fee</div>
                                        <a href="/login" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px 0; font-size: 0.9rem;" data-link>Apply as Founder</a>
                                    </div>
                                </div>
                                
                                <!-- Feature Rows -->
                                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; border-bottom: 1px solid var(--border); background: var(--surface);">
                                    <div style="padding: 24px 32px; color: var(--text-secondary); font-weight: 500;">Access to Verified Network</div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); background: rgba(200, 164, 93, 0.02);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                </div>
                                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; border-bottom: 1px solid var(--border); background: var(--surface-2);">
                                    <div style="padding: 24px 32px; color: var(--text-secondary); font-weight: 500;">Unlimited Mandate Matching</div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); background: rgba(200, 164, 93, 0.05); color: var(--text-muted); font-size: 0.9rem;">Targeted Opt-Ins Only</div>
                                </div>
                                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; border-bottom: 1px solid var(--border); background: var(--surface);">
                                    <div style="padding: 24px 32px; color: var(--text-secondary); font-weight: 500;">Secure Diligence Vault</div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); background: rgba(200, 164, 93, 0.02);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                </div>
                                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; border-bottom: 1px solid var(--border); background: var(--surface-2);">
                                    <div style="padding: 24px 32px; color: var(--text-secondary); font-weight: 500;">Match Room Pipeline Tracking</div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); color: var(--text-muted); font-size: 0.9rem;">Basic</div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); background: rgba(200, 164, 93, 0.05);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                </div>
                                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; background: var(--surface);">
                                    <div style="padding: 24px 32px; color: var(--text-secondary); font-weight: 500;">Dedicated Analyst Support</div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); color: var(--text-muted);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--border)" stroke-width="2" style="margin:0 auto;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
                                    <div style="padding: 24px 32px; text-align: center; border-left: 1px solid var(--border); background: rgba(200, 164, 93, 0.02);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="margin:0 auto;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 8. Final CTA & Security -->
                    <section class="cta-security-section reveal-on-scroll" style="background: var(--surface-2); padding: 120px 0; border-bottom: 1px solid var(--border);">
                        <div class="container" style="max-width: 1200px;">
                            
                                                        <!-- Enhanced Enterprise Security Strip -->
                            <div style="background: var(--surface-3); border: 1px solid var(--border); border-radius: 12px; padding: 24px 32px; margin-bottom: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    <span style="font-size: 1.15rem; font-weight: 500; color: var(--text); font-family: 'Lora', serif;">Enterprise-grade security</span>
                                </div>
                                <a href="#security" style="color: var(--accent); font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 4px;" data-link>See full details <span style="font-size: 1.2rem; line-height: 1;">&uarr;</span></a>
                            </div>

                            
                            <!-- CTA & Newsletter Split -->
                            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: center;">
                                <div style="text-align: left;">
                                    <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 24px; background: rgba(200, 164, 93, 0.1); padding: 6px 12px; border-radius: var(--radius-full); border: 1px solid rgba(200, 164, 93, 0.2);">
                                        <span style="display: inline-block; width: 6px; height: 6px; background-color: var(--accent); border-radius: 50%; box-shadow: 0 0 8px var(--accent);"></span>
                                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); font-weight: 600;">Secure Network Enrollment</span>
                                    </div>
                                    <h2 style="font-size: 3rem; margin-bottom: 16px; font-weight: 400; line-height: 1.2; color: var(--text);">Stop pitching into the void.</h2>
                                    <p style="font-size: 1.15rem; margin-bottom: 36px; line-height: 1.6; color: var(--text-secondary); opacity: 1;">
                                        Get verified once. Set your mandate. Close your next deal in a private, double opt-in workspace.
                                    </p>
                                    <div class="flex" style="gap: 16px;">
                                        <a href="/signup?role=entrepreneur" class="btn btn-primary" style="padding: 16px 36px;" data-link>Apply as Founder</a>
                                        <a href="/signup?role=investor" class="btn btn-secondary" style="padding: 16px 36px;" data-link>Apply as Investor</a>
                                    </div>
                                </div>
                                
                                <div style="background: var(--surface); padding: 48px; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                                    <h3 style="font-family: 'Lora', serif; font-size: 1.75rem; margin-bottom: 12px; color: var(--text); font-weight: 400;">Stay informed</h3>
                                    <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 28px; line-height: 1.6;">
                                        Receive our monthly briefings on venture deployment mandates, KYC regulations, and startup matchmaking velocity.
                                    </p>
                                    <form id="newsletter-form" style="display: flex; flex-direction: column; gap: 12px;">
                                        <input type="email" required placeholder="Enter your work email" aria-label="Work Email Address" style="padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); outline: none; font-size: 0.95rem; background: var(--surface-2); color: var(--text);" />
                                        <button type="submit" class="btn btn-primary" style="padding: 14px 24px; font-size: 0.95rem; cursor: pointer; width: 100%; justify-content: center;">Subscribe to Insights</button>
                                    </form>
                                    <div id="newsletter-success" style="display: none; color: var(--success); font-weight: 600; font-size: 0.95rem; margin-top: 16px; animation: fadeIn 0.4s ease forwards;">
                                        &check; Thank you! You have been subscribed.
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </main>
            

<!-- Expanded Premium Footer -->
                <footer class="reveal-on-scroll" style="padding: 100px 0 48px 0; background: var(--bg-surface-2); border-top: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 0.875rem;">
                    <div class="container" style="max-width: 1200px;">
                        <div class="footer-grid">
                            <div class="footer-identity" style="padding-right: 32px;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                    <div style="font-family: var(--font-sans); font-size: 1.35rem; color: var(--text-primary); font-weight: 700;">Funding Easy</div>
                                </div>
                                <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.5; margin-bottom: 12px; font-weight: 500;">
                                    Private capital matching for verified founders and mandate-aligned investors.
                                </p>
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 24px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    Verified founders and accredited investors only.
                                </p>
                                
                                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
                                    <span class="badge badge-verified">Verified matches</span>
                                    <span class="badge badge-premium">Mandate fit</span>
                                    <span class="badge badge-info">Permissioned workspace</span>
                                </div>

                                

                                <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 8px;">
                                    <span>San Francisco, CA 94111</span>
                                    <span>support@fundingeasy.in</span>
                                </div>
                            </div>
                            
                            <div class="footer-nav-col">
                                <h4 class="footer-heading">Platform</h4>
                                <div class="footer-column-content">
                                    <a href="/founder/start" class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.85rem; width: fit-content; text-decoration: none;">Apply as Founder</a>
                                    <a href="/investor/join" class="btn btn-secondary btn-sm" style="padding: 6px 12px; font-size: 0.85rem; width: fit-content; border-color: var(--brand-secondary); color: var(--brand-secondary); text-decoration: none;">Apply as Investor</a>
                                    <a href="/login" class="footer-link" data-link>Sign In</a>
                                    <a href="/#how-it-works" class="footer-link" data-link>How It Works</a>
                                </div>
                            </div>
                            
                            <div class="footer-nav-col">
                                <h4 class="footer-heading">Company</h4>
                                <div class="footer-column-content">
                                    <a href="/#pricing" class="footer-link" data-link>Pricing</a>
                                    <a href="/#security" class="footer-link" data-link>Security</a>
                                    <a href="/#resources" class="footer-link" data-link>Resources & Media</a>
                                </div>
                            </div>
                            
                            <div class="footer-nav-col">
                                <h4 class="footer-heading">Legal</h4>
                                <div class="footer-column-content">
                                    <a href="/privacy" class="footer-link" data-link>Privacy Policy</a>
                                    <a href="/terms" class="footer-link" data-link>Terms of Service</a>
                                    <a href="/terms#founder-agreement" class="footer-link" data-link>Founder Agreement</a>
                                    <a href="/terms#investor-agreement" class="footer-link" data-link>Investor Agreement</a>
                                </div>
                            </div>
                            
                            <div class="footer-nav-col">
                                <h4 class="footer-heading">Connect</h4>
                                <div class="footer-column-content">
                                    <a href="https://www.linkedin.com/company/funding-easy" target="_blank" rel="noopener noreferrer" class="footer-link" style="display: flex; align-items: center; gap: 8px;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                        LinkedIn
                                    </a>
                                    <a href="https://x.com/fundingeasy" target="_blank" rel="noopener noreferrer" class="footer-link" style="display: flex; align-items: center; gap: 8px;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                        Twitter
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div style="border-top: 1px solid var(--border-strong); padding-top: 32px; margin-top: 64px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; margin-bottom: 24px;">
                                <div style="display: flex; align-items: center; gap: 16px; font-size: 0.8rem; color: var(--text-primary); font-weight: 500; flex-wrap: wrap;">
                                    <span style="display: flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-trust)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> SOC 2 Type II</span>
                                    <span style="color: var(--border-strong);">|</span>
                                    <span style="display: flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-trust)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> KYC/AML via Stripe Identity</span>
                                    <span style="color: var(--border-strong);">|</span>
                                    <span style="display: flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-trust)" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg> AES-256 at rest, TLS 1.3 in transit via AWS KMS</span>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 0.75rem; color: var(--text-disabled);">
                                <div>&copy; 2026 Funding Easy Inc. (US) &middot; Funding Easy Private Limited (IN). All rights reserved.</div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        `;
    }

    init() {
        // Apply body class to active visual styling overrides
        document.body.classList.add('homepage-active');
        
        // Footer accordion
        setTimeout(() => {
            const footerCols = document.querySelectorAll('.footer-nav-col');
            footerCols.forEach(col => {
                const heading = col.querySelector('.footer-heading');
                if (heading) {
                    heading.addEventListener('click', () => {
                        if (window.innerWidth <= 768) {
                            col.classList.toggle('open');
                        }
                    });
                }
            });
        }, 100);

        // Navbar Scrolled Class Trigger
        const navbar = document.querySelector('.navbar');
        const onNavbarScroll = () => {
            if (window.scrollY > 50) {
                if (navbar) navbar.classList.add('navbar-scrolled');
            } else {
                if (navbar) navbar.classList.remove('navbar-scrolled');
            }
        };
        window.addEventListener('scroll', onNavbarScroll);
        this._navbarScrollListener = onNavbarScroll;
        onNavbarScroll();
        
        // Trust Banner Intersection Observer for UI Cards (Staggered Reveal)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = document.querySelectorAll('.ui-card');
                    cards.forEach(card => card.classList.add('visible'));
                }
            });
        }, { threshold: 0.1 });
        
        const trigger = document.getElementById('trust-banner-trigger');
        if (trigger) {
            observer.observe(trigger);
        }

        // Canvas Particle Network Animation
        try {
            const canvas = document.getElementById('hero-network-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                let animationFrameId;
                let particles = [];
                const mouse = { x: null, y: null, radius: 180 };

                const resizeCanvas = () => {
                    const rect = canvas.getBoundingClientRect();
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                    initParticles();
                };

                const initParticles = () => {
                    particles = [];
                    const numParticles = Math.floor((canvas.width * canvas.height) / 13000);
                    const count = Math.min(Math.max(numParticles, 35), 85);
                    for (let i = 0; i < count; i++) {
                        particles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            vx: (Math.random() - 0.5) * 0.4,
                            vy: (Math.random() - 0.5) * 0.4,
                            radius: Math.random() * 2.5 + 1.2
                        });
                    }
                };

                const drawParticles = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw connections
                    for (let i = 0; i < particles.length; i++) {
                        const p1 = particles[i];
                        for (let j = i + 1; j < particles.length; j++) {
                            const p2 = particles[j];
                            const dx = p1.x - p2.x;
                            const dy = p1.y - p2.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            
                            if (dist < 125) {
                                ctx.beginPath();
                                ctx.moveTo(p1.x, p1.y);
                                ctx.lineTo(p2.x, p2.y);
                                const alpha = 0.32 * (1 - dist / 125);
                                // Combine gold and navy stroke lines
                                ctx.strokeStyle = i % 2 === 0 ? `rgba(200, 164, 93, ${alpha})` : `rgba(19, 28, 49, ${alpha})`;
                                ctx.lineWidth = 1.0;
                                ctx.stroke();
                            }
                        }

                        // Mouse interaction
                        if (mouse.x !== null && mouse.y !== null) {
                            const dx = p1.x - mouse.x;
                            const dy = p1.y - mouse.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < mouse.radius) {
                                ctx.beginPath();
                                ctx.moveTo(p1.x, p1.y);
                                ctx.lineTo(mouse.x, mouse.y);
                                const alpha = 0.5 * (1 - dist / mouse.radius);
                                ctx.strokeStyle = `rgba(200, 164, 93, ${alpha})`;
                                ctx.lineWidth = 1.2;
                                ctx.stroke();
                            }
                        }
                    }

                    // Draw dots with shadow glow
                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(200, 164, 93, 0.75)';
                        ctx.shadowColor = '#C8A45D';
                        ctx.shadowBlur = 6;
                        ctx.fill();
                        ctx.shadowBlur = 0; // reset for performance

                        // Update position
                        p.x += p.vx;
                        p.y += p.vy;

                        // Bounds check
                        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    });

                    animationFrameId = requestAnimationFrame(drawParticles);
                };

                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();
                drawParticles();

                // Track mouse inside hero section
                const heroSection = canvas.closest('section');
                const onMouseMoveHero = (e) => {
                    const rect = canvas.getBoundingClientRect();
                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;
                };
                const onMouseLeaveHero = () => {
                    mouse.x = null;
                    mouse.y = null;
                };

                if (heroSection) {
                    heroSection.addEventListener('mousemove', onMouseMoveHero);
                    heroSection.addEventListener('mouseleave', onMouseLeaveHero);
                }

                this._canvasCleanup = () => {
                    cancelAnimationFrame(animationFrameId);
                    window.removeEventListener('resize', resizeCanvas);
                    if (heroSection) {
                        heroSection.removeEventListener('mousemove', onMouseMoveHero);
                        heroSection.removeEventListener('mouseleave', onMouseLeaveHero);
                    }
                };
            }
        } catch (e) {
            console.error('Canvas particle network initialization error:', e);
        }

        // Dynamic light reflection coordinates and 3D tilt transforms
        const interactiveElements = document.querySelectorAll('.verify-card-3d, .stepper-card-3d, .bordered-block, .mock-panel, .feature-item');
        this._sheenListeners = [];

        interactiveElements.forEach(element => {
            let bounds;
            const onMouseMove = (e) => {
                if (!bounds) bounds = element.getBoundingClientRect();
                const lX = e.clientX - bounds.left;
                const tY = e.clientY - bounds.top;
                
                // Light sheen coordinate
                element.style.setProperty('--mouse-x', `${(lX / bounds.width) * 100}%`);
                element.style.setProperty('--mouse-y', `${(tY / bounds.height) * 100}%`);
                
                // 3D rotation coordinates
                const xOffset = lX - bounds.width / 2;
                const yOffset = tY - bounds.height / 2;
                
                // Maximum tilt of 10 degrees for mock panel, 6 degrees for others
                const maxTilt = element.classList.contains('mock-panel') ? 10 : 5;
                const xPct = xOffset / (bounds.width / 2);
                const yPct = yOffset / (bounds.height / 2);
                
                const rotateX = -yPct * maxTilt;
                const rotateY = xPct * maxTilt;
                
                // If it is a feature item, use translateX alongside slight tilt
                if (element.classList.contains('feature-item')) {
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(6px) scale3d(1.01, 1.01, 1.01)`;
                } else {
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                }
            };
            
            const onMouseEnter = () => {
                bounds = element.getBoundingClientRect();
                element.style.transition = 'none';
                
                // If it is floating, pause the float animation
                if (element.classList.contains('mock-panel-float')) {
                    element.style.animation = 'none';
                }
            };
            
            const onMouseLeave = () => {
                element.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
                if (element.classList.contains('feature-item')) {
                    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0) scale3d(1, 1, 1)';
                } else {
                    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                }
                bounds = null;
                
                // Resume float animation if applicable
                if (element.classList.contains('mock-panel-float')) {
                    element.style.animation = 'float3D 8s ease-in-out infinite';
                }
            };
            
            element.addEventListener('mousemove', onMouseMove);
            element.addEventListener('mouseenter', onMouseEnter);
            element.addEventListener('mouseleave', onMouseLeave);

            this._sheenListeners.push({ element, onMouseMove, onMouseEnter, onMouseLeave });
        });

        // Intersection Observer Scroll Reveals
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        const staggerContainers = document.querySelectorAll('.reveal-stagger');

        // Set up stagger delays for children
        staggerContainers.forEach(container => {
            Array.from(container.children).forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.08}s`;
            });
        });

        this._scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this._scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => this._scrollObserver.observe(el));
        staggerContainers.forEach(el => this._scrollObserver.observe(el));

        // Dynamic scroll-spy navbar link highlights
        const sections = [
            { id: 'how-it-works', link: document.querySelector('.navbar a[href*="#how-it-works"]') },
            { id: 'founders', link: document.querySelector('.navbar a[href*="#founders"]') },
            { id: 'investors', link: document.querySelector('.navbar a[href*="#investors"]') },
            { id: 'security', link: document.querySelector('.navbar a[href*="#security"]') }
        ];

        const onScrollSpy = () => {
            const scrollPos = window.scrollY + 140; // Offset for navbar and breathing room
            sections.forEach(sec => {
                const element = document.getElementById(sec.id);
                if (element && sec.link) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        sec.link.classList.add('active');
                    } else {
                        sec.link.classList.remove('active');
                    }
                }
            });

            // If near top of page, remove active class from all
            if (window.scrollY < 180) {
                sections.forEach(sec => {
                    if (sec.link) sec.link.classList.remove('active');
                });
            }
        };

        window.addEventListener('scroll', onScrollSpy);
        this._scrollSpyListener = onScrollSpy;
        // Trigger once initially
        onScrollSpy();

        // Safe smooth scroll to target hash elements (try-catch & getElementById)
        const handleHashScroll = () => {
            try {
                if (location.hash) {
                    const id = location.hash.startsWith('#') ? location.hash.substring(1) : location.hash;
                    const target = document.getElementById(id);
                    if (target) {
                        setTimeout(() => {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }
                }
            } catch (e) {
                console.error("Scroll error on hash change:", e);
            }
        };
        handleHashScroll();
        // Also listen for hash changes
        window.addEventListener('hashchange', handleHashScroll);
        this._hashScrollListener = handleHashScroll;
        
        // FAQ Accordion logic
        // We will initialize triggers dynamically in renderPricingCards to prevent stale listeners
        this._faqTriggersListeners = null;

        // Dynamic FAQ arrays
        const founderFaqs = [
            {
                id: 'faq-founder-1',
                q: "Do founders pay both a subscription and a success fee?",
                a: "All founder plans include a recurring subscription. A 5–7% success fee is charged only after successful funding from Funding Easy-introduced investors."
            },
            {
                id: 'faq-founder-2',
                q: "When is the 5–7% success fee charged?",
                a: "The success fee is invoiced post-closing, strictly contingent on capital clearing into your accounts. If an introduction does not result in a closed investment, no success fee is owed."
            },
            {
                id: 'faq-founder-3',
                q: "Are managed services included in the subscription?",
                a: "No. Managed services are optional add-ons and priced separately."
            },
            {
                id: 'faq-founder-4',
                q: "How does the KYC/AML verification process work?",
                a: "Founders undergo identity and corporate structure verification through our integrated Stripe Identity portal. Your profile enters the match pool only after passing these regulatory compliance checks."
            },
            {
                id: 'faq-founder-5',
                q: "How is our sensitive IP and cap table data secured?",
                a: "All diligence documents are protected by AES-256 encryption at rest and TLS 1.3 in transit via AWS KMS, with strict role-based access controls and automatic expiry options."
            }
        ];

        const investorFaqs = [
            {
                id: 'faq-investor-1',
                q: "What does the investor free plan include?",
                a: "The free tier allows investors to set up a basic mandate, browse curated opportunity summaries, and view up to 3 full pitches per month to evaluate the quality of the network before committing to a subscription."
            },
            {
                id: 'faq-investor-2',
                q: "When should I upgrade to Investor Pro?",
                a: "Investors should upgrade to the Pro tier when they want to actively participate in Match Rooms, unlock unlimited pitch access, utilize advanced filtering tools, and access the secure Diligence Vault for deep evaluation."
            },
            {
                id: 'faq-investor-3',
                q: "Who qualifies as an accredited investor on the platform?",
                a: "Investors must meet local accreditation standards (e.g., SEC Rule 501 in the US). Accreditation is verified through our secure compliance portal before your deployment mandate is activated."
            },
            {
                id: 'faq-investor-4',
                q: "What compliance data is tracked in the Immutable Audit Logs?",
                a: "For regulatory reporting and transparency, the platform maintains an immutable record of all data room access, match acceptances, document downloads, and system actions."
            },
            {
                id: 'faq-investor-5',
                q: "How does double opt-in mandate matching comply with anti-spam rules?",
                a: "We enforce a zero-spam policy. No cold outreach is allowed. Both parties must securely opt-in via their respective dashboards before contact details or full data rooms are revealed."
            }
        ];

        // Pricing Toggles Logic
        const founderMonthlyPlans = [
          {
            name: "Platform Access",
            price: "₹12,500 / month",
            badge: null,
            description: "For founders managing their own raise with structured investor access and secure workflow.",
            features: [
              "Verified founder profile and round setup",
              "Match Room access for investor conversations",
              "Secure Diligence Vault for documents",
              "Mandate-fit investor visibility",
              "Standard platform support"
            ],
            finePrint: "A 5–7% success fee applies only on capital closed through Funding Easy introductions.",
            cta: "Start as Founder"
          },
          {
            name: "Managed Raise",
            price: "Custom",
            badge: "HIGH-TOUCH",
            description: "For founders who want hands-on support, premium visibility, and guided fundraising execution.",
            features: [
              "Everything in Platform Access",
              "Priority matching and premium placement",
              "Dedicated success manager",
              "Raise preparation support",
              "Managed services available as add-ons"
            ],
            finePrint: "Success fee varies by scope, support level, and raise complexity.",
            cta: "Talk to Sales"
          }
        ];
 
        const founderAnnualPlans = [
          {
            name: "Platform Access",
            price: "₹1,20,000 / year",
            badge: "SAVE 20%",
            description: "For founders who want lower annual cost and uninterrupted access during the full fundraising cycle.",
            features: [
              "Verified founder profile and round setup",
              "Match Room access for investor conversations",
              "Secure Diligence Vault for documents",
              "Mandate-fit investor visibility",
              "Standard platform support"
            ],
            finePrint: "A 5–7% success fee applies only on capital closed through Funding Easy introductions.",
            cta: "Choose Annual"
          },
          {
            name: "Managed Raise",
            price: "Custom",
            badge: "HIGH-TOUCH",
            description: "For founders who want strategic support alongside platform access throughout the raise.",
            features: [
              "Everything in Platform Access",
              "Priority matching and premium placement",
              "Dedicated success manager",
              "Raise preparation support",
              "Managed services available as add-ons"
            ],
            finePrint: "Success fee varies by scope, support level, and raise complexity.",
            cta: "Talk to Sales"
          }
        ];
 
        const investorMonthlyPlans = [
          {
            name: "Free",
            price: "₹0",
            badge: null,
            description: "For investors exploring curated opportunities before committing to a subscription.",
            features: [
              "View up to 3 full pitches",
              "Browse curated summary opportunities",
              "Basic mandate setup",
              "Limited analytics"
            ],
            finePrint: "Upgrade when you want more pitch access, deeper analytics, and full workflow participation.",
            cta: "Start Free"
          },
          {
            name: "Investor Pro",
            price: "₹20,000 / month",
            badge: "MOST POPULAR",
            description: "For active investors who want deeper access, stronger filters, and faster diligence workflow.",
            features: [
              "View more pitches",
              "Detailed analytics",
              "Advanced filters and mandate controls",
              "Full Match Room participation",
              "Full Diligence Vault access",
              "Priority alerts"
            ],
            finePrint: "Monthly subscription for individuals or firms that want consistent access to qualified opportunities.",
            cta: "Upgrade to Pro"
          }
        ];
 
        const investorAnnualPlans = [
          {
            name: "Free",
            price: "₹0",
            badge: null,
            description: "For investors who want limited access before subscribing.",
            features: [
              "View up to 3 full pitches",
              "Browse curated summary opportunities",
              "Basic mandate setup",
              "Limited analytics"
            ],
            finePrint: "Free plan remains available with limited pitch access.",
            cta: "Start Free"
          },
          {
            name: "Investor Pro",
            price: "₹1,92,000 / year",
            badge: "SAVE 20%",
            description: "For firms and active angels who want full-year access to deeper analytics and workflow tools.",
            features: [
              "View more pitches",
              "Detailed analytics",
              "Advanced filters and mandate controls",
              "Full Match Room participation",
              "Full Diligence Vault access",
              "Priority alerts"
            ],
            finePrint: "Annual billing reduces cost for investors who actively evaluate deal flow year-round.",
            cta: "Choose Annual"
          }
        ];

        const microcopyConfig = {
            founder: `
                <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: center;">
                    <div>&middot; All founder plans include a recurring subscription.</div>
                    <div>&middot; A 5–7% success fee is charged only after successful funding from Funding Easy-introduced investors.</div>
                    <div>&middot; Managed services are optional add-ons and priced separately.</div>
                </div>
            `,
            investor: `
                <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: center;">
                    <div>&middot; Investors can start free with limited pitch access.</div>
                    <div>&middot; Upgrade to unlock more opportunities, deeper analytics, and full workflow access.</div>
                    <div>&middot; Monthly and annual plans are available for active investors and firms.</div>
                </div>
            `
        };

        const pricingState = { audience: 'founder', billing: 'monthly' };
        
        const renderPricingCards = () => {
            const container = document.getElementById('pricing-cards-container');
            const microContainer = document.getElementById('pricing-microcopy');
            if (!container) return;
 
            if (microContainer) {
                microContainer.innerHTML = microcopyConfig[pricingState.audience];
            }
 
            const trustLine = document.getElementById('pricing-trust-line');
            if (trustLine) {
                if (pricingState.audience === 'founder') {
                    trustLine.innerHTML = `&check; Secure payment processing &middot; &check; 5–7% success fee on closed capital &middot; &check; Institutional-grade security and access controls`;
                } else {
                    trustLine.innerHTML = `&check; Secure payment processing &middot; &check; Cancel anytime on investor plans &middot; &check; Institutional-grade security and access controls`;
                }
            }
            
            // Show/hide correct pre-rendered pricing card groups
            const pricingGroups = ['founder-monthly', 'founder-annual', 'investor-monthly', 'investor-annual'];
            pricingGroups.forEach(g => {
                const el = document.getElementById(`pricing-group-${g}`);
                if (el) {
                    const isActive = `${pricingState.audience}-${pricingState.billing}` === g;
                    el.style.display = isActive ? 'grid' : 'none';
                    if (isActive) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                }
            });
 
            // Show/hide correct pre-rendered FAQ groups
            const faqFounderGroup = document.getElementById('faq-group-founder');
            const faqInvestorGroup = document.getElementById('faq-group-investor');
            if (faqFounderGroup && faqInvestorGroup) {
                if (pricingState.audience === 'founder') {
                    faqFounderGroup.style.display = 'block';
                    faqInvestorGroup.style.display = 'none';
                } else {
                    faqFounderGroup.style.display = 'none';
                    faqInvestorGroup.style.display = 'block';
                }
            }
            
            // Sync toggle button active states
            ['founder', 'investor'].forEach(a => {
                const btn = document.getElementById(`toggle-${a}`);
                if (btn) btn.classList.toggle('active', pricingState.audience === a);
            });
            ['monthly', 'annual'].forEach(b => {
                const btn = document.getElementById(`toggle-${b}`);
                if (btn) btn.classList.toggle('active', pricingState.billing === b);
            });
            // Clear FAQ search input and display all FAQs on pricing tab change
            const faqSearchInput = document.getElementById('faqSearchInput');
            if (faqSearchInput) {
                faqSearchInput.value = '';
            }
            const allFaqItems = document.querySelectorAll('.faq-item');
            allFaqItems.forEach(item => {
                item.style.display = 'block';
            });
        };
        
        // Bind FAQ accordion click triggers once statically
        const faqTriggers = document.querySelectorAll('.faq-trigger');
        const onFaqClick = (e) => {
            const trigger = e.currentTarget;
            const contentId = trigger.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other open FAQs
            faqTriggers.forEach(t => {
                if (t !== trigger) {
                    t.setAttribute('aria-expanded', 'false');
                    const c = document.getElementById(t.getAttribute('aria-controls'));
                    if (c) {
                        c.setAttribute('aria-hidden', 'true');
                        c.style.maxHeight = '0';
                        c.style.opacity = '0';
                    }
                    const icon = t.querySelector('.faq-icon');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                content.setAttribute('aria-hidden', 'true');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                const icon = trigger.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                content.setAttribute('aria-hidden', 'false');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                const icon = trigger.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        };
        faqTriggers.forEach(trigger => trigger.addEventListener('click', onFaqClick));
        this._faqTriggersListeners = { faqTriggers, onFaqClick };
        
        ['founder', 'investor'].forEach(a => {
            const btn = document.getElementById(`toggle-${a}`);
            if (btn) {
                const handler = () => { pricingState.audience = a; renderPricingCards(); };
                btn.addEventListener('click', handler);
                this._sheenListeners.push({ element: btn, isPricingToggle: true, handler });
            }
        });
        
        ['monthly', 'annual'].forEach(b => {
            const btn = document.getElementById(`toggle-${b}`);
            if (btn) {
                const handler = () => { pricingState.billing = b; renderPricingCards(); };
                btn.addEventListener('click', handler);
                this._sheenListeners.push({ element: btn, isPricingToggle: true, handler });
            }
        });

        // Dynamic SEO & Metadata Initialization
        document.title = "Funding Easy - Private Capital Matching Infrastructure";
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "Funding Easy is a private, double opt-in capital matching infrastructure connecting verified founders with mandate-aligned investors.";
        
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = window.location.origin + window.location.pathname;

        const ogTags = {
            'og:title': 'Funding Easy - Private Capital Matching Infrastructure',
            'og:description': 'Verified founders and mandate-aligned investors meet in a private, double opt-in workspace.',
            'og:image': window.location.origin + '/dashboard_mockup.png',
            'og:url': window.location.href,
            'og:type': 'website'
        };
        this._ogElements = [];
        Object.keys(ogTags).forEach(prop => {
            let el = document.querySelector(`meta[property="${prop}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('property', prop);
                document.head.appendChild(el);
            }
            el.content = ogTags[prop];
            this._ogElements.push(el);
        });

        let schemaScript = document.getElementById('schema-org');
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = 'schema-org';
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }
        schemaScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Funding Easy",
            "url": window.location.origin,
            "logo": window.location.origin + "/logo.png",
            "description": "Private capital matching infrastructure connecting verified founders with mandate-aligned investors.",
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "12500",
                "highPrice": "20000",
                "priceRange": "₹12,500 - ₹20,000"
            }
        });

        // Initial render
        renderPricingCards();

        // FAQ Search Logic
        const faqSearchInput = document.getElementById('faqSearchInput');
        if (faqSearchInput) {
            const onSearchInput = (e) => {
                const query = e.target.value.toLowerCase();
                const activeAccordion = pricingState.audience === 'founder' ? document.getElementById('faq-group-founder') : document.getElementById('faq-group-investor');
                if (activeAccordion) {
                    const items = activeAccordion.querySelectorAll('.faq-item');
                    let visibleCount = 0;
                    items.forEach(item => {
                        const question = item.querySelector('.faq-trigger span').textContent.toLowerCase();
                        const answer = item.querySelector('.faq-content p').textContent.toLowerCase();
                        if (question.includes(query) || answer.includes(query)) {
                            item.style.display = 'block';
                            visibleCount++;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    let noResultsEl = activeAccordion.querySelector('.faq-no-results');
                    if (visibleCount === 0) {
                        if (!noResultsEl) {
                            noResultsEl = document.createElement('div');
                            noResultsEl.className = 'faq-no-results';
                            noResultsEl.style.cssText = 'text-align: center; padding: 48px 16px; color: var(--text-muted, #5F716D); font-size: 0.95rem; font-weight: 500;';
                            noResultsEl.textContent = 'No matching FAQ topics found. Try searching for "fee", "KYC", or "investor".';
                            activeAccordion.appendChild(noResultsEl);
                        }
                    } else {
                        if (noResultsEl) {
                            noResultsEl.remove();
                        }
                    }
                }
            };
            faqSearchInput.addEventListener('input', onSearchInput);
            this._faqSearchListener = { faqSearchInput, onSearchInput };
        }

        // Newsletter lead capture form logic
        const newsletterForm = document.getElementById('newsletter-form');
        const newsletterSuccess = document.getElementById('newsletter-success');
        if (newsletterForm && newsletterSuccess) {
            const onNewsletterSubmit = (e) => {
                e.preventDefault();
                newsletterForm.style.display = 'none';
                newsletterSuccess.style.display = 'block';
            };
            newsletterForm.addEventListener('submit', onNewsletterSubmit);
            this._newsletterListener = { newsletterForm, onNewsletterSubmit };
        }
    }

    cleanup() {
        // Safely strip overrides to avoid style bleeding into dashboard modules
        document.body.classList.remove('homepage-active');

        // Dynamic SEO & Metadata Cleanup
        document.title = "Funding Easy";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.remove();
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.remove();
        if (this._ogElements) {
            this._ogElements.forEach(el => el.remove());
        }
        const schemaScript = document.getElementById('schema-org');
        if (schemaScript) schemaScript.remove();

        // Tear down listeners
        if (this._sheenListeners) {
            this._sheenListeners.forEach(listener => {
                if (listener.isPricingToggle) {
                    listener.element.removeEventListener('click', listener.handler);
                } else {
                    listener.element.removeEventListener('mousemove', listener.onMouseMove);
                    listener.element.removeEventListener('mouseenter', listener.onMouseEnter);
                    if (listener.onMouseLeave) listener.element.removeEventListener('mouseleave', listener.onMouseLeave);
                }
            });
        }
        
        if (this._faqTriggersListeners) {
            this._faqTriggersListeners.faqTriggers.forEach(trigger => {
                trigger.removeEventListener('click', this._faqTriggersListeners.onFaqClick);
            });
        }
        
        if (this._faqSearchListener) {
            this._faqSearchListener.faqSearchInput.removeEventListener('input', this._faqSearchListener.onSearchInput);
        }

        if (this._newsletterListener) {
            this._newsletterListener.newsletterForm.removeEventListener('submit', this._newsletterListener.onNewsletterSubmit);
        }
        
        if (this._canvasCleanup) {
            this._canvasCleanup();
        }

        if (this._scrollObserver) {
            this._scrollObserver.disconnect();
        }

        if (this._scrollSpyListener) {
            window.removeEventListener('scroll', this._scrollSpyListener);
        }
        
        if (this._hashScrollListener) {
            window.removeEventListener('hashchange', this._hashScrollListener);
        }
        
        if (this._faqTriggersListeners) {
            this._faqTriggersListeners.faqTriggers.forEach(t => t.removeEventListener('click', this._faqTriggersListeners.onFaqClick));
        }

        if (this._navbarScrollListener) {
            window.removeEventListener('scroll', this._navbarScrollListener);
        }
    }
}








