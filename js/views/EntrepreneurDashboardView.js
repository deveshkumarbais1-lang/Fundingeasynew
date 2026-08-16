import AbstractView from './AbstractView.js';
import DonutChart from '../components/DonutChart.js';

// SVG Icons mapping (Lucide-like replacements)
const ICONS = {
    overview: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
    readiness: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    profile: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    pitch: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path></svg>`,
    documents: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    pipeline: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    meetings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    insights: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    lock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    alert: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Founder OS | Funding Easy");
        
        this.state = {
            activeTab: 'overview',
            kycVerified: true,
            published: false,
            profileState: 'Draft', // Enum: 'Draft', 'Action Required', 'Under Review', 'Private Matching', 'Live', 'Paused'

            
            company: {
                name: 'Acme Corp',
                hq: 'Bangalore, India',
                tagline: 'Automating compliance workflows for SMEs.',
                sector: 'FinTech',
                stage: 'Seed',
                story: 'We started Acme Corp to solve the manual, fragmented compliance processes that hold back growing SMEs. Having spent 5 years in business operations, we saw founders spending up to 20% of their time on compliance audits rather than scaling their business.',
                usp: '10x faster verification through direct API integrations and unified dashboarding.',
                competition: 'Legacy compliance consultants and single-point SaaS verification platforms.',
                gtm: 'Direct outbound sales targeting Series A startups and strategic partnership channels with legal/accounting advisors.',
                team: [
                    { name: 'John Doe', role: 'CEO & Founder', bio: 'Former FinTech engineering lead.' },
                    { name: 'Jane Smith', role: 'CTO & Co-founder', bio: 'AI systems researcher and ex-senior architect.' }
                ]
            },
            
            financials: {
                status: 'revenue',
                mrr: '$12,500',
                burn: '$8,000',
                runway: 15,
                traction: '12 active enterprise pilots, growing at 15% MoM, with a 95% pilot-to-paid conversion rate.'
            },
            
            raise: {
                target: '$1,500,000',
                roundType: 'Seed',
                valuation: '$8,000,000',
                equity: '15%',
                useOfFunds: '40% Engineering, 40% GTM Expansion, 20% Regulatory Compliance operations.',
                narrative: 'This round will fund the scaling of our automated compliance pipeline to reach $100K MRR and expand to South East Asian markets.'
            },
            
            pitch: {
                videoFile: null,
                thumbnail: 'mock_cover_1.jpg',
                transcript: 'Hi, I am John, founder of Acme Corp. Compliance is a $20B headache that takes weeks. With Acme, it takes 15 minutes. We connect directly to registries and APIs to automate auditing for SMEs. We already have 12 paid pilots, growing 15% MoM. We are raising $1.5M to scale. Join us on our journey.',
                scriptReviewed: true
            },
            
            documents: [
                { id: 'doc-1', name: 'Q1_Financials_Draft.pdf', category: 'Financials', type: 'Mandatory', status: 'Approved', size: '1.2MB', date: 'May 20, 2026', sharedWith: [] },
                { id: 'doc-2', name: 'Articles_of_Incorporation.pdf', category: 'Governance', type: 'Mandatory', status: 'Approved', size: '2.4MB', date: 'May 18, 2026', sharedWith: [] },
                { id: 'doc-3', name: 'Acme_Cap_Table_Seed.xlsx', category: 'Governance', type: 'Mandatory', status: 'Pending', size: '650KB', date: 'June 1, 2026', sharedWith: ['Climate Capital'] }
            ],
            
            pipeline: [
                {
                    id: 'deal-1',
                    investor: 'Accel Partners',
                    firmType: 'VC Partner',
                    score: 94,
                    stage: 'Matched',
                    notes: 'Profile viewed. Admin-assisted handoff pending.',
                    potentialAmount: '$500,000',
                    owner: 'Platform Admin',
                    lastUpdated: '2 hours ago',
                    nextAction: 'Approve Introduction Request',
                    urgency: 'high',
                    history: [
                        { time: 'May 28, 9:15 AM', action: 'Profile viewed on match feed' },
                        { time: 'May 30, 2:10 PM', action: 'Pitch deck opened & reviewed' },
                        { time: 'June 1, 10:45 AM', action: 'Automated match handoff initiated' },
                        { time: 'June 2, 2:15 PM', action: 'Pitch video viewed by Accel Partner' }
                    ]
                },
                {
                    id: 'deal-2',
                    investor: 'Apex Capital',
                    firmType: 'Angel Syndicate',
                    score: 88,
                    stage: 'Meeting Scheduled',
                    notes: 'Zoom intro call set for Wednesday.',
                    potentialAmount: '$250,000',
                    owner: 'John Doe',
                    lastUpdated: '1 day ago',
                    nextAction: 'Join Zoom Coordinated Call',
                    urgency: 'high',
                    history: [
                        { time: 'May 25, 11:30 AM', action: 'Profile viewed' },
                        { time: 'May 26, 4:00 PM', action: 'Pitch video viewed' },
                        { time: 'May 28, 9:00 AM', action: 'Introduction request submitted' },
                        { time: 'June 1, 11:30 AM', action: 'Intro approved by founder' },
                        { time: 'June 2, 4:00 PM', action: 'Introductory Meeting proposed & scheduled' }
                    ]
                },
                {
                    id: 'deal-3',
                    investor: 'Climate Capital',
                    firmType: 'VC Partner',
                    score: 82,
                    stage: 'Diligence',
                    notes: 'Access requested to Cap Table and Financials.',
                    potentialAmount: '$400,000',
                    owner: 'John Doe',
                    lastUpdated: 'Yesterday',
                    nextAction: 'Grant Diligence Vault Access',
                    urgency: 'high',
                    history: [
                        { time: 'May 20, 10:00 AM', action: 'Profile viewed' },
                        { time: 'May 22, 2:15 PM', action: 'Pitch video viewed (100% watch-time)' },
                        { time: 'May 25, 9:00 AM', action: 'Introduction request accepted' },
                        { time: 'May 28, 4:30 PM', action: 'Introductory Zoom meeting completed' },
                        { time: 'May 30, 10:00 AM', action: 'Meeting follow-up: Diligence access requested' },
                        { time: 'June 1, 9:15 AM', action: 'Secure documents vault access requested' }
                    ]
                },
                {
                    id: 'deal-4',
                    investor: 'Sequoia India',
                    firmType: 'VC Partner',
                    score: 91,
                    stage: 'Requested Intro',
                    notes: 'Awaiting Sequoia review of pitch deck.',
                    potentialAmount: '$600,000',
                    owner: 'Platform Admin',
                    lastUpdated: '3 hours ago',
                    nextAction: 'Admin Follow-up Pending',
                    urgency: 'medium',
                    history: [
                        { time: 'June 1, 11:00 AM', action: 'Profile viewed' },
                        { time: 'June 2, 1:00 PM', action: 'Introduction request submitted to VC Partner' }
                    ]
                }
            ],
            
            meetings: [
                { id: 'meet-1', title: 'Apex Capital Intro', date: 'Wed, June 3 - 10:00 AM', status: 'Scheduled', agenda: ['Founder Pitch (10m)', 'Q&A (15m)', 'Next Steps (5m)'], zoomUrl: 'https://zoom.us/j/123456789', notes: 'Focus on explaining Bangalore scaling metrics and SME GTM partnerships.', deliverables: [{ id: 'd-1', task: 'Send Cap Table', done: false }, { id: 'd-2', task: 'Send Q1 P&L', done: false }] }
            ],
            
            alerts: [
                { id: 'a-1', text: 'Climate Capital is waiting on diligence documents.', time: '3 hours ago', count: 2, actionTab: 'pipeline' },
                { id: 'a-2', text: 'Upload Q1 P&L for your scheduled Apex Capital meeting.', time: 'Meeting tomorrow', count: 1, actionTab: 'meetings' }
            ],
            
            settingsPlan: 'Venture Growth',
            creditsIntros: 3,
            creditsVaults: 2,
            identityMasking: true,
            requireNDA: true,
            emailNotifs: true,
            smsNotifs: false,
            matchNotifs: true,
            
            selectedDealId: null,
            selectedMeetingId: null,
            previewMode: false
        };
    }

    isProfileComplete() {
        const c = this.state.company;
        return !!(c.name && c.hq && c.tagline && c.sector && c.stage && c.story && c.usp && c.competition && c.gtm && c.team.length > 0);
    }

    isFinancialsComplete() {
        const f = this.state.financials;
        return !!(f.status && f.mrr && f.burn && f.runway && f.traction);
    }

    isRaiseComplete() {
        const r = this.state.raise;
        return !!(r.target && r.roundType && r.valuation && r.equity && r.useOfFunds && r.narrative);
    }

    isPitchComplete() {
        return !!this.state.pitch.videoFile;
    }

    isDocsComplete() {
        const mandatory = this.state.documents.filter(d => d.type === 'Mandatory' && d.status === 'Approved');
        return mandatory.length >= 2;
    }

    getReadinessScore() {
        let score = 0;
        if (this.state.kycVerified) score += 15;
        if (this.isProfileComplete()) score += 25;
        if (this.isFinancialsComplete()) score += 20;
        if (this.isRaiseComplete()) score += 15;
        if (this.isPitchComplete()) score += 15;
        if (this.isDocsComplete()) score += 10;
        return score;
    }

    getOpenBlockers() {
        const blockers = [];
        if (!this.state.kycVerified) blockers.push("KYC verification in progress");
        if (!this.isProfileComplete()) blockers.push("Startup story & team details incomplete");
        if (!this.isFinancialsComplete()) blockers.push("Financial statements & metrics missing");
        if (!this.isRaiseComplete()) blockers.push("Raise goal details missing");
        if (!this.isPitchComplete()) blockers.push("Elevator pitch video not uploaded");
        if (!this.isDocsComplete()) blockers.push("Mandatory diligence documents not approved");
        return blockers;
    }

    getProfileState() {
        const blockers = this.getOpenBlockers();
        if (!this.state.kycVerified && blockers.length > 1) {
            return { id: 'Draft', type: 'warning', text: 'Draft (Unpublished)', action: 'Action Required', description: 'Complete your profile to go live.' };
        }
        if (blockers.length > 0) {
            return { id: 'Action Required', type: 'danger', text: `Not discoverable — ${blockers.length} required item${blockers.length > 1 ? 's' : ''}`, action: 'Action Required', description: blockers[0].toLowerCase().includes("pitch") ? "Your profile cannot go live until a founder pitch video is uploaded." : `${blockers[0]} is required. Your profile cannot go live until all criteria are met.` };
        }
        if (this.state.kycVerified && !this.state.published) {
            return { id: 'Under Review', type: 'success', text: 'Startup Profile Ready', action: 'Ready', description: 'All checklist parameters are met. Go live to open matchmaking loops with live investors.' };
        }
        if (this.state.published && this.state.settingsPlan === 'Private') {
            return { id: 'Private Matching', type: 'success', text: 'Private Matching', action: 'Live', description: 'Profile is matching privately.' };
        }
        if (this.state.published) {
            return { id: 'Live', type: 'success', text: 'Live & Matching', action: 'Live', description: 'Your profile is live to investors.' };
        }
        return { id: 'Draft', type: 'warning', text: 'Draft (Unpublished)', action: 'Action Required', description: 'Complete your profile.' };
    }

    getGlobalBannerHtml() {
        const state = this.getProfileState();
        if (state.id === 'Live' || state.id === 'Private Matching') return '';
        
        let bannerContent = '';
        const blockers = this.getOpenBlockers();
        
        if (state.id === 'Draft' || state.id === 'Action Required') {
            const readinessScore = this.getReadinessScore();
            const kycText = this.state.kycVerified ? 'KYC verified' : 'KYC unverified';
            const kycColor = this.state.kycVerified ? 'var(--success)' : 'var(--danger)';
            
            let nbaDesc = "Upload your founder pitch video (9:16) to publish your profile.";
            let nbaButton = "Record & upload";
            let nbaTarget = "pitch";
            
            if (!this.state.kycVerified) {
                nbaDesc = "A regulatory verification is required before matched VCs can request access to your diligence materials.";
                nbaTarget = "settings";
                nbaButton = "Verify Identity";
            } else if (!this.isProfileComplete()) {
                nbaDesc = "Your team and founder story sections are empty. Investors prioritize founders with complete bios.";
                nbaTarget = "profile";
                nbaButton = "Complete Profile";
            } else if (!this.isFinancialsComplete()) {
                nbaDesc = "Please enter your Revenue Status, Burn Rate, and Runway months to complete matchmaking data.";
                nbaTarget = "profile";
                nbaButton = "Enter Financials";
            } else if (!this.isRaiseComplete()) {
                nbaDesc = "Let VCs know how much you are raising, your valuation expectations, and what this milestone unlocks.";
                nbaTarget = "profile";
                nbaButton = "Setup Raise";
            } else if (!this.isPitchComplete()) {
                nbaDesc = "Funding Easy uses a short-form vertical video feed to match rounds. Upload your 9:16 pitch video now.";
                nbaTarget = "pitch";
                nbaButton = "Record & Upload";
            } else if (!this.isDocsComplete()) {
                nbaDesc = "Ensure your articles of incorporation and cap tables are uploaded in the secure vault.";
                nbaTarget = "documents";
                nbaButton = "Upload Diligence";
            }

            bannerContent = `
                <div style="background: var(--surface-2); border: 1px solid var(--border-subtle); border-radius: 12px; margin-bottom: 32px; overflow: hidden;">
                    <div style="padding: 12px 24px; background: rgba(0,0,0,0.1); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                        <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <span style="color: var(--text-primary); font-weight: 600;">${this.state.company.name || 'Your Startup'}</span>
                            <span style="color: var(--border-subtle);">·</span>
                            <span style="color: ${kycColor};">${kycText}</span>
                            <span style="color: var(--border-subtle);">·</span>
                            <span>Profile readiness ${readinessScore}%</span>
                            <span style="color: var(--border-subtle);">·</span>
                            <span>${blockers.length} item${blockers.length > 1 ? 's' : ''} remaining</span>
                        </div>
                        <button class="btn nav-trigger" data-target="profile" style="background: transparent; border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 4px 12px; font-size: 0.75rem; border-radius: 4px;">Preview profile</button>
                    </div>
                    <div style="padding: 24px; display: flex; gap: 16px;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--text-primary); font-weight: 600; margin: 0 0 8px 0; font-size: 1.15rem;">Complete setup to unlock discovery</h4>
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0 0 20px 0;">${nbaDesc}</p>
                            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                <button class="btn btn-primary nav-trigger" data-target="${nbaTarget}" style="font-size: 0.875rem; padding: 8px 20px; font-weight: 600;">${nbaButton}</button>
                                <button class="btn btn-secondary nav-trigger" data-target="readiness" style="font-size: 0.875rem; padding: 8px 20px; font-weight: 600; background: transparent; border: 1px solid var(--border-subtle);">Go to readiness</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (state.id === 'Under Review') {
            bannerContent = `
                <div style="background: var(--warning-soft); border: 1px solid var(--warning); padding: 20px 24px; border-radius: 12px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="color: var(--warning); flex-shrink: 0; padding-top: 2px;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <div>
                            <h4 style="color: var(--text-primary); font-weight: 600; margin: 0 0 4px 0; font-size: 1rem;">Startup Profile Ready</h4>
                            <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0;">All criteria met. Publish your profile to open matching loops.</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" id="bannerPublishBtn" style="font-size: 0.825rem; padding: 8px 16px; font-weight: 600; flex-shrink: 0;">Publish Profile</button>
                </div>
            `;
        } else if (state.id === 'Paused') {
             bannerContent = `
                <div style="background: var(--surface-2); border: 1px solid var(--border-subtle); padding: 20px 24px; border-radius: 12px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="color: var(--text-secondary); flex-shrink: 0; padding-top: 2px;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        </div>
                        <div>
                            <h4 style="color: var(--text-primary); font-weight: 600; margin: 0 0 4px 0; font-size: 1rem;">Profile Paused</h4>
                            <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0;">Your profile is hidden from all investors. No new matches will be generated.</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" id="bannerResumeBtn" style="font-size: 0.825rem; padding: 8px 16px; font-weight: 600; flex-shrink: 0;">Resume Matching</button>
                </div>
            `;
        }
        
        return bannerContent;
    }
    async getHtml() {
        return `
            <style>
                .founder-dashboard {
                  --app-bg: #0B1120;
                  --sidebar-bg: #0E1525;
                  --surface: #131C31;
                  --surface-2: #18233B;
                  --surface-hover: #1D2A45;
                  --text: #F6F1E8;
                  --text-secondary: #C8C1B6;
                  --text-muted: #928C84;
                  --border: rgba(246, 241, 232, 0.10);
                  --border-subtle: var(--border);
                  --accent: #C8A45D;
                  --accent-hover: #B68F43;
                  --accent-soft: rgba(200, 164, 93, 0.12);
                  --success: #6E8F7A;
                  --success-soft: rgba(110, 143, 122, 0.14);
                  --warning: #B98A4A;
                  --warning-soft: rgba(185, 138, 74, 0.14);
                  --danger: #A56A6A;
                  --danger-soft: rgba(165, 106, 106, 0.14);
                }
                .founder-layout {
                    display: flex;
                    height: 100vh;
                    width: 100%;
                    background: var(--app-bg);
                    overflow: hidden;
                }
                
                /* Sidebar spec */
                .founder-sidebar {
                    width: 260px;
                    flex-shrink: 0;
                    background: var(--bg-sidebar);
                    border-right: 1px solid var(--border-subtle);
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    z-index: 10;
                }
                .nav-section-title {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: var(--text-muted);
                    font-weight: 600;
                    margin: 32px 24px 12px 24px;
                }
                .founder-nav-btn {
                    padding: 0 24px;
                    height: 44px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.2s ease;
                    border-left: 3px solid transparent;
                }

                /* Button styles scoped to dashboard */
                .btn-primary {
                    background: var(--accent);
                    color: #111827;
                    border: none;
                }
                .btn-primary:hover {
                    background: var(--accent-hover);
                }
                /* Ghost / secondary button */
                .btn-ghost {
                    background: var(--surface-2);
                    color: var(--text-secondary);
                    border: 1px solid var(--border-subtle);
                    border-radius: 8px;
                    padding: 8px 18px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }
                .btn-ghost:hover {
                    background: var(--surface-hover);
                }
                .btn-text {
                    background: transparent;
                    color: var(--text);
                    border: none;
                }
                .btn-text:hover {
                    color: var(--accent); /* stronger hover */
                }

                .founder-nav-btn:hover {
                    background: var(--bg-hover);
                    color: var(--text-primary);
                }
                .founder-nav-btn.active {
                    background: var(--accent-soft); /* subtle background */
                    color: var(--accent);
                    border-left-color: transparent; /* no loud border */
                    font-weight: 600;
                }
                .founder-main {
                    flex: 1;
                    min-width: 0;
                    padding: 40px;
                    overflow-y: auto;
                    height: 100vh;
                    position: relative;
                }
                
                /* Component Styles */
                .founder-card {
                    background: var(--bg-surface);
                    border-radius: 18px; /* Consistent premium card radius */
                    border: 1px solid rgba(255, 255, 255, 0.08); /* Spec neutral border */
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
                    padding: 24px;
                    margin-bottom: 24px;
                }
                
                .readiness-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-subtle);
                    align-items: center;
                }
                .readiness-row:last-child { border-bottom: none; }
                
                .kanban-board {
                    display: flex;
                    gap: 20px;
                    overflow-x: auto;
                    padding-bottom: 24px;
                }
                .kanban-col {
                    min-width: 320px;
                    background: var(--bg-surface);
                    border-radius: 12px;
                    border: 1px solid var(--border-subtle);
                    display: flex;
                    flex-direction: column;
                    max-height: 800px;
                }
                .kanban-header {
                    padding: 16px;
                    border-bottom: 1px solid var(--border-subtle);
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;
                }
                .kanban-cards {
                    padding: 16px;
                    overflow-y: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .investor-card {
                    background: var(--bg-base);
                    border: 1px solid var(--border-subtle);
                    padding: 16px;
                    border-radius: 8px;
                }

                .profile-subtab, .settings-subtab { display: none; }
                .profile-subtab.active, .settings-subtab.active { display: block; }
                
                .access-dropdown summary::-webkit-details-marker {
                    display: none;
                }
                .access-dropdown summary {
                    list-style: none;
                    outline: none;
                }
                
                .subtab-trigger, .settings-trigger {
                    color: var(--text-secondary); 
                    font-weight: 500; 
                    font-size: 0.875rem; 
                    cursor: pointer;
                    padding-bottom: 16px;
                    margin-bottom: -17px;
                    border-bottom: 2px solid transparent;
                }
                .subtab-trigger.active, .settings-trigger.active {
                    color: var(--brand-secondary);
                    border-bottom-color: var(--brand-secondary);
                }

                .modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: none; justify-content: center; align-items: center;
                }
                .modal-content {
                    background: var(--bg-surface); padding: 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); width: 100%; max-width: 700px; max-height: 90vh; overflow-y: auto;
                }

                .fab-support {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    background: var(--brand-secondary);
                    color: var(--bg-app);
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.5);
                    z-index: 100;
                    transition: transform 0.2s ease;
                }
                .fab-support:hover {
                    transform: scale(1.05);
                }

                .deal-stepper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 24px;
                    margin-bottom: 24px;
                    position: relative;
                }
                .deal-stepper::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    right: 20px;
                    height: 2px;
                    background: var(--border-subtle);
                    z-index: 0;
                }
                .stepper-step {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    background: var(--bg-surface);
                    padding: 0 8px;
                }
                .stepper-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--bg-base);
                    border: 2px solid var(--border-subtle);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                }
                .stepper-step.active .stepper-icon {
                    border-color: var(--brand-secondary);
                    background: var(--brand-secondary-soft);
                    color: var(--brand-secondary);
                }
                .stepper-step.completed .stepper-icon {
                    border-color: var(--success);
                    background: var(--success);
                    color: white;
                }
                .stepper-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    font-weight: 500;
                }
                .stepper-step.active .stepper-label {
                    color: var(--brand-secondary);
                }

                .file-upload-card {
                    background: var(--bg-surface); padding: 48px; border-radius: 12px; border: 1px dashed var(--border-subtle); text-align: center; margin-bottom: 32px; transition: border-color 0.2s;
                }
                .file-upload-card:hover {
                    border-color: var(--brand-secondary);
                }
                
                .toast-alert {
                    position: fixed; bottom: 24px; right: 24px; background: var(--bg-surface); border-left: 4px solid var(--brand-secondary); padding: 16px 24px; border-radius: 6px; box-shadow: var(--shadow-lg); z-index: 9999; display: flex; align-items: center; gap: 12px; animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                /* Semantic status chip classes */
                .status-success {
                    background: var(--success-soft);
                    color: var(--success);
                    border: 1px solid color-mix(in srgb, currentColor 55%, transparent);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                }
                .status-warning {
                    background: var(--warning-soft);
                    color: var(--warning);
                    border: 1px solid color-mix(in srgb, currentColor 55%, transparent);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                .status-danger {
                    background: var(--danger-soft);
                    color: var(--danger);
                    border: 1px solid color-mix(in srgb, currentColor 55%, transparent);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                }
                /* Urgency badge */
                .urgency-high {
                    background: var(--warning-soft);
                    color: var(--warning);
                    border-left: 3px solid var(--warning);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 0.75rem;
                }
            </style>

            <div class="founder-layout">
                
                <!-- FounderSidebar Component -->
                <aside class="founder-sidebar">
                    <div style="padding: 32px 24px; border-bottom: 1px solid var(--border-subtle); display:flex; align-items:center; gap:12px; margin-bottom: 16px;">
                        <svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Funding Easy logo" style="color: var(--brand-secondary);">
                            <path d="M6 4V20H8V13H11C13.21 13 15 11.21 15 9C15 6.79 13.21 5 11 5H6Z" fill="currentColor"/>
                            <path d="M14 12L17 15L22 9" stroke="#48c78e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div>
                            <a href="/" style="color: var(--text-primary); text-decoration: none; font-weight: 600; font-size: 1.15rem; display:block;">Funding Easy</a>
                            <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-top:2px; font-weight: 700;">Founder OS</div>
                        </div>
                    </div>
                    &nbsp;
                    <div style="flex: 1; overflow-y: auto; padding-bottom: 24px;">
                        <div class="nav-section-title">Command</div>
                        <a href="#" data-tab="overview" class="founder-nav-btn active">${ICONS.overview} Overview</a>
                        <a href="#" data-tab="readiness" class="founder-nav-btn">${ICONS.readiness} Readiness Center</a>
                        
                        <div class="nav-section-title">Data Room</div>
                        <a href="#" data-tab="profile" class="founder-nav-btn">${ICONS.profile} Company Profile</a>
                        <a href="#" data-tab="pitch" class="founder-nav-btn">${ICONS.pitch} Pitch Center</a>
                        <a href="#" data-tab="documents" class="founder-nav-btn">${ICONS.documents} Documents Vault</a>
                        
                        <div class="nav-section-title">Operations</div>
                        <a href="#" data-tab="pipeline" class="founder-nav-btn">${ICONS.pipeline} Investor Pipeline</a>
                        <a href="#" data-tab="meetings" class="founder-nav-btn">${ICONS.meetings} Meetings</a>
                        <a href="#" data-tab="insights" class="founder-nav-btn">${ICONS.insights} Analytics</a>
                        
                        <div class="nav-section-title">Account</div>
                        <a href="#" data-tab="settings" class="founder-nav-btn">${ICONS.settings} Settings & Billing</a>
                    </div>
                    
                    <div style="padding: 20px; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: 12px; margin: 24px 16px 24px 16px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--brand-secondary-soft); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85rem; color: var(--brand-secondary); border:1px solid rgba(15, 107, 111, 0.2);">JD</div>
                            <div>
                                <div style="font-size: 0.875rem; font-weight: 600; color:var(--text-primary); line-height: 1.2;">John Doe</div>
                                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Acme Corp • Founder</div>
                            </div>
                        </div>
                        <a href="/login" data-link style="color: var(--danger); text-decoration: none; font-size: 0.8rem; font-weight: 600; display:inline-flex; align-items:center; gap:8px;">${ICONS.lock} Sign Out</a>
                    </div>
                </aside>

                <!-- Main Content Area -->
                <main class="founder-main">
                    <!-- FounderDashboardHeader Component -->
                    <div id="founderHeader"></div>
                    &nbsp;
                    <!-- Tabs Content Wrapper -->
                    <div id="founderTabContent"></div>
                </main>

                <!-- Support FAB -->
                <div class="fab-support" id="supportFab" title="Support Chat">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>

                <div class="modal-overlay" id="previewModal"></div>
                <div class="modal-overlay" id="detailsModal"></div>
                <div class="modal-overlay" id="meetingModal"></div>
                <div class="modal-overlay" id="metricModal"></div>
                <div id="founderToastContainer" style="position: fixed; bottom: 24px; right: 24px; z-index: 99999;"></div>
            </div>
        `;
    }

    getHeaderHtml() {
        const state = this.getProfileState();
        
        const kycState = this.state.kycVerified ? 
            `<span class="status-success" style="padding:4px 12px; font-size: 0.75rem;">KYC Verified</span>` :
            `<span class="status-danger" style="padding:4px 12px; font-size: 0.75rem;">KYC Unverified</span>`;

        const isPitchTab = this.state.activeTab === 'pitch';
        const breadcrumbHtml = isPitchTab ? 
            `<div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px; font-weight: 600;">Founder OS / Pitch Center</div>` : '';
            
        const pageTitle = isPitchTab ? 'Pitch Center' : this.getTabTitle();
        const helperText = isPitchTab ? 
            'Publish and manage your founder elevator video pitch.' : 
            (this.state.published ? 'Operational overview for your live fundraising workflow.' : 'Complete your profile, manage diligence, and prepare for investor engagement.');

        return `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; gap: 24px; flex-wrap: wrap; width: 100%;">
                <div style="flex: 1; min-width: 280px;">
                    ${breadcrumbHtml}
                    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px; flex-wrap: wrap;">
                        <h1 style="font-size: 1.85rem; font-weight: 600; color:var(--text-primary); margin:0; letter-spacing: -0.02em;">${pageTitle}</h1>
                        <div style="display: flex; gap: 10px;">
                            ${kycState}
                            <span class="status-${state.type}" style="padding:4px 12px; font-size: 0.75rem;">${state.text}</span>
                        </div>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin:0; padding-top: 4px;">${helperText}</p>
                </div>
                <div style="display: flex; gap: 12px; align-items: center; margin-top: 8px; flex-wrap: nowrap; flex-shrink: 0; min-height: 40px;">
                    ${this.getHeaderActionButtonHtml()}
                </div>
            </div>
        `;
    }

    getTabTitle() {
        const titles = {
            'overview': 'Overview & Tasks',
            'readiness': 'Readiness Center',
            'profile': 'Company Data Room',
            'pitch': 'Elevator Pitch Center',
            'documents': 'Diligence Documents Vault',
            'pipeline': 'Investor Pipeline Tracker',
            'meetings': 'Coordinated Meetings',
            'insights': 'Fundraising Analytics',
            'settings': 'Settings & Billing'
        };
        return titles[this.state.activeTab] || 'Dashboard';
    }

    getHeaderActionButtonHtml() {
        // When not published and pitch is missing, show explicit upload CTA
        if (!this.state.published && !this.isPitchComplete()) {
            return `
                <button id="headerUploadPitchBtn" class="btn btn-primary" style="font-size:0.875rem; min-height:38px;">Upload Founder Pitch Video</button>
                <button id="headerPreviewProfileBtn" class="btn btn-ghost" style="font-size:0.875rem; min-height:38px;">Preview Profile</button>`;
        }
        // Tab‑specific actions
        if (this.state.activeTab === 'profile') {
            return `<button id="headerSaveProfileBtn" class="btn btn-ghost" style="font-size:0.875rem; min-height: 38px;">Save &amp; Update Data</button>`;
        }
        if (this.state.activeTab === 'documents') {
            return `<button id="headerUploadDocBtn" class="btn btn-primary" style="font-size:0.875rem; min-height: 38px;">+ Upload Document</button>`;
        }
        if (this.state.activeTab === 'meetings') {
            return `<button id="headerCalendarSyncBtn" class="btn btn-secondary" style="font-size:0.875rem; min-height: 38px;">Sync Calendar</button>`;
        }
        // Publish / Go live when no pitch blocker
        if (!this.state.published) {
            return `<button id="headerPublishGoLiveBtn" class="btn btn-primary" ${this.getOpenBlockers().length > 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} style="font-size:0.875rem; min-height: 38px;">Publish &amp; Go Live</button>`;
        }
        // Live state
        return `<span style="background:var(--brand-secondary-soft); border:1px solid var(--brand-secondary); color:#6fd0d4; padding:8px 16px; border-radius:4px; font-size:0.875rem; font-weight:600;">System Live &amp; Matching</span>`;
    }

    getActiveTabHtml() {
        switch (this.state.activeTab) {
            case 'overview': return this.getOverviewTabHtml();
            case 'readiness': return this.getReadinessTabHtml();
            case 'profile': return this.getProfileTabHtml();
            case 'pitch': return this.getPitchTabHtml();
            case 'documents': return this.getDocumentsTabHtml();
            case 'pipeline': return this.getPipelineTabHtml();
            case 'meetings': return this.getMeetingsTabHtml();
            case 'insights': return this.getInsightsTabHtml();
            case 'settings': return this.getSettingsTabHtml();
            default: return `<h3>Tab under construction</h3>`;
        }
    }

    getOverviewTabHtml() {
        const state = this.getProfileState();
        const blockers = this.getOpenBlockers();
        const activeDeals = this.state.pipeline.filter(d => d.stage !== 'Closed Lost').length;
        const upcomingMeets = this.state.meetings.filter(m => m.status === 'Scheduled').length;
        const requestedDocsCount = this.state.pipeline.filter(d => d.stage === 'Diligence').length;
        
        return `
            ${this.getGlobalBannerHtml()}
            
            <div style="display: grid; grid-template-columns: 1fr 340px; gap: 32px;">
                <div>
                    <div class="founder-card" style="margin-bottom: 0;">
                        <h3 style="font-size: 1.15rem; font-weight: 500; margin-bottom: 20px; color:var(--text-primary); font-family: 'Lora', serif;">Priority Tasks</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${this.getActionCenterRowsHtml()}
                        </div>
                    </div>
                </div>

                <div>
                    <div class="founder-card" style="margin-bottom: 24px; padding: 24px;">
                        <h3 style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">Operational Status</h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
                                <span style="color: var(--text-secondary); font-size: 0.95rem;">${this.state.published ? 'Active Deals' : 'Private Matches'}</span>
                                <span style="color: var(--text-primary); font-weight: 600; font-size: 1.1rem; font-variant-numeric: tabular-nums;">${activeDeals}</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
                                <span style="color: var(--text-secondary); font-size: 0.95rem;">Diligence Requests</span>
                                <span style="color: var(--text-primary); font-weight: 600; font-size: 1.1rem; font-variant-numeric: tabular-nums;">${requestedDocsCount}</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--text-secondary); font-size: 0.95rem;">Upcoming Meetings</span>
                                <span style="color: var(--text-primary); font-weight: 600; font-size: 1.1rem; font-variant-numeric: tabular-nums;">${upcomingMeets}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


    getActionCenterRowsHtml() {
        if (this.state.alerts.length === 0) {
            return `<p style="font-size:0.875rem; color:var(--text-muted); text-align: center; padding: 24px 0;">No open notifications. You are all caught up!</p>`;
        }
        
        return this.state.alerts.map(a => {
            const urgencyBadge = a.count ? `<span class="urgency-high">HIGH PRIORITY</span>` : '';
            
            return `
                <div class="action-task-row" style="background: rgba(255, 255, 255, 0.02); padding: 18px 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.04); display: grid; grid-template-columns: 2.5fr 1.5fr 120px; align-items: center; gap: 32px; transition: all 0.2s ease;" onmouseover="this.style.background='rgba(255,255,255,0.04)'; this.style.borderColor='rgba(255,255,255,0.08)';" onmouseout="this.style.background='rgba(255, 255, 255, 0.02)'; this.style.borderColor='rgba(255,255,255,0.04)';">
                    <!-- 1. title/content left -->
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <div style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <span>${a.text}</span>
                            ${urgencyBadge}
                        </div>
                    </div>
                    <!-- 2. metadata center -->
                    <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem; color: var(--text-muted);">
                        <div style="font-weight: 500; color: var(--text-secondary);">Requested ${a.count || 1} file${(a.count || 1) === 1 ? '' : 's'}</div>
                        <div style="font-size: 0.75rem;">${a.time}</div>
                    </div>
                    <!-- 3. Review CTA right -->
                    <div style="display: flex; align-items: center; justify-content: flex-end; width: 120px; min-width: 120px;">
                        <button class="btn btn-primary nav-trigger" data-target="${a.actionTab}" style="padding: 8px 16px; font-size: 0.8rem; font-weight: 600; min-height: 36px; width: 100%; text-align: center;">Review Task</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    getReadinessTabHtml() {
        const score = this.getReadinessScore();
        const blockers = this.getOpenBlockers();

        const rowKycStyle = this.state.kycVerified ? 
            `<span class="status-success">Approved</span>` : 
            `<span class="status-danger">Unverified</span>`;
        const rowKycPercent = this.state.kycVerified ? '100%' : '0%';

        const rowProfileStyle = this.isProfileComplete() ?
            `<span class="status-success">Complete</span>` :
            `<span class="status-warning">Incomplete</span>`;
        const rowProfilePercent = this.isProfileComplete() ? '100%' : '60%';

        const rowFinStyle = this.isFinancialsComplete() ?
            `<span class="status-success">Complete</span>` :
            `<span class="status-warning">Missing Info</span>`;
        const rowFinPercent = this.isFinancialsComplete() ? '100%' : '0%';

        const rowRaiseStyle = this.isRaiseComplete() ?
            `<span class="status-success">Complete</span>` :
            `<span class="status-warning">Missing Info</span>`;
        const rowRaisePercent = this.isRaiseComplete() ? '100%' : '0%';

        const rowPitchStyle = this.isPitchComplete() ?
            `<span class="status-success">Uploaded</span>` :
            `<span class="status-warning">Missing Pitch</span>`;
        const rowPitchPercent = this.isPitchComplete() ? '100%' : '0%';

        const rowDocStyle = this.isDocsComplete() ?
            `<span class="status-success">Approved</span>` :
            `<span class="status-warning">Requires Docs</span>`;
        const rowDocPercent = this.isDocsComplete() ? '100%' : '30%';

        const blockersListHtml = blockers.map(b => `<li style="margin-bottom:8px; display:inline-flex; align-items:center; gap:8px;">${ICONS.alert} ${b}</li>`).join('');

        return `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; overflow:hidden; margin-bottom:32px;">
                <div class="readiness-row">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 4px; color:var(--text-primary);">1. Identity & Entity Verification</h4>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin:0;">KYC and AML compliance regulatory screening.</p>
                    </div>
                    <div>${rowKycStyle}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">${rowKycPercent}</div>
                    <div style="text-align: right;"><button class="btn btn-secondary nav-trigger" data-target="settings">Verify</button></div>
                </div>

                <div class="readiness-row">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 4px; color:var(--text-primary);">2. Startup Profile Data</h4>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin:0;">Detailed company context, co-founder story, GTM plans.</p>
                    </div>
                    <div>${rowProfileStyle}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">${rowProfilePercent}</div>
                    <div style="text-align: right;"><button class="btn btn-secondary nav-trigger" data-target="profile">Edit</button></div>
                </div>

                <div class="readiness-row">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 4px; color:var(--text-primary);">3. Financial metrics & Burn</h4>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin:0;">MRR, monthly burn rate, runway months, traction verification.</p>
                    </div>
                    <div>${rowFinStyle}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">${rowFinPercent}</div>
                    <div style="text-align: right;"><button class="btn btn-secondary nav-trigger" data-target="profile" data-subtab="financials">Manage</button></div>
                </div>

                <div class="readiness-row">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 4px; color:var(--text-primary);">4. Funding Round Goals</h4>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin:0;">Round type, target valuation, equity offered, use of funds narrative.</p>
                    </div>
                    <div>${rowRaiseStyle}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">${rowRaisePercent}</div>
                    <div style="text-align: right;"><button class="btn btn-secondary nav-trigger" data-target="profile" data-subtab="raise">Edit</button></div>
                </div>

                <div class="readiness-row">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 4px; color:var(--text-primary);">5. 9:16 Video Pitch Upload</h4>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin:0;">Vertical 3-minute video presentation for match feed discovery.</p>
                    </div>
                    <div>${rowPitchStyle}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">${rowPitchPercent}</div>
                    <div style="text-align: right;"><button class="btn btn-secondary nav-trigger" data-target="pitch">Upload</button></div>
                </div>

                <div class="readiness-row">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 4px; color:var(--text-primary);">6. Diligence Documents Vault</h4>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin:0;">Incorporation papers, Cap table, and verified Financial models.</p>
<p style="font-size:0.875rem; color: var(--danger); margin-top:8px;">Your profile is blocked from publishing until a founder pitch video is uploaded.</p>
<p style="font-size:0.875rem; color: var(--text-primary); margin-top:8px;">3 of 4 mandatory diligence requirements complete</p>
                    </div>
                    <div>${rowDocStyle}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">${rowDocPercent}</div>
                    <div style="text-align: right;"><button class="btn btn-secondary nav-trigger" data-target="documents">Vault</button></div>
                </div>
            </div>

            <div id="readinessBlockersSection" style="background:var(--bg-surface); padding:32px; border-radius:12px; border:1px solid var(--border-subtle); display:grid; grid-template-columns:1.5fr 1fr; gap:32px; transition: all 0.5s ease;">
                <div>
                    <h3 style="font-size:1.25rem; font-weight:500; color:var(--text-primary); margin-bottom:12px; font-family: 'Lora', serif;">Publish Checklist Verification</h3>
                    <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:16px;">Review the following parameters before taking your startup live to matching algorithms:</p>
                    <ul style="list-style:none; padding:0; font-size:0.875rem; color:var(--text-primary); display:flex; flex-direction:column; gap:8px;">
                        ${blockersListHtml || '<li style="display:inline-flex; align-items:center; gap:8px;"><span>✓</span> All parameters approved. Ready to go live!</li>'}
                    </ul>
                </div>
                <div style="border-left:1px solid var(--divider); padding-left:32px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                    <div style="font-size:0.875rem; color:var(--text-muted); margin-bottom:8px;">Readiness Score</div>
                    ${new DonutChart({percentage: score, size: 150, strokeWidth: 12, colorVar: '--brand-secondary'}).render()}
                    <button id="publishGoLiveActionBtn" class="btn btn-primary" ${blockers.length > 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} style="width:100%; padding:12px; font-weight:600; margin-top: 16px;">
                        ${this.state.published ? 'Published & Live' : 'Go Live to VCs'}
                    </button>
                </div>
            </div>
        `;
    }

    getProfileTabHtml() {
        const teamRowsHtml = this.state.company.team.map((t, idx) => `
            <div style="display:grid; grid-template-columns:1fr 1.5fr 2fr auto; gap:16px; align-items:center; background:var(--bg-surface-2); padding:16px; border-radius:6px; margin-bottom:12px;">
                <div style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">${t.name}</div>
                <div style="font-size:0.875rem; color:var(--text-secondary);">${t.role}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${t.bio}</div>
                <button type="button" class="remove-team-btn" data-index="${idx}" style="background:transparent; border:none; color:var(--danger); font-size:1.15rem; cursor:pointer;">✕</button>
            </div>
        `).join('');

        return `
            <div style="display: flex; gap: 24px; margin-bottom: 32px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
                <span class="subtab-trigger active" data-subtab="basic">Basic Info</span>
                <span class="subtab-trigger" data-subtab="team">Founders & Team</span>
                <span class="subtab-trigger" data-subtab="financials">Financials & Traction</span>
                <span class="subtab-trigger" data-subtab="raise">Raise Goals & Narrative</span>
            </div>

            <form id="profileForm" style="background: var(--bg-surface); padding: 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                
                <div id="subtab-basic" class="profile-subtab active">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 24px; color:var(--text-primary);">Basic Startup Metrics</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Startup Legal Name</label>
                            <input type="text" id="profName" value="${this.state.company.name}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">HQ Location</label>
                            <input type="text" id="profHq" value="${this.state.company.hq}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Product One-Line Tagline</label>
                            <input type="text" id="profTagline" value="${this.state.company.tagline}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Target Sector</label>
                            <input type="text" id="profSector" value="${this.state.company.sector}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Company Round Stage</label>
                            <select id="profStage" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                <option ${this.state.company.stage === 'Pre-Seed' ? 'selected' : ''}>Pre-Seed</option>
                                <option ${this.state.company.stage === 'Seed' ? 'selected' : ''}>Seed</option>
                                <option ${this.state.company.stage === 'Series A' ? 'selected' : ''}>Series A</option>
                            </select>
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Unique Value Proposition (USP)</label>
                            <input type="text" id="profUsp" value="${this.state.company.usp}" placeholder="What makes you 10x better than others?" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Competitors & Substitutes</label>
                            <input type="text" id="profCompetition" value="${this.state.company.competition}" placeholder="Who are your primary competitors?" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Go-To-Market (GTM) Strategy</label>
                            <textarea id="profGtm" style="width: 100%; height: 80px; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); resize:none;">${this.state.company.gtm}</textarea>
                        </div>
                    </div>
                </div>

                <div id="subtab-team" class="profile-subtab">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px; color:var(--text-primary);">Founder Story & Team Structure</h3>
                    <p style="font-size: 0.875rem; color:var(--text-secondary); margin-bottom:24px;">Highlight your background, drive, and co-founders.</p>
                    
                    <div style="margin-bottom: 32px;">
                        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">The Founder Story & Origin</label>
                        <textarea id="profStory" style="width: 100%; height: 120px; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); resize: none;">${this.state.company.story}</textarea>
                    </div>

                    <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:12px;">Active Team Members</h4>
                    <div id="teamContainer" style="margin-bottom:24px;">
                        ${teamRowsHtml}
                    </div>

                    <div style="background:var(--bg-surface-2); padding:24px; border-radius:8px; border:1px solid var(--border-subtle); margin-top:20px;">
                        <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:16px; font-size:0.875rem;">+ Add Team Member</h4>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                            <div>
                                <label style="display: block; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;">Full Name</label>
                                <input type="text" id="addTeamName" style="width: 100%; padding: 8px 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-size:0.875rem;">
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;">Role / Title</label>
                                <input type="text" id="addTeamRole" style="width: 100%; padding: 8px 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-size:0.875rem;">
                            </div>
                        </div>
                        <div style="margin-bottom:16px;">
                            <label style="display: block; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;">Short Bio / Pedigree</label>
                            <input type="text" id="addTeamBio" placeholder="e.g. Ex-Google, Stanford CS, 2x founder" style="width: 100%; padding: 8px 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-size:0.875rem;">
                        </div>
                        <button type="button" id="addTeamActionBtn" class="btn btn-secondary" style="font-size:0.875rem;">Add Co-founder / Executive</button>
                    </div>
                </div>

                <div id="subtab-financials" class="profile-subtab">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 24px; color:var(--text-primary);">Financial metrics & Traction</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Revenue Status <span style="color: var(--danger);">*</span></label>
                            <select id="profRevStatus" required style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                <option value="">Select Status...</option>
                                <option value="Pre-revenue" ${this.state.financials.status === 'Pre-revenue' ? 'selected' : ''}>Pre-revenue</option>
                                <option value="Paid Pilots" ${this.state.financials.status === 'Paid Pilots' ? 'selected' : ''}>Paid Pilots</option>
                                <option value="revenue" ${this.state.financials.status === 'revenue' ? 'selected' : ''}>Revenue Generating</option>
                                <option value="Profitable" ${this.state.financials.status === 'Profitable' ? 'selected' : ''}>Profitable</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Monthly Recurring Revenue (MRR) <span style="color: var(--danger);">*</span></label>
                            <input id="profMrr" required type="text" value="${this.state.financials.mrr}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Monthly Burn Rate <span style="color: var(--danger);">*</span></label>
                            <input id="profBurn" required type="text" value="${this.state.financials.burn}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Runway Estimate (Months)</label>
                            <input id="profRunway" type="number" value="${this.state.financials.runway}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Traction Proof & Customer Growth Metrics</label>
                            <textarea id="profTraction" style="width: 100%; height: 100px; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); resize: none;">${this.state.financials.traction}</textarea>
                        </div>
                    </div>
                </div>

                <div id="subtab-raise" class="profile-subtab">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 24px; color:var(--text-primary);">Raise Details & Growth Roadmap</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Target Round Amount <span style="color: var(--danger);">*</span></label>
                            <input id="profRaiseTarget" required type="text" value="${this.state.raise.target}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Round Structuring</label>
                            <select id="profRaiseType" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                                <option ${this.state.raise.roundType === 'Pre-Seed' ? 'selected' : ''}>Pre-Seed</option>
                                <option ${this.state.raise.roundType === 'Seed' ? 'selected' : ''}>Seed</option>
                                <option ${this.state.raise.roundType === 'Series A' ? 'selected' : ''}>Series A</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Pre-money Valuation Range</label>
                            <input id="profValuation" type="text" value="${this.state.raise.valuation}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Equity Offered</label>
                            <input id="profEquity" type="text" value="${this.state.raise.equity}" style="width: 100%; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Detailed Use of Funds</label>
                            <textarea id="profUseOfFunds" style="width: 100%; height: 80px; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); resize: none;">${this.state.raise.useOfFunds}</textarea>
                        </div>
                        <div style="grid-column: span 2;">
                            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Milestone Growth Narrative</label>
                            <textarea id="profRaiseNarrative" placeholder="What milestones will this raise unlock over the next 18 months?" style="width: 100%; height: 100px; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); resize: none;">${this.state.raise.narrative}</textarea>
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 16px; border-top:1px solid var(--divider); padding-top:24px; margin-top:24px;">
                    <button type="button" id="saveDraftProfileBtn" class="btn btn-secondary" style="padding: 10px 24px; min-height: 40px;">Save Draft</button>
                    <button type="submit" class="btn btn-primary" style="padding: 10px 24px; min-height: 40px;">Save & Validate Details</button>
                </div>
            </form>
        `;
    }

    getPitchTabHtml() {
        const hasPitch = !!this.state.pitch.videoFile;

        const uploadStateView = !hasPitch ? `
            <div class="founder-card" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; padding: 32px; margin-bottom: 32px;">
                <div>
                    <h3 style="font-size: 1.3rem; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); font-family: 'Lora', serif;">Upload Pitch Video</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 24px; line-height: 1.5;">Enhance your profile with an optional elevator pitch. This video is <strong>only</strong> visible to matched investors who have passed the double opt-in phase.</p>
                    
                    <div id="pitchUploadCard" style="border: 2px dashed var(--border-subtle); background: var(--bg-base); padding: 32px; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--brand-secondary)'" onmouseout="this.style.borderColor='var(--border-subtle)'">
                        <input type="file" id="pitchVideoUploader" style="display: none;" accept="video/*">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--brand-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <h4 style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin: 0 0 4px 0;">Drag & drop video here</h4>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0 0 16px 0;">or click to browse local files</p>
                        <button id="browseVideoBtn" type="button" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 14px; min-height: 32px;">Browse Files</button>
                    </div>
                    
                    <div style="display: flex; gap: 24px; margin-top: 20px; font-size: 0.75rem; color: var(--text-muted);">
                        <div><strong>Formats:</strong> MP4, MOV (9:16 vertical)</div>
                        <div><strong>Duration:</strong> &lt; 3 mins</div>
                        <div><strong>Max Size:</strong> 500MB</div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 1px solid var(--divider); padding-left: 32px;">
                    <div style="width: 130px; height: 210px; background: rgba(0, 0, 0, 0.4); border: 2px dashed var(--border-subtle); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; box-shadow: inset 0 0 20px rgba(0,0,0,0.6);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                        <span style="font-size: 0.65rem; font-weight: 600; color: var(--text-disabled); text-transform: uppercase; letter-spacing: 0.05em;">Preview</span>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 12px; font-weight: 500;">No video uploaded yet</span>
                </div>
            </div>
        ` : `
            <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:32px; margin-bottom:32px;">
                <div class="founder-card" style="padding:24px; display:flex; flex-direction:column; align-items:center; margin-bottom: 0;">
                    <div style="position:relative; width:100%; max-width:280px; aspect-ratio:9/16; background:#000; border-radius:12px; overflow:hidden; display:flex; align-items:center; justify-content:center; border:2px solid var(--brand-secondary); box-shadow:var(--shadow-glow);">
                        <div id="mockVideoPlayBtn" style="width:64px; height:64px; border-radius:50%; background:rgba(15,107,111,0.9); display:flex; align-items:center; justify-content:center; font-size:1.5rem; color:#000; cursor:pointer; z-index:10; border:2px solid #fff;">▶</div>
                        
                        <div style="position:absolute; bottom:12px; left:12px; right:12px; z-index:5; background:rgba(0,0,0,0.5); padding:8px; border-radius:6px; display:flex; flex-direction:column; gap:4px;">
                            <div style="font-size:0.75rem; font-weight:600; color:#fff;">${this.state.company.name} Pitch</div>
                            <div style="width:100%; height:4px; background:#fff; border-radius:2px; overflow:hidden;">
                                <div style="width:30%; height:100%; background:var(--brand-secondary);"></div>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:#ccc;">
                                <span>0:40</span><span>2:15</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:16px; text-align:center;">
                        <div style="font-weight:600; font-size:0.875rem; color:var(--text-primary);">${this.state.pitch.videoFile.name}</div>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${this.state.pitch.videoFile.size} • Uploaded ${this.state.pitch.videoFile.date}</div>
                        <button id="deletePitchBtn" class="btn btn-secondary" style="margin-top:16px; color:var(--danger); border-color:var(--danger-soft); font-size:0.75rem; padding:6px 12px; min-height: 32px;">Delete Pitch</button>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; gap:24px;">
                    <div class="founder-card" style="padding:24px; margin-bottom: 0;">
                        <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:12px;">Cover / Thumbnail Setup</h4>
                        <div style="display:flex; gap:12px;">
                            <div class="thumb-opt ${this.state.pitch.thumbnail === 'mock_cover_1.jpg' ? 'selected' : ''}" data-thumb="mock_cover_1.jpg" style="width:64px; aspect-ratio:9/16; background:#222; border-radius:4px; border:2px solid ${this.state.pitch.thumbnail === 'mock_cover_1.jpg' ? 'var(--brand-secondary)' : 'transparent'}; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.65rem;">Cover 1</div>
                            <div class="thumb-opt ${this.state.pitch.thumbnail === 'mock_cover_2.jpg' ? 'selected' : ''}" data-thumb="mock_cover_2.jpg" style="width:64px; aspect-ratio:9/16; background:#333; border-radius:4px; border:2px solid ${this.state.pitch.thumbnail === 'mock_cover_2.jpg' ? 'var(--brand-secondary)' : 'transparent'}; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.65rem;">Cover 2</div>
                            <div class="thumb-opt ${this.state.pitch.thumbnail === 'mock_cover_3.jpg' ? 'selected' : ''}" data-thumb="mock_cover_3.jpg" style="width:64px; aspect-ratio:9/16; background:#444; border-radius:4px; border:2px solid ${this.state.pitch.thumbnail === 'mock_cover_3.jpg' ? 'var(--brand-secondary)' : 'transparent'}; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.65rem;">Cover 3</div>
                        </div>
                    </div>

                    <div class="founder-card" style="padding:24px; flex:1; display:flex; flex-direction:column; margin-bottom: 0;">
                        <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:12px;">Auto-generated Audio Transcript</h4>
                        <textarea id="profTranscript" style="width: 100%; flex:1; min-height: 120px; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); resize: none; font-size:0.875rem; font-family:inherit; line-height:1.5;">${this.state.pitch.transcript}</textarea>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
                            <span style="font-size:0.75rem; color:var(--text-muted);">Verify and edit transcript for automated search queries.</span>
                            <button id="saveTranscriptBtn" class="btn btn-secondary" style="font-size:0.75rem; padding:6px 12px; min-height: 32px;">Update Transcript</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const checklistPercent = hasPitch ? 100 : 80;
        const checklistCountText = hasPitch ? '5/5 checklist tasks complete' : '4/5 checklist tasks complete';

        return `
            ${this.getDependencyBannerHtml()}
            ${uploadStateView}

            <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; align-items: start; margin-top: 32px;">
                <div class="founder-card" style="margin-bottom: 0; padding: 32px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <h3 style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary); font-family: 'Lora', serif; margin: 0;">Pitch Checklist & Validation</h3>
                        <span style="font-size: 0.8rem; color: var(--brand-secondary); font-weight: 600;">${checklistCountText}</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; margin-bottom: 24px;">
                        <div style="width: ${checklistPercent}%; height: 100%; background: var(--brand-secondary); border-radius: 3px;"></div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.875rem;">
                            <span style="font-weight: 500;">Vertical 9:16 video</span>
                            <span class="badge ${hasPitch ? 'badge-success' : 'badge-danger'}" style="font-size: 9px; padding: 2px 6px;">${hasPitch ? 'Complete' : 'Incomplete'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.875rem;">
                            <span style="font-weight: 500;">10-second hook</span>
                            <span class="badge badge-success" style="font-size: 9px; padding: 2px 6px;">Complete</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.875rem;">
                            <span style="font-weight: 500;">Traction metric</span>
                            <span class="badge badge-success" style="font-size: 9px; padding: 2px 6px;">Complete</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.875rem;">
                            <span style="font-weight: 500;">Under 3 minutes</span>
                            <span class="badge badge-success" style="font-size: 9px; padding: 2px 6px;">Complete</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.875rem;">
                            <span style="font-weight: 500;">Ask & round fit</span>
                            <span class="badge badge-success" style="font-size: 9px; padding: 2px 6px;">Complete</span>
                        </div>
                    </div>
                </div>
                
                <div class="founder-card" style="margin-bottom: 0; padding: 32px;">
                    <h3 style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary); font-family: 'Lora', serif; margin: 0 0 16px 0;">Recording Guidelines</h3>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                                <h4 style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin: 0;">Lighting & Audio</h4>
                            </div>
                            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0 0 8px 0; line-height: 1.4;">Clear audio and framing improve pitch completion and comprehension. Record in a quiet room with light facing you.</p>
                            <a href="#" style="font-size: 0.7rem; color: var(--brand-secondary); font-weight: 600;">Learn more</a>
                        </div>
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                                <h4 style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin: 0;">Deck Synchronization</h4>
                            </div>
                            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0 0 8px 0; line-height: 1.4;">Place visual widgets/charts next to your face; our editor overlays Cap Table summaries automatically.</p>
                            <a href="#" style="font-size: 0.7rem; color: var(--brand-secondary); font-weight: 600;">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getDocumentsTabHtml() {
        const rowsHtml = this.state.documents.map(d => {
            const statusBadge = d.status === 'Approved' ? 
                `<span class="badge badge-success">Approved</span>` : 
                `<span class="badge badge-warning">Pending Review</span>`;
                
            const matchedDeals = this.state.pipeline.filter(deal => deal.stage !== 'Closed Lost');
            const shareCheckboxesHtml = matchedDeals.map(deal => {
                const isShared = d.sharedWith.includes(deal.investor);
                return `
                    <label style="display:flex; align-items:center; gap:8px; font-size:0.75rem; color:var(--text-primary); padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.02); cursor:pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-hover)';" onmouseout="this.style.background='transparent';">
                        <input type="checkbox" class="doc-share-toggle" data-doc-id="${d.id}" data-investor="${deal.investor}" ${isShared ? 'checked' : ''} style="accent-color: var(--brand-secondary); cursor: pointer; width: 14px; height: 14px;">
                        <span>${deal.investor}</span>
                    </label>
                `;
            }).join('');

            const sharedCount = d.sharedWith.length;
            const accessTriggerHtml = sharedCount === 0 ? `
                <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-muted); background:var(--bg-surface-2); border:1px solid var(--border-subtle); padding:6px 12px; border-radius:6px; font-weight:500; min-height:32px; transition: border-color 0.2s, background 0.2s;" onmouseover="this.style.borderColor='rgba(15, 107, 111, 0.3)'; this.style.background='var(--bg-hover)';" onmouseout="this.style.borderColor='var(--border-subtle)'; this.style.background='var(--bg-surface-2)';">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>Private (No Access)</span>
                    <span style="font-size: 8px; color: var(--text-muted); opacity: 0.5; margin-left: 2px;">▼</span>
                </div>
            ` : `
                <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--brand-secondary); background:var(--brand-secondary-soft); border:1px solid rgba(15, 107, 111, 0.2); padding:6px 12px; border-radius:6px; font-weight:600; min-height:32px; transition: border-color 0.2s, background 0.2s;" onmouseover="this.style.borderColor='rgba(15, 107, 111, 0.4)'; this.style.background='rgba(15, 107, 111, 0.12)';" onmouseout="this.style.borderColor='rgba(15, 107, 111, 0.2)'; this.style.background='var(--brand-secondary-soft)';">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Shared with ${sharedCount} VC${sharedCount === 1 ? '' : 's'}</span>
                    <span style="font-size: 8px; color: var(--brand-secondary); opacity: 0.8; margin-left: 2px;">▼</span>
                </div>
            `;

            const dropdownMatrixHtml = `
                <details class="access-dropdown" style="position: relative; display: inline-block;">
                    <summary style="list-style: none; outline: none; cursor: pointer;">
                        ${accessTriggerHtml}
                    </summary>
                    <div class="access-popover" style="position: absolute; right: 0; top: calc(100% + 8px); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px; z-index: 100; min-width: 220px; box-shadow: var(--shadow-lg);">
                        <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px; letter-spacing: 0.05em;">Investor Access Control</div>
                        ${shareCheckboxesHtml || '<span style="font-size:0.75rem; color:var(--text-muted); padding: 4px;">No active matches</span>'}
                    </div>
                </details>
            `;

            return `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 16px 24px; font-size: 0.875rem; font-weight: 500; color:var(--text-primary);">📄 ${d.name} <span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">(${d.size})</span></td>
                    <td style="padding: 16px 24px; font-size: 0.875rem; color: var(--text-secondary);">${d.category}</td>
                    <td style="padding: 16px 24px; font-size: 0.875rem; color: var(--text-secondary);">${d.type}</td>
                    <td style="padding: 16px 24px;">${statusBadge}</td>
                    <td style="padding: 16px 24px;">
                        ${dropdownMatrixHtml}
                    </td>
                </tr>
            `;
        }).join('');

        return `
            ${this.getDependencyBannerHtml()}
            <div class="file-upload-card" id="docDropZone" style="background: linear-gradient(135deg, var(--bg-surface) 0%, rgba(15, 107, 111, 0.04) 100%); border: 1px dashed rgba(15, 107, 111, 0.3); padding: 48px; border-radius: 16px; text-align: center; margin-bottom: 32px; transition: border-color 0.2s, background 0.2s; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);" onmouseover="this.style.borderColor='var(--brand-secondary)'; this.style.background='linear-gradient(135deg, var(--bg-surface) 0%, rgba(15, 107, 111, 0.08) 100%)';" onmouseout="this.style.borderColor='rgba(15, 107, 111, 0.3)'; this.style.background='linear-gradient(135deg, var(--bg-surface) 0%, rgba(15, 107, 111, 0.04) 100%)';">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--brand-secondary-soft); display: flex; align-items: center; justify-content: center; color: var(--brand-secondary); border: 1px solid rgba(15, 107, 111, 0.2); margin-bottom: 4px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </div>
                <h4 style="font-size:1.15rem; font-weight:600; color:var(--text-primary); margin:0;">Upload Diligence Files to Vault</h4>
                <p style="font-size:0.875rem; color:var(--text-secondary); margin:0; max-width: 480px; line-height: 1.5;">Drag & drop your files here, or click to browse. Supported formats: PDF, XLSX, CSV, ZIP. Max file size 100MB.</p>
                <input type="file" id="vaultDocUploader" style="display:none;" accept=".pdf,.xlsx,.csv,.zip">
                <button type="button" id="browseVaultBtn" class="btn btn-secondary" style="min-height: 40px; margin-top: 8px;">Select Files</button>
            </div>

            <div style="background: var(--bg-surface); border-radius: 12px; border: 1px solid var(--border-subtle); overflow: hidden;">
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border-subtle); background: var(--bg-hover);">
                            <th style="padding: 16px 24px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Document Name</th>
                            <th style="padding: 16px 24px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Category</th>
                            <th style="padding: 16px 24px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Requirements</th>
                            <th style="padding: 16px 24px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Verification</th>
                            <th style="padding: 16px 24px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Secure Sharing Access Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    }

    getPipelineTabHtml() {
        const parseAmount = (str) => {
            if (!str) return 0;
            return parseInt(str.replace(/[^0-9]/g, '')) || 0;
        };

        const formatAmount = (num) => {
            if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
            if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
            return `$${num}`;
        };

        const blockers = this.getOpenBlockers();
        let pipelineAlertHtml = '';
        if (!this.state.published) {
            const hasBlockers = blockers.length > 0;
            const alertText = hasBlockers ? 
                `Publishing Blocked: ${blockers[0]}. Complete all checklist items to unlock investor matchmaking.` : 
                `Startup profile is ready to go live. Publish now to launch matched investor loops.`;
            const alertBg = hasBlockers ? 'rgba(183, 80, 80, 0.1)' : 'rgba(63, 138, 87, 0.1)';
            const alertBorder = hasBlockers ? 'var(--danger)' : 'var(--success)';
            const alertColor = hasBlockers ? 'var(--danger)' : 'var(--success)';
            const btnText = hasBlockers ? 'Complete Checklist' : 'Publish Profile';
            
            pipelineAlertHtml = `
                <div style="background: ${alertBg}; border: 1px solid ${alertBorder}; color: var(--text-primary); padding: 12px 20px; border-radius: 8px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; gap: 16px; font-size: 0.85rem;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: ${alertColor}; font-weight: 700;">●</span>
                        <span>${alertText}</span>
                    </div>
                    <button class="btn btn-primary nav-trigger" data-target="readiness" style="font-size: 0.75rem; padding: 6px 12px; height: 28px; min-height: 28px; background: ${hasBlockers ? 'var(--brand-secondary)' : 'var(--success)'}; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">${btnText}</button>
                </div>
            `;
        } else {
            pipelineAlertHtml = `
                <div style="background: rgba(200, 164, 93, 0.1); border: 1px solid rgba(200, 164, 93, 0.3); color: var(--text-primary); padding: 16px 20px; border-radius: 8px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; font-size: 0.9rem;">
                    <span style="color: var(--accent); font-weight: 700; font-size: 1.2rem;">ℹ</span>
                    <span><strong>Double Opt-In Required:</strong> Investors are reviewing your anonymous profile. You must explicitly approve requests before contact information is shared.</span>
                </div>
            `;
        }

        const stages = ['Matched', 'Requested Intro', 'Intro Approved', 'Meeting Scheduled', 'Diligence', 'Closed Won', 'Closed Lost'];
        const stageColumnsHtml = stages.map(stage => {
            const deals = this.state.pipeline.filter(d => d.stage === stage);
            const totalVal = deals.reduce((sum, d) => sum + parseAmount(d.potentialAmount), 0);
            const totalPotentialStr = totalVal > 0 ? formatAmount(totalVal) : '';
            const highUrgencyCount = deals.filter(d => d.urgency === 'high').length;

            const cardsHtml = deals.map(d => {
                const actionButtonText = d.nextAction;
                const isActionable = d.urgency === 'high';
                const actionBtnClass = isActionable ? 'btn-primary' : 'btn-secondary';
                const actionBtnStyle = isActionable 
                    ? 'flex: 1; font-size: 0.75rem; font-weight: 600; min-height: 32px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer;' 
                    : 'flex: 1; font-size: 0.75rem; font-weight: 500; min-height: 32px; padding: 6px 12px; border: 1px solid var(--border-subtle); border-radius: 6px; cursor: pointer; opacity: 0.75;';

                const actionRowHtml = `
                    <div class="task-card-inline-actions">
                        <button class="deal-action-trigger-btn btn ${actionBtnClass}" data-deal-id="${d.id}" style="${actionBtnStyle}">
                            ${actionButtonText}
                        </button>
                        <button class="view-deal-details-btn btn btn-secondary" data-deal-id="${d.id}" title="View Details & Vault" style="width: 32px; height: 32px; min-height: 32px; min-width: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; border-color: var(--border-subtle); background: var(--bg-base); cursor: pointer; flex-shrink: 0;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </button>
                    </div>
                `;

                return `
                    <div class="investor-card" style="background: var(--bg-surface-2); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 12px; border-top: 2px solid ${stage === 'Closed Won' ? 'var(--success)' : stage === 'Closed Lost' ? 'var(--danger)' : 'var(--border-subtle)'}; box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px;">
                            <h4 style="font-size: 0.9rem; font-weight: 600; color:var(--text-primary); margin:0;">${d.investor}</h4>
                            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); white-space: nowrap;">${d.potentialAmount}</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px; flex-wrap: wrap;">
                            <span style="font-size: 0.65rem; font-weight: 700; color: var(--brand-secondary); background: var(--brand-secondary-soft); border: 1px solid rgba(15, 107, 111, 0.3); padding: 2px 6px; border-radius: 4px;">${d.score}% Fit</span>
                            <span style="font-size: 0.65rem; font-weight: 500; color: var(--text-muted); background: var(--bg-hover); padding: 2px 6px; border-radius: 4px;">${d.firmType}</span>
                        </div>
 
                        <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0 0 12px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.8em;">
                            ${d.notes}
                        </p>
 
                        <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 12px; border-top: 1px solid var(--border-subtle); padding-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                            <span>🕒 ${d.lastUpdated}</span>
                            <span>👤 Owner: ${d.owner}</span>
                        </div>
 
                        ${actionRowHtml}
                    </div>
                `;
            }).join('');

            const potentialBadge = totalPotentialStr ? `<span style="font-size:0.7rem; color:var(--text-muted); background:var(--bg-hover); border:1px solid var(--border-subtle); padding:1px 6px; border-radius:3px;">${totalPotentialStr}</span>` : '';
            const urgencyWarningBadge = highUrgencyCount > 0 ? `<span style="font-size:0.65rem; color:#ef4444; background:rgba(239, 68, 68, 0.15); border:1px solid rgba(239, 68, 68, 0.2); padding:1px 5px; border-radius:3px; font-weight:700; animation: pulse 2s infinite;">Urgent: ${highUrgencyCount}</span>` : '';

            let colBorder = 'var(--border-subtle)';
            if (stage === 'Closed Won') colBorder = 'var(--success)';
            else if (stage === 'Closed Lost') colBorder = 'var(--danger)';

            const colStyle = `background: var(--bg-surface); border: 1px solid var(--border-subtle); border-top: 3px solid ${colBorder}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);`;

            return `
                <div class="kanban-col" style="${colStyle} min-width: 320px; border-radius: 12px; display: flex; flex-direction: column; max-height: 800px;">
                    <div class="kanban-header" style="padding: 16px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; background: var(--bg-surface-2); border-top-left-radius: 9px; border-top-right-radius: 9px;">
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            <span style="color:var(--text-primary); font-size:0.875rem; font-weight:600;">${stage}</span>
                            <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 500;">${deals.length} active deal${deals.length === 1 ? '' : 's'}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            ${potentialBadge}
                            ${urgencyWarningBadge}
                        </div>
                    </div>
                    <div class="kanban-cards" style="padding: 16px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 16px;">
                        ${cardsHtml || '<div style="text-align:center; padding:48px 0; color:var(--text-muted); font-size:0.75rem; border: 1px dashed var(--border-subtle); border-radius: 8px; background: rgba(0,0,0,0.1);">No deals in this stage.</div>'}
                    </div>
                </div>
            `;
        }).join('');

        return `
            ${pipelineAlertHtml}
            <style>
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); }
                }
            </style>
            <div class="kanban-board">
                ${stageColumnsHtml}
            </div>
        `;
    }

    getMeetingsTabHtml() {
        const hasMeetings = this.state.meetings.length > 0;
        const listHtml = this.state.meetings.map(m => {
            const checklistHtml = m.deliverables.map((d, idx) => `
                <label style="display:flex; align-items:center; gap:12px; padding:12px 16px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; margin-bottom: 10px; cursor:pointer; transition: all 0.2s ease;" onmouseover="this.style.background='rgba(255,255,255,0.04)'; this.style.borderColor='rgba(255,255,255,0.08)';" onmouseout="this.style.background='rgba(255, 255, 255, 0.02)'; this.style.borderColor='rgba(255,255,255,0.04)';">
                    <input type="checkbox" class="deliverable-check" data-meet-id="${m.id}" data-idx="${idx}" ${d.done ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--brand-secondary); cursor: pointer;">
                    <span style="font-size:0.875rem; font-weight:500; color:var(--text-primary); ${d.done ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${d.task}</span>
                </label>
            `).join('');

            return `
                <div style="background:var(--bg-surface); border:1px solid rgba(255, 255, 255, 0.08); border-radius:18px; padding:32px; margin-bottom:32px; display:grid; grid-template-columns:1.5fr 1fr; gap:40px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);">
                    <div>
                        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                            <span class="badge badge-success">${m.status}</span>
                            <span style="font-size:0.875rem; color:var(--text-muted);">${m.date}</span>
                        </div>
                        <h3 style="font-size:1.25rem; font-weight:600; color:var(--text-primary); margin-bottom:8px;">${m.title}</h3>
                        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:20px;">${m.notes || 'No notes prep logged yet.'}</p>
                        
                        <div style="display:flex; gap:16px;">
                            <a href="${m.zoomUrl}" target="_blank" class="btn btn-primary" style="font-size:0.875rem; padding:10px 20px; min-height: 40px;">Join Zoom Meeting</a>
                            <button class="edit-meeting-notes-btn btn btn-secondary" data-meet-id="${m.id}" style="font-size:0.875rem; padding:10px 20px; min-height: 40px;">Edit Prep Notes & Outcome</button>
                        </div>
                    </div>
                    
                    <div style="border-left:1px solid var(--divider); padding-left:32px;">
                        <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:16px; font-size:0.95rem; letter-spacing: -0.01em;">Meeting Deliverables Checklist</h4>
                        ${checklistHtml}
                    </div>
                </div>
            `;
        }).join('');

        return `
            ${this.getDependencyBannerHtml()}
            <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-subtle); margin-bottom:24px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="font-size:1rem; font-weight:600; color:var(--text-primary); margin:0 0 4px 0;">Zoom & Calendar Integrations</h3>
                    <p style="font-size:0.875rem; color:var(--text-secondary); margin:0;">Platform coordinator automatically generates calendar files and links.</p>
                </div>
                <button id="OutlookSyncBtn" class="btn btn-secondary" style="min-height: 40px;">Sync Integrations</button>
            </div>

            ${listHtml || '<div style="background:var(--bg-surface); padding:48px; text-align:center; border-radius:12px; border:1px solid var(--border-subtle); color:var(--text-muted);">No coordinated meetings scheduled. Match loops are processing.</div>'}
        `;
    }

    getInsightsTabHtml() {
        return `
            ${this.getDependencyBannerHtml()}
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px;">
                <!-- Card 1 -->
                <div class="founder-card metric-click-trigger" data-metric="profile-views" style="cursor:pointer; margin-bottom: 0;">
                    <h4 style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:12px;">Profile Discovery Impressions</h4>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                        <div>
                            <h2 style="font-size:2.25rem; font-weight:500; color:var(--text-primary); margin-bottom:4px; font-variant-numeric: tabular-nums;">45</h2>
                            <p style="font-size:0.75rem; color:var(--success); margin:0;">📈 +15% views this week</p>
                        </div>
                        <span style="font-size:0.75rem; color:var(--brand-secondary); text-decoration:underline;">Audit Views Log</span>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="founder-card metric-click-trigger" data-metric="pitch-views" style="cursor:pointer; margin-bottom: 0;">
                    <h4 style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:12px;">Pitch Video Retention Rate</h4>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                        <div>
                            <h2 style="font-size:2.25rem; font-weight:500; color:var(--text-primary); margin-bottom:4px; font-variant-numeric: tabular-nums;">72%</h2>
                            <p style="font-size:0.75rem; color:var(--success); margin:0;">📈 Top 15% of active startups</p>
                        </div>
                        <span style="font-size:0.75rem; color:var(--brand-secondary); text-decoration:underline;">Inspect Watchtimes</span>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="founder-card metric-click-trigger" data-metric="dataroom-requests" style="cursor:pointer; margin-bottom: 0;">
                    <h4 style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:12px;">Active Vault Key Shares</h4>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                        <div>
                            <h2 style="font-size:2.25rem; font-weight:500; color:var(--text-primary); margin-bottom:4px; font-variant-numeric: tabular-nums;">3</h2>
                            <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">Hold secure diligence permissions</p>
                        </div>
                        <span style="font-size:0.75rem; color:var(--brand-secondary); text-decoration:underline;">Manage Vault Keys</span>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="founder-card metric-click-trigger" data-metric="acceptance-rate" style="cursor:pointer; margin-bottom: 0;">
                    <h4 style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:12px;">Co-Investment Match Rate</h4>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                        <div>
                            <h2 style="font-size:2.25rem; font-weight:500; color:var(--text-primary); margin-bottom:4px; font-variant-numeric: tabular-nums;">85%</h2>
                            <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">Introduce requests approved</p>
                        </div>
                        <span style="font-size:0.75rem; color:var(--brand-secondary); text-decoration:underline;">Acceptance Details</span>
                    </div>
                </div>
            </div>

            <!-- Custom Spec Analytics Graphics -->
            <div class="founder-card" style="margin-bottom: 0; padding: 32px;">
                <h3 style="font-size:1.15rem; font-weight:500; color:var(--text-primary); margin-bottom:24px; font-family: 'Lora', Georgia, serif;">Weekly Funnel Traction Activity</h3>
                <div style="display:flex; flex-direction:column; gap:16px;">
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px;">
                            <span>1. Profile Swipe Impressions</span>
                            <span style="font-variant-numeric: tabular-nums; font-weight: 600;">120 VCs</span>
                        </div>
                        <div style="height:8px; background:var(--bg-base); border-radius:4px; overflow:hidden;">
                            <div style="width:100%; height:100%; background:var(--brand-secondary); border-radius:4px;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px;">
                            <span>2. 10s Hook Watch Completion</span>
                            <span style="font-variant-numeric: tabular-nums; font-weight: 600;">45 VCs (37%)</span>
                        </div>
                        <div style="height:8px; background:var(--bg-base); border-radius:4px; overflow:hidden;">
                            <div style="width:37%; height:100%; background:var(--brand-secondary); border-radius:4px;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px;">
                            <span>3. Deck / Story Downloads</span>
                            <span style="font-variant-numeric: tabular-nums; font-weight: 600;">12 VCs (10%)</span>
                        </div>
                        <div style="height:8px; background:var(--bg-base); border-radius:4px; overflow:hidden;">
                            <div style="width:10%; height:100%; background:var(--success); border-radius:4px;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px;">
                            <span>4. Diligence Introduction Requests</span>
                            <span style="font-variant-numeric: tabular-nums; font-weight: 600;">4 VCs (3%)</span>
                        </div>
                        <div style="height:8px; background:var(--bg-base); border-radius:4px; overflow:hidden;">
                            <div style="width:3%; height:100%; background:var(--brand-secondary); border-radius:4px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSettingsTabHtml() {
        return `
            <div style="display: flex; gap: 24px; margin-bottom: 32px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
                <span class="settings-trigger active" data-subtab="general">Security & Privacy Settings</span>
                <span class="settings-trigger" data-subtab="billing">Subscription Plan & Billing</span>
            </div>

            <!-- Tab: Security & General -->
            <div id="settings-general" class="settings-subtab active" style="display:flex; flex-direction:column; gap:24px;">
                <div style="background: var(--bg-surface); padding: 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px; color:var(--text-primary);">Network Privacy Settings</h3>
                    <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:24px;">Configure how matching VCs inspect your round on discovery timelines.</p>

                    <div style="display:flex; flex-direction:column; gap:20px;">
                        <label style="display:flex; align-items:flex-start; gap:12px; cursor:pointer;">
                            <input type="checkbox" id="settMaskToggle" ${this.state.identityMasking ? 'checked' : ''} style="margin-top:4px;">
                            <div>
                                <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary); display:block;">Secure Startup Identity Masking</span>
                                <span style="font-size:0.75rem; color:var(--text-muted);">Mask startup name as "FinTech compliance automation tool" until mutual introduction handshake occurs.</span>
                            </div>
                        </label>

                        <label style="display:flex; align-items:flex-start; gap:12px; cursor:pointer;">
                            <input type="checkbox" id="settNdaToggle" ${this.state.requireNDA ? 'checked' : ''} style="margin-top:4px;">
                            <div>
                                <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary); display:block;">Automated NDA Enforcement</span>
                                <span style="font-size:0.75rem; color:var(--text-muted);">Require VC partners to agree to our standard mutual platform NDA before unlock files keys.</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div style="background: var(--bg-surface); padding: 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px; color:var(--text-primary);">KYC Compliance Certification</h3>
                    <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:24px;">Verification logs synced to identity registry logs.</p>
                    
                    <div style="background:var(--bg-base); padding:20px; border-radius:6px; border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">Verification Registry: Plaid Check status</div>
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Last checked: Just now &middot; Reference: PLD-998822</div>
                        </div>
                        <span class="badge badge-success" style="padding:6px 12px;">VERIFIED SUCCESS</span>
                    </div>
                </div>
            </div>

            <!-- Tab: Billing -->
            <div id="settings-billing" class="settings-subtab" style="display:flex; flex-direction:column; gap:24px;">
                <div style="background: var(--bg-surface); padding: 40px; border-radius: 12px; border: 1px solid var(--border-subtle);">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--divider); padding-bottom:20px; margin-bottom:20px;">
                        <div>
                            <h3 style="font-size:1.25rem; font-weight:600; color:var(--text-primary); margin:0 0 6px 0;">Subscription tier: ${this.state.settingsPlan}</h3>
                            <p style="font-size:0.875rem; color:var(--text-secondary); margin:0;">Comprehensive profile matchmaking loops unlocked.</p>
                        </div>
                        <span class="badge badge-success" style="padding:6px 12px; font-weight:600;">ACTIVE PLAN</span>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:32px;">
                        <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--divider);">
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase; font-weight:600;">Matchmaking Intro Credits</div>
                            <div style="font-size:1.5rem; font-weight:700; color:var(--text-primary);">${this.state.creditsIntros} remaining</div>
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Resets on next calendar month.</div>
                        </div>
                        <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--divider);">
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase; font-weight:600;">Active Diligence vaults</div>
                            <div style="font-size:1.5rem; font-weight:700; color:var(--text-primary);">${this.state.creditsVaults} unlocked</div>
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Permits separate secure share loops.</div>
                        </div>
                    </div>

                    <div style="background:var(--brand-secondary-soft); border: 1px solid var(--brand-secondary); padding:20px; border-radius:6px;">
                        <h4 style="font-weight:600; color:var(--brand-secondary); margin-bottom:8px; font-size:0.95rem;">Success Fee Agreement</h4>
                        <p style="font-size:0.875rem; color:var(--text-secondary); margin:0; line-height:1.5;">Funding Easy operates under a transparent success fee calculated upon closure of coordinated capital allocations. There are zero listing or listing-gated pipeline listing charges.</p>
                    </div>
                </div>
            </div>
        `;
    }

    getPreviewModalHtml() {
        const kycBadge = this.state.kycVerified ? 
            `<span class="badge badge-success">KYC Cleared</span>` : 
            `<span class="badge badge-danger">KYC Needed</span>`;
            
        const pitchText = this.isPitchComplete() ? 
            `<span class="badge badge-success">Pitch Uploaded</span>` : 
            `<span class="badge badge-warning">Pitch Video Missing</span>`;

        return `
            <div class="modal-content" style="max-width:800px; padding:32px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--border-subtle); padding-bottom:16px;">
                    <div>
                        <h2 style="font-size:1.5rem; font-weight:600; color:var(--text-primary); margin:0;">VC Portfolio View: ${this.state.company.name}</h2>
                        <span style="font-size:0.75rem; color:var(--text-muted);">How matched VCs inspect your round on the swiping timeline feed</span>
                    </div>
                    <button id="closePreviewBtn" style="background:transparent; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer;">✕</button>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:32px;">
                    <div style="background:#000; border-radius:12px; border:2px solid var(--brand-secondary); aspect-ratio:9/16; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center;">
                        <span style="font-size:1.5rem; color:#fff; font-weight:700; z-index:2; text-align:center;">Elevator Pitch<br><span style="font-size:0.8rem; font-weight:500; color:var(--brand-secondary);">${this.state.pitch.videoFile ? 'Video Ready <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-left:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>' : 'Video Missing <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-left:4px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}</span></span>
                        <div style="position:absolute; bottom:16px; left:16px; right:16px; z-index:5; background:rgba(0,0,0,0.7); padding:10px; border-radius:8px; font-size:0.75rem; border:1px solid rgba(255,255,255,0.1);">
                            <div style="font-weight:600; color:#fff;">${this.state.company.name}</div>
                            <div style="color:#aaa; font-size:0.65rem; margin-top:2px;">${this.state.company.tagline}</div>
                        </div>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:20px; overflow-y:auto; max-height:480px;">
                        <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--border-subtle);">
                            <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:8px; font-size:0.9rem;">Start-up Credentials</h4>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.8rem; color:var(--text-secondary);">
                                <div><strong>HQ Location:</strong> ${this.state.company.hq}</div>
                                <div><strong>Stage / Sector:</strong> ${this.state.company.stage} • ${this.state.company.sector}</div>
                                <div><strong>KYC Status:</strong> ${kycBadge}</div>
                                <div><strong>Pitch Status:</strong> ${pitchText}</div>
                            </div>
                        </div>

                        <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--border-subtle);">
                            <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:8px; font-size:0.9rem;">Financial Metrics</h4>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.8rem; color:var(--text-secondary);">
                                <div><strong>Revenue status:</strong> ${this.state.financials.status}</div>
                                <div><strong>MRR / Burn:</strong> ${this.state.financials.mrr} / ${this.state.financials.burn}</div>
                                <div><strong>Runway (months):</strong> ${this.state.financials.runway}</div>
                                <div style="grid-column:span 2; margin-top:6px;"><strong>Traction Proof:</strong> ${this.state.financials.traction}</div>
                            </div>
                        </div>

                        <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--border-subtle);">
                            <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:8px; font-size:0.9rem;">Target Round Details</h4>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.8rem; color:var(--text-secondary);">
                                <div><strong>Target Raising:</strong> ${this.state.raise.target}</div>
                                <div><strong>Equity offered:</strong> ${this.state.raise.equity}</div>
                                <div style="grid-column:span 2;"><strong>Valuation:</strong> ${this.state.raise.valuation}</div>
                                <div style="grid-column:span 2; margin-top:6px;"><strong>Funds breakdown:</strong> ${this.state.raise.useOfFunds}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getDetailsModalHtml() {
        const deal = this.state.pipeline.find(d => d.id === this.state.selectedDealId);
        if(!deal) return `<h3>Match Error</h3>`;

        const steps = ['Matched', 'Requested Intro', 'Intro Approved', 'Meeting Scheduled', 'Diligence', 'Closed Won'];
        const currentIdx = steps.indexOf(deal.stage);
        
        const stepperStepsHtml = steps.map((s, idx) => {
            let stateClass = '';
            if (idx < currentIdx) stateClass = 'completed';
            else if (idx === currentIdx) stateClass = 'active';
            
            let iconText = '🔵';
            if (idx < currentIdx) iconText = '✓';
            else if (idx === currentIdx) {
                if (s === 'Closed Won') iconText = '🏆';
                else if (s === 'Closed Lost') iconText = '✕';
                else iconText = '●';
            }

            return `
                <div class="stepper-step ${stateClass}">
                    <div class="stepper-icon" style="${idx > currentIdx ? 'filter:grayscale(1); opacity:0.4;' : ''}">${iconText}</div>
                    <div class="stepper-label">${s}</div>
                </div>
            `;
        }).join('');

        const vaultDocsChecklistHtml = this.state.documents.map(d => {
            const isShared = d.sharedWith.includes(deal.investor);
            return `
                <label style="display:flex; align-items:center; gap:8px; font-size:0.875rem; color:var(--text-primary); margin-bottom:8px; cursor:pointer;">
                    <input type="checkbox" class="deal-share-toggle" data-doc-id="${d.id}" data-investor="${deal.investor}" ${isShared ? 'checked' : ''}>
                    <span>${d.name} <span style="font-size:0.75rem; color:var(--text-muted);">(${d.category})</span></span>
                </label>
            `;
        }).join('');

        return `
            <div class="modal-content" style="max-width:700px; padding:32px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--border-subtle); padding-bottom:16px;">
                    <div>
                        <h2 style="font-size:1.5rem; font-weight:600; color:var(--text-primary); margin:0;">Match details: ${deal.investor}</h2>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${deal.firmType}</span>
                    </div>
                    <button id="closeDetailsBtn" style="background:transparent; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer;">✕</button>
                </div>

                <div style="background:var(--bg-base); padding:20px; border-radius:6px; border:1px solid var(--border-subtle); margin-bottom:24px;">
                    <h4 style="font-weight:600; color:var(--text-primary); margin:0 0 16px 0; font-size:0.875rem;">Pipeline deal state:</h4>
                    <div class="deal-stepper" style="margin:0; padding:16px 0;">
                        ${stepperStepsHtml}
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:24px; margin-bottom:24px;">
                    <div>
                        <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:16px; font-size:0.875rem;">Activity Timeline Logs</h4>
                        <div style="position: relative; padding-left: 20px; border-left: 2px solid var(--border-subtle); margin-left: 8px; display: flex; flex-direction: column; gap: 16px;">
                            ${deal.history.map((h, i) => {
                                const time = h.time;
                                const text = h.action;
                                const isLast = i === deal.history.length - 1;
                                return `
                                    <div style="position: relative;">
                                        <div style="position: absolute; left: -26px; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: ${isLast ? 'var(--brand-secondary)' : 'var(--text-muted)'}; border: 2px solid var(--bg-surface); box-shadow: ${isLast ? '0 0 8px var(--brand-secondary)' : 'none'};"></div>
                                        <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 500;">${time}</div>
                                        <div style="font-size: 0.82rem; color: ${isLast ? 'var(--text-primary)' : 'var(--text-secondary)'}; font-weight: ${isLast ? '600' : '400'}; margin-top: 2px;">${text}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div style="border-left:1px solid var(--divider); padding-left:24px;">
                        <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:12px; font-size:0.875rem;">Diligence sharing access</h4>
                        ${vaultDocsChecklistHtml}
                    </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--divider); padding-top:20px;">
                    <div>
                        <select id="dealStageSelector" style="padding:8px 12px; background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:4px; color:var(--text-primary); font-size:0.8rem; cursor:pointer;">
                            <option value="">Move Deal stage...</option>
                            ${steps.map(s => `<option value="${s}" ${deal.stage === s ? 'selected' : ''}>${s}</option>`).join('')}
                            <option value="Closed Lost" ${deal.stage === 'Closed Lost' ? 'selected' : ''}>Closed Lost</option>
                        </select>
                    </div>
                    <div style="display:flex; gap:12px;">
                        <button id="dealCloseLostBtn" class="btn btn-secondary" style="color:var(--danger); border-color:var(--danger-soft); min-height: 36px;">Close (Lost)</button>
                        <button id="dealNudgeBtn" class="btn btn-primary" style="min-height: 36px;">Nudge Admin Assistant</button>
                    </div>
                </div>
            </div>
        `;
    }

    getMeetingModalHtml() {
        const meet = this.state.meetings.find(m => m.id === this.state.selectedMeetingId);
        if(!meet) return `<h3>Meeting Error</h3>`;

        const outcomeOptions = ['Advance to Diligence', 'Request Follow-up Meeting', 'Closed Lost'];

        return `
            <div class="modal-content" style="max-width:650px; padding:32px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--border-subtle); padding-bottom:16px;">
                    <div>
                        <h2 style="font-size:1.5rem; font-weight:600; color:var(--text-primary); margin:0;">Intro Log: ${meet.title}</h2>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${meet.date}</span>
                    </div>
                    <button id="closeMeetingBtn" style="background:transparent; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer;">✕</button>
                </div>

                <div style="margin-bottom:20px;">
                    <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:8px; font-size:0.875rem;">Intro Agenda</h4>
                    <ul style="font-size:0.875rem; color:var(--text-secondary); margin:0; padding-left:16px;">
                        ${meet.agenda.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>

                <div style="margin-bottom:20px;">
                    <label style="display:block; font-weight:600; color:var(--text-primary); margin-bottom:8px; font-size:0.875rem;">Founder prep / meeting Notes</label>
                    <textarea id="meetNotesText" placeholder="Write key outcomes or VC feedback here..." style="width:100%; height:120px; padding:12px; background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:4px; color:var(--text-primary); resize:none; font-size:0.875rem; font-family:inherit;">${meet.notes}</textarea>
                </div>

                <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:20px; margin-bottom:24px; border-top:1px solid var(--divider); padding-top:20px;">
                    <div>
                        <label style="display:block; font-size:0.875rem; font-weight:600; color:var(--text-primary); margin-bottom:8px;">Meeting outcome status</label>
                        <select id="meetOutcomeSelect" style="width:100%; padding:8px 12px; background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:4px; color:var(--text-primary); font-size:0.875rem; cursor:pointer;">
                            <option value="">Choose Outcome...</option>
                            ${outcomeOptions.map(o => `<option value="${o}">${o}</option>`).join('')}
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:flex-end;">
                        <button id="saveMeetingOutcomeBtn" class="btn btn-primary" style="width:100%; padding:10px; min-height: 36px;">Log Call Outcome</button>
                    </div>
                </div>
            </div>
        `;
    }

    getMetricModalHtml(metricKey) {
        let title = '';
        let subtitle = '';
        let bodyHtml = '';

        if (metricKey === 'diligence-access') {
            title = 'Diligence Vault Access & Requests';
            subtitle = 'VC partners requesting document access or holding active vault keys.';
            
            const sharedDocsHtml = this.state.documents.map(doc => {
                const isSharedClimate = doc.sharedWith.includes('Climate Capital');
                const isSharedAccel = doc.sharedWith.includes('Accel Partners');
                const isSharedApex = doc.sharedWith.includes('Apex Capital');
                const isSharedSequoia = doc.sharedWith.includes('Sequoia India');

                return `
                    <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--border-subtle); margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">📄 ${doc.name}</span>
                            <span class="badge" style="background:var(--brand-secondary-soft); color:var(--brand-secondary); font-size:0.7rem;">${doc.category}</span>
                        </div>
                        <div style="display:flex; flex-wrap:wrap; gap:10px;">
                            <label style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-secondary); cursor:pointer;">
                                <input type="checkbox" class="modal-share-toggle" data-doc-id="${doc.id}" data-investor="Climate Capital" ${isSharedClimate ? 'checked' : ''}>
                                Climate Capital (Diligence Stage)
                            </label>
                            <label style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-secondary); cursor:pointer;">
                                <input type="checkbox" class="modal-share-toggle" data-doc-id="${doc.id}" data-investor="Accel Partners" ${isSharedAccel ? 'checked' : ''}>
                                Accel Partners (Matched Stage)
                            </label>
                            <label style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-secondary); cursor:pointer;">
                                <input type="checkbox" class="modal-share-toggle" data-doc-id="${doc.id}" data-investor="Apex Capital" ${isSharedApex ? 'checked' : ''}>
                                Apex Capital
                            </label>
                            <label style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-secondary); cursor:pointer;">
                                <input type="checkbox" class="modal-share-toggle" data-doc-id="${doc.id}" data-investor="Sequoia India" ${isSharedSequoia ? 'checked' : ''}>
                                Sequoia India
                            </label>
                        </div>
                    </div>
                `;
            }).join('');

            bodyHtml = `
                <div style="margin-bottom:20px;">
                    <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.2); padding:12px; border-radius:6px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; color:#ef4444; font-weight:600; display:inline-flex; align-items:center; gap:6px;">${ICONS.alert} Climate Capital is waiting on Cap Table and Financials access</span>
                        <button id="grantClimateAllBtn" class="btn btn-primary" style="font-size:0.75rem; padding:4px 10px;">Grant Access</button>
                    </div>
                    <h4 style="font-weight:600; color:var(--text-primary); margin-bottom:12px; font-size:0.875rem;">Document-Level Sharing Checklist:</h4>
                    ${sharedDocsHtml}
                </div>
            `;
        } else if (metricKey === 'profile-views') {
            title = 'Profile Views Audit Log';
            subtitle = 'Trace VCs who viewed your startup in their swipe discovery feed.';
            
            bodyHtml = `
                <div style="margin-bottom:20px;">
                    <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.875rem;">
                        <thead>
                            <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                                <th style="padding:10px 0;">Investor Firm</th>
                                <th style="padding:10px 0;">Fit Score</th>
                                <th style="padding:10px 0;">Timestamp</th>
                                <th style="padding:10px 0; text-align:right;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Bessemer Venture Partners</td>
                                <td style="padding:12px 0; color:var(--brand-secondary); font-weight:700;">90% Fit</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">4 hours ago</td>
                                <td style="padding:12px 0; text-align:right;"><button class="btn btn-secondary nudge-vc-btn" data-vc="Bessemer" style="font-size:0.7rem; padding:4px 8px;">Nudge Intro</button></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Benchmark Capital</td>
                                <td style="padding:12px 0; color:var(--brand-secondary); font-weight:700;">88% Fit</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">Yesterday</td>
                                <td style="padding:12px 0; text-align:right;"><button class="btn btn-secondary nudge-vc-btn" data-vc="Benchmark" style="font-size:0.7rem; padding:4px 8px;">Nudge Intro</button></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Founders Fund</td>
                                <td style="padding:12px 0; color:var(--brand-secondary); font-weight:700;">92% Fit</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">2 days ago</td>
                                <td style="padding:12px 0; text-align:right;"><button class="btn btn-secondary nudge-vc-btn" data-vc="Founders Fund" style="font-size:0.7rem; padding:4px 8px;">Nudge Intro</button></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Accel Partners</td>
                                <td style="padding:12px 0; color:var(--brand-secondary); font-weight:700;">94% Fit</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">June 1, 2:15 PM</td>
                                <td style="padding:12px 0; text-align:right;"><span style="font-size:0.7rem; color:var(--brand-secondary); font-weight:600;">Handoff Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (metricKey === 'pitch-views') {
            title = 'Pitch Video Views & Engagement Logs';
            subtitle = 'Trace VC specific watch durations and attention CTR triggers.';
            
            bodyHtml = `
                <div style="margin-bottom:20px;">
                    <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.875rem;">
                        <thead>
                            <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                                <th style="padding:10px 0;">Investor</th>
                                <th style="padding:10px 0;">Watch Duration</th>
                                <th style="padding:10px 0;">Completed %</th>
                                <th style="padding:10px 0; text-align:right;">Engagement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Accel Partners</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">2m 15s</td>
                                <td style="padding:12px 0; color:var(--success); font-weight:600;">100% (Complete)</td>
                                <td style="padding:12px 0; text-align:right;"><button class="btn btn-primary nudge-vc-btn" data-vc="Accel" style="font-size:0.7rem; padding:4px 8px;">Request Sync</button></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Sequoia India</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">2m 15s</td>
                                <td style="padding:12px 0; color:var(--success); font-weight:600;">100% (Complete)</td>
                                <td style="padding:12px 0; text-align:right;"><button class="btn btn-secondary nudge-vc-btn" data-vc="Sequoia" style="font-size:0.7rem; padding:4px 8px;">Nudge</button></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Climate Capital</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">1m 20s</td>
                                <td style="padding:12px 0; color:#f0b35a; font-weight:600;">60% (Hook met)</td>
                                <td style="padding:12px 0; text-align:right;"><span style="color:var(--text-muted); font-size:0.75rem;">In Diligence</span></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--divider);">
                                <td style="padding:12px 0; font-weight:600; color:var(--text-primary);">Bessemer Venture Partners</td>
                                <td style="padding:12px 0; color:var(--text-secondary);">0m 15s</td>
                                <td style="padding:12px 0; color:#e08b8b; font-weight:600;">10% (Dropped)</td>
                                <td style="padding:12px 0; text-align:right;"><span style="color:var(--text-muted); font-size:0.75rem;">Low retention</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (metricKey === 'dataroom-requests') {
            title = 'Secure Data Room Access Audits';
            subtitle = 'Audit VCs holding permissioned access keys to secure vault documents.';
            
            const reqListHtml = this.state.documents.map(doc => {
                const sharedInvestors = doc.sharedWith;
                const sharesList = sharedInvestors.length > 0
                    ? sharedInvestors.map(inv => `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-base); padding:8px 12px; border-radius:4px; margin-top:6px; font-size:0.75rem; border:1px solid var(--border-subtle);">
                            <span style="color:var(--text-primary); font-weight:600;">🔑 ${inv}</span>
                            <button class="revoke-access-direct-btn" data-doc-id="${doc.id}" data-investor="${inv}" style="background:transparent; border:none; color:var(--danger); cursor:pointer; font-size:0.75rem; font-weight:600;">Revoke Access</button>
                        </div>
                    `).join('')
                    : `<div style="font-size:0.75rem; color:var(--text-muted); padding:6px 0;">No active shares for this document.</div>`;

                return `
                    <div style="background:var(--bg-surface-2); padding:16px; border-radius:6px; border:1px solid var(--border-subtle); margin-bottom:12px;">
                        <div style="font-size:0.875rem; font-weight:600; color:var(--text-primary); margin-bottom:6px;">📄 ${doc.name}</div>
                        <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-bottom:8px;">Category: ${doc.category}</div>
                        <div>
                            <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-bottom:4px;">Authorized Viewers:</div>
                            ${sharesList}
                        </div>
                    </div>
                `;
            }).join('');

            bodyHtml = `
                <div style="margin-bottom:20px;">
                    ${reqListHtml}
                </div>
            `;
        } else if (metricKey === 'acceptance-rate') {
            title = 'Match Acceptance Analytics';
            subtitle = 'Pipeline segmentation of algorithmic co-investment interest.';
            
            const approvedDeals = this.state.pipeline.filter(d => d.stage !== 'Matched');
            const pendingDeals = this.state.pipeline.filter(d => d.stage === 'Matched');

            bodyHtml = `
                <div style="margin-bottom:20px;">
                    <h4 style="font-weight:600; color:var(--brand-secondary); margin-bottom:12px; font-size:0.875rem;">Approved Matches (${approvedDeals.length})</h4>
                    <div style="margin-bottom:20px;">
                        ${approvedDeals.map(d => `
                            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-2); padding:12px 16px; border-radius:6px; border:1px solid var(--border-subtle); margin-bottom:8px;">
                                <div>
                                    <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">${d.investor}</span>
                                    <span style="font-size:0.7rem; color:var(--text-muted); margin-left:6px;">(${d.firmType})</span>
                                </div>
                                <span class="badge" style="background:var(--brand-secondary-soft); color:var(--brand-secondary); font-size:0.75rem; padding:4px 8px;">Stage: ${d.stage}</span>
                            </div>
                        `).join('')}
                    </div>

                    <h4 style="font-weight:600; color:#f0b35a; margin-bottom:12px; font-size:0.875rem;">Pending Matching Approval (${pendingDeals.length})</h4>
                    <div>
                        ${pendingDeals.map(d => `
                            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-2); padding:12px 16px; border-radius:6px; border:1px solid var(--border-subtle); margin-bottom:8px;">
                                <div>
                                    <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">${d.investor}</span>
                                    <span style="font-size:0.7rem; color:var(--text-muted); margin-left:6px;">(${d.firmType})</span>
                                </div>
                                <button class="btn btn-primary approve-intro-direct-btn" data-deal-id="${d.id}" style="font-size:0.7rem; padding:6px 12px;">Approve Intro Request</button>
                            </div>
                        `).join('') || '<div style="font-size:0.75rem; color:var(--text-muted);">No pending approvals.</div>'}
                    </div>
                </div>
            `;
        }

        return `
            <div class="modal-content" style="max-width:650px; padding:32px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-subtle); padding-bottom:16px;">
                    <div>
                        <h2 style="font-size:1.5rem; font-weight:600; color:var(--text-primary); margin:0;">${title}</h2>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${subtitle}</span>
                    </div>
                    <button id="closeMetricBtn" style="background:transparent; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer;">✕</button>
                </div>
                ${bodyHtml}
            </div>
        `;
    }

    attachMetricModalListeners(metricKey) {
        const closeBtn = document.getElementById('closeMetricBtn');
        const modal = document.getElementById('metricModal');
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        const grantClimateBtn = document.getElementById('grantClimateAllBtn');
        if (grantClimateBtn) {
            grantClimateBtn.addEventListener('click', () => {
                this.state.documents.forEach(doc => {
                    if (!doc.sharedWith.includes('Climate Capital')) {
                        doc.sharedWith.push('Climate Capital');
                    }
                });
                this.showToast("Granted Climate Capital access keys to all diligence vault items.");
                this.renderAll();
                modal.style.display = 'none';
            });
        }

        const toggles = document.querySelectorAll('.modal-share-toggle');
        toggles.forEach(t => {
            t.addEventListener('change', () => {
                const docId = t.dataset.docId;
                const investor = t.dataset.investor;
                const doc = this.state.documents.find(d => d.id === docId);
                if (doc) {
                    if (t.checked) {
                        if (!doc.sharedWith.includes(investor)) {
                            doc.sharedWith.push(investor);
                            this.showToast(`Granted ${investor} secure access to ${doc.name}.`);
                        }
                    } else {
                        doc.sharedWith = doc.sharedWith.filter(i => i !== investor);
                        this.showToast(`Revoked ${investor} access rights to ${doc.name}.`);
                    }
                    this.renderAll();
                    modal.innerHTML = this.getMetricModalHtml(metricKey);
                    this.attachMetricModalListeners(metricKey);
                }
            });
        });

        const revokeBtns = document.querySelectorAll('.revoke-access-direct-btn');
        revokeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const docId = btn.dataset.docId;
                const investor = btn.dataset.investor;
                const doc = this.state.documents.find(d => d.id === docId);
                if (doc) {
                    doc.sharedWith = doc.sharedWith.filter(i => i !== investor);
                    this.showToast(`Revoked ${investor} access rights to ${doc.name}.`);
                    this.renderAll();
                    modal.innerHTML = this.getMetricModalHtml(metricKey);
                    this.attachMetricModalListeners(metricKey);
                }
            });
        });

        const nudgeBtns = document.querySelectorAll('.nudge-vc-btn');
        nudgeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const vc = btn.dataset.vc;
                this.showToast(`System Notification sent: ${vc} partners notified to review your proposal.`);
            });
        });

        const approveIntroBtns = document.querySelectorAll('.approve-intro-direct-btn');
        approveIntroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const dealId = btn.dataset.dealId;
                const deal = this.state.pipeline.find(d => d.id === dealId);
                if (deal) {
                    deal.stage = 'Intro Approved';
                    deal.history.push({ time: "June 3, 12:00 PM", action: `Introduction approved directly from Match Acceptance console` });
                    this.showToast(`Introduction for ${deal.investor} approved successfully.`);
                    this.renderAll();
                    modal.innerHTML = this.getMetricModalHtml(metricKey);
                    this.attachMetricModalListeners(metricKey);
                }
            });
        });
    }

    showToast(message) {
        const container = document.getElementById('founderToastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast-alert';
        toast.innerHTML = `
            <span>✨</span>
            <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    renderHeader() {
        const header = document.getElementById('founderHeader');
        if (header) {
            header.innerHTML = this.getHeaderHtml();
            this.attachHeaderListeners();
        }
    }

    renderContent() {
        const content = document.getElementById('founderTabContent');
        if (content) {
            content.innerHTML = this.getActiveTabHtml();
            this.attachTabListeners();
        }
    }

    renderAll() {
        this.renderHeader();
        this.renderContent();
    }

    attachHeaderListeners() {
        const previewBtn = document.getElementById('previewProfileBtn');
        const previewModal = document.getElementById('previewModal');
        if (previewBtn && previewModal) {
            previewBtn.addEventListener('click', () => {
                previewModal.innerHTML = this.getPreviewModalHtml();
                previewModal.style.display = 'flex';
                this.attachPreviewListeners();
            });
        }

        const publishBtn = document.getElementById('headerPublishGoLiveBtn');
        if (publishBtn) {
            publishBtn.addEventListener('click', () => {
                this.triggerPublish();
            });
        }

        const uploadDocBtn = document.getElementById('headerUploadDocBtn');
        if (uploadDocBtn) {
            uploadDocBtn.addEventListener('click', () => {
                document.getElementById('vaultDocUploader').click();
            });
        }

        const calSyncBtn = document.getElementById('headerCalendarSyncBtn');
        if (calSyncBtn) {
            calSyncBtn.addEventListener('click', () => {
                this.showToast("Outlook & Google Calendars synchronized successfully.");
            });
        }
    }

    attachPreviewListeners() {
        const closeBtn = document.getElementById('closePreviewBtn');
        const previewModal = document.getElementById('previewModal');
        if (closeBtn && previewModal) {
            closeBtn.addEventListener('click', () => {
                previewModal.style.display = 'none';
            });
        }
    }

    triggerPublish() {
        const blockers = this.getOpenBlockers();
        if (blockers.length > 0) {
            this.showToast("Verification Blocked: Complete open readiness checklists.");
            return;
        }

        this.state.published = !this.state.published;
        if(this.state.published) {
            this.showToast("Your profile is now live on the matching algorithms feed!");
            setTimeout(() => {
                this.state.alerts.push({ id: 'a-' + Date.now(), text: 'New matched investor Sequoia India has viewed your deck.', time: 'Just now', count: 1, actionTab: 'pipeline' });
                this.renderAll();
                this.showToast("Notification Alert: New VC Match sweep completed!");
            }, 3000);
        } else {
            this.showToast("Your profile has been unpublished and matches suspended.");
        }
        this.renderAll();
    }

    attachTabListeners() {
        const navTriggers = document.querySelectorAll('.nav-trigger');
        navTriggers.forEach(t => {
            t.addEventListener('click', (e) => {
                e.preventDefault();
                const target = t.dataset.target;
                const subtab = t.dataset.subtab;
                const scrollto = t.dataset.scrollto;
                
                this.state.activeTab = target;
                this.renderAll();
                
                document.querySelectorAll('.founder-nav-btn').forEach(b => b.classList.remove('active'));
                const activeBtn = document.querySelector(`.founder-nav-btn[data-tab="${target}"]`);
                if (activeBtn) activeBtn.classList.add('active');

                if (subtab) {
                    const subtabBtn = document.querySelector(`.subtab-trigger[data-subtab="${subtab}"]`);
                    if(subtabBtn) subtabBtn.click();
                }

                if (scrollto) {
                    const el = document.getElementById(scrollto);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        if (scrollto === 'readinessBlockersSection') {
                            el.style.outline = '2px dashed var(--danger)';
                            el.style.boxShadow = '0 0 16px rgba(239, 68, 68, 0.4)';
                            setTimeout(() => {
                                el.style.outline = 'none';
                                el.style.boxShadow = 'none';
                                el.style.transition = 'all 0.8s ease';
                            }, 2500);
                        }
                    }
                }
            });
        });

        const metricTriggers = document.querySelectorAll('.metric-click-trigger');
        metricTriggers.forEach(t => {
            t.addEventListener('click', (e) => {
                const metricKey = t.dataset.metric;
                const modal = document.getElementById('metricModal');
                if (modal) {
                    modal.innerHTML = this.getMetricModalHtml(metricKey);
                    modal.style.display = 'flex';
                    this.attachMetricModalListeners(metricKey);
                }
            });
        });

        const readinessPublishBtn = document.getElementById('publishGoLiveActionBtn');
        if (readinessPublishBtn) {
            readinessPublishBtn.addEventListener('click', () => {
                this.triggerPublish();
            });
        }

        const profileTriggers = document.querySelectorAll('.subtab-trigger');
        profileTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.subtab;
                
                profileTriggers.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');

                document.querySelectorAll('.profile-subtab').forEach(st => st.classList.remove('active'));
                const targetSubtab = document.getElementById(`subtab-${target}`);
                if(targetSubtab) targetSubtab.classList.add('active');
            });
        });

        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                this.state.company.name = document.getElementById('profName').value;
                this.state.company.hq = document.getElementById('profHq').value;
                this.state.company.tagline = document.getElementById('profTagline').value;
                this.state.company.sector = document.getElementById('profSector').value;
                this.state.company.stage = document.getElementById('profStage').value;
                this.state.company.usp = document.getElementById('profUsp').value;
                this.state.company.competition = document.getElementById('profCompetition').value;
                this.state.company.gtm = document.getElementById('profGtm').value;
                
                const story = document.getElementById('profStory');
                if(story) this.state.company.story = story.value;

                this.state.financials.status = document.getElementById('profRevStatus').value;
                this.state.financials.mrr = document.getElementById('profMrr').value;
                this.state.financials.burn = document.getElementById('profBurn').value;
                this.state.financials.runway = parseInt(document.getElementById('profRunway').value) || 0;
                this.state.financials.traction = document.getElementById('profTraction').value;

                this.state.raise.target = document.getElementById('profRaiseTarget').value;
                this.state.raise.roundType = document.getElementById('profRaiseType').value;
                this.state.raise.valuation = document.getElementById('profValuation').value;
                this.state.raise.equity = document.getElementById('profEquity').value;
                this.state.raise.useOfFunds = document.getElementById('profUseOfFunds').value;
                this.state.raise.narrative = document.getElementById('profRaiseNarrative').value;

                if(this.isFinancialsComplete()) {
                    this.state.alerts = this.state.alerts.filter(a => a.id !== 'a-2');
                }

                this.showToast("Startup details validated and saved to secure database.");
                this.renderAll();
            });
        }

        const draftBtn = document.getElementById('saveDraftProfileBtn');
        if (draftBtn) {
            draftBtn.addEventListener('click', () => {
                this.showToast("Draft details saved successfully.");
            });
        }

        const addTeamBtn = document.getElementById('addTeamActionBtn');
        if (addTeamBtn) {
            addTeamBtn.addEventListener('click', () => {
                const name = document.getElementById('addTeamName').value;
                const role = document.getElementById('addTeamRole').value;
                const bio = document.getElementById('addTeamBio').value;

                if (name && role) {
                    this.state.company.team.push({ name, role, bio });
                    this.showToast(`Team member ${name} added.`);
                    this.renderAll();
                    const teamTrigger = document.querySelector('.subtab-trigger[data-subtab="team"]');
                    if(teamTrigger) teamTrigger.click();
                } else {
                    this.showToast("Validation Error: Team Name and Role are required.");
                }
            });
        }

        const removeTeamBtns = document.querySelectorAll('.remove-team-btn');
        removeTeamBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index);
                const removed = this.state.company.team.splice(idx, 1);
                this.showToast(`Removed team member: ${removed[0].name}`);
                this.renderAll();
                const teamTrigger = document.querySelector('.subtab-trigger[data-subtab="team"]');
                if(teamTrigger) teamTrigger.click();
            });
        });

        const pitchVideoUploader = document.getElementById('pitchVideoUploader');
        const browseVideoBtn = document.getElementById('browseVideoBtn');
        
        if (browseVideoBtn && pitchVideoUploader) {
            browseVideoBtn.addEventListener('click', () => {
                pitchVideoUploader.click();
            });
        }
        if (pitchVideoUploader) {
            pitchVideoUploader.addEventListener('change', (e) => {
                if(e.target.files.length > 0) {
                    const file = e.target.files[0];
                    this.state.pitch.videoFile = {
                        name: file.name,
                        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB',
                        date: 'Just now'
                    };
                    this.showToast("Pitch video uploaded. System is generating script transcript overlays...");
                    this.renderAll();
                }
            });
        }

        const mockPlay = document.getElementById('mockVideoPlayBtn');
        if (mockPlay) {
            mockPlay.addEventListener('click', () => {
                this.showToast("Simulating: Starting Vertical Video playback...");
                mockPlay.innerText = "⏸";
            });
        }

        const deletePitchBtn = document.getElementById('deletePitchBtn');
        if (deletePitchBtn) {
            deletePitchBtn.addEventListener('click', () => {
                this.state.pitch.videoFile = null;
                this.showToast("Pitch video deleted from secure cloud storage.");
                this.renderAll();
            });
        }

        const saveTranscriptBtn = document.getElementById('saveTranscriptBtn');
        if (saveTranscriptBtn) {
            saveTranscriptBtn.addEventListener('click', () => {
                this.state.pitch.transcript = document.getElementById('profTranscript').value;
                this.showToast("Pitch transcript overlays updated successfully.");
            });
        }

        const thumbOpts = document.querySelectorAll('.thumb-opt');
        thumbOpts.forEach(opt => {
            opt.addEventListener('click', (e) => {
                const target = opt.dataset.thumb;
                this.state.pitch.thumbnail = target;
                thumbOpts.forEach(o => o.style.borderColor = 'transparent');
                opt.style.borderColor = 'var(--brand-secondary)';
                this.showToast(`Active thumbnail set: ${target}`);
            });
        });

        const browseVaultBtn = document.getElementById('browseVaultBtn');
        const vaultDocUploader = document.getElementById('vaultDocUploader');
        if (browseVaultBtn && vaultDocUploader) {
            browseVaultBtn.addEventListener('click', () => {
                vaultDocUploader.click();
            });
        }
        if (vaultDocUploader) {
            vaultDocUploader.addEventListener('change', (e) => {
                if(e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const categoryMap = {
                        'pdf': 'Financials',
                        'xlsx': 'Governance',
                        'csv': 'Financials',
                        'zip': 'Legal'
                    };
                    const ext = file.name.split('.').pop().toLowerCase();
                    const category = categoryMap[ext] || 'General';

                    this.state.documents.push({
                        id: 'doc-' + Date.now(),
                        name: file.name,
                        category: category,
                        type: 'Optional',
                        status: 'Pending',
                        size: (file.size / 1024).toFixed(0) + 'KB',
                        date: 'Just now',
                        sharedWith: []
                    });
                    this.showToast(`Uploaded ${file.name} to vault. Sent to Admin team for compliance review.`);
                    this.renderAll();
                }
            });
        }

        const shareToggles = document.querySelectorAll('.doc-share-toggle, .deal-share-toggle');
        shareToggles.forEach(chk => {
            chk.addEventListener('change', (e) => {
                const docId = chk.dataset.docId;
                const investor = chk.dataset.investor;
                const doc = this.state.documents.find(d => d.id === docId);
                
                if (doc) {
                    if (chk.checked) {
                        if (!doc.sharedWith.includes(investor)) {
                            doc.sharedWith.push(investor);
                            this.showToast(`Granted ${investor} secure access key to ${doc.name}.`);
                        }
                    } else {
                        doc.sharedWith = doc.sharedWith.filter(i => i !== investor);
                        this.showToast(`Revoked ${investor} access rights to ${doc.name}.`);
                    }
                    this.renderAll();
                    
                    if(this.state.selectedDealId) {
                        const modal = document.getElementById('detailsModal');
                        modal.innerHTML = this.getDetailsModalHtml();
                        this.attachDetailsModalListeners();
                    }
                }
            });
        });

        const viewDealBtns = document.querySelectorAll('.view-deal-details-btn, .deal-action-trigger-btn');
        viewDealBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const dealId = btn.dataset.dealId;
                this.state.selectedDealId = dealId;
                const modal = document.getElementById('detailsModal');
                modal.innerHTML = this.getDetailsModalHtml();
                modal.style.display = 'flex';
                this.attachDetailsModalListeners();
            });
        });

        const editMeetBtns = document.querySelectorAll('.edit-meeting-notes-btn');
        editMeetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const meetId = btn.dataset.meetId;
                this.state.selectedMeetingId = meetId;
                const modal = document.getElementById('meetingModal');
                modal.innerHTML = this.getMeetingModalHtml();
                modal.style.display = 'flex';
                this.attachMeetingModalListeners();
            });
        });

        const calSyncTrigger = document.getElementById('OutlookSyncBtn');
        if(calSyncTrigger) {
            calSyncTrigger.addEventListener('click', () => {
                this.showToast("Google Calendar scheduling triggers synced.");
            });
        }

        const deliverableChecks = document.querySelectorAll('.deliverable-check');
        deliverableChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const meetId = chk.dataset.meetId;
                const idx = parseInt(chk.dataset.idx);
                const meet = this.state.meetings.find(m => m.id === meetId);
                if (meet) {
                    meet.deliverables[idx].done = chk.checked;
                    this.showToast(`Deliverable task: "${meet.deliverables[idx].task}" marked ${chk.checked ? 'done' : 'incomplete'}.`);
                    this.renderAll();
                }
            });
        });

        const maskToggle = document.getElementById('settMaskToggle');
        if(maskToggle) {
            maskToggle.addEventListener('change', () => {
                this.state.identityMasking = maskToggle.checked;
                this.showToast(`Privacy Settings: Startup masking set to ${maskToggle.checked ? 'Active' : 'Disabled'}.`);
            });
        }
        const ndaToggle = document.getElementById('settNdaToggle');
        if(ndaToggle) {
            ndaToggle.addEventListener('change', () => {
                this.state.requireNDA = ndaToggle.checked;
                this.showToast(`Security Settings: NDA enforcement set to ${ndaToggle.checked ? 'Enforced' : 'Suspended'}.`);
            });
        }

        const settingsTriggers = document.querySelectorAll('.settings-trigger');
        settingsTriggers.forEach(t => {
            t.addEventListener('click', (e) => {
                const sub = t.dataset.subtab;
                settingsTriggers.forEach(tr => tr.classList.remove('active'));
                t.classList.add('active');

                document.querySelectorAll('.settings-subtab').forEach(st => st.classList.remove('active'));
                const target = document.getElementById(`settings-${sub}`);
                if(target) target.classList.add('active');
            });
        });
    }

    attachDetailsModalListeners() {
        const closeBtn = document.getElementById('closeDetailsBtn');
        const detailsModal = document.getElementById('detailsModal');
        const deal = this.state.pipeline.find(d => d.id === this.state.selectedDealId);
        
        if (closeBtn && detailsModal) {
            closeBtn.addEventListener('click', () => {
                detailsModal.style.display = 'none';
                this.state.selectedDealId = null;
            });
        }

        const stageSel = document.getElementById('dealStageSelector');
        if(stageSel && deal) {
            stageSel.addEventListener('change', () => {
                const newStage = stageSel.value;
                if(newStage) {
                    deal.stage = newStage;
                    deal.history.push({ time: "June 3, 12:00 PM", action: `Stage progressed manually to ${newStage}` });
                    this.showToast(`Pipeline Deal advanced to stage: ${newStage}`);
                    this.renderAll();
                    detailsModal.style.display = 'none';
                    this.state.selectedDealId = null;
                }
            });
        }

        const closeLostBtn = document.getElementById('dealCloseLostBtn');
        if(closeLostBtn && deal) {
            closeLostBtn.addEventListener('click', () => {
                deal.stage = 'Closed Lost';
                deal.notes = 'Deal archived by founder.';
                deal.history.push({ time: 'June 3, 12:00 PM', action: 'Deal marked Closed Lost by founder' });
                this.showToast("Deal pipeline closed and archived.");
                this.renderAll();
                detailsModal.style.display = 'none';
                this.state.selectedDealId = null;
            });
        }

        const nudgeBtn = document.getElementById('dealNudgeBtn');
        if(nudgeBtn) {
            nudgeBtn.addEventListener('click', () => {
                this.showToast("System message sent: Platform Coordinator notified to check deal activity.");
            });
        }

        const modalShareToggles = document.querySelectorAll('.deal-share-toggle');
        modalShareToggles.forEach(chk => {
            chk.addEventListener('change', () => {
                const docId = chk.dataset.docId;
                const investor = chk.dataset.investor;
                const doc = this.state.documents.find(d => d.id === docId);
                if (doc) {
                    if (chk.checked) {
                        if (!doc.sharedWith.includes(investor)) {
                            doc.sharedWith.push(investor);
                            this.showToast(`Granted access key for ${doc.name} to ${investor}`);
                        }
                    } else {
                        doc.sharedWith = doc.sharedWith.filter(i => i !== investor);
                        this.showToast(`Revoked access for ${doc.name}`);
                    }
                    detailsModal.innerHTML = this.getDetailsModalHtml();
                    this.attachDetailsModalListeners();
                }
            });
        });
    }

    attachMeetingModalListeners() {
        const closeBtn = document.getElementById('closeMeetingBtn');
        const meetingModal = document.getElementById('meetingModal');
        const meet = this.state.meetings.find(m => m.id === this.state.selectedMeetingId);
        
        if (closeBtn && meetingModal) {
            closeBtn.addEventListener('click', () => {
                meetingModal.style.display = 'none';
                this.state.selectedMeetingId = null;
            });
        }

        const saveOutcomeBtn = document.getElementById('saveMeetingOutcomeBtn');
        if(saveOutcomeBtn && meet) {
            saveOutcomeBtn.addEventListener('click', () => {
                const notes = document.getElementById('meetNotesText').value;
                const outcome = document.getElementById('meetOutcomeSelect').value;

                meet.notes = notes;
                if(outcome) {
                    meet.status = 'Completed';
                    const matchName = meet.title.split(' ')[0];
                    const deal = this.state.pipeline.find(d => d.investor.startsWith(matchName));
                    if(deal) {
                        if(outcome === 'Advance to Diligence') {
                            deal.stage = 'Diligence';
                            deal.history.push({ time: "June 3, 12:00 PM", action: "Advanced to Diligence following pitch meeting" });
                            this.showToast(`Deal advanced: ${deal.investor} is now in Diligence.`);
                        } else if(outcome === 'Closed Lost') {
                            deal.stage = 'Closed Lost';
                            deal.history.push({ time: "June 3, 12:00 PM", action: "Closed Lost following pitch meeting" });
                            this.showToast(`Deal advanced: ${deal.investor} moved to Closed Lost.`);
                        }
                    }
                }
                this.showToast("Meeting feedback logged to workspace database.");
                this.renderAll();
                meetingModal.style.display = 'none';
                this.state.selectedMeetingId = null;
            });
        }
    }

    init() {
        this.renderAll();

        const sidebarLinks = document.querySelectorAll('.founder-nav-btn');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = link.dataset.tab;
                
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                this.state.activeTab = tabId;
                this.renderAll();
            });
        });

        const supportFab = document.getElementById('supportFab');
        if (supportFab) {
            supportFab.addEventListener('click', () => {
                this.showToast("Platform assistant chat session initialized. Matching assistants notified.");
            });
        }
    }

    cleanup() {
        document.body.classList.remove('founder-override');
    }
}

