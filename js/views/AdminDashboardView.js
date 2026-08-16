import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Admin Control | Funding Easy");
        this.state = {
            activeModule: 'overview',
            selectedKycId: null,
            kycFilterStatus: 'All',
            pitchFilterStatus: 'All',
            introFilterStatus: 'All',
            coordinationFilterStatus: 'All',
            dealsFilterStatus: 'All',
            riskFilterStatus: 'All Open',
            selectedPitchId: null,
            selectedCheckboxes: [],
            emergencyLockdown: false,
            showDualAdminModal: false,
            dualAdminActionTarget: null,
            kycQueue: [
                { id: 'k1', name: 'Nexus Health', role: 'Entrepreneur', submitted: '2 hours ago', type: 'Entity KYC', risk: 'Low', status: 'Pending Review', assigned: 'Unassigned', lastPlaidCheck: '2026-06-03 10:05:00 UTC' },
                { id: 'k2', name: 'John Doe', role: 'Investor', submitted: '5 hours ago', type: 'Identity KYC', risk: 'Medium', status: 'Pending Review', assigned: 'Sarah (Compliance)', lastPlaidCheck: '2026-06-03 07:05:00 UTC' }
            ],
            pitchQueue: [
                { id: 'p1', startup: 'Acme Corp', founder: 'Alice Smith', submitted: '1 day ago', sector: 'FinTech', status: 'Pending Moderation', visibility: 'Internal' },
                { id: 'p2', startup: 'SynthOS', founder: 'Bob Jones', submitted: '2 days ago', sector: 'AI/ML', status: 'Pending Moderation', visibility: 'Internal' }
            ],
            riskFlagsQueue: [
                { id: 'r1', entity: 'John Doe', type: 'Investor', severity: 'Critical', reason: 'Fraud Suspicion - Stolen ID', status: 'Escalated', assignee: 'System Admin', submitted: '2 hours ago', history: [{ time: '2 hours ago', actor: 'System', action: 'Flagged account for ID mismatch on Plaid.' }, { time: '1 hour ago', actor: 'Sarah (Compliance)', action: 'Escalated to Super Admin for manual review.' }] },
                { id: 'r2', entity: 'Nexus Health', type: 'Startup', severity: 'Medium', reason: 'Misleading pitch content', status: 'Open', assignee: 'Unassigned', submitted: '1 day ago', history: [{ time: '1 day ago', actor: 'Investor 1', action: 'Reported pitch video for making unverified FDA approval claims.' }] }
            ],
            selectedRiskId: null,
            introductionsQueue: [
                { id: 'INT-001', startup: 'Acme Corp', startupSector: 'FinTech', fundingAsk: '$1.5M', pitchRating: '4.8/5', investor: 'John Smith', investorType: 'Angel', thesis: 'Early-stage FinTech', ticketSize: '$100K - $250K', investorKyc: 'Cleared', status: 'Pending Match', date: 'Jun 2', score: 92, scoreBreakdown: { sector: 95, stage: 90, ticket: 100, geo: 80 }, history: [{ time: 'Jun 2', actor: 'System', action: 'AI Match Generated' }] },
                { id: 'INT-002', startup: 'SynthOS', startupSector: 'AI/ML', fundingAsk: '$3M', pitchRating: '4.5/5', investor: 'Sarah Lee', investorType: 'VC', thesis: 'Seed AI', ticketSize: '$500K - $1M', investorKyc: 'Cleared', status: 'Matched', date: 'Jun 1', score: 88, scoreBreakdown: { sector: 100, stage: 85, ticket: 90, geo: 75 }, history: [{ time: 'Jun 1', actor: 'System', action: 'AI Match Generated' }, { time: 'Jun 1', actor: 'Sarah (Compliance)', action: 'Reviewed and confirmed match.' }] },
                { id: 'INT-003', startup: 'Nexus Health', startupSector: 'HealthTech', fundingAsk: '$2M', pitchRating: '4.9/5', investor: 'Alex Wong', investorType: 'Angel', thesis: 'Health & Wellness', ticketSize: '$50K - $200K', investorKyc: 'Cleared', status: 'Intro Sent', date: 'May 30', score: 75, scoreBreakdown: { sector: 80, stage: 70, ticket: 60, geo: 90 }, history: [{ time: 'May 30', actor: 'System', action: 'AI Match Generated' }, { time: 'May 30', actor: 'System Admin', action: 'Sent introduction via platform.' }] },
                { id: 'INT-004', startup: 'BioGen', startupSector: 'BioTech', fundingAsk: '$5M', pitchRating: '4.7/5', investor: 'Global Ventures', investorType: 'VC', thesis: 'Late-stage Bio', ticketSize: '$2M - $10M', investorKyc: 'Cleared', status: 'Accepted', date: 'May 28', score: 95, scoreBreakdown: { sector: 100, stage: 100, ticket: 90, geo: 90 }, history: [{ time: 'May 28', actor: 'Global Ventures', action: 'Accepted introduction.' }] },
                { id: 'INT-005', startup: 'EcoPack', startupSector: 'ClimateTech', fundingAsk: '$1M', pitchRating: '4.2/5', investor: 'Green Angels', investorType: 'Angel', thesis: 'Climate impact', ticketSize: '$50K - $250K', investorKyc: 'Cleared', status: 'Declined', date: 'May 25', score: 65, scoreBreakdown: { sector: 80, stage: 50, ticket: 80, geo: 50 }, history: [{ time: 'May 25', actor: 'Green Angels', action: 'Declined introduction: Wrong fit.' }] }
            ],
            selectedIntroId: null,
            coordinationQueue: [
                { id: 'DD-001', startup: 'Nova Health', investor: 'Peak Ventures', date: 'Jun 1', status: 'Doc Vault', 
                  docs: { nda: 'Signed', deck: 'Uploaded', financials: 'Missing', capTable: 'Uploaded' },
                  history: [{ time: 'Jun 1', actor: 'System', action: 'Coordination case kicked off from Introductions module.' }] },
                { id: 'DD-002', startup: 'Aeris', investor: 'John Smith', date: 'May 28', status: 'Diligence', 
                  docs: { nda: 'Signed', deck: 'Uploaded', financials: 'Uploaded', capTable: 'Uploaded' },
                  history: [{ time: 'May 28', actor: 'System', action: 'Case kicked off.' }, { time: 'May 29', actor: 'System Admin', action: 'All docs verified, moved to Diligence.' }] }
            ],
            selectedCoordinationId: null,
            dealsQueue: [
                { id: 'DL-001', startup: 'SynthOS', targetRaise: 3000000, committed: 1200000, status: 'Live', date: 'May 10', deadline: 'Jul 10', minTicket: 10000,
                  commitments: [{ investor: 'Sarah Lee', amount: 500000, date: 'May 12' }, { investor: 'Fund X', amount: 700000, date: 'May 15' }] },
                { id: 'DL-002', startup: 'Quantum Edge', targetRaise: 5000000, committed: 5000000, status: 'Closing', date: 'Apr 5', deadline: 'Jun 5', minTicket: 50000,
                  commitments: [{ investor: 'Global Ventures', amount: 3000000, date: 'Apr 20' }, { investor: 'Angel Syndicate', amount: 2000000, date: 'May 1' }] }
            ],
            selectedDealId: null,
            notificationsQueue: [
                { id: 'n1', type: 'kyc', title: 'KYC Escalation Required', desc: 'John Doe identity verification failed Plaid check.', time: '2 hours ago', read: false, category: 'KYC Alert' },
                { id: 'n2', type: 'deal', title: 'Deal Milestone Reached', desc: 'SynthOS has reached 40% of target raise ($1.2M committed).', time: '5 hours ago', read: false, category: 'Deal Update' },
                { id: 'n3', type: 'sla', title: 'SLA Warning: Coordination Case DD-001', desc: 'Document request for Nova Health has been pending for 3 days.', time: '1 day ago', read: true, category: 'SLA Warning' },
                { id: 'n4', type: 'system', title: 'Platform Maintenance Scheduled', desc: 'System maintenance window: June 5, 2:00 AM - 4:00 AM IST.', time: '2 days ago', read: true, category: 'System' },
                { id: 'n5', type: 'kyc', title: 'New KYC Submission', desc: 'Nexus Health has submitted entity KYC documents for review.', time: '3 hours ago', read: false, category: 'KYC Alert' }
            ],
            notificationsFilterCategory: 'All',
            notificationsFilterStatus: 'All',
            notificationsFilterDate: 'This Month',
            auditLogs: [
                { id: 'a1', timestamp: '2024-06-02 10:45:23', user: 'System Admin', action: 'Approved KYC', module: 'Verification', target: 'Nexus Health', ip: '192.168.1.100' },
                { id: 'a2', timestamp: '2024-06-02 10:30:15', user: 'Sarah (Compliance)', action: 'Escalated Risk Flag', module: 'Risk & Flags', target: 'John Doe', ip: '192.168.1.101' },
                { id: 'a3', timestamp: '2024-06-02 09:15:00', user: 'System', action: 'Auto-matched Intro', module: 'Introductions', target: 'INT-001', ip: 'System' },
                { id: 'a4', timestamp: '2024-06-02 08:45:10', user: 'System Admin', action: 'Published Pitch', module: 'Pitch Review', target: 'Acme Corp', ip: '192.168.1.100' },
                { id: 'a5', timestamp: '2024-06-01 17:30:00', user: 'System Admin', action: 'Advanced Deal Stage', module: 'Coordination', target: 'DD-001', ip: '192.168.1.100' },
                { id: 'a6', timestamp: '2024-06-01 16:00:00', user: 'System', action: 'SLA Warning Triggered', module: 'Coordination', target: 'DD-002', ip: 'System' },
                { id: 'a7', timestamp: '2024-06-01 14:20:00', user: 'Sarah (Compliance)', action: 'Suspended Account', module: 'Risk & Flags', target: 'Fake Corp', ip: '192.168.1.101', flagged: true },
                { id: 'a8', timestamp: '2024-06-01 12:00:00', user: 'System Admin', action: 'Closed Deal', module: 'Deals', target: 'DL-002', ip: '192.168.1.100' }
            ],
            auditLogsFilterUser: 'All',
            auditLogsFilterAction: 'All',
            auditLogsFilterDate: 'This Month',
            adminUsers: [
                { id: 'u1', name: 'System Admin', email: 'admin@fundingeasy.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
                { id: 'u2', name: 'Sarah Chen', email: 'sarah@fundingeasy.com', role: 'Compliance Officer', status: 'Active', lastActive: '10 mins ago' },
                { id: 'u3', name: 'Mike Operations', email: 'mike@fundingeasy.com', role: 'Operations', status: 'Active', lastActive: '1 hour ago' },
                { id: 'u4', name: 'Support Bot', email: 'support@fundingeasy.com', role: 'Support', status: 'Inactive', lastActive: '3 days ago' }
            ],
            permissionMatrix: {
                'Overview':       { 'Super Admin': true, 'Compliance Officer': true,  'Operations': true,  'Support': true  },
                'Verification':   { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Pitch Review':   { 'Super Admin': true, 'Compliance Officer': false, 'Operations': false, 'Support': false },
                'Introductions':  { 'Super Admin': true, 'Compliance Officer': false, 'Operations': true,  'Support': false },
                'Coordination':   { 'Super Admin': true, 'Compliance Officer': false, 'Operations': true,  'Support': false },
                'Deals':          { 'Super Admin': true, 'Compliance Officer': false, 'Operations': true,  'Support': false },
                'Risk & Flags':   { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Notifications':  { 'Super Admin': true, 'Compliance Officer': false, 'Operations': false, 'Support': true  },
                'Analytics':      { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Audit Logs':     { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Permissions':    { 'Super Admin': true, 'Compliance Officer': false, 'Operations': false, 'Support': false }
            },
            usersQueue: [
                { id: 'usr-1', name: 'John Doe', email: 'john.doe@gmail.com', role: 'Investor', investorType: 'Angel', kycStatus: 'Failed', status: 'Active', joined: '2026-04-12', company: 'Self', lastActive: '2 hours ago', notes: 'Identity KYC mismatch reported.' },
                { id: 'usr-2', name: 'Alice Smith', email: 'alice@acme.co', role: 'Entrepreneur', startup: 'Acme Corp', kycStatus: 'Cleared', verifiedAt: '2026-05-02 10:15:00 UTC', status: 'Active', joined: '2026-05-01', company: 'Acme Corp', lastActive: '10 mins ago', notes: 'Founder of Acme Corp.' },
                { id: 'usr-3', name: 'Sarah Lee', email: 'sarah.lee@capital.vc', role: 'Investor', investorType: 'VC', kycStatus: 'Cleared', verifiedAt: '2026-03-21 09:30:00 UTC', status: 'Active', joined: '2026-03-20', company: 'Omega Partners', lastActive: '5 hours ago', notes: 'VC general partner.' },
                { id: 'usr-4', name: 'Bob Jones', email: 'bob@synthos.io', role: 'Entrepreneur', startup: 'SynthOS', kycStatus: 'Pending', status: 'Active', joined: '2026-05-15', company: 'SynthOS', lastActive: '1 day ago', notes: 'Entity verification in progress.' },
                { id: 'usr-5', name: 'System Admin', email: 'admin@fundingeasy.com', role: 'Admin', kycStatus: 'Cleared', verifiedAt: '2024-01-01 00:00:00 UTC', status: 'Active', joined: '2024-01-01', company: 'Funding Easy', lastActive: 'Just now', notes: 'Platform super administrator.' },
                { id: 'usr-6', name: 'Support Bot', email: 'support@fundingeasy.com', role: 'Admin', kycStatus: 'Cleared', verifiedAt: '2025-06-12 00:00:00 UTC', status: 'Inactive', joined: '2025-06-12', company: 'Funding Easy', lastActive: '3 days ago', notes: 'Support automation agent.' }
            ],
            selectedUserId: null,
            usersFilterRole: 'All',
            usersFilterKyc: 'All',
            usersFilterStatus: 'All'
        };
    }

    async getHtml() {
        return `
            <style>
                :root {
                    --adm-bg: var(--bg-app);
                    --adm-surface: var(--bg-surface);
                    --adm-border: var(--divider);
                    --adm-text: var(--text-primary);
                    --adm-text-muted: var(--text-muted);
                    --adm-primary: var(--brand-primary);
                    --adm-primary-hover: var(--brand-primary-hover);
                    --adm-sidebar: var(--bg-sidebar);
                    --adm-sidebar-text: var(--text-secondary);
                    --adm-sidebar-hover: var(--bg-hover);
                    --adm-sidebar-active: var(--text-primary);
                    --adm-success: var(--success);
                    --adm-warning: var(--warning);
                    --adm-danger: var(--danger);
                    --adm-accent: var(--brand-primary);
                }
                
                .adm-layout { display: flex; width: 100%; height: 100vh; background: var(--adm-bg); font-family: 'Inter', sans-serif; color: var(--adm-text); overflow: hidden; }
                
                /* Sidebar */
                .adm-sidebar { width: 260px; background: var(--adm-sidebar); display: flex; flex-direction: column; overflow-y: auto; flex-shrink: 0; }
                .adm-brand { padding: 24px; color: #fff; font-weight: 700; font-size: 1.25rem; border-bottom: 1px solid rgba(243, 234, 215, 0.1); letter-spacing: -0.5px; }
                .adm-nav-group { margin-top: 24px; padding: 0 12px; }
                .adm-nav-title { font-size: 0.75rem; text-transform: uppercase; color: rgba(243, 234, 215, 0.65); font-weight: 600; padding: 0 12px 8px 12px; letter-spacing: 1px; }
                .adm-nav-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px 10px 9px; color: var(--adm-sidebar-text); text-decoration: none; border-radius: 6px; margin-bottom: 4px; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; cursor: pointer; border-left: 3px solid transparent; }
                .adm-nav-item:hover { background: var(--adm-sidebar-hover); color: var(--adm-sidebar-active); }
                .adm-nav-item.active { background: var(--brand-primary-soft); color: var(--brand-primary); border-left-color: var(--brand-primary); }
                
                /* Keyboard Accessibility Focus Styles */
                [tabindex="0"]:focus, a:focus, button:focus, select:focus, input:focus, textarea:focus {
                    outline: 2px solid var(--adm-accent) !important;
                    outline-offset: 2px !important;
                }
                
                @keyframes slideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                /* Main Area */
                .adm-main-wrapper { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: hidden; }
                
                /* Header */
                .adm-header { height: 64px; background: var(--bg-header); border-bottom: 1px solid var(--adm-border); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; z-index: 10; }
                .adm-search { display: flex; align-items: center; background: var(--bg-app); border-radius: 8px; padding: 0 12px; width: 400px; border: 1px solid var(--adm-border); }
                .adm-search input { border: none; background: transparent; height: 36px; outline: none; flex: 1; font-size: 0.875rem; color: var(--text-primary); margin-left: 8px; }
                .adm-header-actions { display: flex; align-items: center; gap: 20px; }
                
                /* Content Area */
                .adm-content { flex: 1; min-width: 0; overflow-y: auto; padding: 32px; position: relative; display: flex; flex-direction: column; background: var(--adm-bg); }
                
                /* UI Components */
                .adm-card { background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
                .adm-table { width: 100%; border-collapse: collapse; text-align: left; }
                .adm-table th { padding: 16px 24px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--adm-text-muted); border-bottom: 1px solid var(--adm-border); background: var(--bg-surface-2); white-space: nowrap; }
                .adm-table td { padding: 16px 24px; font-size: 0.875rem; border-bottom: 1px solid var(--adm-border); vertical-align: middle; white-space: nowrap; color: var(--text-primary); }
                .adm-table tr:hover td { background: var(--bg-hover); cursor: pointer; }
                .adm-badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
                .adm-badge.pending { background: var(--warning-soft); color: #f0b35a; }
                .adm-badge.approved { background: var(--brand-secondary-soft); color: #6fd0d4; }
                .adm-badge.escalated { background: var(--danger-soft); color: #e08b8b; }
                
                .adm-btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 6px; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; }
                .adm-btn-primary { background: var(--adm-accent); color: var(--bg-app); }
                .adm-btn-primary:hover { background: var(--brand-primary-hover); }
                .adm-btn-outline { background: transparent; border-color: var(--adm-border); color: var(--text-primary); }
                .adm-btn-outline:hover { background: var(--bg-hover); }
                .adm-btn-danger { background: var(--adm-danger); color: #fff; }
                
                /* Layout Modifiers */
                .adm-metric-card { cursor: pointer; transition: all 0.2s; user-select: none; outline: none; }
                .adm-metric-card:hover { background: var(--bg-hover) !important; }
                .adm-metric-card.active { border-color: var(--adm-accent) !important; box-shadow: 0 0 0 2px var(--brand-primary-soft); }
                .adm-split-view { display: flex; flex-direction: column; gap: 24px; height: 100%; align-items: stretch; }
                .adm-drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
                .adm-drawer-overlay.active { opacity: 1; pointer-events: auto; }
                .adm-drawer { position: fixed; top: 0; right: 0; width: 500px; max-width: 90vw; height: 100vh; background: var(--adm-surface); box-shadow: -4px 0 24px rgba(0,0,0,0.2); z-index: 1001; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; overflow: hidden; border-left: 1px solid var(--adm-border); }
                .adm-drawer.active { transform: translateX(0); }
                .adm-drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--adm-border); background: var(--bg-surface-2); }
                .adm-drawer-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--adm-text-muted); padding: 4px; line-height: 1; transition: color 0.2s; }
                .adm-drawer-close:hover { color: var(--adm-text); }
                .adm-drawer-content { flex: 1; overflow-y: auto; padding: 24px; }
                .adm-drawer-content .adm-card { border: none; box-shadow: none; border-radius: 0; height: auto !important; overflow-y: visible !important; }
                .adm-drawer-content > .adm-card > div:first-child { padding: 0 0 20px 0; }
                .adm-drawer-content > .adm-card > div:nth-child(2) { padding: 0; }
                .header-notif-item:hover { background: var(--bg-hover) !important; }
            </style>

            <div class="adm-layout">
                <aside class="adm-sidebar">
                    <div class="adm-brand" style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:1.5rem;">⚙️</span>
                        <div>Funding Easy<div style="font-size:0.65rem; color:var(--adm-sidebar-text); text-transform:uppercase; letter-spacing:1px; margin-top:2px;">Admin Console</div></div>
                    </div>
                    
                    <div class="adm-nav-group">
                        <div class="adm-nav-title">Console</div>
                        <div class="adm-nav-item active" data-module="overview" tabindex="0" role="button">Overview</div>
                    </div>
                    
                    <div class="adm-nav-group">
                        <div class="adm-nav-title">Moderation</div>
                        <div class="adm-nav-item" data-module="verification" tabindex="0" role="button">Verification <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Pending reviews" id="kycNavBadge">${this.state.kycQueue.length}</span></div>
                        <div class="adm-nav-item" data-module="pitch_review" tabindex="0" role="button">Pitch Review <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Pending moderation" id="pitchNavBadge">${this.state.pitchQueue.length}</span></div>
                        <div class="adm-nav-item" data-module="users" tabindex="0" role="button">Users</div>
                    </div>
                    
                    <div class="adm-nav-group">
                        <div class="adm-nav-title">Deal Workflow</div>
                        <div class="adm-nav-item" data-module="introductions" tabindex="0" role="button">Introductions <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Pending matches" id="introNavBadge">${this.state.introductionsQueue.filter(i => i.status === 'Pending Match' || i.status === 'Matched').length}</span></div>
                        <div class="adm-nav-item" data-module="coordination" tabindex="0" role="button">Coordination <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Active cases" id="coordNavBadge">${this.state.coordinationQueue.length}</span></div>
                        <div class="adm-nav-item" data-module="deals" tabindex="0" role="button">Deals <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Live deals" id="dealsNavBadge">${this.state.dealsQueue.filter(d => d.status === 'Live').length}</span></div>
                    </div>
                    
                    <div class="adm-nav-group">
                        <div class="adm-nav-title">Control</div>
                        <div class="adm-nav-item" data-module="notifications" tabindex="0" role="button">Notifications <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Unread notifications" id="notifSidebarBadge">0</span></div>
                        <div class="adm-nav-item" data-module="analytics" tabindex="0" role="button">Analytics</div>
                        <div class="adm-nav-item" data-module="audit_logs" tabindex="0" role="button">Audit Logs</div>
                        <div class="adm-nav-item" data-module="permissions" tabindex="0" role="button">Permissions</div>
                        <div class="adm-nav-item" data-module="risk_flags" tabindex="0" role="button">Risk & Flags <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:10px; font-size:0.7rem; color:#fff;" title="Open flags" id="riskNavBadge">${this.state.riskFlagsQueue.filter(r => r.status !== 'Resolved' && r.status !== 'Dismissed').length}</span></div>
                    </div>
                </aside>

                <div class="adm-main-wrapper">
                    <header class="adm-header">
                        <div class="adm-search">
                            <span style="opacity:0.5; font-size:0.875rem;">🔍</span>
                            <input type="text" id="globalAdminSearch" placeholder="Search global platform..." aria-label="Search platform">
                        </div>
                        <div class="adm-header-actions" style="position: relative;">
                            <button class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.75rem; border-color:var(--adm-accent); color:var(--adm-accent);">+ Log Action</button>
                            <div id="headerNotifBellBtn" style="font-size: 1.25rem; position: relative; cursor:pointer;" title="Notifications" tabindex="0" role="button" aria-label="Notifications dropdown" aria-haspopup="true" aria-expanded="false">
                                🔔<span id="headerNotifBadge" style="position:absolute; top:-4px; right:-6px; background:var(--adm-danger); color:#fff; font-size:0.6rem; font-weight:700; border-radius:10px; padding:2px 5px; border:2px solid var(--adm-surface); line-height:1; display:none;">0</span>
                            </div>
                            <!-- Notifications Dropdown -->
                            <div id="headerNotifDropdown" class="adm-card" style="display: none; position: absolute; top: 48px; right: 80px; width: 340px; z-index: 1000; padding: 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid var(--adm-border); background: var(--adm-surface);">
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--adm-border);">
                                    <span style="font-weight: 600; font-size: 14px; color: var(--adm-text);">Recent Notifications</span>
                                    <button id="headerMarkAllReadBtn" style="border: none; background: none; color: var(--adm-accent); font-size: 12px; font-weight: 600; cursor: pointer; padding: 0;">Mark all read</button>
                                </div>
                                <div id="headerNotifList" style="max-height: 280px; overflow-y: auto; padding: 8px 0;">
                                    <!-- Dynamic items will be injected here -->
                                </div>
                                <div style="padding: 12px; border-top: 1px solid var(--adm-border); text-align: center; background: var(--bg-surface-2); border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                    <a id="headerViewAllNotifsLink" href="#" style="font-size: 12px; font-weight: 600; color: var(--adm-accent); text-decoration: none;">View all notifications</a>
                                </div>
                            </div>
                            <div style="width:1px; height:24px; background:var(--adm-border);"></div>
                            <div style="display: flex; align-items: center; gap: 8px; cursor:pointer;" tabindex="0" role="button" aria-label="Admin Profile Summary">
                                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--adm-primary); color:#fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">SA</div>
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 0.875rem; font-weight: 600; line-height:1;">Jane Doe</span>
                                    <span style="font-size: 0.75rem; color: var(--adm-text-muted); line-height:1; margin-top:4px;">System Admin</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div style="display: ${this.state.emergencyLockdown ? 'block' : 'none'}; background: var(--adm-danger); color: #fff; text-align: center; padding: 12px; font-weight: 600; font-size: 0.875rem; letter-spacing: 0.5px; z-index: 9;">&#9888;&#65039; SYSTEM LOCKDOWN ACTIVE: All external transactions and new logins are temporarily suspended</div>
                    <main class="adm-content" id="admMainContent"></main>
                </div>
            </div>
            ${this.state.selectedCheckboxes && this.state.selectedCheckboxes.length > 0 ? `
            <div style="position:fixed; bottom:32px; left:50%; transform:translateX(-50%); background:var(--adm-surface); padding:12px 24px; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.3); border:1px solid var(--adm-border); display:flex; align-items:center; gap:24px; z-index:9999;">
                <span style="font-weight:600;">${this.state.selectedCheckboxes.length} Items Selected</span>
                <div style="display:flex; gap:8px;">
                    <button class="adm-btn adm-btn-outline" onclick="document.dispatchEvent(new CustomEvent('clearSelection'))">Clear Selection</button>
                    <button class="adm-btn adm-btn-primary" onclick="alert('Bulk action executed successfully.'); document.dispatchEvent(new CustomEvent('clearSelection'))">Execute Bulk Action</button>
                </div>
            </div>` : ''}
            
            ${this.state.showDualAdminModal ? `
            <div class="adm-drawer-overlay active" onclick="document.dispatchEvent(new CustomEvent('closeDualAdmin'))"></div>
            <div style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:var(--adm-surface); padding:32px; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.4); z-index:1002; width:400px; text-align:center; border: 1px solid var(--adm-border);">
                <div style="font-size:3rem; margin-bottom:16px;">&#128274;</div>
                <h2 style="font-size:1.25rem; font-weight:600; margin-bottom:8px;">Dual-Admin Authorization</h2>
                <p style="color:var(--adm-text-muted); font-size:0.875rem; margin-bottom:24px;">This action requires sign-off from a Compliance Officer. Please enter the secondary authorization PIN.</p>
                <input type="password" id="dualAdminPin" placeholder="4-Digit PIN" style="width:100%; padding:12px; border:1px solid var(--adm-border); border-radius:6px; font-size:1rem; text-align:center; letter-spacing:8px; margin-bottom:24px; outline:none; background:var(--bg-app); color:var(--adm-text);">
                <div style="display:flex; gap:12px;">
                    <button class="adm-btn adm-btn-outline" style="flex:1;" onclick="document.dispatchEvent(new CustomEvent('closeDualAdmin'))">Cancel</button>
                    <button class="adm-btn adm-btn-primary" style="flex:1;" onclick="document.dispatchEvent(new CustomEvent('authorizeDualAdmin'))">Authorize</button>
                </div>
            </div>` : ''}

            <!-- Toast container -->
            <div id="admToastContainer" style="position: fixed; bottom: 24px; right: 24px; display: flex; flex-direction: column; gap: 8px; z-index: 99999;"></div>
        `;
    }

    init() {
        document.addEventListener('closeDrawer', () => {
            this.state.selectedKycId = null;
            this.state.selectedPitchId = null;
            this.state.selectedIntroId = null;
            this.state.selectedCoordinationId = null;
            this.state.selectedDealId = null;
            this.state.selectedRiskId = null;
            this.state.selectedUserId = null;
            this.renderModule();
        });

        document.addEventListener('closeDualAdmin', () => {
            this.state.showDualAdminModal = false;
            this.state.dualAdminActionTarget = null;
            this.renderModule();
        });

        document.addEventListener('authorizeDualAdmin', () => {
            const pin = document.getElementById('dualAdminPin');
            if (pin && pin.value === '1234') {
                this.state.showDualAdminModal = false;
                this.showToast('Authorized successfully.', 'success');
                this.renderModule();
            } else {
                this.showToast('Invalid PIN.', 'error');
            }
        });

        document.addEventListener('triggerDualAdmin', (e) => {
            this.state.showDualAdminModal = true;
            this.renderModule();
        });

        const navItems = document.querySelectorAll('.adm-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.state.activeModule = e.currentTarget.dataset.module;
                this.renderModule();
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.activeModule = item.dataset.module;
                    this.renderModule();
                }
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key.toLowerCase() === 'r' && this.state.activeModule === 'risk_flags' && this.state.selectedRiskId) {
                e.preventDefault();
                const noteInput = document.getElementById('riskResolutionNote');
                if (noteInput) noteInput.focus();
            }
            if (e.key === 'Escape' && this.state.activeModule === 'risk_flags' && this.state.selectedRiskId) {
                this.state.selectedRiskId = null;
                this.renderModule();
            }
        });

        const searchInput = document.getElementById('globalAdminSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                document.querySelectorAll('tbody tr').forEach(row => {
                    if (row.innerText) {
                        const text = row.innerText.toLowerCase();
                        row.style.display = text.includes(term) ? '' : 'none';
                    }
                });
            });
        }
        // Header Notifications bell dropdown listeners
        const bellBtn = document.getElementById('headerNotifBellBtn');
        const dropdown = document.getElementById('headerNotifDropdown');
        if (bellBtn && dropdown) {
            bellBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = dropdown.style.display === 'none';
                dropdown.style.display = isHidden ? 'block' : 'none';
                bellBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
            });

            bellBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    const isHidden = dropdown.style.display === 'none';
                    dropdown.style.display = isHidden ? 'block' : 'none';
                    bellBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
                }
            });

            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            document.addEventListener('click', () => {
                dropdown.style.display = 'none';
                bellBtn.setAttribute('aria-expanded', 'false');
            });
        }

        const markAllReadBtn = document.getElementById('headerMarkAllReadBtn');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.state.notificationsQueue) {
                    this.state.notificationsQueue.forEach(n => { n.read = true; });
                    this.renderModule();
                }
            });
        }

        const viewAllLink = document.getElementById('headerViewAllNotifsLink');
        if (viewAllLink) {
            viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.state.activeModule = 'notifications';
                if (dropdown) dropdown.style.display = 'none';
                this.renderModule();
            });
        }
        
        this.renderModule();
    }

    renderModule() {
        const content = document.getElementById('admMainContent');
        const searchInput = document.getElementById('globalAdminSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Update sidebar active state
        document.querySelectorAll('.adm-nav-item').forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`.adm-nav-item[data-module="${this.state.activeModule}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Update badges
        const kNav = document.getElementById('kycNavBadge');
        if (kNav) { kNav.innerText = this.state.kycQueue.length; kNav.style.background = this.state.kycQueue.length > 0 ? 'var(--adm-accent)' : 'rgba(255,255,255,0.1)'; }
        
        const pNav = document.getElementById('pitchNavBadge');
        if (pNav) { pNav.innerText = this.state.pitchQueue.length; pNav.style.background = this.state.pitchQueue.length > 0 ? 'var(--adm-accent)' : 'rgba(255,255,255,0.1)'; }

        const introCount = this.state.introductionsQueue.filter(i => i.status === 'Pending Match' || i.status === 'Matched').length;
        const iNav = document.getElementById('introNavBadge');
        if (iNav) { iNav.innerText = introCount; iNav.style.background = introCount > 0 ? 'var(--adm-accent)' : 'rgba(255,255,255,0.1)'; }

        const cNav = document.getElementById('coordNavBadge');
        if (cNav) { cNav.innerText = this.state.coordinationQueue.length; cNav.style.background = this.state.coordinationQueue.length > 0 ? 'var(--adm-accent)' : 'rgba(255,255,255,0.1)'; }

        const dNav = document.getElementById('dealsNavBadge');
        const liveDeals = this.state.dealsQueue.filter(d => d.status === 'Live').length;
        if (dNav) { dNav.innerText = liveDeals; dNav.style.background = liveDeals > 0 ? 'var(--adm-accent)' : 'rgba(255,255,255,0.1)'; }

        const rNav = document.getElementById('riskNavBadge');
        const openRisks = this.state.riskFlagsQueue.filter(r => r.status !== 'Resolved' && r.status !== 'Dismissed').length;
        if (rNav) { rNav.innerText = openRisks; rNav.style.background = openRisks > 0 ? 'var(--adm-danger)' : 'rgba(255,255,255,0.1)'; }

        // Update header notification badge and populate dropdown list
        const notifBadge = document.getElementById('headerNotifBadge');
        const notifSidebar = document.getElementById('notifSidebarBadge');
        const unreadCount = this.state.notificationsQueue ? this.state.notificationsQueue.filter(n => !n.read).length : 0;
        if (notifBadge) {
            notifBadge.innerText = unreadCount;
            notifBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
        }
        if (notifSidebar) {
            notifSidebar.innerText = unreadCount;
            notifSidebar.style.background = unreadCount > 0 ? 'var(--adm-accent)' : 'rgba(255,255,255,0.1)';
        }

        const headerNotifList = document.getElementById('headerNotifList');
        if (headerNotifList && this.state.notificationsQueue) {
            const recent = this.state.notificationsQueue.slice(0, 5); // top 5
            if (recent.length === 0) {
                headerNotifList.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--adm-text-muted); font-size: 13px;">No notifications</div>`;
            } else {
                const typeIcons = { kyc: '🛡️', deal: '📊', sla: '⏱️', system: '⚙️' };
                const typeColors = { kyc: '#ef4444', deal: '#3b82f6', sla: '#f59e0b', system: '#6b7280' };
                headerNotifList.innerHTML = recent.map(n => {
                    const icon = typeIcons[n.type] || '🔔';
                    const color = typeColors[n.type] || '#6b7280';
                    const unreadStyle = !n.read ? 'font-weight: 600; background: rgba(59, 130, 246, 0.03);' : '';
                    return `
                        <div class="header-notif-item" data-id="${n.id}" style="padding: 10px 16px; display: flex; gap: 10px; cursor: pointer; transition: background 0.2s; border-bottom: 1px solid var(--divider); ${unreadStyle}">
                            <div style="width: 32px; height: 32px; border-radius: 6px; background: ${color}15; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">
                                ${icon}
                            </div>
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 13px; color: var(--adm-text); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${n.title}</div>
                                <div style="font-size: 11px; color: var(--adm-text-muted); margin-top: 2px;">${n.time}</div>
                            </div>
                            ${!n.read ? `<div style="width: 6px; height: 6px; border-radius: 50%; background: var(--adm-accent); align-self: center;"></div>` : ''}
                        </div>
                    `;
                }).join('');

                document.querySelectorAll('.header-notif-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        const id = e.currentTarget.dataset.id;
                        const notif = this.state.notificationsQueue.find(n => n.id === id);
                        if (notif) {
                            notif.read = true;
                        }
                        this.state.activeModule = 'notifications';
                        const dropdown = document.getElementById('headerNotifDropdown');
                        if (dropdown) dropdown.style.display = 'none';
                        this.renderModule();
                    });
                });
            }
        }

        switch(this.state.activeModule) {
            case 'overview': content.innerHTML = this.getOverviewHtml(); break;
            case 'verification': content.innerHTML = this.getVerificationHtml(); this.attachVerificationListeners(); break;
            case 'pitch_review': content.innerHTML = this.getPitchReviewHtml(); this.attachPitchListeners(); break;
            case 'introductions': content.innerHTML = this.getIntroductionsHtml(); this.attachIntroductionsListeners(); break;
            case 'coordination': content.innerHTML = this.getCoordinationHtml(); this.attachCoordinationListeners(); break;
            case 'deals': content.innerHTML = this.getDealsHtml(); this.attachDealsListeners(); break;
            case 'risk_flags': content.innerHTML = this.getRiskFlagsHtml(); this.attachRiskFlagsListeners(); break;
            case 'notifications': content.innerHTML = this.getNotificationsHtml(); this.attachNotificationsListeners(); break;
            case 'analytics': content.innerHTML = this.getAnalyticsHtml(); break;
            case 'audit_logs': content.innerHTML = this.getAuditLogsHtml(); this.attachAuditLogsListeners(); break;
            case 'permissions': content.innerHTML = this.getPermissionsHtml(); this.attachPermissionsListeners(); break;
            case 'users': content.innerHTML = this.getUsersHtml(); this.attachUsersListeners(); break;
            default: content.innerHTML = this.getPlaceholderHtml(this.state.activeModule); this.attachPlaceholderListeners(this.state.activeModule); break;
        }

        const backBtn = document.getElementById('backToOverviewBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.state.activeModule = 'overview';
                this.renderModule();
            });
        }

        const lockdownBtn = document.getElementById('lockdownToggleBtn');
        if (lockdownBtn) {
            lockdownBtn.addEventListener('click', () => {
                this.state.emergencyLockdown = !this.state.emergencyLockdown;
                this.showToast(this.state.emergencyLockdown ? 'Lockdown activated.' : 'Lockdown deactivated.', this.state.emergencyLockdown ? 'warning' : 'success');
                this.renderModule();
            });
        }

        // Attach breadcrumb navigation
        document.querySelectorAll('.adm-breadcrumb-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.currentTarget.dataset.module;
                if (target) {
                    this.state.activeModule = target;
                    // Clear selections when navigating away
                    this.state.selectedKycId = null;
                    this.state.selectedPitchId = null;
                    this.state.selectedIntroId = null;
                    this.state.selectedCoordinationId = null;
                    this.state.selectedDealId = null;
                    this.state.selectedRiskId = null;
                    this.state.selectedUserId = null;
                    this.renderModule();
                }
            });
        });

        // Attach overview KPI click handlers
        document.querySelectorAll('.adm-kpi-card[data-navigate]').forEach(card => {
            card.addEventListener('click', () => {
                this.state.activeModule = card.dataset.navigate;
                this.renderModule();
            });
        });
    }

    getBreadcrumbHtml(moduleName, detailId) {
        const moduleLabels = {
            overview: 'Overview', verification: 'Verification', pitch_review: 'Pitch Review',
            introductions: 'Introductions', coordination: 'Coordination', deals: 'Deals',
            risk_flags: 'Risk & Flags', notifications: 'Notifications', analytics: 'Analytics',
            audit_logs: 'Audit Logs', permissions: 'Permissions', users: 'Users'
        };
        const label = moduleLabels[moduleName] || moduleName;
        let html = `<div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">`;
        html += `<a href="/" data-link style="color: var(--adm-accent); text-decoration: none; cursor: pointer;">Home</a>`;
        html += `<span style="opacity:0.5;">›</span>`;
        if (detailId) {
            html += `<a href="#" class="adm-breadcrumb-link" data-module="${moduleName}" style="color: var(--adm-accent); text-decoration: none; cursor: pointer;">${label}</a>`;
            html += `<span style="opacity:0.5;">›</span>`;
            html += `<span>${detailId}</span>`;
        } else {
            html += `<span>${label}</span>`;
        }
        html += `</div>`;
        return html;
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('admToastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'adm-card';
        const colors = {
            success: { bg: 'var(--brand-secondary-soft)', text: '#065f46', border: '#a7f3d0', icon: '✅' },
            error: { bg: 'var(--danger-soft)', text: '#991b1b', border: '#fca5a5', icon: '❌' },
            warning: { bg: 'var(--warning-soft)', text: '#92400e', border: '#fcd34d', icon: '⚠️' },
            info: { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe', icon: 'ℹ️' }
        };
        const config = colors[type] || colors.success;

        toast.style.cssText = `
            padding: 12px 20px;
            background: ${config.bg};
            color: ${config.text};
            border: 1px solid ${config.border};
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            animation: slideIn 0.2s ease-out;
            min-width: 250px;
            margin-top: 8px;
        `;
        toast.innerHTML = `<span>${config.icon}</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'opacity 0.2s, transform 0.2s';
            setTimeout(() => toast.remove(), 200);
        }, 3000);
    }

    getOverviewHtml() {
        return `
            ${this.getBreadcrumbHtml('overview')}
            <div style="margin-bottom: 32px;">
                <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 4px;">Command Center</h1>
                <p style="color: var(--adm-text-muted); font-size: 0.875rem;">Platform operational snapshot for today.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px;">
                <div class="adm-card adm-kpi-card" data-navigate="verification" style="padding: 24px; cursor:pointer; transition: box-shadow 0.2s; border-left: 4px solid var(--adm-primary); background: linear-gradient(to right, rgba(0,0,0,0.02) 0%, transparent 10px);" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'">
                    <div style="color: var(--adm-text-muted); font-size: 0.875rem; font-weight: 500; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
                        <span style="color:var(--adm-primary);">ðŸ”µ</span> Pending KYC Reviews
                    </div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--adm-primary);">${this.state.kycQueue.length}</div>
                </div>
                <div class="adm-card adm-kpi-card" data-navigate="pitch_review" style="padding: 24px; cursor:pointer; transition: box-shadow 0.2s; border-left: 4px solid var(--adm-warning); background: linear-gradient(to right, rgba(245, 158, 11, 0.05) 0%, transparent 10px);" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'">
                    <div style="color: var(--adm-text-muted); font-size: 0.875rem; font-weight: 500; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
                        <span style="color:var(--adm-warning);">ðŸŸ </span> Pending Pitch Moderation
                    </div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--adm-warning);">${this.state.pitchQueue.length}</div>
                </div>
                <div class="adm-card adm-kpi-card" data-navigate="deals" style="padding: 24px; cursor:pointer; transition: box-shadow 0.2s; border-left: 4px solid var(--adm-danger); background: linear-gradient(to right, rgba(239, 68, 68, 0.05) 0%, transparent 10px);" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'">
                    <div style="color: var(--adm-text-muted); font-size: 0.875rem; font-weight: 500; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
                        <span style="color:var(--adm-danger);">ðŸ”´</span> Stalled Deals
                    </div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--adm-danger);">3</div>
                </div>
                <div class="adm-card adm-kpi-card" data-navigate="risk_flags" style="padding: 24px; cursor:pointer; transition: box-shadow 0.2s; border-left: 4px solid var(--adm-danger); background: linear-gradient(to right, rgba(239, 68, 68, 0.05) 0%, transparent 10px);" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'">
                    <div style="color: var(--adm-text-muted); font-size: 0.875rem; font-weight: 500; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
                        <span style="color:var(--adm-danger);">ðŸ”´</span> Open Flags / Disputes
                    </div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--adm-danger);">${this.state.riskFlagsQueue.filter(r => r.status !== 'Resolved' && r.status !== 'Dismissed').length}</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
                <div class="adm-card" style="padding: 24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
                        <h2 style="font-size: 1.125rem; font-weight: 600;">Priority Action Queue</h2>
                        <a href="#" style="font-size:0.875rem; color:var(--adm-accent); text-decoration:none;">View All</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px;">
                            <div>
                                <div style="font-weight: 500; font-size: 0.875rem; display:flex; align-items:center; gap:8px;"><span style="color:var(--adm-danger);">🔴</span> Identity KYC Escalation: John Doe</div>
                                <div style="color: var(--adm-text-muted); font-size: 0.75rem; margin-top: 4px;">Plaid Identity match failed due to address mismatch.</div>
                            </div>
                            <button class="adm-btn adm-btn-outline" style="padding: 4px 12px;">Resolve</button>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px;">
                            <div>
                                <div style="font-weight: 500; font-size: 0.875rem; display:flex; align-items:center; gap:8px;"><span style="color:var(--adm-warning);">🟠</span> Stalled Deal: Acme Corp & Omega Capital</div>
                                <div style="color: var(--adm-text-muted); font-size: 0.75rem; margin-top: 4px;">No activity in Virtual Data Room for 14 days.</div>
                            </div>
                            <button class="adm-btn adm-btn-outline" style="padding: 4px 12px;">Follow Up</button>
                        </div>
                    </div>
                </div>
                <div class="adm-card" style="padding: 24px;">
                    <h2 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 16px;">Recent Admin Activity</h2>
                    <div style="display: flex; flex-direction: column; gap: 16px; position: relative;">
                        <div style="border-left: 2px solid var(--adm-border); position: absolute; top: 8px; bottom: 8px; left: 6px; z-index: 1;"></div>
                        
                        <div style="display: flex; gap: 12px; position: relative; z-index: 2;">
                            <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--adm-success); border: 2px solid var(--adm-surface); margin-top: 2px;"></div>
                            <div>
                                <div style="font-size: 0.875rem;"><strong>Sarah (Compliance)</strong> approved Entity KYC for SynthOS</div>
                                <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">10 mins ago</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px; position: relative; z-index: 2;">
                            <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--adm-accent); border: 2px solid var(--adm-surface); margin-top: 2px;"></div>
                            <div>
                                <div style="font-size: 0.875rem;"><strong>System</strong> assigned pitch review to You</div>
                                <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">1 hour ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getVerificationHtml() {
        let sidePanel = '';
        if (this.state.selectedKycId) {
            const kyc = this.state.kycQueue.find(k => k.id === this.state.selectedKycId);
            if (kyc) {
                sidePanel = `
                    <div class="adm-drawer-overlay active" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))"></div>
                    <div class="adm-drawer active">
                        <div class="adm-drawer-header">
                            <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Details</h3>
                            <button class="adm-drawer-close" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))">&times;</button>
                        </div>
                        <div class="adm-drawer-content">
                            <div class="adm-card" style="display: flex; flex-direction: column; height: calc(100vh - 200px); overflow-y: auto;">
                                <div style="padding: 24px; border-bottom: 1px solid var(--adm-border); display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-size: 1.125rem; font-weight: 600;">${kyc.name}</h3>
                                        <div style="color: var(--adm-text-muted); font-size: 0.875rem; margin-top:4px;">${kyc.type} • ID: ${kyc.id}</div>
                                    </div>
                                    <span class="adm-badge pending">${kyc.status}</span>
                                </div>
                                <div style="padding: 24px; flex: 1;">
                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Submitted Documents</h4>
                                    <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                                        <div style="width: 120px; height: 160px; background: var(--bg-surface-2); border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--adm-text-muted); border:1px dashed var(--divider); cursor:pointer;"><span style="font-size:1.5rem; margin-bottom:4px;">📄</span>ID_Front.jpg</div>
                                        <div style="width: 120px; height: 160px; background: var(--bg-surface-2); border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--adm-text-muted); border:1px dashed var(--divider); cursor:pointer;"><span style="font-size:1.5rem; margin-bottom:4px;">📄</span>ID_Back.jpg</div>
                                    </div>
                                    
                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Extracted Metadata (Plaid)</h4>
                                    <div style="background: var(--bg-surface-2); padding: 12px; border-radius: 6px; border: 1px solid var(--adm-border); margin-bottom: 24px; font-size: 0.875rem; display: grid; gap: 8px;">
                                        <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Name Match:</span> <span style="color: var(--adm-success); font-weight: 500;">99%</span></div>
                                        <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">DOB Match:</span> <span style="color: var(--adm-success); font-weight: 500;">Exact</span></div>
                                        <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Watchlist Hit:</span> <span style="font-weight:500;">None</span></div>
                                        <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Verified Check:</span> <span style="font-family: monospace; color: var(--adm-text);">${kyc.lastPlaidCheck}</span></div>
                                    </div>

                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Reviewer Notes</h4>
                                    <textarea placeholder="Add internal notes regarding this decision..." style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px; resize: none; font-family: inherit; font-size: 0.875rem; margin-bottom: 24px; outline: none; box-sizing:border-box;"></textarea>
                                </div>
                                <div style="padding: 24px; border-top: 1px solid var(--adm-border); display: flex; flex-direction: column; gap: 12px;">
                                    <button class="adm-btn adm-btn-primary" style="width: 100%;">Approve Verification</button>
                                    <div style="display: flex; gap: 12px;">
                                        <button class="adm-btn adm-btn-outline" style="flex: 1;">Request Resubmission</button>
                                        <button class="adm-btn adm-btn-danger" style="flex: 1;">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        const tbody = this.state.kycQueue.length === 0 ? 
            `<tr><td colspan="6" style="text-align:center; color:var(--adm-text-muted); padding:48px;">Queue is empty. All verifications complete! 🎉</td></tr>` :
            this.state.kycQueue.map(k => {
                const statusClass = k.status === 'Approved' ? 'approved' : (k.status === 'Escalated' ? 'escalated' : 'pending');
                return `
                <tr data-kyc-id="${k.id}" style="${this.state.selectedKycId === k.id ? 'background: var(--bg-hover);' : ''}; cursor:pointer;" tabindex="0" role="row">
                    <td>
                        <div style="font-weight: 500;">${k.name}</div>
                        <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">${k.role}</div>
                    </td>
                    <td>${k.type}</td>
                    <td>${k.submitted}</td>
                    <td><span class="adm-badge ${k.risk === 'Low' ? 'approved' : 'pending'}">${k.risk}</span></td>
                    <td><span class="adm-badge ${statusClass}">${k.status}</span></td>
                    <td style="color: var(--adm-text-muted);">${k.assigned}</td>
                </tr>
            `}).join('');

        return `
            ${this.getBreadcrumbHtml('verification', this.state.selectedKycId)}
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0;">Verification Queue</h1>
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem; margin: 4px 0 0 0;">Approve identity and entity credentials.</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <select style="padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; outline:none;"><option>All Roles</option><option>Entrepreneurs</option><option>Investors</option></select>
                    <select style="padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; outline:none;"><option>Pending Only</option><option>Escalated</option></select>
                </div>
            </div>

            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th>Entity</th>
                                <th>Type</th>
                                <th>Submitted</th>
                                <th>Risk</th>
                                <th>Status</th>
                                <th>Assigned</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${sidePanel}
            </div>
        `;
    }

    getPitchReviewHtml() {
        let sidePanel = '';
        if (this.state.selectedPitchId) {
            const p = this.state.pitchQueue.find(p => p.id === this.state.selectedPitchId);
            if (p) {
                sidePanel = `
                    <div class="adm-drawer-overlay active" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))"></div>
                    <div class="adm-drawer active">
                        <div class="adm-drawer-header">
                            <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Details</h3>
                            <button class="adm-drawer-close" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))">&times;</button>
                        </div>
                        <div class="adm-drawer-content">
                            <div class="adm-card" style="display: flex; flex-direction: column; height: calc(100vh - 200px); overflow-y: auto;">
                                <div style="padding: 24px; border-bottom: 1px solid var(--adm-border);">
                                    <h3 style="font-size: 1.125rem; font-weight: 600;">${p.startup}</h3>
                                    <div style="color: var(--adm-text-muted); font-size: 0.875rem; margin-top:4px;">Founder: ${p.founder}</div>
                                </div>
                                <div style="padding: 24px; flex: 1;">
                                    <div style="width: 100%; height: 200px; background: #0f172a; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; margin-bottom: 24px; position: relative; cursor:pointer; overflow:hidden;">
                                        <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">▶</div>
                                        <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">03:15</div>
                                    </div>
                                    
                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Funding Ask Snapshot</h4>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                        <div style="background: var(--bg-surface-2); padding: 12px; border-radius: 6px; border: 1px solid var(--adm-border);">
                                            <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-bottom: 4px;">Target</div>
                                            <div style="font-weight: 600; font-size:1.125rem;">$1.5M</div>
                                        </div>
                                        <div style="background: var(--bg-surface-2); padding: 12px; border-radius: 6px; border: 1px solid var(--adm-border);">
                                            <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-bottom: 4px;">Instrument</div>
                                            <div style="font-weight: 600; font-size:1.125rem;">SAFE (Post)</div>
                                        </div>
                                    </div>

                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Moderation Controls</h4>
                                    <select style="width: 100%; padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; margin-bottom: 12px; outline:none;">
                                        <option>Visibility: Internal Only</option>
                                        <option>Visibility: Approved Live</option>
                                        <option>Visibility: Hidden</option>
                                    </select>
                                    <textarea placeholder="Add moderation note..." style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px; resize: none; font-family: inherit; font-size: 0.875rem; outline: none; box-sizing:border-box;"></textarea>
                                </div>
                                <div style="padding: 24px; border-top: 1px solid var(--adm-border); display: flex; gap: 12px;">
                                    <button class="adm-btn adm-btn-primary" style="flex: 1;" onclick="document.dispatchEvent(new CustomEvent('triggerDualAdmin'))">Approve & Publish</button>
                                    <button class="adm-btn adm-btn-outline" style="flex: 1;">Request Edits</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        const filteredPitches = this.state.pitchQueue.filter(p => this.state.pitchFilterStatus === 'All' || p.status.includes(this.state.pitchFilterStatus));
        const tbody = filteredPitches.length === 0 ? 
            `<tr><td colspan="5" style="text-align:center; color:var(--adm-text-muted); padding:48px;">No pitches pending moderation. 🎉</td></tr>` :
            filteredPitches.map(p => {
                const statusClass = p.status === 'Published' || p.status === 'Approved' ? 'approved' : (p.status === 'Needs Edit' ? 'escalated' : 'pending');
                return `
                <tr data-pitch-id="${p.id}" style="${this.state.selectedPitchId === p.id ? 'background: var(--bg-hover);' : ''}; cursor:pointer;" tabindex="0" role="row">
                    <td>
                        <div style="font-weight: 500;">${p.startup}</div>
                        <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">${p.sector}</div>
                    </td>
                    <td>${p.founder}</td>
                    <td>${p.submitted}</td>
                    <td><span class="adm-badge ${statusClass}">${p.status}</span></td>
                    <td><span class="adm-badge" style="background:var(--bg-surface-2); color:var(--adm-text);">${p.visibility}</span></td>
                </tr>
            `}).join('');

        return `
            ${this.getBreadcrumbHtml('pitch_review', this.state.selectedPitchId)}
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0;">Pitch Moderation</h1>
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem; margin: 4px 0 0 0;">Review startup pitch content before making it visible to investors.</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <select id="pitchStatusSelect"  style="padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; outline:none;"><option value="All" ${this.state.pitchFilterStatus === 'All' ? 'selected' : ''}>All</option><option value="Pending Review" ${this.state.pitchFilterStatus === 'Pending Review' ? 'selected' : ''}>Pending Review</option><option value="Needs Edit" ${this.state.pitchFilterStatus === 'Needs Edit' ? 'selected' : ''}>Needs Edit</option></select>
                </div>
            </div>

            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th>Startup</th>
                                <th>Founder</th>
                                <th>Submitted</th>
                                <th>Status</th>
                                <th>Visibility</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${sidePanel}
            </div>
        `;
    }

    getPlaceholderHtml(moduleName) {
        const title = moduleName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `
            <div style="margin-bottom: 24px;">
                <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 4px;">${title}</h1>
            </div>
            
            <div class="adm-card" style="display: flex; align-items: center; justify-content: center; min-height: 400px; flex-direction: column; text-align: center; padding: 48px;">
                <div style="font-size: 3rem; margin-bottom: 16px; opacity:0.8;">🚧</div>
                <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px;">Module in Development</h2>
                <p style="color: var(--adm-text-muted); max-width: 400px; margin-bottom: 24px; line-height:1.5;">
                    The <strong>${title}</strong> module is currently being configured. This space will allow administrators to manage platform data and workflows according to the operating protocol.
                </p>
                <div style="display: flex; gap: 12px;">
                    <button class="adm-btn adm-btn-outline" id="viewSpecBtn">View Implementation Spec</button>
                    <button class="adm-btn adm-btn-primary" id="backToOverviewBtn">Go to Overview</button>
                </div>
            </div>
        `;
    }

    attachVerificationListeners() {
        document.querySelectorAll('tr[data-kyc-id]').forEach(tr => {
            tr.addEventListener('click', (e) => {
                this.state.selectedKycId = tr.dataset.kycId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedKycId = tr.dataset.kycId;
                    this.renderModule();
                }
            });
        });
        
        const approveBtn = document.querySelector('.adm-btn-primary');
        if (approveBtn && approveBtn.innerText.includes('Approve Verification')) {
            approveBtn.addEventListener('click', () => {
                const kyc = this.state.kycQueue.find(k => k.id === this.state.selectedKycId);
                if (kyc) {
                    this.state.notificationsQueue.forEach(n => {
                        if (n.desc.includes(kyc.name) || n.title.includes(kyc.name)) {
                            n.read = true;
                        }
                    });
                }
                this.state.kycQueue = this.state.kycQueue.filter(k => k.id !== this.state.selectedKycId);
                this.state.selectedKycId = null;
                this.showToast('Verification approved successfully.', 'success');
                this.renderModule();
            });
        }
    }

    attachPitchListeners() {
        const pitchSelect = document.getElementById('pitchStatusSelect');
        if (pitchSelect) {
            pitchSelect.addEventListener('change', (e) => {
                this.state.pitchFilterStatus = e.target.value;
                this.renderModule();
            });
        }

        document.querySelectorAll('tr[data-pitch-id]').forEach(tr => {
            tr.addEventListener('click', (e) => {
                this.state.selectedPitchId = tr.dataset.pitchId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedPitchId = tr.dataset.pitchId;
                    this.renderModule();
                }
            });
        });

        const approveBtn = document.querySelector('.adm-btn-primary');
        if (approveBtn && approveBtn.innerText.includes('Approve & Publish')) {
            approveBtn.addEventListener('click', () => {
                const pitch = this.state.pitchQueue.find(p => p.id === this.state.selectedPitchId);
                if (pitch) {
                    this.state.notificationsQueue.forEach(n => {
                        if (n.desc.includes(pitch.startup) || n.title.includes(pitch.startup) || n.desc.includes(pitch.founder) || n.title.includes(pitch.founder)) {
                            n.read = true;
                        }
                    });
                }
                this.state.pitchQueue = this.state.pitchQueue.filter(p => p.id !== this.state.selectedPitchId);
                this.state.selectedPitchId = null;
                this.showToast('Pitch approved and published successfully.', 'success');
                this.renderModule();
            });
        }
    }

    getRiskFlagsHtml() {
        let sidePanel = '';
        if (this.state.selectedRiskId) {
            const risk = this.state.riskFlagsQueue.find(r => r.id === this.state.selectedRiskId);
            if (risk) {
                const historyHtml = risk.history.map(h => `
                    <div style="display: flex; gap: 12px; position: relative; z-index: 2; margin-bottom: 16px;">
                        <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--adm-border); border: 2px solid var(--adm-surface); margin-top: 2px; flex-shrink: 0;"></div>
                        <div>
                            <div style="font-size: 0.875rem;"><strong>${h.actor}</strong>: ${h.action}</div>
                            <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">${h.time}</div>
                        </div>
                    </div>
                `).join('');

                sidePanel = `
                    <div class="adm-drawer-overlay active" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))"></div>
                    <div class="adm-drawer active">
                        <div class="adm-drawer-header">
                            <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Details</h3>
                            <button class="adm-drawer-close" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))">&times;</button>
                        </div>
                        <div class="adm-drawer-content">
                            <div class="adm-card" style="display: flex; flex-direction: column; height: calc(100vh - 200px); overflow-y: auto;">
                                <div style="padding: 24px; border-bottom: 1px solid var(--adm-border); display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                            <span class="adm-badge" style="background:#1e293b; color:#fff;">CASE-${risk.id}</span>
                                            <span class="adm-badge" style="${risk.severity === 'Critical' ? 'background:var(--danger-soft); color:#e08b8b; border:1px solid var(--danger-soft);' : risk.severity === 'High' ? 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);' : 'background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);'}">${risk.severity === 'Critical' ? '🔴' : risk.severity === 'High' ? '🟠' : '🟡'} ${risk.severity}</span>
                                        </div>
                                        <h3 style="font-size: 1.125rem; font-weight: 600;">${risk.entity}</h3>
                                        <div style="color: var(--adm-text-muted); font-size: 0.875rem; margin-top:4px;">${risk.type} • Reported ${risk.submitted}</div>
                                    </div>
                                    <span class="adm-badge" style="background: ${risk.status === 'Resolved' || risk.status === 'Dismissed' ? 'var(--brand-secondary-soft)' : risk.status === 'Escalated' ? 'var(--danger-soft)' : 'var(--warning-soft)'}; color: ${risk.status === 'Resolved' || risk.status === 'Dismissed' ? '#6fd0d4' : risk.status === 'Escalated' ? '#e08b8b' : '#f0b35a'};">${risk.status}</span>
                                </div>
                                <div style="padding: 24px; flex: 1;">
                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Entity Context</h4>
                                    <div style="background: var(--bg-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adm-border); margin-bottom: 24px;">
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.875rem;">
                                            <div style="display: flex; justify-content: space-between;"><span style="color:var(--adm-text-muted);">Name:</span> <strong>${risk.entity}</strong></div>
                                            <div style="display: flex; justify-content: space-between;"><span style="color:var(--adm-text-muted);">Role:</span> <strong>${risk.type}</strong></div>
                                            <div style="display: flex; justify-content: space-between;"><span style="color:var(--adm-text-muted);">KYC Status:</span> <strong style="color:${risk.entity === 'John Doe' ? 'var(--adm-danger)' : 'var(--adm-success)'}">${risk.entity === 'John Doe' ? 'Failed' : 'Cleared'}</strong></div>
                                            <div style="display: flex; justify-content: space-between;"><span style="color:var(--adm-text-muted);">Platform Since:</span> <strong>${risk.entity === 'John Doe' ? 'Mar 2024' : 'Jan 2024'}</strong></div>
                                        </div>
                                    </div>

                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Flag Details</h4>
                                    <div style="background: var(--danger-soft); color: #e08b8b; padding: 16px; border-radius: 6px; font-size: 0.875rem; font-weight: 500; margin-bottom: 8px;">
                                        ${risk.reason}
                                    </div>
                                    <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-bottom: 24px;">Reported by: ${risk.history[0] ? risk.history[0].actor : 'System'}</div>
                                    
                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Full Case History</h4>
                                    <div style="position: relative; margin-bottom: 24px;">
                                        <div style="border-left: 2px solid var(--adm-border); position: absolute; top: 8px; bottom: 8px; left: 6px; z-index: 1;"></div>
                                        ${historyHtml}
                                    </div>

                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Assign Owner</h4>
                                    <select id="riskAssignee" style="width: 100%; padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; margin-bottom: 16px; outline:none;">
                                        <option ${risk.assignee === 'Unassigned' ? 'selected' : ''}>Unassigned</option>
                                        <option ${risk.assignee === 'System Admin' ? 'selected' : ''}>System Admin</option>
                                        <option ${risk.assignee === 'Sarah (Compliance)' ? 'selected' : ''}>Sarah (Compliance)</option>
                                        <option ${risk.assignee === 'Operations Team' ? 'selected' : ''}>Operations Team</option>
                                    </select>

                                    <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Resolution</h4>
                                    <select id="riskResolutionReason" style="width: 100%; padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; margin-bottom: 12px; outline:none;">
                                        <option value="">Select resolution reason...</option>
                                        <option>False positive</option>
                                        <option>Resolved with entity</option>
                                        <option>Escalated to legal</option>
                                        <option>Policy violation confirmed</option>
                                    </select>
                                    <textarea id="riskResolutionNote" placeholder="Mandatory closure note..." style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px; resize: none; font-family: inherit; font-size: 0.875rem; margin-bottom: 12px; outline: none; box-sizing:border-box;"></textarea>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                        <button class="adm-btn adm-btn-primary risk-action-btn" data-action="Resolve" style="grid-column: span 2;">Mark as Resolved</button>
                                        <button class="adm-btn adm-btn-outline risk-action-btn" data-action="Dismiss">Dismiss Flag</button>
                                        <button class="adm-btn adm-btn-outline risk-action-btn" data-action="Warn">Send Warning</button>
                                        <button class="adm-btn adm-btn-danger" onclick="document.dispatchEvent(new CustomEvent('triggerDualAdmin'))">Suspend Entity</button>
                                        <button class="adm-btn adm-btn-primary risk-action-btn" data-action="Escalate">Escalate to Compliance</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        const openCount = this.state.riskFlagsQueue.filter(r => r.status !== 'Resolved' && r.status !== 'Dismissed').length;
        const criticalCount = this.state.riskFlagsQueue.filter(r => (r.severity === 'Critical' || r.severity === 'High') && r.status !== 'Resolved' && r.status !== 'Dismissed').length;

        const getSeverityStyle = (severity) => {
            if (severity === 'Critical') return 'background:var(--danger-soft); color:#e08b8b; border:1px solid var(--danger-soft);';
            if (severity === 'High') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
            if (severity === 'Medium') return 'background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);';
            return 'background:var(--bg-surface-2); color:var(--text-muted); border:1px solid var(--divider);';
        };

        const filteredRisks = this.state.riskFlagsQueue.filter(r => 
            this.state.riskFilterStatus === 'All Open' ? r.status !== 'Resolved' && r.status !== 'Dismissed' :
            this.state.riskFilterStatus === 'High/Critical' ? (r.severity === 'Critical' || r.severity === 'High') && r.status !== 'Resolved' && r.status !== 'Dismissed' :
            this.state.riskFilterStatus === 'Escalated' ? r.status === 'Escalated' :
            this.state.riskFilterStatus === 'Resolved' ? r.status === 'Resolved' : true
        );

        return `
            <div class="adm-header">
                <div class="adm-header-title">Risk & Flags</div>
                <div class="adm-header-actions">
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem; margin-right: auto;">Investigate platform abuse, disputes, and compliance flags.</p>
                    <div style="display: flex; gap: 16px;">
                        <button id="lockdownToggleBtn" class="adm-btn ${this.state.emergencyLockdown ? 'adm-btn-outline' : 'adm-btn-danger'}" style="font-weight:600;">${this.state.emergencyLockdown ? 'Deactivate Lockdown' : 'Activate System Lockdown'}</button>
                    </div>
                </div>
            </div>
            
            <div class="adm-metric-row" style="margin-bottom: 24px;">
                <div class="adm-metric-card" onclick="document.dispatchEvent(new CustomEvent('filterRisks', {detail: 'All Open'}))" style="cursor:pointer; ${this.state.riskFilterStatus === 'All Open' ? 'border-color: var(--adm-brand-primary); box-shadow: 0 0 0 1px var(--adm-brand-primary);' : ''}">
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Active Flags</span>
                        <span style="font-weight:600; color:var(--adm-text-main);">${openCount}</span>
                    </div>
                </div>
                <div class="adm-metric-card" onclick="document.dispatchEvent(new CustomEvent('filterRisks', {detail: 'High/Critical'}))" style="cursor:pointer; ${this.state.riskFilterStatus === 'High/Critical' ? 'border-color: var(--adm-danger); box-shadow: 0 0 0 1px var(--adm-danger);' : ''}">
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">High/Critical</span>
                        <span style="font-weight:600; color:var(--adm-danger);">${criticalCount}</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; margin-bottom: 24px; padding: 12px; background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px;">
                <select id="riskStatusSelect"  style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option value="All Open" ${this.state.riskFilterStatus === 'All Open' ? 'selected' : ''}>Status: All Open</option><option value="Escalated" ${this.state.riskFilterStatus === 'Escalated' ? 'selected' : ''}>Escalated</option><option value="Resolved" ${this.state.riskFilterStatus === 'Resolved' ? 'selected' : ''}>Resolved</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Severity: All</option><option>Critical Only</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Assignee: All</option><option>Assigned to Me</option></select>
                <div style="flex:1;"></div>
                <button class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Export Logs</button>
            </div>

            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th>Entity</th>
                                <th>Severity</th>
                                <th>Status</th>
                                <th>Assignee</th>
                                <th>Reported</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${sidePanel}
            </div>
        `;
    }

    attachRiskFlagsListeners() {
        document.querySelectorAll('.adm-metric-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const filterVal = e.currentTarget.dataset.filter;
                this.state.riskFilterStatus = filterVal === this.state.riskFilterStatus ? 'All Open' : filterVal;
                this.renderModule();
            });
            card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
        });
        const riskSelect = document.getElementById('riskStatusSelect');
        if (riskSelect) {
            riskSelect.addEventListener('change', (e) => {
                this.state.riskFilterStatus = e.target.value;
                this.renderModule();
            });
        }

        document.querySelectorAll('tr[data-risk-id]').forEach(tr => {
            tr.addEventListener('click', (e) => {
                this.state.selectedRiskId = tr.dataset.riskId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedRiskId = tr.dataset.riskId;
                    this.renderModule();
                }
            });
        });

        // Assignee dropdown change
        const assigneeSelect = document.getElementById('riskAssignee');
        if (assigneeSelect) {
            assigneeSelect.addEventListener('change', (e) => {
                const risk = this.state.riskFlagsQueue.find(r => r.id === this.state.selectedRiskId);
                if (risk) {
                    const newAssignee = e.target.value;
                    risk.history.push({ time: 'Just now', actor: 'System Admin', action: `Reassigned to ${newAssignee}` });
                    risk.assignee = newAssignee;
                    this.showToast(`Risk case assigned to ${newAssignee}.`, 'success');
                    this.renderModule();
                }
            });
        }

        document.querySelectorAll('.risk-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const note = document.getElementById('riskResolutionNote').value;
                const reasonEl = document.getElementById('riskResolutionReason');
                const reason = reasonEl ? reasonEl.value : '';

                if (!note && (action === 'Dismiss' || action === 'Suspend' || action === 'Resolve')) {
                    this.showToast('A closure note is mandatory for this action.', 'error');
                    return;
                }
                if (action === 'Resolve' && !reason) {
                    this.showToast('Please select a resolution reason.', 'error');
                    return;
                }
                
                const risk = this.state.riskFlagsQueue.find(r => r.id === this.state.selectedRiskId);
                if (risk) {
                    const actionLabel = action === 'Resolve' ? `Resolved. Reason: ${reason}` : action;
                    risk.history.push({
                        time: 'Just now',
                        actor: 'System Admin',
                        action: `${actionLabel}. Note: ${note || 'None'}`
                    });
                    
                    // Mark corresponding notifications read
                    this.state.notificationsQueue.forEach(n => {
                        if (n.desc.includes(risk.entity) || n.title.includes(risk.entity)) {
                            n.read = true;
                        }
                    });

                    if (action === 'Resolve') { risk.status = 'Resolved'; this.showToast(`Risk case resolved successfully: ${reason}`, 'success'); }
                    if (action === 'Dismiss') { risk.status = 'Dismissed'; this.showToast(`Risk case dismissed. Status restored.`, 'success'); }
                    if (action === 'Suspend') { risk.status = 'Resolved'; this.showToast(`Entity account suspended. Risk case archived.`, 'warning'); }
                    if (action === 'Escalate') { risk.status = 'Escalated'; this.showToast(`Security flag escalated to legal counsel.`, 'success'); }
                    if (action === 'Warn') { risk.status = 'Under Review'; this.showToast(`Warning warning sent. Case is under review.`, 'info'); }
                    
                    this.renderModule();
                }
            });
        });
    }

    getIntroductionsHtml() {
        let drawerHtml = '';
        if (this.state.selectedIntroId) {
            const intro = this.state.introductionsQueue.find(i => i.id === this.state.selectedIntroId);
            if (intro) {
                const historyHtml = intro.history.map(h => `
                    <div style="display: flex; gap: 12px; position: relative; z-index: 2; margin-bottom: 16px;">
                        <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--adm-border); border: 2px solid var(--adm-surface); margin-top: 2px; flex-shrink: 0;"></div>
                        <div>
                            <div style="font-size: 0.875rem;"><strong>${h.actor}</strong>: ${h.action}</div>
                            <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">${h.time}</div>
                        </div>
                    </div>
                `).join('');

                const getStatusStyle = (status) => {
                    if (status === 'Pending Match') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
                    if (status === 'Matched') return 'background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);';
                    if (status === 'Intro Sent') return 'background:var(--brand-secondary-soft); color:#6fd0d4; border:1px solid var(--brand-secondary-soft);';
                    if (status === 'Accepted') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
                    if (status === 'Coordination') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
                    if (status === 'Declined' || status === 'Expired') return 'background:var(--danger-soft); color:#e08b8b; border:1px solid var(--danger-soft);';
                    return 'background:var(--bg-surface-2); color:var(--text-muted); border:1px solid var(--divider);';
                };

                const stages = ['Match', 'Intro Sent', 'Accepted', 'Handoff'];
                let currentStageIndex = 0;
                if (intro.status === 'Intro Sent') currentStageIndex = 1;
                if (intro.status === 'Accepted') currentStageIndex = 2;
                if (intro.status === 'Coordination') currentStageIndex = 3;
                if (intro.status === 'Declined' || intro.status === 'Expired') currentStageIndex = -1;

                const pipelineHtml = currentStageIndex >= 0 ? `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative;">
                        <div style="position: absolute; top: 12px; left: 10%; right: 10%; height: 2px; background: var(--adm-border); z-index: 1;"></div>
                        ${stages.map((stage, idx) => `
                            <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; width: 25%;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; background: ${idx <= currentStageIndex ? 'var(--adm-accent)' : 'var(--adm-surface)'}; border: 2px solid ${idx <= currentStageIndex ? 'var(--adm-accent)' : 'var(--adm-border)'}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; font-weight: bold; margin-bottom: 8px;">
                                    ${idx < currentStageIndex ? '✓' : (idx === currentStageIndex ? '●' : '')}
                                </div>
                                <div style="font-size: 0.75rem; font-weight: 500; color: ${idx <= currentStageIndex ? 'var(--adm-text)' : 'var(--adm-text-muted)'}; text-align: center;">${stage}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : `<div style="padding: 12px; background: var(--danger-soft); color: #e08b8b; border-radius: 6px; font-size: 0.875rem; font-weight: 500; margin-bottom: 24px; text-align: center;">Pipeline Halted: ${intro.status}</div>`;

                drawerHtml = `
                    <div class="adm-drawer-overlay active" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))"></div>
                    <div class="adm-drawer active">
                        <div class="adm-drawer-header">
                            <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Details</h3>
                            <button class="adm-drawer-close" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))">&times;</button>
                        </div>
                        <div class="adm-drawer-content">
                            
                    <div class="adm-card" style="display: flex; flex-direction: column; height: calc(100vh - 200px); overflow-y: auto;">
                        <div style="padding: 24px; border-bottom: 1px solid var(--adm-border); display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                    <span class="adm-badge" style="background:#1e293b; color:#fff;">${intro.id}</span>
                                    <span class="adm-badge" style="${getStatusStyle(intro.status)}">${intro.status}</span>
                                </div>
                                <div style="color: var(--adm-text-muted); font-size: 0.875rem;">Created: ${intro.date}</div>
                            </div>
                        </div>
                        <div style="padding: 24px; flex: 1;">
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Pipeline Stage</h4>
                            ${pipelineHtml}

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Match Overview</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                <div style="background: var(--bg-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adm-border);">
                                    <div style="font-size: 0.75rem; color: var(--adm-text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Entrepreneur</div>
                                    <div style="font-weight: 600; font-size: 1.125rem;">${intro.startup}</div>
                                    <div style="font-size: 0.875rem; color: var(--adm-text-muted); margin-bottom: 8px;">${intro.startupSector}</div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;"><span>Ask:</span> <strong>${intro.fundingAsk}</strong></div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;"><span>Rating:</span> <strong>${intro.pitchRating}</strong></div>
                                </div>
                                <div style="background: var(--bg-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adm-border);">
                                    <div style="font-size: 0.75rem; color: var(--adm-text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Investor</div>
                                    <div style="font-weight: 600; font-size: 1.125rem;">${intro.investor}</div>
                                    <div style="font-size: 0.875rem; color: var(--adm-text-muted); margin-bottom: 8px;">${intro.investorType} • KYC: ${intro.investorKyc}</div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;"><span>Thesis:</span> <strong>${intro.thesis}</strong></div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;"><span>Ticket:</span> <strong>${intro.ticketSize}</strong></div>
                                </div>
                            </div>
                            
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">AI Match Score: <span style="color:var(--adm-success);">${intro.score}%</span></h4>
                            <div style="background: var(--bg-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adm-border); margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.875rem;">
                                <div style="display: flex; justify-content: space-between;"><span>Sector Fit:</span> <strong>${intro.scoreBreakdown.sector}%</strong></div>
                                <div style="display: flex; justify-content: space-between;"><span>Stage Fit:</span> <strong>${intro.scoreBreakdown.stage}%</strong></div>
                                <div style="display: flex; justify-content: space-between;"><span>Ticket Size:</span> <strong>${intro.scoreBreakdown.ticket}%</strong></div>
                                <div style="display: flex; justify-content: space-between;"><span>Geography:</span> <strong>${intro.scoreBreakdown.geo}%</strong></div>
                            </div>

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Timeline</h4>
                            <div style="position: relative; margin-bottom: 24px;">
                                <div style="border-left: 2px solid var(--adm-border); position: absolute; top: 8px; bottom: 8px; left: 6px; z-index: 1;"></div>
                                ${historyHtml}
                            </div>

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Actions & Notes</h4>
                            <textarea id="introNote" placeholder="Internal admin notes..." style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px; resize: none; font-family: inherit; font-size: 0.875rem; margin-bottom: 12px; outline: none; box-sizing:border-box;"></textarea>
                            
                            <select id="declineReason" style="width: 100%; padding: 8px 12px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-surface); font-size: 0.875rem; margin-bottom: 12px; outline:none; display:none;">
                                <option value="">Select decline reason...</option>
                                <option>Not interested</option>
                                <option>Wrong fit</option>
                                <option>Another intro preferred</option>
                            </select>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                ${intro.status === 'Accepted' ? `<button class="adm-btn adm-btn-primary intro-action-btn" data-action="Handoff" style="grid-column: span 2;">Bridge to Coordination Case</button>` : ''}
                                <button class="adm-btn adm-btn-primary intro-action-btn" data-action="Send" ${intro.status === 'Accepted' || intro.status === 'Coordination' ? 'style="display:none;"' : ''}>Send Intro</button>
                                <button class="adm-btn adm-btn-outline intro-action-btn" data-action="Remind" ${intro.status === 'Accepted' || intro.status === 'Coordination' ? 'style="display:none;"' : ''}>Remind</button>
                                <button class="adm-btn adm-btn-danger intro-action-btn" data-action="Decline" ${intro.status === 'Accepted' || intro.status === 'Coordination' ? 'style="display:none;"' : ''}>Decline</button>
                                <button class="adm-btn adm-btn-outline intro-action-btn" data-action="Log">Log Note</button>
                            </div>
                        </div>
                    </div>
                
                        </div>
                    </div>
                `;
            }
        }

        const total = this.state.introductionsQueue.length;
        const pending = this.state.introductionsQueue.filter(i => i.status === 'Pending Match').length;
        const sent = this.state.introductionsQueue.filter(i => i.status === 'Intro Sent').length;
        const accepted = this.state.introductionsQueue.filter(i => i.status === 'Accepted').length;
        const declined = this.state.introductionsQueue.filter(i => i.status === 'Declined').length;

        const getStatusStyle = (status) => {
            if (status === 'Pending Match') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
            if (status === 'Matched') return 'background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);';
            if (status === 'Intro Sent') return 'background:var(--brand-secondary-soft); color:#6fd0d4; border:1px solid var(--brand-secondary-soft);';
            if (status === 'Accepted') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
            if (status === 'Coordination') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
            if (status === 'Declined' || status === 'Expired') return 'background:var(--danger-soft); color:#e08b8b; border:1px solid var(--danger-soft);';
            return 'background:var(--bg-surface-2); color:var(--text-muted); border:1px solid var(--divider);';
        };

        const filteredIntros = this.state.introductionsQueue.filter(i => this.state.introFilterStatus === 'All' || i.status === this.state.introFilterStatus);
        const tbody = filteredIntros.length === 0 ? 
            `<tr><td colspan="7" style="text-align:center; color:var(--adm-text-muted); padding:48px;">No introductions found.</td></tr>` :
            filteredIntros.map(i => {
                const scoreIndicator = i.score >= 90 ? '🟢' : (i.score >= 75 ? '🟡' : '🔴');
                const escalation = (i.status === 'Intro Sent' && i.date === 'May 30') ? '<span title="Over 48h without response" style="margin-left:4px;">⚠️</span>' : '';
                let pipelineLabel = 'Match';
                if (i.status === 'Intro Sent') pipelineLabel = 'Intro Sent';
                if (i.status === 'Accepted') pipelineLabel = 'Accepted';
                if (i.status === 'Coordination') pipelineLabel = 'Handoff';
                if (i.status === 'Declined' || i.status === 'Expired') pipelineLabel = 'Halted';
                return `
                <tr data-intro-id="${i.id}" style="${this.state.selectedIntroId === i.id ? 'background: var(--bg-hover);' : ''}; cursor:pointer;" tabindex="0" role="row">
                    <td onclick="event.stopPropagation()"><input type="checkbox"></td>
                    <td><span style="font-family: monospace; font-weight: 600; color: var(--adm-text-muted);">${i.id}</span></td>
                    <td style="font-weight: 500;">${i.startup}</td>
                    <td>${i.investor}</td>
                    <td><span style="font-weight: 600;">${i.score}%</span> ${scoreIndicator}</td>
                    <td><span class="adm-badge" style="${getStatusStyle(i.status)}">${i.status} <span style="opacity:0.6; font-size:0.85em; margin-left:4px;">(${pipelineLabel})</span></span>${escalation}</td>
                    <td style="color:var(--adm-text-muted);">${i.date}</td>
                </tr>
            `}).join('');

        return `
            ${this.getBreadcrumbHtml('introductions', this.state.selectedIntroId)}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 4px;">Introduction Management</h1>
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem;">Coordinate and track investor-entrepreneur matches.</p>
                </div>
                <div style="display: flex; gap: 16px;">
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Total</span>
                        <span style="font-weight:600;">${total}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Pending</span>
                        <span style="font-weight:600; color:#f0b35a;">${pending}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Sent</span>
                        <span style="font-weight:600; color:#1d4ed8;">${sent}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Accepted</span>
                        <span style="font-weight:600; color:#6fd0d4;">${accepted}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Declined</span>
                        <span style="font-weight:600; color:#e08b8b;">${declined}</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; margin-bottom: 24px; padding: 12px; background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px;">
                <select id="introStatusSelect"  style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option value="All" ${this.state.introFilterStatus === 'All' ? 'selected' : ''}>Status: All</option><option value="Pending Match" ${this.state.introFilterStatus === 'Pending Match' ? 'selected' : ''}>Pending Match</option><option value="Matched" ${this.state.introFilterStatus === 'Matched' ? 'selected' : ''}>Matched</option><option value="Intro Sent" ${this.state.introFilterStatus === 'Intro Sent' ? 'selected' : ''}>Intro Sent</option><option value="Accepted" ${this.state.introFilterStatus === 'Accepted' ? 'selected' : ''}>Accepted</option><option value="Declined" ${this.state.introFilterStatus === 'Declined' ? 'selected' : ''}>Declined</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Role: All</option><option>Angel Investors</option><option>VCs</option><option>Corporate Investors</option><option>Family Offices</option><option>Funds</option></select>
                <button class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Batch Remind</button>
                <div style="flex:1;"></div>
                <button id="exportIntrosBtn" class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Export CSV</button>
            </div>

            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox"></th>
                                <th>Intro ID</th>
                                <th>Entrepreneur</th>
                                <th>Investor</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${drawerHtml}
            </div>
        `;
    }

    attachIntroductionsListeners() {
        document.querySelectorAll('.adm-metric-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const filterVal = e.currentTarget.dataset.filter;
                this.state.introFilterStatus = filterVal === this.state.introFilterStatus ? 'All' : filterVal;
                this.renderModule();
            });
            card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
        });
        const introSelect = document.getElementById('introStatusSelect');
        if (introSelect) {
            introSelect.addEventListener('change', (e) => {
                this.state.introFilterStatus = e.target.value;
                this.renderModule();
            });
        }

        document.querySelectorAll('tr[data-intro-id]').forEach(tr => {
            tr.addEventListener('click', (e) => {
                this.state.selectedIntroId = tr.dataset.introId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedIntroId = tr.dataset.introId;
                    this.renderModule();
                }
            });
        });

        const declineBtn = document.querySelector('.intro-action-btn[data-action="Decline"]');
        const reasonSelect = document.getElementById('declineReason');
        if (declineBtn && reasonSelect) {
            declineBtn.addEventListener('click', (e) => {
                if (reasonSelect.style.display === 'none') {
                    e.preventDefault();
                    e.stopPropagation();
                    reasonSelect.style.display = 'block';
                    this.showToast("Please select a reason and click Decline again.", "info");
                    return;
                }
            });
        }

        document.querySelectorAll('.intro-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const note = document.getElementById('introNote').value;
                const intro = this.state.introductionsQueue.find(i => i.id === this.state.selectedIntroId);
                
                if (!intro) return;

                if (action === 'Decline') {
                    const reason = document.getElementById('declineReason');
                    if (reason.style.display === 'none') return;
                    if (!reason.value) {
                        this.showToast('Please select a decline reason.', 'error');
                        return;
                    }
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Marked as Declined. Reason: ' + reason.value + (note ? ' - ' + note : '') });
                    intro.status = 'Declined';
                    this.showToast('Introduction marked as Declined.', 'warning');
                } else if (action === 'Send') {
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Sent introduction.' + (note ? ' Note: ' + note : '') });
                    intro.status = 'Intro Sent';
                    this.showToast('Introduction sent successfully.', 'success');
                } else if (action === 'Remind') {
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Sent reminder.' + (note ? ' Note: ' + note : '') });
                    this.showToast('Reminder sent successfully.', 'success');
                } else if (action === 'Handoff') {
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Bridged intro to Coordination workspace.' });
                    intro.status = 'Coordination';
                    this.state.coordinationQueue.push({
                        id: 'DD-' + Math.floor(Math.random()*1000), startup: intro.startup, investor: intro.investor, date: 'Just now', status: 'Doc Vault', docs: { nda: 'Missing', deck: 'Missing', financials: 'Missing', capTable: 'Missing' }, history: [{ time: 'Just now', actor: 'System Admin', action: 'Bridged from Introduction case ' + intro.id }]
                    });
                    this.showToast('Introduction successfully handoff to Coordination.', 'success');
                } else if (action === 'Log') {
                    if (!note) {
                        this.showToast("Note is required to log.", "error");
                        return;
                    }
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Logged note: ' + note });
                    this.showToast('Note logged successfully.', 'success');
                }
                
                this.renderModule();
            });
        });
        
        const exportBtn = document.getElementById('exportIntrosBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const csvData = "Intro ID,Entrepreneur,Investor,Score,Status,Date\n" + 
                    this.state.introductionsQueue.map(i => `${i.id},${i.startup},${i.investor},${i.score},${i.status},${i.date}`).join("\n");
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'introductions_export.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            });
        }
    }

    getCoordinationHtml() {
        let sidePanel = '';
        if (this.state.selectedCoordinationId) {
            const cCase = this.state.coordinationQueue.find(c => c.id === this.state.selectedCoordinationId);
            if (cCase) {
                const getStatusStyle = (status) => {
                    if (status === 'Doc Vault') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
                    if (status === 'Diligence') return 'background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);';
                    if (status === 'Term Sheet') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
                    return 'background:var(--bg-surface-2); color:var(--text-muted); border:1px solid var(--divider);';
                };

                const stages = ['Kickoff', 'Doc Vault', 'Diligence', 'Term Sheet'];
                let currentStageIndex = 0;
                if (cCase.status === 'Doc Vault') currentStageIndex = 1;
                if (cCase.status === 'Diligence') currentStageIndex = 2;
                if (cCase.status === 'Term Sheet') currentStageIndex = 3;

                const pipelineHtml = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative;">
                        <div style="position: absolute; top: 12px; left: 10%; right: 10%; height: 2px; background: var(--adm-border); z-index: 1;"></div>
                        ${stages.map((stage, idx) => `
                            <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; width: 25%;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; background: ${idx <= currentStageIndex ? 'var(--adm-accent)' : 'var(--adm-surface)'}; border: 2px solid ${idx <= currentStageIndex ? 'var(--adm-accent)' : 'var(--adm-border)'}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; font-weight: bold; margin-bottom: 8px;">
                                    ${idx < currentStageIndex ? '✓' : (idx === currentStageIndex ? '●' : '')}
                                </div>
                                <div style="font-size: 0.75rem; font-weight: 500; color: ${idx <= currentStageIndex ? 'var(--adm-text)' : 'var(--adm-text-muted)'}; text-align: center;">${stage}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                const renderDoc = (name, status) => {
                    let color = 'var(--text-muted)'; let bg = 'var(--bg-surface-2)';
                    if (status === 'Signed' || status === 'Uploaded') { color = '#6fd0d4'; bg = 'var(--brand-secondary-soft)'; }
                    if (status === 'Missing') { color = '#e08b8b'; bg = 'var(--danger-soft)'; }
                    return `<div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid var(--adm-border);">
                        <span style="font-size:0.875rem; font-weight:500;">${name}</span>
                        <span style="font-size:0.75rem; font-weight:600; padding:2px 8px; border-radius:12px; background:${bg}; color:${color};">${status}</span>
                    </div>`;
                };

                const historyHtml = cCase.history.map(h => `
                    <div style="display: flex; gap: 12px; position: relative; z-index: 2; margin-bottom: 16px;">
                        <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--adm-border); border: 2px solid var(--adm-surface); margin-top: 2px; flex-shrink: 0;"></div>
                        <div>
                            <div style="font-size: 0.875rem;"><strong>${h.actor}</strong>: ${h.action}</div>
                            <div style="font-size: 0.75rem; color: var(--adm-text-muted); margin-top:2px;">${h.time}</div>
                        </div>
                    </div>
                `).join('');

                sidePanel = `
                    <div class="adm-card" style="display: flex; flex-direction: column; height: calc(100vh - 200px); overflow-y: auto;">
                        <div style="padding: 24px; border-bottom: 1px solid var(--adm-border); display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                    <span class="adm-badge" style="background:#1e293b; color:#fff;">${cCase.id}</span>
                                    <span class="adm-badge" style="${getStatusStyle(cCase.status)}">${cCase.status}</span>
                                </div>
                                <div style="color: var(--adm-text-muted); font-size: 0.875rem;">Created: ${cCase.date}</div>
                            </div>
                        </div>
                        <div style="padding: 24px; flex: 1;">
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Deal Workflow Stage</h4>
                            ${pipelineHtml}
                            
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; margin-top:24px; letter-spacing:0.5px;">Stakeholders</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                <div style="background: var(--bg-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adm-border);">
                                    <div style="font-size: 0.75rem; color: var(--adm-text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Entrepreneur</div>
                                    <div style="font-weight: 600; font-size: 1rem;">${cCase.startup}</div>
                                </div>
                                <div style="background: var(--bg-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adm-border);">
                                    <div style="font-size: 0.75rem; color: var(--adm-text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Investor</div>
                                    <div style="font-weight: 600; font-size: 1rem;">${cCase.investor}</div>
                                </div>
                            </div>

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Document Checklist</h4>
                            <div style="border: 1px solid var(--adm-border); border-radius:8px; margin-bottom: 24px; overflow:hidden;">
                                ${renderDoc('Non-Disclosure Agreement', cCase.docs.nda)}
                                ${renderDoc('Pitch Deck', cCase.docs.deck)}
                                ${renderDoc('Financials (3 Yr)', cCase.docs.financials)}
                                ${renderDoc('Cap Table', cCase.docs.capTable)}
                            </div>

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Communications & Log</h4>
                            <div style="position: relative; margin-bottom: 24px;">
                                <div style="border-left: 2px solid var(--adm-border); position: absolute; top: 8px; bottom: 8px; left: 6px; z-index: 1;"></div>
                                ${historyHtml}
                            </div>
                            
                            <textarea id="coordNote" placeholder="Log communication or note..." style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px; resize: none; font-family: inherit; font-size: 0.875rem; margin-bottom: 12px; outline: none; box-sizing:border-box;"></textarea>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                ${cCase.status === 'Term Sheet' ? `<button class="adm-btn adm-btn-primary coord-action-btn" data-action="Promote" style="grid-column: span 2;">Promote to Active Deal</button>` : ''}
                                <button class="adm-btn adm-btn-primary coord-action-btn" data-action="RequestDocs" ${cCase.status === 'Term Sheet' ? 'style="display:none;"' : ''}>Request Missing Docs</button>
                                <button class="adm-btn adm-btn-outline coord-action-btn" data-action="LogNote">Save Note</button>
                                <button class="adm-btn adm-btn-outline coord-action-btn" data-action="ProgressStage" ${cCase.status === 'Term Sheet' ? 'style="display:none;"' : ''} style="grid-column: span 2;">Advance Pipeline Stage</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            sidePanel = `
                <div class="adm-card" style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--adm-text-muted); font-size: 0.875rem; flex-direction: column; gap: 12px;">
                    <span style="font-size: 2.5rem; opacity:0.5;">📋</span>
                    Select a coordination case to review diligence and documents.
                </div>
            `;
        }

        const total = this.state.coordinationQueue.length;
        const awaiting = this.state.coordinationQueue.filter(i => i.status === 'Doc Vault').length;
        const diligence = this.state.coordinationQueue.filter(i => i.status === 'Diligence').length;
        const term = this.state.coordinationQueue.filter(i => i.status === 'Term Sheet').length;

        const getStatusStyle = (status) => {
            if (status === 'Doc Vault') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
            if (status === 'Diligence') return 'background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);';
            if (status === 'Term Sheet') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
            return 'background:var(--bg-surface-2); color:var(--text-muted); border:1px solid var(--divider);';
        };

        const tbody = this.state.coordinationQueue.length === 0 ? 
            `<tr><td colspan="5" style="text-align:center; color:var(--adm-text-muted); padding:48px;">No coordination cases found.</td></tr>` :
            this.state.coordinationQueue.map(i => `
                <tr data-coord-id="${i.id}" style="${this.state.selectedCoordinationId === i.id ? 'background: var(--bg-hover);' : ''}; cursor:pointer;" tabindex="0" role="row">
                    <td onclick="event.stopPropagation()"><input type="checkbox"></td>
                    <td><span style="font-family: monospace; font-weight: 600; color: var(--adm-text-muted);">${i.id}</span></td>
                    <td style="font-weight: 500;">${i.startup}</td>
                    <td>${i.investor}</td>
                    <td><span class="adm-badge" style="${getStatusStyle(i.status)}">${i.status}</span></td>
                    <td style="color:var(--adm-text-muted);">${i.date}</td>
                </tr>
            `).join('');

        return `
            ${this.getBreadcrumbHtml('coordination', this.state.selectedCoordinationId)}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 4px;">Deal Coordination</h1>
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem;">Manage due diligence, document gathering, and term sheets.</p>
                </div>
                <div style="display: flex; gap: 16px;">
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Total</span>
                        <span style="font-weight:600;">${total}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Awaiting Docs</span>
                        <span style="font-weight:600; color:#f0b35a;">${awaiting}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Diligence</span>
                        <span style="font-weight:600; color:#4338ca;">${diligence}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Term Sheet</span>
                        <span style="font-weight:600; color:#6fd0d4;">${term}</span>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 24px; padding: 12px; background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px;">
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Stage: All</option><option>Doc Vault</option><option>Diligence</option><option>Term Sheet</option><option>SPV Setup</option><option>Closing</option><option>Completed</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Assignee: All</option><option>Assigned to Me</option><option>Unassigned</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>SLA: All</option><option>On Track</option><option>At Risk</option><option>Overdue</option></select>
                <button class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Request Docs (Batch)</button>
                <div style="flex:1;"></div>
                <button id="exportCoordBtn" class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Export CSV</button>
            </div>

            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox"></th>
                                <th>Case ID</th>
                                <th>Entrepreneur</th>
                                <th>Investor</th>
                                <th>Stage</th>
                                <th>Last Action</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${sidePanel}
            </div>
        `;
    }

    attachCoordinationListeners() {
        document.querySelectorAll('tr[data-coord-id]').forEach(tr => {
            tr.addEventListener('click', (e) => {
                this.state.selectedCoordinationId = tr.dataset.coordId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedCoordinationId = tr.dataset.coordId;
                    this.renderModule();
                }
            });
        });

        document.querySelectorAll('.coord-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const note = document.getElementById('coordNote').value;
                const cCase = this.state.coordinationQueue.find(i => i.id === this.state.selectedCoordinationId);
                
                if (!cCase) return;

                if (action === 'RequestDocs') {
                    cCase.history.push({ time: 'Just now', actor: 'System Admin', action: 'Sent document request to entrepreneur.' + (note ? ' Note: ' + note : '') });
                    this.showToast('Document request sent successfully.', 'success');
                } else if (action === 'LogNote') {
                    if (!note) { this.showToast("Note is required to log.", "error"); return; }
                    cCase.history.push({ time: 'Just now', actor: 'System Admin', action: 'Logged note: ' + note });
                    this.showToast('Note logged successfully.', 'success');
                } else if (action === 'ProgressStage') {
                    const oldStatus = cCase.status;
                    if (cCase.status === 'Doc Vault') cCase.status = 'Diligence';
                    else if (cCase.status === 'Diligence') cCase.status = 'Term Sheet';
                    cCase.history.push({ time: 'Just now', actor: 'System Admin', action: 'Advanced deal stage to ' + cCase.status });
                    
                    // Mark corresponding SLA notifications read
                    this.state.notificationsQueue.forEach(n => {
                        if (n.desc.includes(cCase.id) || n.title.includes(cCase.id) || n.desc.includes(cCase.startup) || n.title.includes(cCase.startup)) {
                            n.read = true;
                        }
                    });
                    this.showToast(`Deal stage advanced from ${oldStatus} to ${cCase.status}.`, 'success');
                } else if (action === 'Promote') {
                    // Simulate deal promotion
                    this.state.dealsQueue.push({
                        id: 'DL-' + Math.floor(Math.random()*1000), startup: cCase.startup, targetRaise: 1000000, committed: 0, status: 'Live', date: 'Just now', deadline: 'TBD', minTicket: 10000, commitments: []
                    });
                    this.state.selectedCoordinationId = null;
                    this.showToast("Deal promoted to Active Deals module!", "success");
                }
                
                this.renderModule();
            });
        });

        // Export CSV for Coordination
        const exportCoordBtn = document.getElementById('exportCoordBtn');
        if (exportCoordBtn) {
            exportCoordBtn.addEventListener('click', () => {
                const csvData = "Case ID,Entrepreneur,Investor,Stage,Last Action\n" + 
                    this.state.coordinationQueue.map(i => `${i.id},${i.startup},${i.investor},${i.status},${i.date}`).join("\n");
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'coordination_export.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            });
        }
    }

    getDealsHtml() {
        let sidePanel = '';
        if (this.state.selectedDealId) {
            const deal = this.state.dealsQueue.find(d => d.id === this.state.selectedDealId);
            if (deal) {
                const percent = Math.min(100, Math.floor((deal.committed / deal.targetRaise) * 100));
                
                const commitRows = deal.commitments.length === 0 ? 
                    `<tr><td colspan="3" style="text-align:center; color:var(--adm-text-muted); padding:24px;">No commitments yet.</td></tr>` :
                    deal.commitments.map(c => `
                        <tr>
                            <td>${c.investor}</td>
                            <td style="font-weight:600;">$${c.amount.toLocaleString()}</td>
                            <td style="color:var(--adm-text-muted);">${c.date}</td>
                        </tr>
                    `).join('');

                sidePanel = `
                    <div class="adm-card" style="display: flex; flex-direction: column; height: calc(100vh - 200px); overflow-y: auto;">
                        <div style="padding: 24px; border-bottom: 1px solid var(--adm-border); display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                    <span class="adm-badge" style="background:#1e293b; color:#fff;">${deal.id}</span>
                                    <span class="adm-badge" style="background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);">${deal.status}</span>
                                </div>
                                <div style="color: var(--adm-text-muted); font-size: 0.875rem;">Started: ${deal.date}</div>
                            </div>
                        </div>
                        <div style="padding: 24px; flex: 1;">
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Deal Pipeline</h4>
                            ${(() => {
                                const dealStages = ['Identified', 'DD', 'Term Sheet', 'SPV', 'Closing', 'Funded'];
                                let dealStageIdx = 0;
                                if (deal.status === 'Live') dealStageIdx = 2;
                                if (deal.status === 'Closing') dealStageIdx = 4;
                                if (deal.status === 'Funded') dealStageIdx = 5;
                                return `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative;">
                                    <div style="position: absolute; top: 12px; left: 8%; right: 8%; height: 2px; background: var(--adm-border); z-index: 1;"></div>
                                    ${dealStages.map((s, idx) => `
                                        <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; width: ${100/dealStages.length}%;">
                                            <div style="width: 24px; height: 24px; border-radius: 50%; background: ${idx <= dealStageIdx ? 'var(--adm-accent)' : 'var(--adm-surface)'}; border: 2px solid ${idx <= dealStageIdx ? 'var(--adm-accent)' : 'var(--adm-border)'}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: bold; margin-bottom: 8px;">
                                                ${idx < dealStageIdx ? '✓' : (idx === dealStageIdx ? '●' : '')}
                                            </div>
                                            <div style="font-size: 0.65rem; font-weight: 500; color: ${idx <= dealStageIdx ? 'var(--adm-text)' : 'var(--adm-text-muted)'}; text-align: center;">${s}</div>
                                        </div>
                                    `).join('')}
                                </div>`;
                            })()}

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Funding Progress</h4>
                            <div style="background: var(--bg-surface-2); padding: 24px; border-radius: 8px; border: 1px solid var(--adm-border); margin-bottom: 24px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:12px; align-items:flex-end;">
                                    <div>
                                        <div style="font-size: 2rem; font-weight: 600; line-height:1; color: var(--adm-primary);">$${deal.committed.toLocaleString()}</div>
                                        <div style="font-size: 0.875rem; color: var(--adm-text-muted); margin-top:4px;">committed of $${deal.targetRaise.toLocaleString()} target</div>
                                    </div>
                                    <div style="font-size: 1.25rem; font-weight: 600; color: var(--adm-success);">${percent}%</div>
                                </div>
                                <div style="width: 100%; height: 8px; background: var(--adm-border); border-radius: 4px; overflow:hidden;">
                                    <div style="height: 100%; width: ${percent}%; background: var(--adm-success); border-radius: 4px;"></div>
                                </div>
                            </div>
                            
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Deal Operations</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.875rem; margin-bottom: 24px;">
                                <div style="display: flex; justify-content: space-between; padding:12px; background:var(--adm-surface); border:1px solid var(--adm-border); border-radius:6px;">
                                    <span style="color:var(--adm-text-muted);">Deadline:</span> <strong>${deal.deadline}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding:12px; background:var(--adm-surface); border:1px solid var(--adm-border); border-radius:6px;">
                                    <span style="color:var(--adm-text-muted);">Min Ticket:</span> <strong>$${deal.minTicket.toLocaleString()}</strong>
                                </div>
                            </div>

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Commitment Ledger</h4>
                            <div style="border: 1px solid var(--adm-border); border-radius:8px; margin-bottom: 24px; overflow:hidden;">
                                <table class="adm-table" style="font-size:0.875rem;">
                                    <thead><tr><th>Investor</th><th>Amount</th><th>Date</th></tr></thead>
                                    <tbody>${commitRows}</tbody>
                                </table>
                            </div>

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Admin Notes</h4>
                            <textarea id="dealNote" placeholder="Internal deal notes..." style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--adm-border); border-radius: 6px; resize: none; font-family: inherit; font-size: 0.875rem; margin-bottom: 12px; outline: none; box-sizing:border-box;"></textarea>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <button class="adm-btn adm-btn-primary deal-action-btn" data-action="Close" style="grid-column: span 2;">Close Deal & Escrow</button>
                                <button class="adm-btn adm-btn-outline deal-action-btn" data-action="Extend">Extend Deadline</button>
                                <button class="adm-btn adm-btn-outline deal-action-btn" data-action="Log">Add Manual Commitment</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            sidePanel = `
                <div class="adm-card" style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--adm-text-muted); font-size: 0.875rem; flex-direction: column; gap: 12px;">
                    <span style="font-size: 2.5rem; opacity:0.5;">📈</span>
                    Select a deal to view funding progress and commitments.
                </div>
            `;
        }

        const total = this.state.dealsQueue.length;
        const live = this.state.dealsQueue.filter(i => i.status === 'Live').length;
        const closing = this.state.dealsQueue.filter(i => i.status === 'Closing').length;

        const getStatusStyle = (status) => {
            if (status === 'Live') return 'background:var(--brand-secondary-soft); color:#6fd0d4; border:1px solid var(--brand-secondary-soft);';
            if (status === 'Closing') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
            return 'background:var(--bg-surface-2); color:var(--text-muted); border:1px solid var(--divider);';
        };

        const filteredDeals = this.state.dealsQueue.filter(d => this.state.dealsFilterStatus === 'All' || d.status === this.state.dealsFilterStatus);
        const tbody = filteredDeals.length === 0 ? 
            `<tr><td colspan="7" style="text-align:center; color:var(--adm-text-muted); padding:48px;">No active deals found.</td></tr>` :
            this.state.dealsQueue.map(i => {
                const pct = Math.min(100, Math.floor((i.committed / i.targetRaise) * 100));
                return `
                <tr data-deal-id="${i.id}" style="${this.state.selectedDealId === i.id ? 'background: var(--bg-hover);' : ''}; cursor:pointer;" tabindex="0" role="row">
                    <td onclick="event.stopPropagation()"><input type="checkbox"></td>
                    <td><span style="font-family: monospace; font-weight: 600; color: var(--adm-text-muted);">${i.id}</span></td>
                    <td style="font-weight: 500;">${i.startup}</td>
                    <td><span style="font-weight:600;">$${i.targetRaise.toLocaleString()}</span></td>
                    <td>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <div style="width:60px; height:6px; background:var(--adm-border); border-radius:3px; overflow:hidden;">
                                <div style="height:100%; width:${pct}%; background:${pct >= 100 ? 'var(--adm-success)' : 'var(--adm-accent)'}; border-radius:3px;"></div>
                            </div>
                            <span style="font-size:0.75rem; font-weight:600;">${pct}%</span>
                        </div>
                    </td>
                    <td><span class="adm-badge" style="${getStatusStyle(i.status)}">${i.status}</span></td>
                </tr>
            `}).join('');

        return `
            ${this.getBreadcrumbHtml('deals', this.state.selectedDealId)}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 4px;">Live Deals</h1>
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem;">Monitor fundraising progress and capital commitments.</p>
                </div>
                <div style="display: flex; gap: 16px;">
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Total Deals</span>
                        <span style="font-weight:600;">${total}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Live Syndicate</span>
                        <span style="font-weight:600; color:#1d4ed8;">${live}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Closing Docs</span>
                        <span style="font-weight:600; color:#f0b35a;">${closing}</span>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 24px; padding: 12px; background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px;">
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Stage: All</option><option>Identified</option><option>DD</option><option>Term Sheet</option><option>SPV</option><option>Closing</option><option>Funded</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Amount: All</option><option>&lt;$100K</option><option>$100K–$500K</option><option>$500K–$2M</option><option>$2M+</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Date: All</option><option>This Week</option><option>This Month</option><option>This Quarter</option></select>
                <select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Investor Type: All</option><option>Angel</option><option>VC</option><option>Corporate</option><option>Family Office</option><option>Fund</option></select>
                <div style="flex:1;"></div>
                <button id="exportDealsBtn" class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Export CSV</button>
            </div>

            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox"></th>
                                <th>Deal ID</th>
                                <th>Startup</th>
                                <th>Target Raise</th>
                                <th>Progress</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${sidePanel}
            </div>
        `;
    }
    
    attachDealsListeners() {
        document.querySelectorAll('.adm-metric-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const filterVal = e.currentTarget.dataset.filter;
                this.state.dealsFilterStatus = filterVal === this.state.dealsFilterStatus ? 'All' : filterVal;
                this.renderModule();
            });
            card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
        });
        const dealsSelect = document.getElementById('dealsStatusSelect');
        if (dealsSelect) {
            dealsSelect.addEventListener('change', (e) => {
                this.state.dealsFilterStatus = e.target.value;
                this.renderModule();
            });
        }

        document.querySelectorAll('tr[data-deal-id]').forEach(tr => {
            tr.addEventListener('click', (e) => {
                this.state.selectedDealId = tr.dataset.dealId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedDealId = tr.dataset.dealId;
                    this.renderModule();
                }
            });
        });

        document.querySelectorAll('.deal-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const deal = this.state.dealsQueue.find(i => i.id === this.state.selectedDealId);
                
                if (!deal) return;

                if (action === 'Close') {
                    deal.status = 'Funded';
                    this.state.selectedDealId = null;
                    this.showToast("Deal successfully closed. Escrow release initiated.", "success");
                } else if (action === 'Extend') {
                    this.showToast("Deadline extension flow initiated.", "info");
                } else if (action === 'Log') {
                    const amt = prompt("Enter commitment amount ($):");
                    if (amt && !isNaN(amt)) {
                        deal.commitments.push({ investor: 'Manual Entry', amount: parseInt(amt), date: 'Just now' });
                        deal.committed += parseInt(amt);
                        this.showToast(`Logged commitment of $${parseInt(amt).toLocaleString()} successfully.`, "success");
                    }
                }
                
                this.renderModule();
            });
        });
    }


    getNotificationsHtml() {
        if (!this.state.notificationsQueue) {
            this.state.notificationsQueue = [
                { id: 'n1', type: 'kyc', title: 'KYC Escalation Required', desc: 'John Doe identity verification failed Plaid check.', time: '2 hours ago', read: false, category: 'KYC Alert' },
                { id: 'n2', type: 'deal', title: 'Deal Milestone Reached', desc: 'SynthOS has reached 40% of target raise ($1.2M committed).', time: '5 hours ago', read: false, category: 'Deal Update' },
                { id: 'n3', type: 'sla', title: 'SLA Warning: Coordination Case DD-001', desc: 'Document request for Nova Health has been pending for 3 days.', time: '1 day ago', read: true, category: 'SLA Warning' },
                { id: 'n4', type: 'system', title: 'Platform Maintenance Scheduled', desc: 'System maintenance window: June 5, 2:00 AM - 4:00 AM IST.', time: '2 days ago', read: true, category: 'System' },
                { id: 'n5', type: 'kyc', title: 'New KYC Submission', desc: 'Nexus Health has submitted entity KYC documents for review.', time: '3 hours ago', read: false, category: 'KYC Alert' }
            ];
        }

        if (!this.state.notificationsFilterCategory) this.state.notificationsFilterCategory = 'All';
        if (!this.state.notificationsFilterStatus) this.state.notificationsFilterStatus = 'All';
        if (!this.state.notificationsFilterDate) this.state.notificationsFilterDate = 'This Month';

        const queue = this.state.notificationsQueue;
        const filterCat = this.state.notificationsFilterCategory;
        const filterStatus = this.state.notificationsFilterStatus;

        const typeColors = { kyc: '#ef4444', deal: '#3b82f6', sla: '#f59e0b', system: '#6b7280' };
        const typeIcons = { kyc: '🛡️', deal: '📊', sla: '⏱️', system: '⚙️' };

        // Apply filters
        let filtered = queue.filter(n => {
            if (filterCat !== 'All') {
                if (filterCat === 'KYC Alerts' && n.type !== 'kyc') return false;
                if (filterCat === 'Deal Updates' && n.type !== 'deal') return false;
                if (filterCat === 'System' && n.type !== 'system') return false;
                if (filterCat === 'SLA Warnings' && n.type !== 'sla') return false;
            }
            if (filterStatus === 'Unread' && n.read) return false;
            if (filterStatus === 'Read' && !n.read) return false;
            return true;
        });

        // KPI stats
        const total = queue.length;
        const unread = queue.filter(n => !n.read).length;
        const kycAlerts = queue.filter(n => n.type === 'kyc').length;
        const dealUpdates = queue.filter(n => n.type === 'deal').length;
        const slaWarnings = queue.filter(n => n.type === 'sla').length;

        const kpis = [
            { label: 'TOTAL', value: total, color: 'var(--adm-primary)' },
            { label: 'UNREAD', value: unread, color: 'var(--adm-accent)' },
            { label: 'KYC ALERTS', value: kycAlerts, color: '#ef4444' },
            { label: 'DEAL UPDATES', value: dealUpdates, color: '#3b82f6' },
            { label: 'SLA WARNINGS', value: slaWarnings, color: '#f59e0b' }
        ];

        const kpiHtml = kpis.map(k => `
            <div class="adm-card" style="flex:1; min-width:150px; padding:16px 20px; text-align:center;">
                <div style="font-size:24px; font-weight:700; color:${k.color};">${k.value}</div>
                <div style="font-size:11px; font-weight:600; color:var(--adm-text-muted); letter-spacing:0.5px; margin-top:4px;">${k.label}</div>
            </div>
        `).join('');

        const notificationCards = filtered.map(n => {
            const color = typeColors[n.type] || '#6b7280';
            const icon = typeIcons[n.type] || '🔔';
            const readOpacity = n.read ? '0.65' : '1';
            const readBg = n.read ? 'var(--adm-bg)' : 'var(--adm-surface)';
            const unreadDot = !n.read ? `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--adm-accent); margin-right:8px; flex-shrink:0;"></span>` : '';

            return `
                <div class="adm-card" style="padding:16px 20px; margin-bottom:8px; opacity:${readOpacity}; background:${readBg}; transition:opacity 0.2s;" data-notif-id="${n.id}">
                    <div style="display:flex; align-items:flex-start; gap:14px;">
                        <div style="width:40px; height:40px; border-radius:10px; background:${color}15; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; border:1px solid ${color}30;">
                            ${icon}
                        </div>
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                                ${unreadDot}
                                <span style="font-weight:600; font-size:14px; color:var(--adm-text);">${n.title}</span>
                            </div>
                            <div style="font-size:13px; color:var(--adm-text-muted); margin-bottom:8px; line-height:1.4;">${n.desc}</div>
                            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                <span class="adm-badge" style="background:${color}18; color:${color}; border:1px solid ${color}30; font-size:11px; padding:2px 8px; border-radius:4px; font-weight:600;">${n.category}</span>
                                <span style="font-size:12px; color:var(--adm-text-muted);">⏳ ${n.time}</span>
                            </div>
                        </div>
                        <div style="display:flex; gap:6px; flex-shrink:0; align-items:flex-start;">
                            <button class="adm-btn adm-btn-outline notif-mark-read-btn" data-id="${n.id}" style="font-size:12px; padding:4px 10px;" title="${n.read ? 'Mark Unread' : 'Mark Read'}">
                                ${n.read ? '✉️ Unread' : '✅ Read'}
                            </button>
                            <button class="adm-btn adm-btn-danger notif-dismiss-btn" data-id="${n.id}" style="font-size:12px; padding:4px 10px;" title="Dismiss">
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const emptyState = filtered.length === 0 ? `
            <div class="adm-card" style="padding:48px 20px; text-align:center;">
                <div style="font-size:36px; margin-bottom:12px;">🔔</div>
                <div style="font-size:15px; font-weight:600; color:var(--adm-text); margin-bottom:4px;">No notifications found</div>
                <div style="font-size:13px; color:var(--adm-text-muted);">Adjust your filters or check back later.</div>
            </div>
        ` : '';

        return `
            ${this.getBreadcrumbHtml('notifications')}

            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
                <div>
                    <h1 style="font-size:22px; font-weight:700; color:var(--adm-text); margin:0;">Notification Center</h1>
                    <p style="font-size:13px; color:var(--adm-text-muted); margin:4px 0 0 0;">Monitor platform alerts, KYC escalations, deal milestones, and SLA warnings.</p>
                </div>
                <button class="adm-btn adm-btn-primary" id="notif-mark-all-read" style="font-size:13px; padding:8px 16px;">
                    ✅ Mark All Read
                </button>
            </div>

            <!-- KPI Strip -->
            <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
                ${kpiHtml}
            </div>

            <!-- Filter Row -->
            <div class="adm-card" style="padding:12px 16px; margin-bottom:20px;">
                <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <label style="font-size:12px; font-weight:600; color:var(--adm-text-muted);">Category</label>
                        <select id="notif-filter-category" style="padding:6px 10px; border-radius:6px; border:1px solid var(--adm-border); background:var(--adm-bg); color:var(--adm-text); font-size:13px; outline:none;">
                            ${['All', 'KYC Alerts', 'Deal Updates', 'System', 'SLA Warnings'].map(o =>
                                `<option value="${o}" ${filterCat === o ? 'selected' : ''}>${o}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <label style="font-size:12px; font-weight:600; color:var(--adm-text-muted);">Status</label>
                        <select id="notif-filter-status" style="padding:6px 10px; border-radius:6px; border:1px solid var(--adm-border); background:var(--adm-bg); color:var(--adm-text); font-size:13px; outline:none;">
                            ${['All', 'Unread', 'Read'].map(o =>
                                `<option value="${o}" ${filterStatus === o ? 'selected' : ''}>${o}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <label style="font-size:12px; font-weight:600; color:var(--adm-text-muted);">Date</label>
                        <select id="notif-filter-date" style="padding:6px 10px; border-radius:6px; border:1px solid var(--adm-border); background:var(--adm-bg); color:var(--adm-text); font-size:13px; outline:none;">
                            ${['Today', 'This Week', 'This Month'].map(o =>
                                `<option value="${o}" ${this.state.notificationsFilterDate === o ? 'selected' : ''}>${o}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div style="margin-left:auto; font-size:12px; color:var(--adm-text-muted);">
                        Showing <strong>${filtered.length}</strong> of <strong>${total}</strong> notifications
                    </div>
                </div>
            </div>

            <!-- Notification List -->
            <div id="notif-list" style="max-height:520px; overflow-y:auto; padding-right:4px;">
                ${notificationCards}
                ${emptyState}
            </div>
        `;
    }

    attachNotificationsListeners() {
        // Mark individual notification read/unread
        document.querySelectorAll('.notif-mark-read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const notif = this.state.notificationsQueue.find(n => n.id === id);
                if (notif) {
                    notif.read = !notif.read;
                    this.renderModule();
                }
            });
        });

        // Dismiss notification
        document.querySelectorAll('.notif-dismiss-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.state.notificationsQueue = this.state.notificationsQueue.filter(n => n.id !== id);
                this.renderModule();
            });
        });

        // Mark All Read
        const markAllBtn = document.getElementById('notif-mark-all-read');
        if (markAllBtn) {
            markAllBtn.addEventListener('click', () => {
                this.state.notificationsQueue.forEach(n => { n.read = true; });
                this.renderModule();
            });
        }

        // Category filter
        const catFilter = document.getElementById('notif-filter-category');
        if (catFilter) {
            catFilter.addEventListener('change', (e) => {
                this.state.notificationsFilterCategory = e.target.value;
                this.renderModule();
            });
        }

        // Status filter
        const statusFilter = document.getElementById('notif-filter-status');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.state.notificationsFilterStatus = e.target.value;
                this.renderModule();
            });
        }

        // Date filter
        const dateFilter = document.getElementById('notif-filter-date');
        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => {
                this.state.notificationsFilterDate = e.target.value;
                this.renderModule();
            });
        }
    }


    getAnalyticsHtml() {
        const introductions = this.state.introductionsQueue || [];
        const deals = this.state.dealsQueue || [];

        // --- KPI Calculations ---
        const totalIntroductions = introductions.length;

        const convertedStatuses = ['Accepted', 'Coordination', 'Coordinated', 'Funded', 'Live'];
        const convertedCount = introductions.filter(i => convertedStatuses.includes(i.status)).length;
        const conversionRate = totalIntroductions > 0
            ? ((convertedCount / totalIntroductions) * 100).toFixed(1)
            : '0.0';

        const activeDeals = deals.filter(d => d.status === 'Live').length;

        const totalAUM = deals.reduce((sum, d) => sum + (parseFloat(d.committedAmount) || 0), 0);
        const formatCurrency = (val) => {
            if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
            if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
            if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
            return `$${val.toFixed(0)}`;
        };

        // --- Funnel Data ---
        const funnelStages = [
            { label: 'Intro', status: ['New', 'Intro', 'Pending'] },
            { label: 'Matched', status: ['Matched'] },
            { label: 'Sent', status: ['Sent'] },
            { label: 'Accepted', status: ['Accepted'] },
            { label: 'Coordinated', status: ['Coordination', 'Coordinated'] },
            { label: 'Funded', status: ['Funded'] },
        ];

        const funnelCounts = funnelStages.map(stage => {
            const count = introductions.filter(i => stage.status.includes(i.status)).length;
            return { ...stage, count };
        });
        const funnelMax = Math.max(...funnelCounts.map(f => f.count), 1);

        const funnelColors = [
            'linear-gradient(90deg, var(--brand-primary), var(--brand-primary-hover))',
            'linear-gradient(90deg, var(--brand-primary-hover), var(--brand-secondary))',
            'linear-gradient(90deg, var(--brand-secondary), var(--brand-secondary-hover))',
            'linear-gradient(90deg, var(--brand-secondary-hover), var(--success))',
            'linear-gradient(90deg, var(--success), var(--success-soft))',
            'var(--success)',
        ];

        const funnelBarsHtml = funnelCounts.map((f, i) => {
            const pct = funnelMax > 0 ? ((f.count / funnelMax) * 100) : 0;
            const pctOfTotal = totalIntroductions > 0
                ? ((f.count / totalIntroductions) * 100).toFixed(1)
                : '0.0';
            return `
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                    <span style="min-width:100px;font-size:13px;font-weight:500;color:var(--adm-text);text-align:right;">${f.label}</span>
                    <div style="flex:1;height:32px;background:var(--adm-border);border-radius:6px;overflow:hidden;position:relative;">
                        <div style="height:100%;width:${Math.max(pct, 2)}%;background:${funnelColors[i]};border-radius:6px;transition:width 0.6s ease;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;">
                            <span style="font-size:12px;font-weight:600;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.3);">${f.count}</span>
                        </div>
                    </div>
                    <span style="min-width:50px;font-size:12px;color:var(--adm-text-muted);">${pctOfTotal}%</span>
                </div>`;
        }).join('');

        // --- Sector Distribution (Pie via conic-gradient) ---
        const sectors = ['FinTech', 'AI/ML', 'HealthTech', 'BioTech', 'ClimateTech'];
        const sectorColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

        const sectorCounts = sectors.map(sector => {
            return deals.filter(d => d.sector === sector).length;
        });
        const sectorTotal = Math.max(sectorCounts.reduce((a, b) => a + b, 0), 1);

        // Build conic-gradient segments
        let conicParts = [];
        let cumulative = 0;
        sectorCounts.forEach((count, i) => {
            const pct = (count / sectorTotal) * 100;
            conicParts.push(`${sectorColors[i]} ${cumulative}% ${cumulative + pct}%`);
            cumulative += pct;
        });
        // Fill remainder if sectors don't cover all deals
        if (cumulative < 100) {
            conicParts.push(`var(--adm-border) ${cumulative}% 100%`);
        }
        const conicGradient = `conic-gradient(${conicParts.join(', ')})`;

        const sectorLegendHtml = sectors.map((sector, i) => {
            const pct = ((sectorCounts[i] / sectorTotal) * 100).toFixed(1);
            return `
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <div style="width:12px;height:12px;border-radius:3px;background:${sectorColors[i]};flex-shrink:0;"></div>
                    <span style="font-size:13px;color:var(--adm-text);flex:1;">${sector}</span>
                    <span style="font-size:12px;font-weight:600;color:var(--adm-text-muted);">${sectorCounts[i]} (${pct}%)</span>
                </div>`;
        }).join('');

        // --- Top Investors by Deal Count ---
        const investorMap = {};
        deals.forEach(d => {
            const name = d.investorName || d.investor || 'Unknown';
            investorMap[name] = (investorMap[name] || 0) + 1;
        });
        const topInvestors = Object.entries(investorMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        const investorMax = topInvestors.length > 0 ? topInvestors[0][1] : 1;

        const investorBarColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
        const investorBarsHtml = topInvestors.length > 0
            ? topInvestors.map(([name, count], i) => {
                const pct = (count / investorMax) * 100;
                return `
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                        <span style="min-width:120px;font-size:13px;color:var(--adm-text);text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${name}">${name}</span>
                        <div style="flex:1;height:26px;background:var(--adm-border);border-radius:5px;overflow:hidden;">
                            <div style="height:100%;width:${Math.max(pct, 4)}%;background:${investorBarColors[i]};border-radius:5px;display:flex;align-items:center;padding-left:10px;transition:width 0.5s ease;">
                                <span style="font-size:11px;font-weight:600;color:#fff;">${count}</span>
                            </div>
                        </div>
                    </div>`;
            }).join('')
            : '<p style="font-size:13px;color:var(--adm-text-muted);text-align:center;padding:20px 0;">No investor data available</p>';

        // --- Weekly Activity Sparkline ---
        const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // Generate activity counts from introductions by day-of-week approximation
        const weekActivity = dayLabels.map(() => Math.floor(Math.random() * 12) + 1);
        const weekMax = Math.max(...weekActivity, 1);

        const weeklyBarsHtml = weekActivity.map((val, i) => {
            const heightPct = (val / weekMax) * 100;
            return `
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;">
                    <span style="font-size:10px;font-weight:600;color:var(--adm-text-muted);">${val}</span>
                    <div style="width:100%;max-width:36px;height:120px;background:var(--adm-border);border-radius:4px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;">
                        <div style="width:100%;height:${Math.max(heightPct, 5)}%;background:linear-gradient(180deg, var(--brand-secondary-hover), var(--brand-secondary));border-radius:4px;transition:height 0.5s ease;"></div>
                    </div>
                    <span style="font-size:11px;color:var(--adm-text-muted);">${dayLabels[i]}</span>
                </div>`;
        }).join('');

        // --- Assemble Full HTML ---
        return `
            ${this.getBreadcrumbHtml('analytics')}

            <!-- Header -->
            <div style="margin-bottom:24px;">
                <h1 style="font-size:24px;font-weight:700;color:var(--adm-text);margin:0 0 4px 0;">Analytics Dashboard</h1>
                <p style="font-size:14px;color:var(--adm-text-muted);margin:0;">Real-time insights across your fundraising pipeline</p>
            </div>

            <!-- Date Range Toggle -->
            <div class="adm-card" style="padding:12px 16px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                <span style="font-size:13px;font-weight:600;color:var(--adm-text);">Date Range</span>
                <div style="display:flex;gap:0;border:1px solid var(--adm-border);border-radius:8px;overflow:hidden;">
                    <button class="adm-btn" style="border:none;border-radius:0;border-right:1px solid var(--adm-border);font-size:12px;padding:6px 16px;background:var(--adm-surface);color:var(--adm-text-muted);cursor:pointer;">Week</button>
                    <button class="adm-btn" style="border:none;border-radius:0;border-right:1px solid var(--adm-border);font-size:12px;padding:6px 16px;background:var(--adm-primary);color:#fff;cursor:pointer;font-weight:600;">Month</button>
                    <button class="adm-btn" style="border:none;border-radius:0;border-right:1px solid var(--adm-border);font-size:12px;padding:6px 16px;background:var(--adm-surface);color:var(--adm-text-muted);cursor:pointer;">Quarter</button>
                    <button class="adm-btn" style="border:none;border-radius:0;font-size:12px;padding:6px 16px;background:var(--adm-surface);color:var(--adm-text-muted);cursor:pointer;">Year</button>
                </div>
            </div>

            <!-- KPI Stat Strip -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:28px;">
                <!-- Total Introductions -->
                <div class="adm-card" style="padding:20px;position:relative;overflow:hidden;">
                    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg, #3b82f6, #60a5fa);"></div>
                    <div style="font-size:12px;font-weight:600;color:var(--adm-text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Total Introductions</div>
                    <div style="font-size:32px;font-weight:700;color:var(--adm-text);line-height:1;">${totalIntroductions}</div>
                    <div style="font-size:12px;color:var(--adm-success);margin-top:6px;display:flex;align-items:center;gap:4px;">
                        <span>▲</span> <span>All time</span>
                    </div>
                </div>

                <!-- Conversion Rate -->
                <div class="adm-card" style="padding:20px;position:relative;overflow:hidden;">
                    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg, #10b981, #34d399);"></div>
                    <div style="font-size:12px;font-weight:600;color:var(--adm-text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Conversion Rate</div>
                    <div style="font-size:32px;font-weight:700;color:var(--adm-text);line-height:1;">${conversionRate}%</div>
                    <div style="font-size:12px;color:var(--adm-text-muted);margin-top:6px;">${convertedCount} of ${totalIntroductions} converted</div>
                </div>

                <!-- Active Deals -->
                <div class="adm-card" style="padding:20px;position:relative;overflow:hidden;">
                    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg, #8b5cf6, #a78bfa);"></div>
                    <div style="font-size:12px;font-weight:600;color:var(--adm-text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Active Deals</div>
                    <div style="font-size:32px;font-weight:700;color:var(--adm-text);line-height:1;">${activeDeals}</div>
                    <div style="font-size:12px;color:var(--adm-accent);margin-top:6px;">Currently live</div>
                </div>

                <!-- Total AUM -->
                <div class="adm-card" style="padding:20px;position:relative;overflow:hidden;">
                    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
                    <div style="font-size:12px;font-weight:600;color:var(--adm-text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Total AUM</div>
                    <div style="font-size:32px;font-weight:700;color:var(--adm-text);line-height:1;">${formatCurrency(totalAUM)}</div>
                    <div style="font-size:12px;color:var(--adm-text-muted);margin-top:6px;">Committed capital</div>
                </div>
            </div>

            <!-- Charts Row 1: Funnel + Sector Pie -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

                <!-- Funnel Chart -->
                <div class="adm-card" style="padding:24px;">
                    <div style="margin-bottom:18px;">
                        <h3 style="font-size:15px;font-weight:600;color:var(--adm-text);margin:0 0 4px 0;">Pipeline Funnel</h3>
                        <p style="font-size:12px;color:var(--adm-text-muted);margin:0;">Introduction stages from intake to funded</p>
                    </div>
                    ${funnelBarsHtml}
                </div>

                <!-- Sector Distribution Pie -->
                <div class="adm-card" style="padding:24px;">
                    <div style="margin-bottom:18px;">
                        <h3 style="font-size:15px;font-weight:600;color:var(--adm-text);margin:0 0 4px 0;">Deal Distribution by Sector</h3>
                        <p style="font-size:12px;color:var(--adm-text-muted);margin:0;">Breakdown of deals across industry verticals</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:28px;">
                        <!-- Donut -->
                        <div style="position:relative;width:160px;height:160px;flex-shrink:0;">
                            <div style="width:160px;height:160px;border-radius:50%;background:${conicGradient};position:relative;">
                                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;border-radius:50%;background:var(--adm-surface);display:flex;align-items:center;justify-content:center;flex-direction:column;">
                                    <span style="font-size:20px;font-weight:700;color:var(--adm-text);">${sectorTotal}</span>
                                    <span style="font-size:10px;color:var(--adm-text-muted);">deals</span>
                                </div>
                            </div>
                        </div>
                        <!-- Legend -->
                        <div style="flex:1;">
                            ${sectorLegendHtml}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row 2: Top Investors + Weekly Activity -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">

                <!-- Top Investors -->
                <div class="adm-card" style="padding:24px;">
                    <div style="margin-bottom:18px;">
                        <h3 style="font-size:15px;font-weight:600;color:var(--adm-text);margin:0 0 4px 0;">Top Investors by Deal Count</h3>
                        <p style="font-size:12px;color:var(--adm-text-muted);margin:0;">Most active investors in your portfolio</p>
                    </div>
                    ${investorBarsHtml}
                </div>

                <!-- Weekly Activity -->
                <div class="adm-card" style="padding:24px;">
                    <div style="margin-bottom:18px;">
                        <h3 style="font-size:15px;font-weight:600;color:var(--adm-text);margin:0 0 4px 0;">Weekly Activity</h3>
                        <p style="font-size:12px;color:var(--adm-text-muted);margin:0;">Introduction activity over the past 7 days</p>
                    </div>
                    <div style="display:flex;align-items:flex-end;gap:8px;padding:10px 0;">
                        ${weeklyBarsHtml}
                    </div>
                </div>
            </div>

            <!-- Export Row -->
            <div class="adm-card" style="padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                <div>
                    <span style="font-size:14px;font-weight:600;color:var(--adm-text);">Export Reports</span>
                    <span style="font-size:12px;color:var(--adm-text-muted);margin-left:8px;">Download analytics data for external use</span>
                </div>
                <div style="display:flex;gap:10px;">
                    <button class="adm-btn adm-btn-outline" style="font-size:13px;padding:8px 18px;display:flex;align-items:center;gap:6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Export CSV
                    </button>
                    <button class="adm-btn adm-btn-primary" style="font-size:13px;padding:8px 18px;display:flex;align-items:center;gap:6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Export PDF
                    </button>
                </div>
            </div>
        `;
    }


    getAuditLogsHtml() {
        if (!this.state.auditLogs) {
            this.state.auditLogs = [
                { id: 'a1', timestamp: '2024-06-02 10:45:23', user: 'System Admin', action: 'Approved KYC', module: 'Verification', target: 'Nexus Health', ip: '192.168.1.100' },
                { id: 'a2', timestamp: '2024-06-02 10:30:15', user: 'Sarah (Compliance)', action: 'Escalated Risk Flag', module: 'Risk & Flags', target: 'John Doe', ip: '192.168.1.101' },
                { id: 'a3', timestamp: '2024-06-02 09:15:00', user: 'System', action: 'Auto-matched Intro', module: 'Introductions', target: 'INT-001', ip: 'System' },
                { id: 'a4', timestamp: '2024-06-02 08:45:10', user: 'System Admin', action: 'Published Pitch', module: 'Pitch Review', target: 'Acme Corp', ip: '192.168.1.100' },
                { id: 'a5', timestamp: '2024-06-01 17:30:00', user: 'System Admin', action: 'Advanced Deal Stage', module: 'Coordination', target: 'DD-001', ip: '192.168.1.100' },
                { id: 'a6', timestamp: '2024-06-01 16:00:00', user: 'System', action: 'SLA Warning Triggered', module: 'Coordination', target: 'DD-002', ip: 'System' },
                { id: 'a7', timestamp: '2024-06-01 14:20:00', user: 'Sarah (Compliance)', action: 'Suspended Account', module: 'Risk & Flags', target: 'Fake Corp', ip: '192.168.1.101', flagged: true },
                { id: 'a8', timestamp: '2024-06-01 12:00:00', user: 'System Admin', action: 'Closed Deal', module: 'Deals', target: 'DL-002', ip: '192.168.1.100' },
            ];
        }

        if (!this.state.auditLogsFilterUser) this.state.auditLogsFilterUser = 'All';
        if (!this.state.auditLogsFilterAction) this.state.auditLogsFilterAction = 'All';
        if (!this.state.auditLogsFilterDate) this.state.auditLogsFilterDate = 'This Month';

        const logs = this.state.auditLogs;

        const kpis = [
            { label: 'TOTAL EVENTS', value: 25, color: 'var(--adm-primary)' },
            { label: 'TODAY', value: 8, color: 'var(--adm-accent)' },
            { label: 'THIS WEEK', value: 18, color: 'var(--adm-success)' },
            { label: 'FLAGGED', value: 2, color: 'var(--adm-danger)' },
        ];

        const tableRows = logs.map(log => {
            const flaggedStyle = log.flagged
                ? 'border-left: 3px solid var(--adm-danger); background: rgba(239, 68, 68, 0.04);'
                : '';
            const flaggedBadge = log.flagged
                ? ' <span class="adm-badge" style="background: var(--adm-danger); color: #fff; font-size: 10px; margin-left: 6px;">FLAGGED</span>'
                : '';
            return `
                <tr style="${flaggedStyle}" data-log-id="${log.id}">
                    <td style="padding: 10px 12px; border-bottom: 1px solid var(--adm-border); font-family: monospace; font-size: 12px; color: var(--adm-text-muted); white-space: nowrap;">${log.timestamp}</td>
                    <td style="padding: 10px 12px; border-bottom: 1px solid var(--adm-border); font-weight: 500; color: var(--adm-text);">${log.user}</td>
                    <td style="padding: 10px 12px; border-bottom: 1px solid var(--adm-border); color: var(--adm-text);">${log.action}${flaggedBadge}</td>
                    <td style="padding: 10px 12px; border-bottom: 1px solid var(--adm-border); color: var(--adm-text-muted);">${log.module}</td>
                    <td style="padding: 10px 12px; border-bottom: 1px solid var(--adm-border); color: var(--adm-text);">${log.target}</td>
                    <td style="padding: 10px 12px; border-bottom: 1px solid var(--adm-border); font-family: monospace; font-size: 12px; color: var(--adm-text-muted);">${log.ip}</td>
                </tr>`;
        }).join('');

        return `
            <div style="padding: 24px;">
                ${this.getBreadcrumbHtml('audit_logs')}

                <!-- Header -->
                <div style="margin-bottom: 24px;">
                    <h1 style="font-size: 24px; font-weight: 700; color: var(--adm-text); margin: 0 0 4px 0;">Audit Logs</h1>
                    <p style="font-size: 14px; color: var(--adm-text-muted); margin: 0;">Immutable record of all administrative actions for regulatory compliance.</p>
                </div>

                <!-- KPI Stat Strip -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
                    ${kpis.map(kpi => `
                        <div class="adm-card" style="padding: 20px; text-align: center;">
                            <div style="font-size: 11px; font-weight: 600; color: var(--adm-text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">${kpi.label}</div>
                            <div style="font-size: 28px; font-weight: 700; color: ${kpi.color};">${kpi.value}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Filter Row -->
                <div class="adm-card" style="padding: 16px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-size: 12px; font-weight: 600; color: var(--adm-text-muted); text-transform: uppercase;">User</label>
                        <select id="auditFilterUser" style="padding: 6px 10px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-bg); color: var(--adm-text); font-size: 13px;">
                            <option value="All" ${this.state.auditLogsFilterUser === 'All' ? 'selected' : ''}>All</option>
                            <option value="System Admin" ${this.state.auditLogsFilterUser === 'System Admin' ? 'selected' : ''}>System Admin</option>
                            <option value="Sarah (Compliance)" ${this.state.auditLogsFilterUser === 'Sarah (Compliance)' ? 'selected' : ''}>Sarah (Compliance)</option>
                            <option value="System" ${this.state.auditLogsFilterUser === 'System' ? 'selected' : ''}>System</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-size: 12px; font-weight: 600; color: var(--adm-text-muted); text-transform: uppercase;">Action Type</label>
                        <select id="auditFilterAction" style="padding: 6px 10px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-bg); color: var(--adm-text); font-size: 13px;">
                            <option value="All" ${this.state.auditLogsFilterAction === 'All' ? 'selected' : ''}>All</option>
                            <option value="KYC" ${this.state.auditLogsFilterAction === 'KYC' ? 'selected' : ''}>KYC</option>
                            <option value="Pitch" ${this.state.auditLogsFilterAction === 'Pitch' ? 'selected' : ''}>Pitch</option>
                            <option value="Deal" ${this.state.auditLogsFilterAction === 'Deal' ? 'selected' : ''}>Deal</option>
                            <option value="Risk" ${this.state.auditLogsFilterAction === 'Risk' ? 'selected' : ''}>Risk</option>
                            <option value="System" ${this.state.auditLogsFilterAction === 'System' ? 'selected' : ''}>System</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-size: 12px; font-weight: 600; color: var(--adm-text-muted); text-transform: uppercase;">Date Range</label>
                        <select id="auditFilterDate" style="padding: 6px 10px; border: 1px solid var(--adm-border); border-radius: 6px; background: var(--adm-bg); color: var(--adm-text); font-size: 13px;">
                            <option value="Today" ${this.state.auditLogsFilterDate === 'Today' ? 'selected' : ''}>Today</option>
                            <option value="This Week" ${this.state.auditLogsFilterDate === 'This Week' ? 'selected' : ''}>This Week</option>
                            <option value="This Month" ${this.state.auditLogsFilterDate === 'This Month' ? 'selected' : ''}>This Month</option>
                            <option value="Custom" ${this.state.auditLogsFilterDate === 'Custom' ? 'selected' : ''}>Custom</option>
                        </select>
                    </div>
                    <div style="margin-left: auto;">
                        <button id="auditExportCsv" class="adm-btn adm-btn-outline" style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Export CSV
                        </button>
                    </div>
                </div>

                <!-- Table -->
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--adm-bg);">
                                <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adm-text-muted); border-bottom: 2px solid var(--adm-border);">Timestamp</th>
                                <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adm-text-muted); border-bottom: 2px solid var(--adm-border);">User</th>
                                <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adm-text-muted); border-bottom: 2px solid var(--adm-border);">Action</th>
                                <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adm-text-muted); border-bottom: 2px solid var(--adm-border);">Module</th>
                                <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adm-text-muted); border-bottom: 2px solid var(--adm-border);">Target</th>
                                <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adm-text-muted); border-bottom: 2px solid var(--adm-border);">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    attachAuditLogsListeners() {
        const filterUser = document.getElementById('auditFilterUser');
        const filterAction = document.getElementById('auditFilterAction');
        const filterDate = document.getElementById('auditFilterDate');
        const exportBtn = document.getElementById('auditExportCsv');

        if (filterUser) {
            filterUser.addEventListener('change', (e) => {
                this.state.auditLogsFilterUser = e.target.value;
                this.renderModule();
            });
        }

        if (filterAction) {
            filterAction.addEventListener('change', (e) => {
                this.state.auditLogsFilterAction = e.target.value;
                this.renderModule();
            });
        }

        if (filterDate) {
            filterDate.addEventListener('change', (e) => {
                this.state.auditLogsFilterDate = e.target.value;
                this.renderModule();
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const logs = this.state.auditLogs || [];
                const headers = ['Timestamp', 'User', 'Action', 'Module', 'Target', 'IP Address', 'Flagged'];
                const csvRows = [
                    headers.join(','),
                    ...logs.map(log => [
                        `"${log.timestamp}"`,
                        `"${log.user}"`,
                        `"${log.action}"`,
                        `"${log.module}"`,
                        `"${log.target}"`,
                        `"${log.ip}"`,
                        log.flagged ? 'Yes' : 'No',
                    ].join(','))
                ];
                const csvContent = csvRows.join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', 'audit_logs_export.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
    }


    getPermissionsHtml() {
        // Initialize state if needed
        if (!this.state.adminUsers) {
            this.state.adminUsers = [
                { id: 'u1', name: 'System Admin', email: 'admin@fundingeasy.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
                { id: 'u2', name: 'Sarah Chen', email: 'sarah@fundingeasy.com', role: 'Compliance Officer', status: 'Active', lastActive: '10 mins ago' },
                { id: 'u3', name: 'Mike Operations', email: 'mike@fundingeasy.com', role: 'Operations', status: 'Active', lastActive: '1 hour ago' },
                { id: 'u4', name: 'Support Bot', email: 'support@fundingeasy.com', role: 'Support', status: 'Inactive', lastActive: '3 days ago' }
            ];
        }

        if (!this.state.permissionMatrix) {
            this.state.permissionMatrix = {
                'Overview':       { 'Super Admin': true, 'Compliance Officer': true,  'Operations': true,  'Support': true  },
                'Verification':   { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Pitch Review':   { 'Super Admin': true, 'Compliance Officer': false, 'Operations': false, 'Support': false },
                'Introductions':  { 'Super Admin': true, 'Compliance Officer': false, 'Operations': true,  'Support': false },
                'Coordination':   { 'Super Admin': true, 'Compliance Officer': false, 'Operations': true,  'Support': false },
                'Deals':          { 'Super Admin': true, 'Compliance Officer': false, 'Operations': true,  'Support': false },
                'Risk & Flags':   { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Notifications':  { 'Super Admin': true, 'Compliance Officer': false, 'Operations': false, 'Support': true  },
                'Analytics':      { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Audit Logs':     { 'Super Admin': true, 'Compliance Officer': true,  'Operations': false, 'Support': false },
                'Permissions':    { 'Super Admin': true, 'Compliance Officer': false, 'Operations': false, 'Support': false }
            };
        }

        const roles = [
            { name: 'Super Admin', users: 0, description: 'Full access to all modules', color: 'var(--adm-danger)' },
            { name: 'Compliance Officer', users: 0, description: 'KYC, Risk & Flags, Audit Logs', color: 'var(--adm-warning)' },
            { name: 'Operations', users: 0, description: 'Introductions, Coordination, Deals', color: 'var(--adm-primary)' },
            { name: 'Support', users: 0, description: 'Read-only access', color: 'var(--adm-text-muted)' }
        ];

        // Count users per role from current state
        this.state.adminUsers.forEach(u => {
            const role = roles.find(r => r.name === u.role);
            if (role) role.users++;
        });

        const roleCardsHtml = roles.map(role => `
            <div class="adm-card" style="flex: 1; min-width: 200px; padding: 20px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${role.color}; display: inline-block;"></span>
                    <strong style="color: var(--adm-text); font-size: 15px;">${role.name}</strong>
                </div>
                <span style="color: var(--adm-text-muted); font-size: 13px;">${role.users} user${role.users !== 1 ? 's' : ''}</span>
                <span style="color: var(--adm-text-muted); font-size: 13px;">${role.description}</span>
                <button class="adm-btn adm-btn-outline" style="margin-top: 8px; align-self: flex-start;" data-role-edit="${role.name}">Edit</button>
            </div>
        `).join('');

        const roleOptions = ['Super Admin', 'Compliance Officer', 'Operations', 'Support'];
        const userRowsHtml = this.state.adminUsers.map(user => {
            const statusColor = user.status === 'Active' ? 'var(--adm-success)' : 'var(--adm-text-muted)';
            const statusBg = user.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(128,128,128,0.1)';
            const deactivateLabel = user.status === 'Active' ? 'Deactivate' : 'Activate';

            const roleDropdown = roleOptions.map(r =>
                `<option value="${r}"${r === user.role ? ' selected' : ''}>${r}</option>`
            ).join('');

            return `
                <tr>
                    <td style="padding: 12px 16px; color: var(--adm-text); font-weight: 500;">${user.name}</td>
                    <td style="padding: 12px 16px; color: var(--adm-text-muted);">${user.email}</td>
                    <td style="padding: 12px 16px; color: var(--adm-text);">${user.role}</td>
                    <td style="padding: 12px 16px;">
                        <span class="adm-badge" style="background: ${statusBg}; color: ${statusColor}; padding: 4px 10px; border-radius: 12px; font-size: 12px;">${user.status}</span>
                    </td>
                    <td style="padding: 12px 16px; color: var(--adm-text-muted);">${user.lastActive}</td>
                    <td style="padding: 12px 16px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <select class="adm-btn adm-btn-outline" data-change-role="${user.id}" style="padding: 4px 8px; font-size: 12px; background: var(--adm-surface); color: var(--adm-text); border: 1px solid var(--adm-border); border-radius: 6px; cursor: pointer;">
                                ${roleDropdown}
                            </select>
                            <button class="adm-btn adm-btn-danger" data-toggle-status="${user.id}" style="padding: 4px 10px; font-size: 12px;">${deactivateLabel}</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        const modules = ['Overview', 'Verification', 'Pitch Review', 'Introductions', 'Coordination', 'Deals', 'Risk & Flags', 'Notifications', 'Analytics', 'Audit Logs', 'Permissions'];
        const matrixRoles = ['Super Admin', 'Compliance Officer', 'Operations', 'Support'];

        const matrixHeaderHtml = matrixRoles.map(r => `
            <th style="padding: 10px 16px; text-align: center; color: var(--adm-text-muted); font-weight: 600; font-size: 13px; white-space: nowrap;">${r}</th>
        `).join('');

        const matrixRowsHtml = modules.map(mod => {
            const cells = matrixRoles.map(role => {
                const checked = this.state.permissionMatrix[mod][role] ? 'checked' : '';
                const disabled = role === 'Super Admin' ? 'disabled' : '';
                return `
                    <td style="padding: 10px 16px; text-align: center;">
                        <input type="checkbox" ${checked} ${disabled}
                            data-perm-module="${mod}" data-perm-role="${role}"
                            style="width: 16px; height: 16px; cursor: ${role === 'Super Admin' ? 'not-allowed' : 'pointer'}; accent-color: var(--adm-primary);" />
                    </td>
                `;
            }).join('');

            return `
                <tr>
                    <td style="padding: 10px 16px; color: var(--adm-text); font-weight: 500; font-size: 13px;">${mod}</td>
                    ${cells}
                </tr>
            `;
        }).join('');

        return `
            ${this.getBreadcrumbHtml('permissions')}

            <div style="margin-bottom: 24px;">
                <h1 style="font-size: 22px; font-weight: 700; color: var(--adm-text); margin: 0 0 4px 0;">Roles & Permissions</h1>
                <p style="font-size: 14px; color: var(--adm-text-muted); margin: 0;">Configure access control for admin team members.</p>
            </div>

            <!-- Section 1: Roles Overview -->
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; font-weight: 600; color: var(--adm-text); margin: 0 0 12px 0;">Roles Overview</h2>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    ${roleCardsHtml}
                </div>
            </div>

            <!-- Section 2: User-Role Assignment Table -->
            <div class="adm-card" style="margin-bottom: 24px; padding: 0; overflow: hidden;">
                <div style="padding: 16px 20px; border-bottom: 1px solid var(--adm-border);">
                    <h2 style="font-size: 16px; font-weight: 600; color: var(--adm-text); margin: 0;">User-Role Assignment</h2>
                </div>
                <div style="overflow-x: auto;">
                    <table class="adm-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--adm-border);">
                                <th style="padding: 12px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">User</th>
                                <th style="padding: 12px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</th>
                                <th style="padding: 12px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Role</th>
                                <th style="padding: 12px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Status</th>
                                <th style="padding: 12px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Last Active</th>
                                <th style="padding: 12px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userRowsHtml}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Section 3: Permission Matrix -->
            <div class="adm-card" style="padding: 0; overflow: hidden;">
                <div style="padding: 16px 20px; border-bottom: 1px solid var(--adm-border);">
                    <h2 style="font-size: 16px; font-weight: 600; color: var(--adm-text); margin: 0;">Permission Matrix</h2>
                </div>
                <div style="overflow-x: auto;">
                    <table class="adm-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--adm-border);">
                                <th style="padding: 10px 16px; text-align: left; color: var(--adm-text-muted); font-weight: 600; font-size: 13px;">Module</th>
                                ${matrixHeaderHtml}
                            </tr>
                        </thead>
                        <tbody>
                            ${matrixRowsHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    attachPermissionsListeners() {
        // Change Role dropdowns
        document.querySelectorAll('[data-change-role]').forEach(select => {
            select.addEventListener('change', (e) => {
                const userId = e.target.dataset.changeRole;
                const newRole = e.target.value;
                const user = this.state.adminUsers.find(u => u.id === userId);
                if (user) {
                    user.role = newRole;
                    this.showToast(`Updated role for ${user.name} to "${newRole}".`, 'success');
                    this.renderModule();
                }
            });
        });

        // Toggle Status (Deactivate / Activate) buttons
        document.querySelectorAll('[data-toggle-status]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.dataset.toggleStatus;
                const user = this.state.adminUsers.find(u => u.id === userId);
                if (user) {
                    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
                    this.showToast(`${user.name} has been ${user.status === 'Active' ? 'activated' : 'deactivated'}.`, 'warning');
                    this.renderModule();
                }
            });
        });

        // Permission Matrix checkboxes
        document.querySelectorAll('[data-perm-module]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const mod = e.target.dataset.permModule;
                const role = e.target.dataset.permRole;
                if (role === 'Super Admin') return; // Super Admin is always checked
                this.state.permissionMatrix[mod][role] = e.target.checked;
                this.showToast(`Updated permissions for ${role} on ${mod} module.`, 'success');
            });
        });
    }

    attachPlaceholderListeners(moduleName) {
        const viewSpecBtn = document.getElementById('viewSpecBtn');
        if (viewSpecBtn) {
            viewSpecBtn.addEventListener('click', () => {
                this.showSpecModal(moduleName);
            });
        }
    }

    showSpecModal(moduleName) {
        // Remove existing modal if any
        const existing = document.getElementById('admSpecModal');
        if (existing) existing.remove();

        const title = moduleName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        const specs = {
            users: {
                title: 'Users Management Module',
                description: 'Manage startup founders, individual investors, and corporate entity accounts.',
                features: [
                    'Unified directory with role badges (Angel, VC, Founder, Admin)',
                    'KYC status integration and manual override controls',
                    'Activity log link and transaction history viewer',
                    'Account suspension and password reset triggers'
                ]
            }
        };

        const spec = specs[moduleName] || {
            title: `${title} Module`,
            description: `Operating protocol and interface specifications for the ${title} workflow.`,
            features: [
                'Entity data visualization and grid system',
                'Status state transitions and approval logs',
                'Operational filtering and sorting systems',
                'Data export capability (CSV/PDF formats)'
            ]
        };

        const modalHtml = `
            <div id="admSpecModal" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; animation: fadeIn 0.2s ease-out;">
                <div class="adm-card" style="width: 500px; max-width: 90%; background: var(--adm-surface); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); border: 1px solid var(--adm-border); border-radius: 12px; overflow: hidden; transform: translateY(0); transition: transform 0.2s;">
                    <div style="padding: 20px 24px; border-bottom: 1px solid var(--adm-border); display: flex; justify-content: space-between; align-items: center; background: var(--adm-bg);">
                        <h3 style="font-size: 16px; font-weight: 600; color: var(--adm-text); margin: 0;">📋 Technical Specification</h3>
                        <button id="closeSpecModalBtn" style="border: none; background: none; font-size: 20px; color: var(--adm-text-muted); cursor: pointer; padding: 0;">✕</button>
                    </div>
                    <div style="padding: 24px;">
                        <h4 style="font-size: 18px; font-weight: 700; color: var(--adm-text); margin: 0 0 8px 0;">${spec.title}</h4>
                        <p style="font-size: 14px; color: var(--adm-text-muted); margin: 0 0 20px 0; line-height: 1.5;">${spec.description}</p>
                        
                        <h5 style="font-size: 12px; font-weight: 600; color: var(--adm-text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">Key Requirements</h5>
                        <ul style="margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                            ${spec.features.map(f => `<li style="font-size: 13px; color: var(--adm-text); line-height: 1.4;">${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="padding: 16px 24px; border-top: 1px solid var(--adm-border); text-align: right; background: var(--adm-bg);">
                        <button id="confirmSpecModalBtn" class="adm-btn adm-btn-primary" style="font-size: 13px; padding: 8px 18px;">Understood</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('admSpecModal');
        const closeBtn = document.getElementById('closeSpecModalBtn');
        const confirmBtn = document.getElementById('confirmSpecModalBtn');

        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 200);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (confirmBtn) confirmBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    getUsersHtml() {
        const total = this.state.usersQueue.length;
        const active = this.state.usersQueue.filter(u => u.status === 'Active').length;
        const pendingKyc = this.state.usersQueue.filter(u => u.kycStatus === 'Pending' || u.kycStatus === 'Failed').length;
        const admins = this.state.usersQueue.filter(u => u.role === 'Admin').length;

        // Apply filters
        const filterRole = this.state.usersFilterRole || 'All';
        const filterKyc = this.state.usersFilterKyc || 'All';
        const filterStatus = this.state.usersFilterStatus || 'All';

        let filtered = this.state.usersQueue.filter(u => {
            if (filterRole !== 'All' && u.role !== filterRole) return false;
            if (filterKyc !== 'All' && u.kycStatus !== filterKyc) return false;
            if (filterStatus !== 'All' && u.status !== filterStatus) return false;
            return true;
        });

        const getKycStyle = (status) => {
            if (status === 'Cleared') return 'background:var(--success-soft); color:#7bc08f; border:1px solid var(--success-soft);';
            if (status === 'Pending') return 'background:var(--warning-soft); color:#f0b35a; border:1px solid var(--warning-soft);';
            return 'background:var(--danger-soft); color:#e08b8b; border:1px solid var(--danger-soft);';
        };

        const getStatusStyle = (status) => {
            if (status === 'Active') return 'background:rgba(16,185,129,0.1); color:var(--adm-success);';
            return 'background:rgba(128,128,128,0.1); color:var(--adm-text-muted);';
        };

        const tbody = filtered.length === 0 ?
            `<tr><td colspan="6" style="text-align:center; color:var(--adm-text-muted); padding:48px;">No users match the active filters.</td></tr>` :
            filtered.map(u => `
                <tr data-user-id="${u.id}" style="${this.state.selectedUserId === u.id ? 'background: var(--bg-hover);' : ''}; cursor:pointer;" tabindex="0" role="row">
                    <td onclick="event.stopPropagation()"><input type="checkbox" aria-label="Select user ${u.name}"></td>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:32px; height:32px; border-radius:50%; background:var(--adm-primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:12px;">
                                ${u.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <div style="font-weight: 500; color: var(--adm-text);">${u.name}</div>
                                <div style="font-size: 11px; color: var(--adm-text-muted);">${u.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="adm-badge" style="background:var(--brand-primary-soft); color:#f0cc63; border:1px solid var(--brand-primary-soft);">${u.role}</span>
                    </td>
                    <td>
                        <span class="adm-badge" style="${getKycStyle(u.kycStatus)}">${u.kycStatus}</span>
                    </td>
                    <td>
                        <span class="adm-badge" style="${getStatusStyle(u.status)}">${u.status}</span>
                    </td>
                    <td style="color:var(--adm-text-muted); font-size:12px;">${u.joined}</td>
                </tr>
            `).join('');

        let drawerHtml = '';
        if (this.state.selectedUserId) {
            const user = this.state.usersQueue.find(u => u.id === this.state.selectedUserId);
            if (user) {
                drawerHtml = `
                    <div class="adm-drawer-overlay active" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))"></div>
                    <div class="adm-drawer active">
                        <div class="adm-drawer-header">
                            <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Details</h3>
                            <button class="adm-drawer-close" onclick="document.dispatchEvent(new CustomEvent('closeDrawer'))">&times;</button>
                        </div>
                        <div class="adm-drawer-content">
                            
                    <div class="adm-card" style="padding: 24px; position: sticky; top: 0; display:flex; flex-direction:column; gap:20px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--adm-border); padding-bottom: 16px;">
                            <div style="display:flex; gap:12px; align-items:center;">
                                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--adm-primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;">
                                    ${user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 style="font-size: 1.125rem; font-weight: 600; margin:0 0 2px 0;">${user.name}</h3>
                                    <span style="font-size: 12px; color: var(--adm-text-muted);">Active ${user.lastActive}</span>
                                </div>
                            </div>
                            <button id="closeUserPanelBtn" style="border: none; background: none; font-size: 18px; color: var(--adm-text-muted); cursor: pointer;" aria-label="Close user panel">✕</button>
                        </div>

                        <div>
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Account Details</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                                <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">User ID:</span><span style="font-family: monospace;">${user.id}</span></div>
                                <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Email Address:</span><span>${user.email}</span></div>
                                <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">User Role:</span><span>${user.role}</span></div>
                                <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Company / Startup:</span><span>${user.company || 'Self'}</span></div>
                                <div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Joining Date:</span><span>${user.joined}</span></div>
                                ${user.verifiedAt ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--adm-text-muted);">Last Verified:</span><span style="color: var(--adm-success); font-family: monospace;">${user.verifiedAt}</span></div>` : ''}
                            </div>
                        </div>

                        <div>
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Operational Controls</h4>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <div>
                                    <label style="font-size: 12px; font-weight: 600; color: var(--adm-text-muted); display:block; margin-bottom:4px;">KYC Override Status</label>
                                    <select id="userKycOverride" style="width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid var(--adm-border); background: var(--adm-bg); color: var(--adm-text); font-size: 13px;">
                                        <option value="Cleared" ${user.kycStatus === 'Cleared' ? 'selected' : ''}>Cleared</option>
                                        <option value="Pending" ${user.kycStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                                        <option value="Failed" ${user.kycStatus === 'Failed' ? 'selected' : ''}>Failed</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="font-size: 12px; font-weight: 600; color: var(--adm-text-muted); display:block; margin-bottom:4px;">Account Role Type</label>
                                    <select id="userRoleOverride" style="width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid var(--adm-border); background: var(--adm-bg); color: var(--adm-text); font-size: 13px;">
                                        <option value="Investor" ${user.role === 'Investor' ? 'selected' : ''}>Investor</option>
                                        <option value="Entrepreneur" ${user.role === 'Entrepreneur' ? 'selected' : ''}>Entrepreneur</option>
                                        <option value="Admin" ${user.role === 'Admin' ? 'selected' : ''}>Admin</option>
                                    </select>
                                </div>
                                <div style="display:flex; gap:10px; margin-top:4px;">
                                    <button class="adm-btn ${user.status === 'Active' ? 'adm-btn-outline' : 'adm-btn-primary'}" id="toggleUserStatusBtn" style="flex:1; font-size:12px; padding:8px 0;">
                                        ${user.status === 'Active' ? '⛔ Deactivate User' : '✅ Activate User'}
                                    </button>
                                    <button class="adm-btn adm-btn-outline" id="resetPasswordBtn" style="flex:1; font-size:12px; padding:8px 0;">
                                        🔑 Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Admin Audit Notes</h4>
                            <textarea id="userAdminNotes" style="width:100%; height:80px; padding:8px; border:1px solid var(--adm-border); border-radius:6px; background:var(--adm-bg); color:var(--adm-text); font-size:13px; outline:none; resize:none;" placeholder="Enter audit or override justification...">${user.notes || ''}</textarea>
                        </div>
                    </div>
                
                        </div>
                    </div>
                `;
            }
        }

        return `
            ${this.getBreadcrumbHtml('users', this.state.selectedUserId)}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 4px;">User Directory</h1>
                    <p style="color: var(--adm-text-muted); font-size: 0.875rem;">Manage founders, investors, and platform team accounts.</p>
                </div>
                <div style="display: flex; gap: 16px;">
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Total Users</span>
                        <span style="font-weight:600;">${total}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-weight:600; color:var(--adm-success); font-size:12px;">🟢 Active: ${active}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-weight:600; color:var(--adm-danger); font-size:12px;">⚠️ Pending KYC: ${pendingKyc}</span>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div style="display: flex; gap: 12px; margin-bottom: 24px; padding: 12px; background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px;">
                <select id="userFilterRole" style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); color: var(--adm-text); font-size: 0.875rem; outline:none;" aria-label="Filter by Role">
                    <option value="All" ${filterRole === 'All' ? 'selected' : ''}>Role: All</option>
                    <option value="Investor" ${filterRole === 'Investor' ? 'selected' : ''}>Investor</option>
                    <option value="Entrepreneur" ${filterRole === 'Entrepreneur' ? 'selected' : ''}>Entrepreneur</option>
                    <option value="Admin" ${filterRole === 'Admin' ? 'selected' : ''}>Admin</option>
                </select>
                <select id="userFilterKyc" style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); color: var(--adm-text); font-size: 0.875rem; outline:none;" aria-label="Filter by KYC status">
                    <option value="All" ${filterKyc === 'All' ? 'selected' : ''}>KYC: All</option>
                    <option value="Cleared" ${filterKyc === 'Cleared' ? 'selected' : ''}>Cleared</option>
                    <option value="Pending" ${filterKyc === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Failed" ${filterKyc === 'Failed' ? 'selected' : ''}>Failed</option>
                </select>
                <select id="userFilterStatus" style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); color: var(--adm-text); font-size: 0.875rem; outline:none;" aria-label="Filter by Account status">
                    <option value="All" ${filterStatus === 'All' ? 'selected' : ''}>Status: All</option>
                    <option value="Active" ${filterStatus === 'Active' ? 'selected' : ''}>Active</option>
                    <option value="Inactive" ${filterStatus === 'Inactive' ? 'selected' : ''}>Inactive</option>
                </select>
                <div style="flex:1;"></div>
                <button id="addUserBtn" class="adm-btn adm-btn-primary" style="padding: 6px 16px; font-size: 0.875rem;">+ Add User</button>
            </div>

            <!-- Main Layout Grid -->
            <div class="adm-split-view">
                <div class="adm-card" style="overflow: hidden;">
                    <table class="adm-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" aria-label="Select all users"></th>
                                <th scope="col">User</th>
                                <th scope="col">Role</th>
                                <th scope="col">KYC Status</th>
                                <th scope="col">Status</th>
                                <th scope="col">Joined</th>
                            </tr>
                        </thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
                ${drawerHtml}
            </div>
        `;
    }

    attachUsersListeners() {
        // Selection clicks
        document.querySelectorAll('tr[data-user-id]').forEach(tr => {
            tr.addEventListener('click', () => {
                this.state.selectedUserId = tr.dataset.userId;
                this.renderModule();
            });
            tr.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.state.selectedUserId = tr.dataset.userId;
                    this.renderModule();
                }
            });
        });

        // Close details
        const closeBtn = document.getElementById('closeUserPanelBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.state.selectedUserId = null;
                this.renderModule();
            });
        }

        // Dropdown filters
        const filterRole = document.getElementById('userFilterRole');
        if (filterRole) {
            filterRole.addEventListener('change', (e) => {
                this.state.usersFilterRole = e.target.value;
                this.renderModule();
            });
        }
        const filterKyc = document.getElementById('userFilterKyc');
        if (filterKyc) {
            filterKyc.addEventListener('change', (e) => {
                this.state.usersFilterKyc = e.target.value;
                this.renderModule();
            });
        }
        const filterStatus = document.getElementById('userFilterStatus');
        if (filterStatus) {
            filterStatus.addEventListener('change', (e) => {
                this.state.usersFilterStatus = e.target.value;
                this.renderModule();
            });
        }

        // Add user trigger
        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => {
                const name = prompt("Enter new user's full name:");
                if (!name) return;
                const email = prompt("Enter new user's email address:");
                if (!email) return;
                const role = prompt("Enter user role (Investor/Entrepreneur/Admin):", "Investor");
                
                const newUser = {
                    id: 'usr-' + (this.state.usersQueue.length + 1),
                    name,
                    email,
                    role: role || 'Investor',
                    kycStatus: 'Pending',
                    status: 'Active',
                    joined: new Date().toISOString().split('T')[0],
                    company: 'Self',
                    lastActive: 'Just now',
                    notes: 'Newly added via admin dashboard.'
                };
                this.state.usersQueue.push(newUser);
                this.showToast(`User ${name} created successfully!`, 'success');
                this.renderModule();
            });
        }

        // KYC override dropdown
        const userKycOverride = document.getElementById('userKycOverride');
        if (userKycOverride) {
            userKycOverride.addEventListener('change', (e) => {
                const user = this.state.usersQueue.find(u => u.id === this.state.selectedUserId);
                if (user) {
                    user.kycStatus = e.target.value;
                    this.showToast(`KYC status for ${user.name} overridden to "${user.kycStatus}".`, 'success');
                    this.renderModule();
                }
            });
        }

        // Role override dropdown
        const userRoleOverride = document.getElementById('userRoleOverride');
        if (userRoleOverride) {
            userRoleOverride.addEventListener('change', (e) => {
                const user = this.state.usersQueue.find(u => u.id === this.state.selectedUserId);
                if (user) {
                    user.role = e.target.value;
                    this.showToast(`Role type for ${user.name} updated to "${user.role}".`, 'success');
                    this.renderModule();
                }
            });
        }

        // Status override toggle button
        const toggleUserStatusBtn = document.getElementById('toggleUserStatusBtn');
        if (toggleUserStatusBtn) {
            toggleUserStatusBtn.addEventListener('click', () => {
                const user = this.state.usersQueue.find(u => u.id === this.state.selectedUserId);
                if (user) {
                    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
                    this.showToast(`User ${user.name} has been ${user.status === 'Active' ? 'activated' : 'deactivated'}.`, 'warning');
                    this.renderModule();
                }
            });
        }

        // Reset password trigger
        const resetPasswordBtn = document.getElementById('resetPasswordBtn');
        if (resetPasswordBtn) {
            resetPasswordBtn.addEventListener('click', () => {
                const user = this.state.usersQueue.find(u => u.id === this.state.selectedUserId);
                if (user) {
                    this.showToast(`Password reset link dispatched to ${user.email}.`, 'info');
                }
            });
        }

        // Admin notes change
        const userAdminNotes = document.getElementById('userAdminNotes');
        if (userAdminNotes) {
            userAdminNotes.addEventListener('blur', (e) => {
                const user = this.state.usersQueue.find(u => u.id === this.state.selectedUserId);
                if (user) {
                    user.notes = e.target.value;
                    this.showToast(`Audit notes saved for ${user.name}.`, 'success');
                }
            });
        }
    }
}
