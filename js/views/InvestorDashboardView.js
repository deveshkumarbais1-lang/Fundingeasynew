import AbstractView from './AbstractView.js';
import SparklineChart from '../components/SparklineChart.js';
import { ACCESS_STATE, getActionStateToken } from '../utils/access_matrix.js';

export default class InvestorDashboardView extends AbstractView {
    // Enums for strict state values
    static SEVERITY = {
        INFO: "info",
        WARNING: "warning",
        URGENT: "urgent",
        BLOCKED: "blocked",
    };
    static UPDATE_TYPE = {
        RECENT_CHANGE: "recent_change",
        RISK: "risk",
    };

    // Vector SVG Icons for premium dark mode aesthetics
    static ICONS = {
        HOME: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        DISCOVER: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/></svg>`,
        WATCHLIST: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        DEALS: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
        DILIGENCE: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
        MEETINGS: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
        PORTFOLIO: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        INSIGHTS: `<svg class="nav-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; vertical-align:middle; margin-right:8px;"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        SEARCH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; display:block;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
        BELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; display:block;"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
        SETTINGS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
        INFO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; display:inline-block; vertical-align:middle; margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`
    };

    constructor() {
        super();
        this.setTitle("Investor Workspace | Funding Easy");
        // Initialize normalized dashboard state
        const rawPayload = {};
        this.state = this.normalizeDashboardData(rawPayload);
    }
    // Helper to retrieve inline SVG icons from the static ICONS map
    getIcon(name) {
        return InvestorDashboardView.ICONS[name] || '';
    }

    // Central Telemetry Utility for dashboard observability
    logTelemetry(event, data = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            activeTab: this.state.activeTab,
            event,
            data
        };
        console.log(`[Telemetry - Investor Dashboard]`, logEntry);
        this.state.telemetryLogs = this.state.telemetryLogs || [];
        this.state.telemetryLogs.unshift(logEntry);
        this.saveStateToLocalStorage();
    }

    // Primitives standardizers:
    renderStatCard(id, label, value, delta, context, colorVar) {
        return `
            <div class="metric-card metric-card-trigger" data-tab="${id}" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">${label}</div>
                <div class="metric-value" style="font-size: 1.75rem; color: var(${colorVar}); font-weight: 700; margin: 4px 0;">${value}</div>
                ${delta ? `
                    <div class="text-xs text-success" style="color: var(--inv-success); display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                        <span>↑</span> ${delta}
                    </div>
                ` : ''}
                <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);">${context || 'Sourced / Flow'}</div>
            </div>
        `;
    }

    renderBadge(text, type = 'info') {
        let bg = 'rgba(255,255,255,0.05)';
        let border = 'var(--inv-divider)';
        let color = 'var(--inv-text-primary)';
        if (type === 'success') {
            bg = 'rgba(94, 143, 99, 0.1)';
            border = 'rgba(94, 143, 99, 0.2)';
            color = 'var(--inv-success)';
        } else if (type === 'warning') {
            bg = 'rgba(245, 158, 11, 0.1)';
            border = 'rgba(245, 158, 11, 0.2)';
            color = 'var(--inv-warning)';
        } else if (type === 'danger' || type === 'error' || type === 'urgent' || type === 'blocked') {
            bg = 'rgba(239, 68, 68, 0.1)';
            border = 'rgba(239, 68, 68, 0.2)';
            color = 'var(--inv-error)';
        } else if (type === 'premium') {
            bg = 'rgba(201, 162, 39, 0.08)';
            border = 'var(--brand-primary-soft)';
            color = 'var(--inv-premium)';
        }
        return `<span class="badge" style="background: ${bg}; border: 1px solid ${border}; color: ${color}; padding: 3px 10px; font-size: 0.65rem; border-radius: 4px; font-weight: 600; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;">${text}</span>`;
    }

    renderEmptyState(title, description) {
        return `
            <div class="flex flex-col items-center justify-center text-muted" style="padding: 48px; text-align: center; border: 1px dashed var(--inv-divider); border-radius: 8px; margin: 32px; background: rgba(255,255,255,0.01);">
                <div style="font-size: 2.5rem; margin-bottom: 16px; opacity: 0.6;">📦</div>
                <h3 class="font-semibold" style="font-size: 1.1rem; color: var(--inv-text-primary); margin-bottom: 8px;">${title}</h3>
                <p style="font-size: 0.875rem; max-width: 320px; line-height: 1.5; color: var(--inv-text-secondary);">${description}</p>
            </div>
        `;
    }

    renderTableWrapper(headers, rowsHtml) {
        return `
            <div style="overflow-x: auto; width: 100%;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; vertical-align: middle;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--inv-divider);">
                            ${headers.map(h => `<th style="padding: 12px 16px; color: var(--inv-text-secondary); font-size: 0.75rem; text-transform: uppercase; font-weight: 600;">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Transform raw payload into structured dashboard state
// Transform raw payload into structured dashboard state
    normalizeDashboardData(raw) {
        const data = raw || {};
        // Account data
        const account = {
            name: data.firmName || "Acme Ventures",
            tier: data.tier || "Series A",
            initials: "JD",
            mandates: [
                { name: "FinTech", active: true },
                { name: "AI/ML", active: true },
                { name: "HealthTech", active: false }
            ]
        };
        // KPI cards
        const kpi = (data.kpi || [
            { id: "discover", label: "New Deals in Discover", delta: "+1", context: "", sparklineData: [2,3,4,5,6,6,7], colorVar: '--inv-accent' },
            { id: "deals", label: "Deals in Diligence", delta: "", context: "Omega Shield data room updated", sparklineData: [0,0,0,0,0,0,1], colorVar: '--inv-warning' },
            { id: "meetings", label: "Meetings This Week", value: 1, delta: "", context: "Next: Aurora Climate (Today 2:00 PM)", sparklineData: [0,0,0,0,0,0,1], colorVar: '--inv-text-primary' },
        ]).map(k => ({
            ...k,
            sparklineData: k.sparklineData || [],
        }));
        // Opportunities list
        const opportunities = (data.opportunities || [
            {
                id: "opp1",
                name: "Omega Shield",
                matchPct: 94,
                stage: "Negotiation",
                thesisFit: "High",
                recentChange: "Updated term sheet",
                risk: "Low",
                accessState: ACCESS_STATE.OPEN_VDR,
                ctaLabel: "Open VDR",
            },
            {
                id: "opp2",
                name: "Zenith SaaS",
                matchPct: 94,
                stage: "Series A",
                thesisFit: "High",
                recentChange: "Matched 5d ago",
                risk: "Low",
                accessState: ACCESS_STATE.REQUEST_VDR,
                ctaLabel: "Request VDR",
            },
            {
                id: "opp3",
                name: "AeroSpace Logix",
                matchPct: 92,
                stage: "Seed",
                thesisFit: "Direct Fit",
                recentChange: "Sourced 2d ago",
                risk: "Medium",
                accessState: ACCESS_STATE.REQUEST_VDR,
                ctaLabel: "Request VDR",
            },
        ]);
        // Alerts queue
        const alerts = (data.alerts || [
            {
                id: "alert1",
                severity: "urgent",
                title: "KYC Escalation Required",
                counterparty: "John Vance",
                deadline: "2h",
                description: "Identity verification failed.",
                ctaLabel: "Resolve",
            },
            {
                id: "alert2",
                severity: "warning",
                title: "SLA Warning",
                counterparty: "Nova Health",
                deadline: "3d",
                description: "Document request pending.",
                ctaLabel: "Review",
            },
        ]);
        return { account, kpi, opportunities, alerts };
    }

    async getHtml() {
        return `
            <style>
                :root {
                    --inv-bg: var(--bg-app, #ffffff);
                    --inv-surface: var(--bg-sidebar, #f5f5f5);
                    --inv-surface-2: var(--bg-surface, #e0e0e0);
                    --inv-surface-hover: var(--bg-hover, #dddddd);
                    --inv-text-primary: var(--text-primary, #212121);
                    --inv-text-secondary: var(--text-muted, #757575);
                    --inv-divider: var(--divider, #e0e0e0);
                    --inv-accent: var(--brand-secondary, #3b82f6);
                    --inv-accent-hover: var(--brand-secondary-hover, #1d4ed8);
                    --inv-premium: var(--brand-secondary, #3b82f6);
                    --inv-success: var(--success, #4caf50);
                    --inv-warning: var(--warning, #ff9800);
                    --inv-error: var(--danger, #f44336);
                }

                .inv-layout {
                    display: flex;
                    width: 100%;
                    height: 100vh; background: var(--inv-bg); color: var(--inv-text-primary);
                    font-family: 'Inter', sans-serif; overflow: hidden;
                }

                @media (max-width: 1280px) {
                    .inv-right-rail { display: none !important; }
                }

                /* Utilities */
                h1, h2, h3, p { margin: 0; padding: 0; }
                .text-sm { font-size: 0.875rem; } .text-xs { font-size: 0.75rem; }
                .font-medium { font-weight: 500; } .font-semibold { font-weight: 600; }
                .text-muted { color: var(--inv-text-secondary); }
                .flex { display: flex; } .flex-col { display: flex; flex-direction: column; }
                .items-center { align-items: center; } .justify-between { justify-content: space-between; }
                .gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
                .p-4 { padding: 16px; } .p-6 { padding: 24px; }
                
                /* Buttons */
                .btn {
                    padding: 8px 16px; border-radius: 6px; font-size: 0.875rem; font-weight: 600;
                    cursor: pointer; border: 1px solid transparent; transition: all 0.2s;
                    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                }
                .btn:focus-visible, a:focus-visible, select:focus-visible, textarea:focus-visible, input:focus-visible, [role="button"]:focus-visible, [tabindex]:focus-visible {
                    outline: 2px solid var(--inv-accent) !important;
                    outline-offset: 3px !important;
                    box-shadow: 0 0 0 4px rgba(47, 107, 94, 0.25) !important;
                }
                .btn-sm { padding: 6px 12px; font-size: 0.75rem; }
                .btn-primary { background: var(--inv-accent); color: #fff; }
                .btn-primary:hover { background: var(--inv-accent-hover); }
                .btn-outline { background: transparent; border-color: var(--inv-divider); color: var(--inv-text-primary); }
                .btn-outline:hover { background: var(--inv-surface-2); }
                .btn-success { background: rgba(94, 143, 99, 0.1); color: var(--inv-success); border-color: var(--inv-success); }
                .btn-danger { background: rgba(168, 92, 104, 0.1); color: var(--inv-error); border-color: var(--inv-error); }

                /* Global Top Bar */
                .global-top-bar {
                    position: absolute; top: 16px; right: 24px; z-index: 50; display: flex; gap: 16px; align-items: center;
                }
                .global-action-btn {
                    width: 36px; height: 36px; border-radius: 50%; background: rgba(27, 34, 43, 0.8); backdrop-filter: blur(4px);
                    border: 1px solid var(--inv-divider); display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: var(--inv-text-primary); transition: all 0.2s; position: relative;
                }
                .global-action-btn:hover { background: var(--inv-surface-2); border-color: var(--inv-text-secondary); }
                .bell-badge {
                    position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; border-radius: 50%;
                    background: var(--inv-premium); border: 2px solid var(--inv-bg);
                }
                .avatar-btn {
                    width: 36px; height: 36px; border-radius: 50%; background: var(--inv-accent); display: flex;
                    align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem; cursor: pointer;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .cmd-hint {
                    display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(27, 34, 43, 0.8);
                    border: 1px solid var(--inv-divider); border-radius: 6px; font-size: 0.75rem; color: var(--inv-text-secondary);
                    cursor: pointer; backdrop-filter: blur(4px); transition: border-color 0.2s;
                }
                .cmd-hint:hover { border-color: var(--inv-text-secondary); }
                .cmd-key { background: var(--inv-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--inv-divider); font-weight: bold; }

                /* Left Rail */
                .inv-left-rail { width: 260px; flex-shrink: 0; background: var(--inv-surface); border-right: 1px solid var(--inv-divider); display: flex; flex-direction: column; height: 100vh; position: relative; overflow-x: hidden; transition: width 0.3s ease; }
                .sidebar-toggle { position: absolute; top: 24px; right: 12px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--inv-text-secondary); border-radius: 4px; z-index: 10; }
                .sidebar-toggle:hover { background: var(--inv-surface-2); color: var(--inv-text-primary); }
                .account-identity { padding: 24px; background: linear-gradient(180deg, var(--inv-surface-2) 0%, var(--inv-surface) 100%); border-bottom: 1px solid var(--inv-divider); white-space: nowrap; }
                .mandate-chip { display: inline-block; padding: 4px 8px; background: var(--inv-surface-2); border: 1px solid var(--inv-divider); border-radius: 4px; font-size: 0.65rem; color: var(--inv-text-primary); margin: 0 4px 4px 0; cursor: pointer; transition: all 0.2s; }
                .mandate-chip.active { background: var(--brand-primary-soft); border-color: var(--inv-accent); color: var(--inv-accent); }
                .inv-nav-btn { padding: 10px 24px; color: var(--inv-text-secondary); text-decoration: none; font-weight: 500; font-size: 0.875rem; display: flex; align-items: center; justify-content: space-between; border-left: 3px solid transparent; cursor: pointer; white-space: nowrap; overflow: hidden; }
                .inv-nav-btn:hover { background: var(--inv-surface-hover); color: var(--inv-text-primary); }
                .inv-nav-btn.active { background: var(--brand-primary-soft); color: var(--inv-text-primary); border-left-color: var(--inv-accent); }
                .nav-icon { width: 20px; display: inline-block; text-align: center; margin-right: 12px; font-size: 1.1rem; }
                .nav-badge { background: var(--inv-surface-2); color: var(--inv-text-primary); padding: 2px 6px; border-radius: 12px; font-size: 0.65rem; font-weight: bold; }
                .nav-section { font-size: 0.65rem; text-transform: uppercase; color: var(--inv-text-secondary); font-weight: 600; margin: 20px 24px 8px 24px; white-space: nowrap; }

                /* Collapsed overrides */
                .collapsed-nav .inv-left-rail { width: 72px; }
                .collapsed-nav .account-identity h2, .collapsed-nav .account-identity .text-xs, .collapsed-nav .mandate-chip { display: none; }
                .collapsed-nav .account-identity { padding: 24px 16px; }
                .collapsed-nav .inv-nav-btn span:not(.nav-icon), .collapsed-nav .nav-badge { display: none; }
                .collapsed-nav .nav-section { visibility: hidden; margin: 16px 0; }
                .collapsed-nav .inv-nav-btn { padding: 12px 16px; justify-content: center; }
                .collapsed-nav .nav-icon { margin-right: 0; font-size: 1.25rem; }

                /* Main Content */
                .inv-center { flex: 1; min-width: 0; position: relative; height: 100vh; display: flex; flex-direction: column; background: var(--inv-bg); overflow-y: auto; overflow-x: hidden; }
                .view-header { padding: 24px 32px; background: var(--inv-surface); border-bottom: 1px solid var(--inv-divider); position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; }
                
                /* Home Dash */
                .dash-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 24px 32px; }
                .metric-card { background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px; }
                .metric-value { font-size: 2rem; font-weight: 700; margin: 8px 0; color: var(--inv-text-primary); }
                .metric-label { font-size: 0.875rem; color: var(--inv-text-secondary); font-weight: 500; }
                .recent-activity-list { padding: 0 32px 32px 32px; }
                .activity-item { display: flex; gap: 16px; padding: 16px; border-bottom: 1px solid var(--inv-divider); }

                /* Insights Dashboard & Notifs */
                .notif-dropdown { position: absolute; top: 48px; right: 0; width: 320px; background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; box-shadow: 0 10px 24px rgba(0,0,0,0.5); display: none; flex-direction: column; overflow: hidden; z-index: 100; cursor: default; }
                .notif-dropdown.active { display: flex; }
                .notif-item { padding: 12px 16px; border-bottom: 1px solid var(--inv-divider); font-size: 0.875rem; transition: background 0.2s; cursor: pointer; text-align: left; line-height: 1.4; color: var(--inv-text-primary); }
                .notif-item:hover { background: var(--inv-surface-2); }
                .notif-header { padding: 12px 16px; font-weight: 600; font-size: 0.875rem; border-bottom: 1px solid var(--inv-divider); background: var(--inv-surface-2); text-align: left; color: var(--inv-text-primary); }
                
                .avatar-dropdown { position: absolute; top: 48px; right: -8px; width: 220px; background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; box-shadow: 0 10px 24px rgba(0,0,0,0.5); display: none; flex-direction: column; overflow: hidden; z-index: 100; cursor: default; }
                .avatar-dropdown.active { display: flex; }

                .search-wrapper { display: flex; align-items: center; gap: 8px; position: relative; }
                .search-input-top { width: 0; padding: 0; opacity: 0; height: 36px; border-radius: 18px; background: rgba(27, 34, 43, 0.8); border: 1px solid transparent; font-size: 0.875rem; color: var(--inv-text-primary); outline: none; transition: all 0.3s ease; pointer-events: none; }
                .search-wrapper.open .search-input-top { width: 240px; padding: 0 16px; opacity: 1; border-color: var(--inv-divider); pointer-events: auto; }

                .insights-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; padding: 24px 32px; }
                .chart-card { background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 24px; }
                .funnel-bar { height: 32px; background: rgba(47, 107, 94, 0.2); border-radius: 4px; margin-bottom: 16px; position: relative; border: 1px solid rgba(47, 107, 94, 0.5); display: flex; align-items: center; justify-content: space-between; overflow: visible; }
                .funnel-fill { height: 100%; background: var(--inv-accent); border-radius: 4px 0 0 4px; transition: width 0.3s; }
                .funnel-text { position: absolute; left: 12px; font-weight: 600; font-size: 0.875rem; color: #fff; pointer-events: none; white-space: nowrap; }
                .funnel-label { font-size: 0.875rem; color: var(--inv-text-secondary); font-weight: 500; white-space: nowrap; margin-right: 12px; z-index: 2; }
                .donut-chart { width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(var(--inv-accent) 0% 45%, var(--inv-premium) 45% 75%, var(--inv-warning) 75% 90%, var(--inv-surface-2) 90% 100%); margin: 0 auto; position: relative; }
                .donut-hole { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; background: var(--inv-surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-direction: column; }

                /* Portfolio Table */
                .wl-table { width: 100%; border-collapse: collapse; }
                .wl-table th { text-align: left; padding: 12px 16px; color: var(--inv-text-secondary); font-size: 0.75rem; text-transform: uppercase; border-bottom: 1px solid var(--inv-divider); }
                .wl-table td { padding: 16px; border-bottom: 1px solid var(--inv-divider); font-size: 0.875rem; vertical-align: middle; }
                
                /* Feed & Kanban */
                .feed-scroller { height: 100%; overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none; background: #000; }
                .startup-snap-card { height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; display: flex; align-items: center; justify-content: center; padding: 80px 20px 20px 20px; }
                .startup-card-inner { width: 100%; max-width: 900px; height: calc(100vh - 120px); background: var(--inv-surface); border-radius: 12px; display: flex; overflow: hidden; border: 1px solid var(--inv-divider); transition: all 0.2s; opacity: 0.6; transform: scale(0.98); cursor: pointer; }
                .startup-card-inner.selected { opacity: 1; transform: scale(1); border-color: var(--inv-accent); box-shadow: inset 0 0 0 1px var(--inv-accent), 0 20px 40px rgba(0,0,0,0.6); }
                .video-section { flex: 0 0 320px; background: #000; position: relative; border-right: 1px solid var(--inv-divider); }
                .video-thumbnail { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
                .data-section { flex: 1; padding: 24px 32px; display: flex; flex-direction: column; }
                
                .kanban-board { display: flex; gap: 24px; padding: 24px; overflow-x: auto; height: calc(100vh - 80px); }
                .kanban-col { flex: 0 0 340px; background: rgba(21, 27, 34, 0.4); border-radius: 8px; border: 1px dashed var(--inv-divider); display: flex; flex-direction: column; padding: 16px; }
                .kanban-card { background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 6px; padding: 16px; margin-bottom: 12px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.1s; }
                .kanban-card.selected { border-color: var(--inv-accent); box-shadow: 0 0 0 1px var(--inv-accent); }

                /* Right Rail & VDR */
                .inv-right-rail { width: 360px; flex-shrink: 0; background: var(--inv-surface); border-left: 1px solid var(--inv-divider); height: 100vh; overflow-y: auto; display: flex; flex-direction: column; }
                .rail-header { padding: 16px 24px; background: var(--inv-surface-2); border-bottom: 1px solid var(--inv-divider); display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 600; }
                .panel-section { padding: 20px 24px; border-bottom: 1px solid var(--inv-divider); }
                .panel-title { font-size: 0.65rem; text-transform: uppercase; color: var(--inv-text-secondary); margin-bottom: 12px; font-weight: 600; }
                .vdr-item { display: flex; align-items: center; justify-content: space-between; padding: 10px; background: var(--inv-surface-2); border: 1px solid var(--inv-divider); border-radius: 6px; margin-bottom: 8px; font-size: 0.875rem; }
                .vdr-item:hover { border-color: var(--inv-text-secondary); }

                /* Command Palette Modal */
                .cmd-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 100; display: none; align-items: flex-start; justify-content: center; padding-top: 15vh; }
                .cmd-modal-overlay.active { display: flex; }
                .cmd-modal { width: 100%; max-width: 600px; background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); overflow: hidden; }
                .cmd-input-wrap { padding: 16px 24px; border-bottom: 1px solid var(--inv-divider); display: flex; align-items: center; gap: 12px; }
                .cmd-input { background: transparent; border: none; outline: none; color: var(--inv-text-primary); font-size: 1.25rem; width: 100%; font-family: 'Inter'; }
                .cmd-results { max-height: 400px; overflow-y: auto; padding: 12px 0; }
                .cmd-res-item { padding: 12px 24px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: background 0.2s; }
                .cmd-res-item:hover { background: var(--inv-surface-2); }
                .cmd-res-item .icon { font-size: 1.25rem; color: var(--inv-text-secondary); }

                /* Filter Sidebar Overlay */
                .filter-sidebar-overlay {
                    position: fixed; top: 0; right: 0; bottom: 0; left: 0;
                    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
                    z-index: 150; display: none; justify-content: flex-end;
                }
                .filter-sidebar-overlay.active { display: flex; }
                .filter-sidebar {
                    width: 380px; background: var(--inv-surface); height: 100%;
                    border-left: 1px solid var(--inv-divider); display: flex; flex-direction: column;
                    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
                    transform: translateX(100%); transition: transform 0.3s ease;
                }
                .filter-sidebar-overlay.active .filter-sidebar { transform: translateX(0); }
                .filter-header { padding: 20px 24px; border-bottom: 1px solid var(--inv-divider); display: flex; justify-content: space-between; align-items: center; }
                .filter-section-title { font-size: 0.75rem; text-transform: uppercase; color: var(--inv-text-secondary); font-weight: 600; margin-bottom: 12px; }
                .filter-group { padding: 20px 24px; border-bottom: 1px solid var(--inv-divider); }
                .filter-select { width: 100%; padding: 8px 12px; background: var(--inv-bg); border: 1px solid var(--inv-divider); border-radius: 6px; color: var(--inv-text-primary); outline: none; }
                
                /* Filter chips */
                .filter-chips-container { display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 32px; background: rgba(0,0,0,0.2); border-bottom: 1px solid var(--inv-divider); }
                .filter-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: var(--inv-surface-2); border: 1px solid var(--inv-divider); border-radius: 12px; font-size: 0.75rem; color: var(--inv-text-primary); }
                .filter-chip-remove { cursor: pointer; color: var(--inv-text-secondary); font-weight: bold; }
                .filter-chip-remove:hover { color: var(--inv-error); }

                /* Custom Dropdown Sorting */
                .custom-dropdown-container {
                    position: relative;
                    display: inline-block;
                }
                .custom-dropdown-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 6px;
                    background: #171b24;
                    border: 1px solid rgba(243, 234, 215, 0.08);
                    border-radius: 6px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.6);
                    width: 220px;
                    z-index: 150;
                    overflow: hidden;
                }
                .custom-dropdown-menu.active {
                    display: block;
                }
                .dropdown-item {
                    padding: 10px 16px;
                    font-size: 0.825rem;
                    color: var(--text-primary);
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s;
                    text-align: left;
                }
                .dropdown-item:hover {
                    background: var(--bg-hover);
                    color: var(--brand-primary);
                }
                .dropdown-item.selected {
                    background: var(--brand-primary-soft);
                    color: var(--brand-primary);
                    font-weight: 600;
                }
            </style>

            <div class="inv-layout" id="mainLayout">
                <!-- DYNAMIC SHELL: LEFT RAIL -->
                <aside class="inv-left-rail">
                    <div class="sidebar-toggle" id="sidebarToggle">≡</div>
                    <div class="account-identity">
                        <div class="flex justify-between items-start mb-4" style="gap: 12px;">
                            <div>
                                <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 4px;">${this.state.account.name}</h2>
                                <span class="text-xs flex items-center gap-1" style="color: var(--inv-premium);"><span>★</span> ${this.state.account.tier} </span>
                            </div>
                            <div style="width: 32px; height: 32px; border-radius: 4px; background: rgba(255,255,255,0.05); border: 1px solid var(--inv-divider); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem;" title="User Initials"> ${this.state.account.initials} </div>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs text-muted" style="text-transform: uppercase; letter-spacing: 0.05em;">Mandate Filters</span>
                            <span style="font-size: 0.75rem; color: var(--inv-accent); cursor: pointer;" id="editMandateBtn" title="Edit Mandates">${this.getIcon('SETTINGS')} Edit</span>
                        </div>
                        <div class="flex flex-wrap" id="mandateTags" style="gap: 6px;">
                            ${this.state.account.mandates.map(m => `<span class="mandate-chip ${m.active ? 'active' : ''}">✦ ${m.name}</span>`).join(' ')}
                        </div>
                    </div>

                    <div style="flex: 1; overflow-y: auto; padding-top: 8px;" id="navContainer">
                        <!-- Rendered by JS -->
                    </div>
                </aside>

                <!-- DYNAMIC: CENTER CONTAINER -->
                <main id="mainContainer" class="inv-center">
                    <!-- Global Actions -->
                    <div class="global-top-bar">
                        <div class="search-wrapper" id="searchWrapper">
                            <input type="text" class="search-input-top" id="topSearchInput" placeholder="Search deals, founders... ⌘K">
                            <div class="global-action-btn" id="searchTriggerBtn">${this.getIcon('SEARCH')}</div>
                        </div>
                        <div class="global-action-btn" id="bellBtn">
                            ${this.getIcon('BELL')}<div class="bell-badge"></div>
                            <div class="notif-dropdown" id="notifDropdown">
                                <div class="notif-header" style="display:flex; justify-content:space-between; align-items:center;"><span>Notifications</span><span style="font-size:0.65rem; color:var(--inv-accent); cursor:pointer;">Mark all read</span></div>
                                ${this.state.alerts.map(alert => `
                                    <div class="notif-item">
                                        <div class="font-semibold text-sm" style="color:${alert.severity === 'urgent' ? 'var(--inv-error)' : alert.severity === 'warning' ? 'var(--inv-warning)' : 'var(--inv-success)'};">${alert.title}</div>
                                        <div class="text-xs text-muted mt-1">${alert.description}</div>
                                    </div>
                                `).join('')}
                                
                            </div>
                        </div>
                        <div style="position: relative;">
                            <div class="avatar-btn" id="avatarBtn">JD</div>
                            <div class="avatar-dropdown" id="avatarDropdown">
                                <div class="notif-header">Jane Sterling</div>
                                <div class="notif-item"><div class="font-semibold text-sm">KYC Status</div><div class="text-xs text-success mt-1" style="color: var(--inv-success);">Verified (Tier 1)</div></div>
                                <div class="notif-item"><div class="font-semibold text-sm">Edit Mandate</div></div>
                                <div class="notif-item"><div class="font-semibold text-sm">Account Settings</div></div>
                                <div class="notif-item" style="border: none;"><div class="font-semibold text-sm" style="color: var(--inv-error);">Log Out</div></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="dynamicContent"></div>
                </main>

                <!-- DYNAMIC: RIGHT RAIL -->
                <aside id="rightRail" class="inv-right-rail"></aside>

                <!-- COMMAND PALETTE MODAL -->
                <div class="cmd-modal-overlay" id="cmdOverlay">
                    <div class="cmd-modal">
                        <div class="cmd-input-wrap">
                            <span style="font-size: 1.25rem;">🔍</span>
                            <input type="text" class="cmd-input" id="cmdInput" placeholder="Type to search deals, founders, meetings (Press Enter to select)" autocomplete="off">
                        </div>
                        <div class="cmd-results" id="cmdResults">
                            <div style="padding: 8px 24px; font-size: 0.75rem; font-weight: 600; color: var(--inv-text-secondary); text-transform: uppercase;">Recent Searches</div>
                            <div class="cmd-res-item" data-tab="deals" data-id="stripe"><span class="icon">🏢</span><div><div class="font-semibold">Stripe Financials Q4</div><div class="text-xs text-muted">Portfolio > Document Room</div></div></div>
                            <div class="cmd-res-item" data-tab="deals" data-id="omega"><span class="icon">👤</span><div><div class="font-semibold">Sarah K. (Omega Shield)</div><div class="text-xs text-muted">Founder Profile</div></div></div>
                            <div class="cmd-res-item" data-tab="insights"><span class="icon">📈</span><div><div class="font-semibold">LatAm SaaS Trends 2026</div><div class="text-xs text-muted">Insights > Sector Analysis</div></div></div>
                        </div>
                    </div>
                </div>              </div>
                </div>

                <!-- FILTER SIDEBAR OVERLAY -->
                <div class="filter-sidebar-overlay" id="filterSidebarOverlay">
                    <div class="filter-sidebar">
                        <div class="filter-header">
                            <h2 style="font-size: 1.15rem; font-weight: 600; color: var(--inv-text-primary);">Discover Filters</h2>
                            <button class="btn btn-outline btn-sm" id="closeFiltersBtn">âœ•</button>
                        </div>
                        <div style="flex: 1; overflow-y: auto;">
                            <!-- Sector Filter -->
                            <div class="filter-group">
                                <div class="filter-section-title">Sector Thesis</div>
                                <select class="filter-select" id="filterSector">
                                    <option value="All">All Sectors</option>
                                    <option value="FinTech">FinTech</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="SaaS">SaaS / Enterprise</option>
                                    <option value="HealthTech">HealthTech</option>
                                    <option value="ClimateTech">ClimateTech</option>
                                </select>
                            </div>
                            <!-- Stage Filter -->
                            <div class="filter-group">
                                <div class="filter-section-title">Investment Stage</div>
                                <select class="filter-select" id="filterStage">
                                    <option value="All">All Stages</option>
                                    <option value="Seed">Seed</option>
                                    <option value="Series A">Series A</option>
                                </select>
                            </div>
                            <!-- Revenue Band -->
                            <div class="filter-group">
                                <div class="filter-section-title">Revenue Band</div>
                                <select class="filter-select" id="filterRevenue">
                                    <option value="All">All Revenue Bands</option>
                                    <option value="mvp">Pre-Revenue / MVP (&lt; $10k MRR)</option>
                                    <option value="growth">Growth ($10k - $50k MRR)</option>
                                    <option value="scale">Scale ($50k+ MRR or $100k+ ARR)</option>
                                </select>
                            </div>
                            <!-- Check Size Target -->
                            <div class="filter-group">
                                <div class="filter-section-title">Target Raise / Check Size</div>
                                <select class="filter-select" id="filterCheckSize">
                                    <option value="All">All Ticket Sizes</option>
                                    <option value="small">Under $2M</option>
                                    <option value="large">Over $2M</option>
                                </select>
                            </div>
                            <!-- Diligence Readiness -->
                            <div class="filter-group">
                                <div class="filter-section-title">Diligence Readiness</div>
                                <select class="filter-select" id="filterReadiness">
                                    <option value="All">All Statuses</option>
                                    <option value="unlocked">Vault Unlocked</option>
                                    <option value="audited">Fully Audited / KYC Verified</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-4 border-t flex gap-2" style="background: var(--inv-surface-2);">
                            <button class="btn btn-outline" style="flex: 1;" id="resetFiltersBtn">Reset All</button>
                            <button class="btn btn-primary" style="flex: 1;" id="applyFiltersBtn">Apply Filters</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    saveStateToLocalStorage() {
        try {
            localStorage.setItem('investor_dashboard_state', JSON.stringify(this.state));
        } catch (e) {
            console.error("Failed to save state to localStorage", e);
        }
    }

    getDefaultMeetings() {
        return [
            {
                id: 'm1',
                startupName: 'Aurora Climate',
                dealId: 'aurora',
                title: 'Intro Call & Tech Moat Review',
                time: 'Today, 2:00 PM PST',
                timestamp: '2026-06-03T14:00:00',
                duration: '45m',
                platform: 'Zoom',
                platformUrl: 'https://zoom.us/j/8839201928',
                status: 'confirmed',
                attendees: {
                    founder: 'Dr. Sarah Lin (Founder & Geospatial Scientist)',
                    partner: 'Jane Sterling (Lead Partner)',
                    coordinator: 'Mike Operations (Admin Coordinator)'
                },
                objective: 'Evaluate technical moat of satellite auditing model. Specifically dig into Sentinel-2 data resolution limitations and verify cloud correction logic.',
                teamContext: 'Founder previously built and sold a geospatial analytics company. Strong technical pedigree, need to assess go-to-market capability.',
                prepChecklist: [
                    { task: 'Review satellite validation report in VDR', done: true },
                    { task: 'Verify Cap Table commitments', done: false },
                    { task: 'Review spatial resolution limitations', done: false }
                ],
                previousInteractions: 'First matched via ClimateTech mandate 7 days ago. Founder accepted interest 1 day ago.',
                linkedDiligence: {
                    completedReviewsCount: 2,
                    missingFilesCount: 0,
                    staleDocsCount: 0,
                    vdrState: 'unlocked'
                },
                notes: '',
                notesTemplate: 'Objective: Assess Sentinel-2 resolution limits.\n\nMoat validation:\n\nGo-to-market plan:\n\nFollow-up items:\n- \n\nConviction:\n',
                convictionLog: null
            },
            {
                id: 'm2',
                startupName: 'AeroSpace Logix',
                dealId: 'acme',
                title: 'Follow-up on Q3 Financials',
                time: 'Tomorrow, 10:00 AM PST',
                timestamp: '2026-06-04T10:00:00',
                duration: '30m',
                platform: 'Zoom',
                platformUrl: '',
                status: 'pending',
                attendees: {
                    founder: 'John Vance (Founder)',
                    partner: 'Jane Sterling (Lead Partner)',
                    coordinator: 'Sarah Compliance (Admin Coordinator)'
                },
                objective: 'Go through the Q3 financials audit trail and clear the KYC verification blockers.',
                teamContext: 'Solid enterprise model, but compliance issues in cross-border settlements need clearance.',
                prepChecklist: [
                    { task: 'Request access to Q3 Financials', done: true },
                    { task: 'Review cross-border regulatory audit report', done: false }
                ],
                previousInteractions: 'Expressed interest 3 days ago. Video watched 45s.',
                linkedDiligence: {
                    completedReviewsCount: 1,
                    missingFilesCount: 2,
                    staleDocsCount: 1,
                    vdrState: 'locked'
                },
                notes: '',
                notesTemplate: 'Objective: Clear KYC verification blockers.\n\nAudit findings:\n\nAction items:\n- \n',
                convictionLog: null
            },
            {
                id: 'm3',
                startupName: 'Nexus Health',
                dealId: 'nexus',
                title: 'NHS Pilots Triage',
                time: 'June 5, 11:00 AM PST',
                timestamp: '2026-06-05T11:00:00',
                duration: '60m',
                platform: 'MS Teams',
                platformUrl: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_Y2M...',
                status: 'rescheduled',
                attendees: {
                    founder: 'Dr. Sarah Lin (Founder)',
                    partner: 'Jane Sterling (Lead Partner)',
                    coordinator: 'Sarah Compliance (Admin Coordinator)'
                },
                objective: 'Review the 12 active NHS trust deployment SLA metrics.',
                teamContext: 'High growth but slow founder response rate.',
                prepChecklist: [
                    { task: 'Review NHS Pilot contracts in VDR', done: false }
                ],
                previousInteractions: 'Watchlisted 4 days ago. VDR access requested 2 days ago.',
                linkedDiligence: {
                    completedReviewsCount: 1,
                    missingFilesCount: 1,
                    staleDocsCount: 1,
                    vdrState: 'requested'
                },
                notes: '',
                notesTemplate: 'Objective: Review NHS deployment SLA metrics.\n\nTraction validation:\n\nSLA concerns:\n\nDecision:\n',
                convictionLog: null
            },
            {
                id: 'm4',
                startupName: 'Stripe',
                dealId: 'stripe',
                title: 'Late-Stage LP Briefing',
                time: 'Yesterday, 3:00 PM PST',
                timestamp: '2026-06-01T15:00:00',
                duration: '60m',
                platform: 'Zoom',
                platformUrl: 'https://zoom.us/j/123456789',
                status: 'completed',
                attendees: {
                    founder: 'John Collison (President)',
                    partner: 'Jane Sterling (Lead Partner)',
                    coordinator: 'Mike Operations (Admin Coordinator)'
                },
                objective: 'Evaluate Stripe pre-IPO round allocations and LP co-investment logic.',
                teamContext: 'Highly institutional deal, low risk, pure allocation negotiation.',
                prepChecklist: [
                    { task: 'Review allocations sheet', done: true }
                ],
                previousInteractions: 'Part of existing portfolio.',
                linkedDiligence: {
                    completedReviewsCount: 5,
                    missingFilesCount: 0,
                    staleDocsCount: 0,
                    vdrState: 'unlocked'
                },
                notes: 'Stripe is executing strongly. Pre-IPO allocation has been confirmed at $5M. We will distribute to LPs by Friday.',
                notesTemplate: '',
                convictionLog: 9
            },
            {
                id: 'm5',
                startupName: 'SpaceX',
                dealId: 'spacex',
                title: 'Secondary Shares Pricing Call',
                time: 'May 28, 4:00 PM PST',
                timestamp: '2026-05-28T16:00:00',
                duration: '30m',
                platform: 'Phone',
                platformUrl: 'tel:+15550199',
                status: 'cancelled',
                attendees: {
                    founder: 'Gwynne Shotwell (COO)',
                    partner: 'Jane Sterling (Lead Partner)',
                    coordinator: 'Mike Operations (Admin Coordinator)'
                },
                objective: 'Discuss pricing validation metrics for secondary share block purchase.',
                teamContext: 'Cancelled due to seller withdrawing the block shares from open market.',
                prepChecklist: [],
                previousInteractions: 'Existing portfolio.',
                linkedDiligence: {
                    completedReviewsCount: 3,
                    missingFilesCount: 0,
                    staleDocsCount: 0,
                    vdrState: 'unlocked'
                },
                notes: 'Seller pulled the block. Meeting cancelled.',
                notesTemplate: '',
                convictionLog: null
            }
        ];
    }

    init() {
        const saved = localStorage.getItem('investor_dashboard_state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const normalizedDefaults = this.normalizeDashboardData({});
                this.state = {
                    ...normalizedDefaults,
                    ...parsed,
                    account: { ...normalizedDefaults.account, ...(parsed.account || {}) },
                    filters: parsed.filters || {
                        sector: 'All',
                        stage: 'All',
                        revenue: 'All',
                        checkSize: 'All',
                        readiness: 'All'
                    }
                };

                // Fill in critical defaults if missing or undefined
                this.state.activeTab = this.state.activeTab || 'home';
                if (this.state.selectedDealId === undefined) this.state.selectedDealId = null;
                if (this.state.navCollapsed === undefined) this.state.navCollapsed = false;
                this.state.selectedMeetingId = this.state.selectedMeetingId || 'm1';
                this.state.calendarSyncStatus = this.state.calendarSyncStatus || 'error';
                this.state.meetingsFilter = this.state.meetingsFilter || 'upcoming';
                this.state.meetingsSearch = this.state.meetingsSearch || '';

                // Validate required arrays to prevent runtime mapping crashes
                const requiredArrays = ['kpi', 'opportunities', 'alerts', 'deals', 'portfolioDeals', 'meetings'];
                let hasBrokenArray = false;
                requiredArrays.forEach(key => {
                    if (!Array.isArray(this.state[key])) {
                        hasBrokenArray = true;
                    }
                });

                if (hasBrokenArray) {
                    localStorage.removeItem('investor_dashboard_state');
                } else {
                    this.setupGlobalListeners();
                    this.render();
                    return;
                }
            } catch (e) {
                console.error("Failed to parse saved state", e);
                localStorage.removeItem('investor_dashboard_state');
            }
        }

        // --- 1. MOCK DATA STORE ---
        const normalized = this.normalizeDashboardData({});
        this.state = {
            ...normalized,
            activeTab: 'home',
            selectedDealId: null,
            navCollapsed: false,
            selectedMeetingId: 'm1',
            calendarSyncStatus: 'error',
            meetingsFilter: 'upcoming',
            meetingsSearch: '',
            meetings: this.getDefaultMeetings(),
            portfolioDeals: [
                { name: 'Stripe', sector: 'FinTech', tvpi: '14.5x', irr: '45%', mrr: '$150M', runway: 'Profitable', nextRound: 'IPO Prep', update: 'Added 5 new enterprise logos.' },
                { name: 'SpaceX', sector: 'DeepTech', tvpi: '22.0x', irr: '52%', mrr: 'N/A', runway: '36+ mos', nextRound: 'Q4 2026', update: 'Successful Starship orbital test.' },
                { name: 'Vercel', sector: 'DevTools', tvpi: '4.2x', irr: '118%', mrr: '$4M', runway: '24 mos', nextRound: 'Series E', update: 'Launched v0 generative UI tool.' },
                { name: 'Linear', sector: 'SaaS', tvpi: '3.8x', irr: '85%', mrr: '$1M', runway: '30 mos', nextRound: 'Series C', update: 'Crossed $1M MRR threshold.' }
            ],
            filters: {
                sector: 'All',
                stage: 'All',
                revenue: 'All',
                checkSize: 'All',
                readiness: 'All'
            },
            deals: [
                {
                    id: 'acme', name: 'AeroSpace Logix', founder: 'John Vance', location: 'Bangalore',
                    sector: 'FinTech', stage: 'Seed', ask: '$1.5M Equity', revenue: '$10k MRR',
                    match: 92, kyc: 'KYC Verified', thesis: 'API-first compliance automation for mid-market banks.',
                    evidence: 'Eliminates 80% of manual KYC overhead.',
                    thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '01:45', viewed: 'Viewed 45s', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "Direct Sector & Stage Match",
                        thesis: "API-first compliance automation matches FinTech infrastructure thesis",
                        stage: "Perfect Seed stage match",
                        geography: "Bangalore hub falls under APAC sandbox mandate",
                        ticketSize: "$1.5M Ask fits check size policy ($1M-$3M)",
                        traction: "$10k MRR meets minimum Seed threshold"
                    },
                    growth: "22% MoM",
                    roundTarget: "$1.5M ($800k committed)",
                    verification: "Founder Verified",
                    videoStats: "Watched 45s (40%)",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Pitch_Deck_v2.pdf", size: "2.4 MB", uploaded: "2d ago", state: "unlocked" },
                        { name: "Q3_Financials.xlsx", size: "1.8 MB", uploaded: "1d ago", state: "locked" },
                        { name: "Cap_Table_Detailed.pdf", size: "1.1 MB", uploaded: "5d ago", state: "locked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: ["Customer pipeline contracts verification pending"],
                    decisionTimeline: "Decision target: July 1",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "4 days ago" },
                        { event: "Pitch video watched", user: "Jane Sterling (Investor)", date: "3 days ago" }
                    ],
                    nextAction: "Request access to Q3 Financials",
                    businessModel: "B2B SaaS (API Licensing)",
                    pilots: "5 Enterprise Pilots",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["Q3 Financials", "Cap Table Detailed"],
                        staleDocs: ["Pitch_Deck_v2.pdf (Updated 180d ago)"],
                        totalExpected: 3
                    },
                    convictionScore: 6,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 20, 2026 10:00 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false },
                        { stage: "Term Sheet", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Sarah Compliance",
                        slaCountdown: "Active (24h remaining)",
                        status: "Pending verification"
                    }
                },
                {
                    id: 'omega', name: 'Omega Shield', founder: 'Sarah K.', location: 'NYC',
                    sector: 'Cybersecurity', stage: 'Series A', ask: '$6M Equity', revenue: '$150k ARR',
                    match: 94, kyc: 'Verified', thesis: 'Quantum-resistant encryption for healthcare data.',
                    evidence: 'Pilot running in 3 major hospital networks. Full data room opened.',
                    thumb: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '03:45', viewed: 'Watched full', status: 'diligence', updates: ['Data Room access granted'],
                    whyMatch: {
                        mandateFit: "Strong Security Fit",
                        thesis: "Quantum-resistant encryption matches deep-tech cybersecurity thesis",
                        stage: "Series A matches mandate",
                        geography: "NYC fits US East Coast mandate",
                        ticketSize: "$6M Ask fits check size policy ($3M-$8M)",
                        traction: "$150k ARR meets growth requirements"
                    },
                    growth: "15% MoM",
                    roundTarget: "$6.0M ($4.2M committed)",
                    verification: "Fully Audited",
                    videoStats: "Watched full (100%)",
                    vaultState: "unlocked",
                    vdrFiles: [
                        { name: "Pitch_Deck_v2.pdf", size: "3.5 MB", uploaded: "4d ago", state: "unlocked" },
                        { name: "Financial_Model_Q4.xlsx", size: "4.2 MB", uploaded: "1d ago", state: "unlocked" },
                        { name: "IP_Audit_Report.pdf", size: "2.1 MB", uploaded: "5d ago", state: "unlocked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Term Sheet target: June 15",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "6 days ago" },
                        { event: "Watchlisted", user: "Jane Sterling (Investor)", date: "5 days ago" },
                        { event: "Data room access requested", user: "Jane Sterling (Investor)", date: "4 days ago" },
                        { event: "Data room access granted", user: "Sarah K. (Founder)", date: "3 days ago" }
                    ],
                    nextAction: "Finalize financial model audit",
                    businessModel: "Enterprise License + SaaS",
                    pilots: "3 Hospital Networks",
                    diligenceMetrics: {
                        completedReviews: 3,
                        missingFiles: [],
                        staleDocs: [],
                        totalExpected: 3
                    },
                    convictionScore: 8,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 18, 2026 09:00 AM", done: true },
                        { stage: "Interest Expressed", timestamp: "May 19, 2026 11:30 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "May 21, 2026 02:00 PM", done: true },
                        { stage: "Diligence / VDR Review", timestamp: "May 23, 2026 09:15 AM", done: true }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Sarah Compliance",
                        slaCountdown: "Completed (Audit Clear)",
                        status: "Approved"
                    }
                },
                {
                    id: 'synth', name: 'SynthOS', founder: 'Alex K.', location: 'San Francisco',
                    sector: 'SaaS', stage: 'Seed', ask: '$2M SAFE', revenue: '$5k MRR',
                    match: 88, kyc: 'KYC Verified', thesis: 'Generative AI wrappers for legacy enterprise software.',
                    evidence: 'Fast integration layer that gives 1990s ERP systems a conversational interface.',
                    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '01:20', viewed: 'Not watched', status: 'interest_sent', updates: [],
                    whyMatch: {
                        mandateFit: "AI Wrapper Fit",
                        thesis: "Enterprise SaaS integration thesis",
                        stage: "Seed stage matches mandate",
                        geography: "San Francisco fits Silicon Valley mandate",
                        ticketSize: "$2M Ask fits check size policy ($1M-$3M)",
                        traction: "Early MVP showing rapid initial pilot signups"
                    },
                    growth: "45% MoM",
                    roundTarget: "$2.0M SAFE ($1.1M committed)",
                    verification: "Founder Verified",
                    videoStats: "Not watched",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Pitch_Deck_v1.pdf", size: "1.9 MB", uploaded: "3d ago", state: "unlocked" },
                        { name: "Tech_Architecture_Spec.pdf", size: "2.8 MB", uploaded: "2d ago", state: "locked" }
                    ],
                    responsiveness: "Medium (response < 24h)",
                    diligenceBlockers: ["Technical architecture review pending"],
                    decisionTimeline: "Decision target: July 10",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "3 days ago" },
                        { event: "Expressed interest", user: "Jane Sterling (Investor)", date: "2 days ago" },
                        { event: "Founder accepted interest", user: "Alex K. (Founder)", date: "1 day ago" }
                    ],
                    nextAction: "Watch pitch video & request tech architecture",
                    businessModel: "SaaS Usage-Based",
                    pilots: "8 Enterprise Pilots",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["Tech Architecture Spec"],
                        staleDocs: [],
                        totalExpected: 2
                    },
                    convictionScore: 8,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 22, 2026 10:45 AM", done: true },
                        { stage: "Interest Expressed", timestamp: "May 23, 2026 04:30 PM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Mike Operations",
                        slaCountdown: "Active (12h remaining)",
                        status: "Pending founder upload"
                    }
                },
                {
                    id: 'nexus', name: 'Nexus Health', founder: 'Dr. Sarah Lin', location: 'London',
                    sector: 'HealthTech', stage: 'Series A', ask: '$4M Equity', revenue: '$85k MRR',
                    match: 78, kyc: 'KYC Verified', thesis: 'AI triaging for overwhelmed public health clinics.',
                    evidence: 'Deployed in 12 NHS trusts. Saves 4 physician hours per week.',
                    thumb: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '03:15', viewed: 'Viewed 10s', status: 'watchlist', updates: ['Deck updated 2 hrs ago'],
                    whyMatch: {
                        mandateFit: "Moderate Fit",
                        thesis: "AI triaging matches health-tech thesis",
                        stage: "Series A matches mandate",
                        geography: "London fits UK/Europe expansion mandate",
                        ticketSize: "$4M Ask fits check size policy",
                        traction: "$85k MRR meets growth hurdle"
                    },
                    growth: "18% MoM",
                    roundTarget: "$4.0M ($2.0M committed)",
                    verification: "KYC Verified",
                    videoStats: "Watched 10s (5%)",
                    accessState: ACCESS_STATE.REQUEST_VDR,
                    vdrFiles: [
                        { name: "Pitch_Deck_NHS.pdf", size: "3.1 MB", uploaded: "5d ago", state: "unlocked" },
                        { name: "NHS_Pilot_Contracts.pdf", size: "4.5 MB", uploaded: "2d ago", state: "locked" }
                    ],
                    responsiveness: "Low (response > 48h)",
                    diligenceBlockers: ["SLA verification on pilot contracts"],
                    decisionTimeline: "Decision target: June 30",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "5 days ago" },
                        { event: "Watchlisted", user: "Jane Sterling (Investor)", date: "4 days ago" },
                        { event: "Requested VDR Access", user: "Jane Sterling (Investor)", date: "2 days ago" }
                    ],
                    nextAction: "Follow up on VDR access request",
                    businessModel: "B2B SaaS (Contracted)",
                    pilots: "12 NHS Trusts",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["NHS Pilot Contracts"],
                        staleDocs: ["Pitch_Deck_NHS.pdf (Updated 180d ago)"],
                        totalExpected: 2
                    },
                    convictionScore: 4,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 21, 2026 08:30 AM", done: true },
                        { stage: "Interest Expressed", timestamp: "May 22, 2026 11:15 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Sarah Compliance",
                        slaCountdown: "Stalled (>48h SLA warning)",
                        status: "Awaiting documents"
                    }
                },
                {
                    id: 'aurora', name: 'Aurora Climate', founder: 'Team of 3', location: 'Berlin',
                    sector: 'ClimateTech', stage: 'Series A', ask: '$5M Equity', revenue: '$120k ARR',
                    match: 65, kyc: 'Verified', thesis: 'Satellite-based carbon accounting verification.',
                    evidence: 'Proprietary models processing Sentinel-2 data to audit carbon offset claims globally.',
                    thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '02:50', viewed: 'Watched full', status: 'intro_review', updates: ['Founder accepted interest'],
                    whyMatch: {
                        mandateFit: "Climate Mandate Fit",
                        thesis: "Satellite accounting matches climate carbon tracking thesis",
                        stage: "Series A matches mandate",
                        geography: "Berlin fits EU mandate",
                        ticketSize: "$5M Ask fits check size policy",
                        traction: "First pilot revenue established"
                    },
                    growth: "30% MoM",
                    roundTarget: "$5.0M ($3.0M committed)",
                    verification: "Fully Audited",
                    videoStats: "Watched full (100%)",
                    vaultState: "unlocked",
                    vdrFiles: [
                        { name: "Aurora_Deck_Q1.pdf", size: "2.7 MB", uploaded: "5d ago", state: "unlocked" },
                        { name: "Satellite_Validation_Report.pdf", size: "5.1 MB", uploaded: "3d ago", state: "unlocked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: ["Confirming validation methodology"],
                    decisionTimeline: "Meeting Scheduled (Today)",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "7 days ago" },
                        { event: "Watchlisted", user: "Jane Sterling (Investor)", date: "6 days ago" },
                        { event: "Intro call scheduled", user: "Jane Sterling (Investor)", date: "Today" }
                    ],
                    nextAction: "Attend scheduled Intro Call",
                    businessModel: "Data Subscription (API)",
                    pilots: "4 Active Pilots",
                    diligenceMetrics: {
                        completedReviews: 2,
                        missingFiles: [],
                        staleDocs: [],
                        totalExpected: 2
                    },
                    convictionScore: 8,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 19, 2026 11:20 AM", done: true },
                        { stage: "Interest Expressed", timestamp: "May 20, 2026 03:00 PM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "May 22, 2026 02:00 PM", done: true },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Mike Operations",
                        slaCountdown: "Active (Next milestone today)",
                        status: "Approved"
                    }
                },
                {
                    id: 'veridian', name: 'Veridian AI', founder: 'Dr. Elena Rostova', location: 'Seattle',
                    sector: 'ClimateTech', stage: 'Seed', ask: '$2.0M SAFE', revenue: '$12k MRR',
                    match: 91, kyc: 'KYC Verified', thesis: 'AI-driven crop yield optimization using high-resolution hyperspectral satellite imagery.',
                    evidence: 'Working with 3 major cooperative farms in Washington state, increasing yield by 14%.',
                    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '02:10', viewed: 'Not watched', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "Direct Climate & Agriculture Match",
                        thesis: "AI optimization for agriculture fits resource efficiency thesis",
                        stage: "Perfect Seed stage match",
                        geography: "US Pacific Northwest fits North American mandate",
                        ticketSize: "$2.0M Ask fits check size policy ($1M-$3M)",
                        traction: "Pilot revenue meets minimum Seed threshold"
                    },
                    growth: "19% MoM",
                    roundTarget: "$2.0M ($1.0M committed)",
                    verification: "Founder Verified",
                    videoStats: "Not watched",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Veridian_Deck_Seed.pdf", size: "3.2 MB", uploaded: "3d ago", state: "unlocked" },
                        { name: "Financial_Forecast_v1.xlsx", size: "1.4 MB", uploaded: "2d ago", state: "locked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Decision target: July 15",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "2 days ago" }
                    ],
                    nextAction: "Request access to Financial Forecast",
                    businessModel: "SaaS (Annual Contracts)",
                    pilots: "3 Cooperative Farms",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["Financial Forecast"],
                        staleDocs: [],
                        totalExpected: 2
                    },
                    convictionScore: 7,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 25, 2026 02:00 PM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Mike Operations",
                        slaCountdown: "Active (36h remaining)",
                        status: "Pending review"
                    }
                },
                {
                    id: 'nova', name: 'Nova Health', founder: 'Dr. Marcus Vance', location: 'Chicago',
                    sector: 'HealthTech', stage: 'Series A', ask: '$5.0M Equity', revenue: '$90k MRR',
                    match: 95, kyc: 'KYC Verified', thesis: 'Automated intake screening and triage utilizing clinical conversational models.',
                    evidence: 'Integrated with 5 regional health networks, reducing clinic waiting times by 35%.',
                    thumb: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '03:05', viewed: 'Watched 1m', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "Premium HealthTech Target",
                        thesis: "Clinical triage models match workflow automation thesis",
                        stage: "Perfect Series A match",
                        geography: "Midwest hub fits national scope policy",
                        ticketSize: "$5M Ask fits check size policy ($3M-$8M)",
                        traction: "$1.1M ARR meets Series A threshold"
                    },
                    growth: "25% MoM",
                    roundTarget: "$5.0M ($3.2M committed)",
                    verification: "Fully Audited",
                    videoStats: "Watched 1m (33%)",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Nova_SeriesA_Deck.pdf", size: "4.1 MB", uploaded: "4d ago", state: "unlocked" },
                        { name: "HIPAA_Compliance_Report.pdf", size: "2.8 MB", uploaded: "2d ago", state: "locked" },
                        { name: "Cap_Table_Current.pdf", size: "1.2 MB", uploaded: "1d ago", state: "locked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Decision target: July 8",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "3 days ago" }
                    ],
                    nextAction: "Request HIPAA & Cap Table access",
                    businessModel: "SaaS per Practitioner",
                    pilots: "5 Health Networks",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["HIPAA Compliance Report", "Cap Table Current"],
                        staleDocs: [],
                        totalExpected: 3
                    },
                    convictionScore: 8,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 24, 2026 10:30 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Sarah Compliance",
                        slaCountdown: "Active (48h remaining)",
                        status: "Pending verification"
                    }
                },
                {
                    id: 'cyberdyne', name: 'Cyberdyne Systems', founder: 'Miles Dyson', location: 'Austin',
                    sector: 'Cybersecurity', stage: 'Seed', ask: '$1.8M Equity', revenue: '$15k MRR',
                    match: 89, kyc: 'KYC Verified', thesis: 'Decentralized zero-trust key management networks for Edge computing networks.',
                    evidence: 'Working with 10 early design partners in defense and industrial manufacturing.',
                    thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '01:50', viewed: 'Not watched', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "High-Priority Security Target",
                        thesis: "Zero-trust edge management aligns with security infrastructure thesis",
                        stage: "Perfect Seed match",
                        geography: "Austin fits US South/Texas mandate",
                        ticketSize: "$1.8M Ask fits check size policy ($1M-$3M)",
                        traction: "$15k MRR meets minimum requirements"
                    },
                    growth: "15% MoM",
                    roundTarget: "$1.8M ($1.0M committed)",
                    verification: "Founder Verified",
                    videoStats: "Not watched",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Cyberdyne_KeyManager_Deck.pdf", size: "2.1 MB", uploaded: "5d ago", state: "unlocked" },
                        { name: "Security_Architecture_v2.pdf", size: "3.5 MB", uploaded: "2d ago", state: "locked" }
                    ],
                    responsiveness: "Medium (response < 24h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Decision target: July 20",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "5 days ago" }
                    ],
                    nextAction: "Request Security Architecture spec",
                    businessModel: "Developer Licensing (API)",
                    pilots: "10 Design Partners",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["Security Architecture v2"],
                        staleDocs: [],
                        totalExpected: 2
                    },
                    convictionScore: 6,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 22, 2026 04:00 PM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Mike Operations",
                        slaCountdown: "Active (72h remaining)",
                        status: "Pending review"
                    }
                },
                {
                    id: 'starlight', name: 'Starlight Solar', founder: 'Hannah Arendt', location: 'Munich',
                    sector: 'ClimateTech', stage: 'Series A', ask: '$8.0M Equity', revenue: '$210k ARR',
                    match: 93, kyc: 'Verified', thesis: 'High-efficiency thin-film solar coatings for industrial warehouse facades.',
                    evidence: 'First pilot coating applied to a 10,000 sqm logistics center in Bavaria.',
                    thumb: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '02:40', viewed: 'Not watched', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "Strong Climate/DeepTech Match",
                        thesis: "Industrial solar coatings align with carbon reduction mandate",
                        stage: "Series A matches mandate",
                        geography: "Munich fits EU expansion sandbox",
                        ticketSize: "$8.0M Ask fits check size policy ($3M-$8M)",
                        traction: "ARR matches minimum threshold for hardware-enabled ClimateTech"
                    },
                    growth: "20% MoM",
                    roundTarget: "$8.0M ($4.5M committed)",
                    verification: "Fully Audited",
                    videoStats: "Not watched",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Starlight_Solar_Deck.pdf", size: "3.8 MB", uploaded: "6d ago", state: "unlocked" },
                        { name: "Bavaria_Pilot_Report.pdf", size: "4.2 MB", uploaded: "3d ago", state: "locked" },
                        { name: "Patent_Portfolio.pdf", size: "1.9 MB", uploaded: "5d ago", state: "locked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Decision target: July 12",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "6 days ago" }
                    ],
                    nextAction: "Request Pilot Report & Patents access",
                    businessModel: "B2B Coating Services + Licensing",
                    pilots: "1 Industrial Logistics Hub",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["Bavaria Pilot Report", "Patent Portfolio"],
                        staleDocs: [],
                        totalExpected: 3
                    },
                    convictionScore: 8,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 21, 2026 09:00 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Sarah Compliance",
                        slaCountdown: "Active (24h remaining)",
                        status: "Pending verification"
                    }
                },
                {
                    id: 'finflow', name: 'Finflow', founder: 'Linus Tan', location: 'Singapore',
                    sector: 'FinTech', stage: 'Seed', ask: '$1.2M SAFE', revenue: '$8k MRR',
                    match: 87, kyc: 'KYC Verified', thesis: 'Multi-currency cross-border settlement rails for Southeast Asian SMEs.',
                    evidence: '50 active SME merchants routing $500k monthly transaction volume.',
                    thumb: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '01:30', viewed: 'Not watched', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "APAC FinTech Match",
                        thesis: "SME cross-border payment rails fit trade settlement thesis",
                        stage: "Perfect Seed match",
                        geography: "Singapore hub fits Southeast Asia sandbox mandate",
                        ticketSize: "$1.2M SAFE Ask fits check size policy ($1M-$3M)",
                        traction: "Volume metrics exceed expectations for MVP stage"
                    },
                    growth: "28% MoM",
                    roundTarget: "$1.2M ($700k committed)",
                    verification: "Founder Verified",
                    videoStats: "Not watched",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Finflow_APAC_Deck.pdf", size: "2.5 MB", uploaded: "4d ago", state: "unlocked" },
                        { name: "MAS_Regulatory_Compliance.pdf", size: "3.1 MB", uploaded: "3d ago", state: "locked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Decision target: July 22",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "4 days ago" }
                    ],
                    nextAction: "Request MAS Compliance report",
                    businessModel: "Transaction Take-Rate (0.5%)",
                    pilots: "50 SME Merchants",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["MAS Regulatory Compliance"],
                        staleDocs: [],
                        totalExpected: 2
                    },
                    convictionScore: 7,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 23, 2026 11:00 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Mike Operations",
                        slaCountdown: "Active (48h remaining)",
                        status: "Pending review"
                    }
                },
                {
                    id: 'zenith', name: 'Zenith SaaS', founder: 'Robert Chen', location: 'San Francisco',
                    sector: 'SaaS', stage: 'Series A', ask: '$4.5M Equity', revenue: '$110k MRR',
                    match: 94, kyc: 'KYC Verified', thesis: 'Collaborative AI workspace for corporate legal teams to co-draft complex contracts.',
                    evidence: 'Active trials in 15 top-tier US corporate law firms.',
                    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    dur: '02:25', viewed: 'Not watched', status: 'discover', updates: [],
                    whyMatch: {
                        mandateFit: "Premium Enterprise SaaS Fit",
                        thesis: "AI workspace for corporate legal fits enterprise workflow thesis",
                        stage: "Perfect Series A match",
                        geography: "Silicon Valley matches North America mandate",
                        ticketSize: "$4.5M Ask fits check size policy ($3M-$8M)",
                        traction: "$1.3M ARR meets Series A scale threshold"
                    },
                    growth: "21% MoM",
                    roundTarget: "$4.5M ($2.5M committed)",
                    verification: "Founder Verified",
                    videoStats: "Not watched",
                    vaultState: "locked",
                    vdrFiles: [
                        { name: "Zenith_SeriesA_Deck.pdf", size: "3.4 MB", uploaded: "5d ago", state: "unlocked" },
                        { name: "Financial_Model_Zenith.xlsx", size: "2.5 MB", uploaded: "3d ago", state: "locked" },
                        { name: "Security_Audit_SOC2.pdf", size: "1.8 MB", uploaded: "2d ago", state: "locked" }
                    ],
                    responsiveness: "High (response < 12h)",
                    diligenceBlockers: [],
                    decisionTimeline: "Decision target: July 10",
                    crmActivity: [
                        { event: "Deal matched via mandate", user: "System", date: "5 days ago" }
                    ],
                    nextAction: "Request access to SOC2 & Financial Model",
                    businessModel: "SaaS Subscription (Per Seat)",
                    pilots: "15 Corporate Law Firms",
                    diligenceMetrics: {
                        completedReviews: 1,
                        missingFiles: ["Financial Model Zenith", "Security Audit SOC2"],
                        staleDocs: [],
                        totalExpected: 3
                    },
                    convictionScore: 8,
                    stageHistory: [
                        { stage: "Sourced", timestamp: "May 22, 2026 09:15 AM", done: true },
                        { stage: "Intro Call Scheduled", timestamp: "--", done: false },
                        { stage: "Diligence / VDR Review", timestamp: "--", done: false }
                    ],
                    adminHandoff: {
                        assignedAdmin: "Mike Operations",
                        slaCountdown: "Active (24h remaining)",
                        status: "Pending review"
                    }
                }
            ]
        };

        this.setupGlobalListeners();
        this.render();
    }

    setupGlobalListeners() {
        // Sidebar Toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.state.navCollapsed = !this.state.navCollapsed;
            const layout = document.getElementById('mainLayout');
            if (this.state.navCollapsed) layout.classList.add('collapsed-nav');
            else layout.classList.remove('collapsed-nav');
        });

        // Mandate Chips Toggle
        document.querySelectorAll('.mandate-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('active');
            });
        });

        // Command Palette Cmd+K
        const overlay = document.getElementById('cmdOverlay');
        const input = document.getElementById('cmdInput');
        const cmdResults = document.getElementById('cmdResults');
        const openCmd = () => { overlay.classList.add('active'); input.focus(); };
        const closeCmd = () => { overlay.classList.remove('active'); input.value = ''; };

        const searchWrapper = document.getElementById('searchWrapper');
        const searchTriggerBtn = document.getElementById('searchTriggerBtn');
        const topSearchInput = document.getElementById('topSearchInput');

        searchTriggerBtn.addEventListener('click', () => {
            searchWrapper.classList.toggle('open');
            if (searchWrapper.classList.contains('open')) topSearchInput.focus();
        });
        
        topSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchWrapper.classList.remove('open');
                topSearchInput.value = '';
                openCmd();
            }
        });
        
        topSearchInput.addEventListener('blur', () => {
            if (topSearchInput.value === '') searchWrapper.classList.remove('open');
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCmd(); });
        
        // Command Palette Input Search logic
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                cmdResults.innerHTML = `
                    <div style="padding: 8px 24px; font-size: 0.75rem; font-weight: 600; color: var(--inv-text-secondary); text-transform: uppercase;">Recent Searches</div>
                    <div class="cmd-res-item" data-tab="deals" data-id="stripe"><span class="icon">🏢</span><div><div class="font-semibold">Stripe Financials Q4</div><div class="text-xs text-muted">Portfolio > Document Room</div></div></div>
                    <div class="cmd-res-item" data-tab="deals" data-id="omega"><span class="icon">👤</span><div><div class="font-semibold">Sarah K. (Omega Shield)</div><div class="text-xs text-muted">Founder Profile</div></div></div>
                    <div class="cmd-res-item" data-tab="insights"><span class="icon">📈</span><div><div class="font-semibold">LatAm SaaS Trends 2026</div><div class="text-xs text-muted">Insights > Sector Analysis</div></div></div>
                `;
                return;
            }

            const items = [
                { title: 'Stripe', sub: 'Portfolio > Scale Performance', type: 'portfolio', tab: 'portfolio', icon: '🏢' },
                { title: 'SpaceX', sub: 'Portfolio > DeepTech', type: 'portfolio', tab: 'portfolio', icon: '🚀' },
                { title: 'Nexus Health', sub: 'Active Deal > HealthTech', type: 'deals', tab: 'deals', id: 'nexus', icon: '📁' },
                { title: 'AeroSpace Logix', sub: 'Active Deal > FinTech', type: 'deals', tab: 'deals', id: 'acme', icon: '📁' },
                { title: 'SynthOS', sub: 'Active Deal > SaaS', type: 'deals', tab: 'deals', id: 'synth', icon: '📁' },
                { title: 'Aurora Climate', sub: 'Watchlist > ClimateTech', type: 'watchlist', tab: 'watchlist', icon: '⭐' },
                { title: 'Meetings & Interactions', sub: 'Operations Calendar', type: 'meetings', tab: 'meetings', icon: '📅' },
                { title: 'Insights & Analytics', sub: 'Operations Insights', type: 'insights', tab: 'insights', icon: '📈' }
            ];

            const filtered = items.filter(it => it.title.toLowerCase().includes(query) || it.sub.toLowerCase().includes(query));

            if (filtered.length === 0) {
                cmdResults.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--inv-text-secondary); font-size: 0.875rem;">No results found for "${query}"</div>`;
            } else {
                cmdResults.innerHTML = filtered.map((it, idx) => `
                    <div class="cmd-res-item ${idx === 0 ? 'selected' : ''}" data-tab="${it.tab}" data-id="${it.id || ''}" style="display: flex; align-items: center; gap: 16px; padding: 12px 24px; cursor: pointer; transition: background 0.2s;">
                        <span class="icon" style="font-size: 1.25rem;">${it.icon}</span>
                        <div>
                            <div class="font-semibold" style="color: var(--inv-text-primary);">${it.title}</div>
                            <div class="text-xs text-muted">${it.sub}</div>
                        </div>
                    </div>
                `).join('');
            }
        });

        // Add selection and keyboard navigation
        let activeIndex = 0;
        input.addEventListener('keydown', (e) => {
            const items = cmdResults.querySelectorAll('.cmd-res-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[activeIndex].classList.remove('selected');
                activeIndex = (activeIndex + 1) % items.length;
                items[activeIndex].classList.add('selected');
                items[activeIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[activeIndex].classList.remove('selected');
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                items[activeIndex].classList.add('selected');
                items[activeIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selected = items[activeIndex];
                if (selected) {
                    const tab = selected.dataset.tab;
                    const id = selected.dataset.id;
                    this.state.activeTab = tab;
                    if (id) this.state.selectedDealId = id;
                    closeCmd();
                    this.render();
                }
            }
        });

        cmdResults.addEventListener('click', (e) => {
            const item = e.target.closest('.cmd-res-item');
            if (item) {
                const tab = item.dataset.tab;
                const id = item.dataset.id;
                this.state.activeTab = tab;
                if (id) this.state.selectedDealId = id;
                closeCmd();
                this.render();
            }
        });

        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                overlay.classList.contains('active') ? closeCmd() : openCmd();
            }
            if (e.key === 'Escape') closeCmd();
        });

        // Notifications Toggle
        const bellBtn = document.getElementById('bellBtn');
        const notifDropdown = document.getElementById('notifDropdown');
        bellBtn.addEventListener('click', (e) => {
            notifDropdown.classList.toggle('active');
            avatarDropdown.classList.remove('active');
            e.stopPropagation();
        });
        
        // Avatar Toggle
        const avatarBtn = document.getElementById('avatarBtn');
        const avatarDropdown = document.getElementById('avatarDropdown');
        avatarBtn.addEventListener('click', (e) => {
            avatarDropdown.classList.toggle('active');
            notifDropdown.classList.remove('active');
            e.stopPropagation();
        });

        // Interactive behavior for avatar dropdown menu items
        const avatarDropdownItems = document.querySelectorAll('#avatarDropdown .notif-item');
        avatarDropdownItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                const text = e.currentTarget.textContent;
                if (text.includes('Log Out')) {
                    this.showToast('Logging out...');
                    setTimeout(() => {
                        window.location.hash = '#/login';
                        window.location.reload();
                    }, 500);
                } else {
                    this.showToast(`Navigating to ${text.trim()}...`);
                }
                avatarDropdown.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!bellBtn.contains(e.target)) notifDropdown.classList.remove('active');
            if (!avatarBtn.contains(e.target)) avatarDropdown.classList.remove('active');
        });

        // Filter Sidebar controls
        const filterOverlay = document.getElementById('filterSidebarOverlay');
        const filterSector = document.getElementById('filterSector');
        const filterStage = document.getElementById('filterStage');
        const filterRevenue = document.getElementById('filterRevenue');
        const filterCheckSize = document.getElementById('filterCheckSize');
        const filterReadiness = document.getElementById('filterReadiness');

        const openFilters = () => {
            filterSector.value = this.state.filters.sector;
            filterStage.value = this.state.filters.stage;
            filterRevenue.value = this.state.filters.revenue;
            filterCheckSize.value = this.state.filters.checkSize;
            filterReadiness.value = this.state.filters.readiness;
            filterOverlay.classList.add('active');
        };

        const closeFilters = () => {
            filterOverlay.classList.remove('active');
        };

        document.getElementById('closeFiltersBtn').addEventListener('click', closeFilters);
        filterOverlay.addEventListener('click', (e) => {
            if (e.target === filterOverlay) closeFilters();
        });

        document.getElementById('applyFiltersBtn').addEventListener('click', () => {
            this.state.filters.sector = filterSector.value;
            this.state.filters.stage = filterStage.value;
            this.state.filters.revenue = filterRevenue.value;
            this.state.filters.checkSize = filterCheckSize.value;
            this.state.filters.readiness = filterReadiness.value;
            closeFilters();
            this.saveStateToLocalStorage();
            this.render();
        });

        document.getElementById('resetFiltersBtn').addEventListener('click', () => {
            this.state.filters = {
                sector: 'All',
                stage: 'All',
                revenue: 'All',
                checkSize: 'All',
                readiness: 'All'
            };
            closeFilters();
            this.saveStateToLocalStorage();
            this.render();
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.closest('#openFiltersBtn') || e.target.closest('.discover-filters-trigger')) {
                openFilters();
            }
            if (e.target.classList.contains('filter-chip-remove')) {
                const key = e.target.dataset.key;
                this.state.filters[key] = 'All';
                this.saveStateToLocalStorage();
                this.render();
            }
            // Save memo note
            if (e.target.id === 'saveMemoBtn') {
                const dealId = e.target.dataset.id;
                const deal = this.state.deals.find(d => d.id === dealId);
                const txt = document.getElementById('memoTextarea');
                if (deal && txt) {
                    deal.internalNotes = txt.value;
                    deal.crmActivity.unshift({
                        event: "Updated Internal Notes",
                        user: "Jane Sterling (Investor)",
                        date: "Just now"
                    });
                    this.showToast(`Internal notes saved for ${deal.name}.`);
                    this.saveStateToLocalStorage();
                    this.render();
                }
            }
            // Toggle match score drilldown
            const drilldownTrigger = e.target.closest('.match-drilldown-trigger');
            if (drilldownTrigger) {
                e.stopPropagation();
                const dealId = drilldownTrigger.dataset.id;
                const drilldownContainer = document.getElementById(`drilldown-${dealId}`);
                if (drilldownContainer) {
                    const isCollapsed = drilldownContainer.style.display === 'none';
                    drilldownContainer.style.display = isCollapsed ? 'block' : 'none';
                    const arrow = drilldownTrigger.querySelector('.arrow-indicator');
                    if (arrow) {
                        arrow.textContent = isCollapsed ? 'â–²' : 'â–¼';
                    }
                }
            }
            // Update conviction score
            const convictionBtn = e.target.closest('.conviction-btn');
            if (convictionBtn) {
                const dealId = convictionBtn.dataset.id;
                const score = parseInt(convictionBtn.dataset.score);
                const deal = this.state.deals.find(d => d.id === dealId);
                if (deal) {
                    deal.convictionScore = score;
                    deal.crmActivity.unshift({
                        event: `Updated Conviction Score to ${score}/10`,
                        user: "Jane Sterling (Investor)",
                        date: "Just now"
                    });
                    this.showToast(`Conviction score updated to ${score}/10.`);
                    this.saveStateToLocalStorage();
                    this.render();
                }
            }
            // Nudge Coordinator
            const nudgeCoordBtn = e.target.closest('.nudge-coordinator-btn');
            if (nudgeCoordBtn) {
                const dealId = nudgeCoordBtn.dataset.id;
                const deal = this.state.deals.find(d => d.id === dealId);
                if (deal) {
                    const coordinator = deal.adminHandoff?.assignedAdmin || 'Sarah Compliance';
                    deal.crmActivity.unshift({
                        event: `Nudge Coordinator sent to ${coordinator}`,
                        user: "Jane Sterling (Investor)",
                        date: "Just now"
                    });
                    this.showToast(`Sent nudge reminder to ${coordinator}.`);
                    this.saveStateToLocalStorage();
                    this.render();
                }
            }
            // Click VDR file locked
            if (e.target.closest('.vdr-file-locked')) {
                const item = e.target.closest('.vdr-file-locked');
                const dealId = item.dataset.dealId;
                this.handleAction('request-vdr', dealId);
            }
            // Click VDR open file link
            if (e.target.closest('.vdr-file-link')) {
                const item = e.target.closest('.vdr-file-link');
                const name = item.dataset.name;
                this.showToast(`Downloading file: ${name}...`);
            }
            // Request custom document dialog simulation
            if (e.target.id === 'requestCustomDocBtn') {
                const dealId = e.target.dataset.id;
                const deal = this.state.deals.find(d => d.id === dealId);
                const docName = prompt("Enter the name of the custom document you wish to request (e.g., Tax Audits Q1):", "Tax Audits Q1");
                if (docName) {
                    deal.vdrFiles.push({
                        name: docName,
                        size: "Pending upload",
                        uploaded: "Requested just now",
                        state: "requested"
                    });
                    deal.crmActivity.unshift({
                        event: `Requested Custom Doc: ${docName}`,
                        user: "Jane Sterling (Investor)",
                        date: "Just now"
                    });
                    this.showToast(`Custom document "${docName}" requested from founder.`, 'warning');
                    this.saveStateToLocalStorage();
                    this.render();
                }
            }
            // Click metric card trigger
            const metricTrigger = e.target.closest('.metric-card-trigger');
            if (metricTrigger) {
                const tab = metricTrigger.dataset.tab;
                this.state.activeTab = tab;
                // Auto-select logic
                if (['discover', 'watchlist', 'deals'].includes(tab)) {
                    const validDeals = this.getDealsForTab(tab);
                    if (validDeals.length > 0 && !validDeals.find(d => d.id === this.state.selectedDealId)) {
                        this.state.selectedDealId = validDeals[0].id;
                    }
                }
                this.render();
            }

            // Edit Mandates settings toggle
            if (e.target.id === 'editMandateBtn') {
                const mandates = this.state.account.mandates;
                const list = mandates.map(m => `${m.name} (${m.active ? 'Active' : 'Inactive'})`).join('\n');
                const newName = prompt(`Active Mandates:\n${list}\n\nEnter a sector name to toggle (FinTech, AI/ML, HealthTech):`, "HealthTech");
                if (newName) {
                    const found = mandates.find(m => m.name.toLowerCase() === newName.toLowerCase());
                    if (found) {
                        found.active = !found.active;
                        this.showToast(`Toggled ${found.name} mandate state.`);
                    } else {
                        mandates.push({ name: newName, active: true });
                        this.showToast(`Added new mandate sector: ${newName}`);
                    }
                    this.saveStateToLocalStorage();
                    this.render();
                }
            }

            // Home Sourcing Sector toggle buttons
            const sectorBtn = e.target.closest('[data-sector]');
            if (sectorBtn && this.state.activeTab === 'home') {
                const sec = sectorBtn.dataset.sector;
                this.state.homeFilterSector = sec;
                this.saveStateToLocalStorage();
                this.render();
            }
        });
    }

    // --- 2. CORE RENDER ENGINE ---
    render() {
        try {
            this.renderNav();
            const main = document.getElementById('dynamicContent');
            const rail = document.getElementById('rightRail');
            const layout = document.getElementById('mainLayout');

            main.innerHTML = '';
            rail.innerHTML = '';
            
            const noRailTabs = ['home', 'portfolio', 'insights', 'meetings'];
            if (noRailTabs.includes(this.state.activeTab)) {
                layout.classList.add('no-rail');
                rail.style.display = 'none';
            } else {
                layout.classList.remove('no-rail');
                rail.style.display = 'flex';
            }

            if (this.state.activeTab === 'home') {
                main.innerHTML = this.getHomeHtml();
            } else if (this.state.activeTab === 'discover') {
                main.innerHTML = this.getDiscoverHtml();
                rail.innerHTML = this.getRightRailHtml();
                this.attachDiscoverListeners();
            } else if (this.state.activeTab === 'watchlist') {
                main.innerHTML = this.getWatchlistHtml();
                rail.innerHTML = this.getRightRailHtml();
                this.attachListListeners();
                        } else if (this.state.activeTab === 'deals') {
                main.innerHTML = this.getKanbanHtml();
                rail.innerHTML = this.getRightRailHtml();
                this.attachListListeners();
            } else if (this.state.activeTab === 'vdr') {
                main.innerHTML = this.getVdrHtml();
                if (this.attachVdrListeners) this.attachVdrListeners();
            } else if (this.state.activeTab === 'portfolio') {
                main.innerHTML = this.getPortfolioHtml();
            } else if (this.state.activeTab === 'insights') {
                main.innerHTML = this.getInsightsHtml();
            } else if (this.state.activeTab === 'meetings') {
                main.innerHTML = this.getMeetingsHtml();
                this.attachMeetingsListeners();
            }
        } catch (e) {
            console.error("Render error in InvestorDashboardView:", e);
            const main = document.getElementById('dynamicContent');
            if (main) {
                main.innerHTML = `
                    <div style="padding: 32px; color: var(--inv-error); background: rgba(239, 68, 68, 0.05); border: 1px solid var(--inv-error); border-radius: 8px; margin: 32px;">
                        <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px;">Failed to render view</h2>
                        <p style="font-size: 0.875rem; margin-bottom: 16px;">An error occurred while loading this tab. You can try resetting the application state.</p>
                        <pre style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; overflow-x: auto; font-family: monospace; font-size: 0.75rem;">${e.stack || e.message}</pre>
                        <button class="btn btn-primary btn-sm" onclick="localStorage.removeItem('investor_dashboard_state'); location.reload();" style="margin-top: 16px;">Reset Application State</button>
                    </div>
                `;
            }
        }
    }

    renderNav() {
        const counts = {
            discover: this.state.deals.filter(d => d.status === 'discover').length,
            watchlist: this.state.deals.filter(d => d.status === 'watchlist').length,
            deals: this.state.deals.filter(d => ['interest_sent', 'intro_review', 'diligence'].includes(d.status)).length,
            diligence: this.state.deals.filter(d => d.status === 'diligence').length,
            meetings: this.state.meetings.filter(m => m.status === 'pending' || m.status === 'confirmed').length
        };

        const navHtml = `
            <div class="inv-nav-btn ${this.state.activeTab === 'home' ? 'active' : ''}" data-tab="home">
                <span><span class="nav-icon">${this.getIcon('HOME')}</span>Home</span>
            </div>
            
            <div class="nav-section" style="padding-top: 12px; border-top: 1px solid var(--inv-divider); margin-top: 12px;">Opportunity Flow</div>
            <div class="inv-nav-btn ${this.state.activeTab === 'discover' ? 'active' : ''}" data-tab="discover">
                <span><span class="nav-icon">${this.getIcon('DISCOVER')}</span>Discover</span> ${counts.discover > 0 ? `<span class="nav-badge" style="background: var(--brand-secondary-soft); color: var(--inv-accent); font-weight: 700;">${counts.discover}</span>` : ''}
            </div>
            <div class="inv-nav-btn ${this.state.activeTab === 'watchlist' ? 'active' : ''}" data-tab="watchlist">
                <span><span class="nav-icon">${this.getIcon('WATCHLIST')}</span>Watchlist</span> ${counts.watchlist > 0 ? `<span class="nav-badge">${counts.watchlist}</span>` : ''}
            </div>
            <div class="inv-nav-btn ${this.state.activeTab === 'deals' && this.state.dealsFilterStage !== 'diligence' ? 'active' : ''}" data-tab="deals">
                <span><span class="nav-icon">${this.getIcon('DEALS')}</span>Active Deals</span> ${counts.deals > 0 ? `<span class="nav-badge">${counts.deals}</span>` : ''}
            </div>
            
            <div class="nav-section" style="padding-top: 12px; border-top: 1px solid var(--inv-divider); margin-top: 12px;">Operations</div>
            <div class="inv-nav-btn ${this.state.activeTab === 'deals' && this.state.dealsFilterStage === 'diligence' ? 'active' : ''}" data-tab="deals" data-stage="diligence">
                <span><span class="nav-icon">${this.getIcon('VDR')}</span>Diligence (VDR)</span> ${counts.diligence > 0 ? `<span class="nav-badge" style="background: rgba(245, 158, 11, 0.1); color: var(--inv-warning); font-weight: 700;">${counts.diligence}</span>` : ''}
            </div>
            <div class="inv-nav-btn ${this.state.activeTab === 'meetings' ? 'active' : ''}" data-tab="meetings">
                <span><span class="nav-icon">${this.getIcon('MEETINGS')}</span>Meetings</span> ${counts.meetings > 0 ? `<span class="nav-badge" style="background: var(--brand-secondary-soft); color: var(--inv-accent); font-weight: 700;">${counts.meetings}</span>` : ''}
            </div>
            <div class="inv-nav-btn ${this.state.activeTab === 'portfolio' ? 'active' : ''}" data-tab="portfolio">
                <span><span class="nav-icon">${this.getIcon('PORTFOLIO')}</span>Portfolio</span>
            </div>
            <div class="inv-nav-btn ${this.state.activeTab === 'insights' ? 'active' : ''}" data-tab="insights">
                <span><span class="nav-icon">${this.getIcon('INSIGHTS')}</span>Insights</span>
            </div>
        `;
        document.getElementById('navContainer').innerHTML = navHtml;

        document.querySelectorAll('.inv-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.state.activeTab = e.currentTarget.dataset.tab;
                if (e.currentTarget.dataset.stage) {
                    this.state.dealsFilterStage = e.currentTarget.dataset.stage;
                } else {
                    this.state.dealsFilterStage = null;
                }
                // Auto-select logic
                if (['discover', 'watchlist', 'deals'].includes(this.state.activeTab)) {
                    const validDeals = this.getDealsForTab(this.state.activeTab);
                    if (validDeals.length > 0 && !validDeals.find(d => d.id === this.state.selectedDealId)) {
                        this.state.selectedDealId = validDeals[0].id;
                    }
                }
                this.render();
            });
        });
    }

    getDealsForTab(tab) {
        if (tab === 'discover') return this.state.deals.filter(d => d.status === 'discover');
        if (tab === 'watchlist') return this.state.deals.filter(d => d.status === 'watchlist');
        if (tab === 'deals') return this.state.deals.filter(d => ['interest_sent', 'intro_review', 'diligence'].includes(d.status));
        return [];
    }

    getSortOrderLabel(sortOrder) {
        if (sortOrder === 'best_match') return 'Sort: Best Match';
        if (sortOrder === 'conviction') return 'Sort: Highest Conviction';
        if (sortOrder === 'ask_low') return 'Sort: Check Size (Low to High)';
        if (sortOrder === 'ask_high') return 'Sort: Check Size (High to Low)';
        if (sortOrder === 'growth') return 'Sort: Highest Growth';
        return 'Sort: Best Match';
    }

    // --- 3. VIEW TEMPLATES ---

    getVdrHtml() {
        const deal = this.state.deals.find(d => d.id === this.state.selectedDealId);
        if (!deal) {
            return `
                <div class="view-header" style="margin-bottom: 24px;">
                    <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--inv-text-primary);">Data Room (VDR)</h1>
                    <p class="text-sm text-muted mt-1">Select a deal to view its data room.</p>
                </div>
            `;
        }

        const auditLogs = [
            { user: 'Jane Sterling', action: 'Downloaded', doc: 'Q2_Financials.xlsx', time: '10 mins ago' },
            { user: 'Mike Operations', action: 'Viewed', doc: 'Cap_Table.pdf', time: '2 hours ago' },
            { user: 'Founder (System)', action: 'Uploaded', doc: 'HIPAA_Compliance.pdf', time: '1 day ago' }
        ];

        const permissions = [
            { user: 'Jane Sterling (You)', role: 'Admin', access: 'Full Access' },
            { user: 'Mike Operations', role: 'Analyst', access: 'View Only' },
            { user: 'Legal Counsel', role: 'External', access: 'Revoked' }
        ];

        return `
            <div class="view-header flex justify-between items-center" style="margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--inv-text-primary);">Data Room: ${deal.name}</h1>
                    <p class="text-sm text-muted mt-1">Manage permissions, view audit logs, and review sensitive documents.</p>
                </div>
                <button class="btn btn-outline btn-sm action-btn" data-action="back-to-deals" style="border-color: var(--inv-divider);">â† Back to Deals</button>
            </div>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; padding-bottom: 32px;">
                <!-- Main VDR Content -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    
                    <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 16px; align-items: center;">
                            <h3 class="font-semibold" style="font-size: 1rem; color: var(--inv-text-primary);">ðŸ“ Document Repository</h3>
                            <button class="btn btn-primary btn-sm action-btn" data-action="vdr-request-doc">Request Document</button>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${(deal.vdrFiles || []).map(f => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); border-radius: 6px;">
                                    <div style="display: flex; gap: 12px; align-items: center;">
                                        <div style="font-size: 1.5rem;">${f.name.endsWith('.pdf') ? 'ðŸ“„' : 'ðŸ“Š'}</div>
                                        <div>
                                            <div style="font-weight: 600; color: var(--inv-text-primary); font-size: 0.85rem;">${f.name}</div>
                                            <div style="font-size: 0.7rem; color: var(--inv-text-secondary);">${f.state === 'unlocked' ? 'âœ… Verified' : 'âš ï¸ Missing / Stale'}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-outline btn-xs action-btn" data-action="vdr-view" data-file="${f.name}" style="padding: 4px 8px; font-size: 0.7rem;">View</button>
                                    </div>
                                </div>
                            `).join('')}
                            ${(!deal.vdrFiles || deal.vdrFiles.length === 0) ? `<div class="text-muted text-sm text-center py-4">No documents available.</div>` : ''}
                        </div>
                    </div>

                    <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                        <h3 class="font-semibold mb-4" style="font-size: 1rem; color: var(--inv-text-primary);">ðŸ“œ Audit Logs</h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--inv-divider); color: var(--inv-text-secondary);">
                                    <th style="padding: 8px 4px;">User</th>
                                    <th style="padding: 8px 4px;">Action</th>
                                    <th style="padding: 8px 4px;">Document</th>
                                    <th style="padding: 8px 4px;">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${auditLogs.map(log => `
                                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                        <td style="padding: 10px 4px; color: var(--inv-text-primary); font-weight: 500;">${log.user}</td>
                                        <td style="padding: 10px 4px;">
                                            <span style="background: ${log.action === 'Downloaded' ? 'rgba(59,130,246,0.1)' : log.action === 'Uploaded' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)'}; color: ${log.action === 'Downloaded' ? '#3b82f6' : log.action === 'Uploaded' ? '#10b981' : 'var(--inv-text-secondary)'}; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">
                                                ${log.action}
                                            </span>
                                        </td>
                                        <td style="padding: 10px 4px; color: var(--inv-text-secondary);">${log.doc}</td>
                                        <td style="padding: 10px 4px; color: var(--inv-text-secondary); font-size: 0.7rem;">${log.time}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Right Rail: Permissions -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 16px; align-items: center;">
                            <h3 class="font-semibold" style="font-size: 1rem; color: var(--inv-text-primary);">ðŸ” Permissions</h3>
                            <button class="btn btn-outline btn-sm action-btn" data-action="vdr-invite">Invite</button>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${permissions.map(p => `
                                <div style="display: flex; flex-direction: column; gap: 4px; padding-bottom: 12px; border-bottom: 1px dashed var(--inv-divider);">
                                    <div style="display: flex; justify-content: space-between;">
                                        <span style="font-weight: 600; color: var(--inv-text-primary); font-size: 0.85rem;">${p.user}</span>
                                        <span style="font-size: 0.7rem; color: var(--inv-text-secondary);">${p.role}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 0.75rem; color: ${p.access === 'Revoked' ? 'var(--inv-error)' : 'var(--inv-success)'};">${p.access}</span>
                                        <button class="btn btn-outline btn-xs action-btn" data-action="vdr-edit-perm" style="padding: 2px 6px; font-size: 0.65rem; border-color: var(--inv-divider);">Edit</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="margin-top: 16px;">
                            <button class="btn btn-outline action-btn" data-action="vdr-revoke-all" style="width: 100%; color: var(--inv-error); border-color: rgba(239, 68, 68, 0.3); font-size: 0.75rem;">Revoke External Access</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachVdrListeners() {
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                if (action === 'back-to-deals') {
                    this.state.activeTab = 'vdr';
                    this.saveStateToLocalStorage();
                    this.render();
                } else if (action === 'vdr-revoke-all') {
                    if(confirm("Are you sure you want to revoke all external access?")) {
                        this.showToast("All external access revoked.", "warning");
                    }
                } else if (action === 'vdr-invite') {
                    this.showToast("Invite modal opened.");
                } else if (action === 'vdr-edit-perm') {
                    this.showToast("Edit permissions modal opened.");
                } else if (action === 'vdr-view') {
                    this.showToast(`Opening document: ${btn.dataset.file}`);
                }
            });
        });
    }

    getHomeHtml() {

        const activeSector = this.state.homeFilterSector || 'All';
        const sectors = ['All', 'FinTech', 'Cybersecurity', 'SaaS', 'HealthTech', 'ClimateTech'];
        
        // Dynamic filters based on selected homeFilterSector
        const filterFn = (d) => activeSector === 'All' || d.sector === activeSector;

        const discoverCount = this.state.deals.filter(d => d.status === 'discover' && filterFn(d)).length;
        const diligenceCount = this.state.deals.filter(d => d.status === 'diligence' && filterFn(d)).length;
        const activeDealsCount = this.state.deals.filter(d => ['interest_sent', 'intro_review', 'diligence'].includes(d.status) && filterFn(d)).length;
        const watchlistCount = this.state.deals.filter(d => d.status === 'watchlist' && filterFn(d)).length;
        
        const meetingsToday = this.state.meetings.filter(m => {
            const matchesTime = m.time.toLowerCase().includes('today');
            const linkedDeal = this.state.deals.find(d => d.id === m.dealId);
            const matchesSector = activeSector === 'All' || (linkedDeal && linkedDeal.sector === activeSector);
            return matchesTime && matchesSector;
        }).length;

        // Dynamic capital committed context based on active sector
        let committedAmt = "$14.20M";
        let holdingsCount = 4;
        let poolDetail = "LP Pools A, B & C";
        if (activeSector === 'FinTech') {
            committedAmt = "$6.20M";
            holdingsCount = 2;
            poolDetail = "LP Pool A (FinTech Segment)";
        } else if (activeSector === 'Cybersecurity') {
            committedAmt = "$0.00M";
            holdingsCount = 0;
            poolDetail = "No active holdings in sector";
        } else if (activeSector === 'SaaS') {
            committedAmt = "$0.00M";
            holdingsCount = 0;
            poolDetail = "No active holdings in sector";
        } else if (activeSector === 'HealthTech') {
            committedAmt = "$0.00M";
            holdingsCount = 0;
            poolDetail = "No active holdings in sector";
        } else if (activeSector === 'ClimateTech') {
            committedAmt = "$8.00M";
            holdingsCount = 2;
            poolDetail = "LP Pool B (CleanTech Segment)";
        }

        // Dynamic risk alerts list (sector filtered)
        const allRiskAlerts = [
            { id: 'nexus', name: 'Nexus Health VDR Delay', desc: 'Dr. Marcus Vance has not responded to document request for 48 hours.', severity: 'URGENT', time: 'Due 2h ago', assignee: 'Sarah Compliance', action: 'deals', actionLabel: 'Nudge Founder', sector: 'HealthTech' },
            { id: 'aurora', name: 'Aurora Climate Meeting', desc: 'Founder has not confirmed the scheduled Sync Call (Today, 2:00 PM).', severity: 'WARNING', time: 'Today, 2:00 PM', assignee: 'Jane Doe', action: 'confirm-zoom', actionLabel: 'Confirm Zoom', sector: 'ClimateTech' },
            { id: 'acme', name: 'AeroSpace Logix KYC Compliance', desc: 'Identity check failed Plaid verify. Requires coordinator triage.', severity: 'BLOCKED', time: 'Pending 1d', assignee: 'Sarah Compliance', action: 'deals', actionLabel: 'Review Files', sector: 'FinTech' }
        ];
        const riskAlerts = allRiskAlerts.filter(a => activeSector === 'All' || a.sector === activeSector);

        // Render sector filter row
        const sectorFiltersHtml = `
            <div class="flex items-center gap-2" style="margin-bottom: 24px; padding: 0 32px; flex-wrap: wrap;">
                <span class="text-xs text-muted font-semibold" style="text-transform: uppercase; letter-spacing: 0.05em; margin-right: 8px;">Filter Sourced Feed:</span>
                ${sectors.map(sec => {
                    const isActive = activeSector === sec;
                    const style = isActive 
                        ? 'background: var(--brand-secondary-soft); border-color: var(--inv-accent); color: var(--inv-accent); font-weight: 600;'
                        : 'background: rgba(255,255,255,0.02); border-color: var(--inv-divider); color: var(--inv-text-secondary);';
                    return `<button class="btn btn-sm btn-outline" data-sector="${sec}" style="border-radius: 20px; padding: 4px 14px; font-size: 0.75rem; transition: all 0.2s; ${style}">${sec}</button>`;
                }).join('')}
            </div>
        `;

        return `
            <div class="view-header" style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--inv-text-primary);">Investor Command Center</h1>
                        <p class="text-sm text-muted mt-1">Monitor pipeline velocity, diligence risk, founder responsiveness, and scheduled interactions.</p>
                    </div>
                    <div class="flex items-center gap-3 text-xs" style="background: rgba(255,255,255,0.03); border: 1px solid var(--inv-divider); padding: 8px 16px; border-radius: 6px; display: flex; align-items: center; gap: 16px;">
                        <span class="flex items-center gap-1.5" style="color: var(--inv-success); font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                            <span style="display:inline-block; width:6px; height:6px; background:var(--inv-success); border-radius:50%;"></span>
                            System Nominal
                        </span>
                        <span style="color: var(--inv-divider); margin: 0 8px;">|</span>
                        <span class="text-muted" id="lastSyncTimestamp" style="margin-left: 8px;"> Last synced: Just now </span>
                    </div>
                </div>
            </div>
            
            ${sectorFiltersHtml}

            <!-- Executive KPI Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; padding: 0 32px; margin-bottom: 24px;">
                ${this.renderStatCard('discover', 'New Matches', discoverCount, '+2 vs yesterday', 'Sourced deals', '--inv-accent')}
                ${this.renderStatCard('deals', 'Deals in Review', activeDealsCount, '+1 this week', 'Active pipeline flow', '--inv-text-primary')}
                ${this.renderStatCard('deals', 'Diligence Active', diligenceCount, '', `${diligenceCount} in data room`, '--inv-warning')}
                ${this.renderStatCard('meetings', 'Meetings Today', meetingsToday, '', 'Scheduled interactions', '--inv-text-primary')}
                ${this.renderStatCard('deals', 'SLA Risk Alerts', riskAlerts.length, '', 'Responsiveness alerts', '--inv-error')}
                ${this.renderStatCard('portfolio', 'Capital Committed', committedAmt, '', `Across ${holdingsCount} holdings`, '--inv-text-primary')}
            </div>

            <!-- Multi-Zone Command Console -->
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; padding: 0 32px 32px 32px;">
                <!-- LEFT COLUMN: Operational Risk Queue & Pipeline Snapshot -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <!-- Operational Risk Queue (4-Column Table Model) -->
                    <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                        <h3 class="font-semibold mb-4" style="font-size: 0.95rem; color: var(--inv-text-primary); display: flex; align-items: center; justify-content: space-between;">
                            <span style="display: flex; align-items: center; gap: 8px;">🚨 Operational Risk Queue</span>
                            <span class="text-xs text-muted font-normal">Active Alerts: ${riskAlerts.length}</span>
                        </h3>
                        
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left; vertical-align: middle;">
                                <thead>
                                    <tr style="border-bottom: 1px solid var(--inv-divider);">
                                        <th style="padding: 10px 8px; color: var(--inv-text-secondary); font-weight: 600;">Issue</th>
                                        <th style="padding: 10px 8px; color: var(--inv-text-secondary); font-weight: 600;">Severity / Timing</th>
                                        <th style="padding: 10px 8px; color: var(--inv-text-secondary); font-weight: 600;">Assignee</th>
                                        <th style="padding: 10px 8px; color: var(--inv-text-secondary); font-weight: 600; text-align: right;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${riskAlerts.length === 0 ? `
                                        <tr>
                                            <td colspan="4" style="padding: 24px 8px; text-align: center; color: var(--inv-text-secondary);">
                                                No alerts — pipeline running clean ✓
                                            </td>
                                        </tr>
                                    ` : riskAlerts.map(alert => `
                                        <tr style="border-bottom: 1px solid var(--inv-divider); background: rgba(239, 68, 68, 0.01);">
                                            <td style="padding: 12px 8px;">
                                                <div style="font-weight: 600; color: var(--inv-text-primary);">${alert.name}</div>
                                                <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px;">${alert.desc}</div>
                                            </td>
                                            <td style="padding: 12px 8px;">
                                                <div style="margin-bottom: 4px;">
                                                    <span style="font-size: 0.65rem; background: ${alert.severity === 'URGENT' || alert.severity === 'BLOCKED' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; color: ${alert.severity === 'URGENT' || alert.severity === 'BLOCKED' ? 'var(--inv-error)' : 'var(--inv-warning)'}; border: 1px solid ${alert.severity === 'URGENT' || alert.severity === 'BLOCKED' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                                                        ${alert.severity}
                                                    </span>
                                                </div>
                                                <span class="text-xs text-muted">${alert.time}</span>
                                            </td>
                                            <td style="padding: 12px 8px; color: var(--inv-text-primary); font-weight: 500;">
                                                ${alert.assignee}
                                            </td>
                                            <td style="padding: 12px 8px; text-align: right;">
                                                <div style="display: flex; gap: 4px; justify-content: flex-end;">
<div class="relative inline-block text-left">
    <button class="btn btn-outline btn-xs" id="alertActionsBtn-${alert.id}" style="font-size: 0.65rem; padding: 2px 6px; border-color: var(--inv-divider); color: var(--inv-text-secondary);">
        Actions ${this.getIcon('CHEVRON_DOWN')}
    </button>
    <div class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden" id="alertActionsMenu-${alert.id}">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="alertActionsBtn-${alert.id}">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onclick="alert('Snoozed alert for 24 hours.');">Snooze</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onclick="const newAssignee = prompt('Enter new assignee name:', '${alert.assignee}'); if(newAssignee) alert('Reassigned task to ' + newAssignee);">Reassign</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onclick="${alert.actionLabel}();">${alert.actionLabel}</a>
        </div>
    </div>
</div>
<script>
    document.getElementById('alertActionsBtn-${alert.id}').addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = document.getElementById('alertActionsMenu-${alert.id}');
        menu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
        const menu = document.getElementById('alertActionsMenu-${alert.id}');
        if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
    });
</script>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Pipeline Health Snapshot -->
                    <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                        <h3 class="font-semibold mb-4" style="font-size: 0.95rem; color: var(--inv-text-primary);">📊 Pipeline Stage Distribution</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; text-align: center;">
                            <div class="metric-card-trigger" data-tab="discover" style="background: var(--inv-surface-2); padding: 12px 10px; border-radius: 6px; border: 1px solid var(--inv-divider); cursor: pointer;">
                                <div class="text-xs text-muted" style="margin-bottom: 4px;">Sourced</div>
                                <div style="font-size: 1.25rem; font-weight: 700; color: var(--inv-accent);">${discoverCount}</div>
                                <div style="font-size: 0.65rem; color: var(--inv-success); margin-top: 4px;">+2 this week</div>
                            </div>
                            <div class="metric-card-trigger" data-tab="watchlist" style="background: var(--inv-surface-2); padding: 12px 10px; border-radius: 6px; border: 1px solid var(--inv-divider); cursor: pointer;">
                                <div class="text-xs text-muted" style="margin-bottom: 4px;">Watchlist</div>
                                <div style="font-size: 1.25rem; font-weight: 700; color: var(--inv-text-primary);">${watchlistCount}</div>
                                <div style="font-size: 0.65rem; color: var(--inv-text-secondary); margin-top: 4px;">0 change</div>
                            </div>
                            <div class="metric-card-trigger" data-tab="deals" style="background: var(--inv-surface-2); padding: 12px 10px; border-radius: 6px; border: 1px solid var(--inv-divider); cursor: pointer;">
                                <div class="text-xs text-muted" style="margin-bottom: 4px;">Active Review</div>
                                <div style="font-size: 1.25rem; font-weight: 700; color: var(--inv-text-primary);">${activeDealsCount}</div>
                                <div style="font-size: 0.65rem; color: var(--inv-success); margin-top: 4px;">+1 this week</div>
                            </div>
                            <div class="metric-card-trigger" data-tab="deals" data-stage="diligence" style="background: var(--inv-surface-2); padding: 12px 10px; border-radius: 6px; border: 1px solid var(--inv-divider); cursor: pointer;">
                                <div class="text-xs text-muted" style="margin-bottom: 4px;">Diligence (VDR)</div>
                                <div style="font-size: 1.25rem; font-weight: 700; color: var(--inv-warning);">${diligenceCount}</div>
                                <div style="font-size: 0.65rem; color: var(--inv-error); margin-top: 4px;">VDR active (${diligenceCount})</div>
                            </div>
                        </div>

                        <div class="text-xs text-muted" style="background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); padding: 12px 16px; border-radius: 6px; line-height: 1.4; display: flex; align-items: center; gap: 10px;">
                            <div style="flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); display: flex; align-items: center; justify-content: center; color: var(--inv-warning); font-size: 0.9rem;">⚡</div>
                            <div>
                                <strong style="color: var(--inv-text-primary);">Velocity Note:</strong> Average sourced to diligence timeline is currently <strong style="color: var(--inv-accent);">12.7 days</strong>. Clean compliance paths are resolving <strong style="color: var(--inv-success);">4.1 days faster</strong> than standard manual queue items.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Deep Opportunities & Portfolio/Watchlist Oversight -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <!-- Ranked Opportunities Table -->
                    <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                        <h3 class="font-semibold mb-4" style="font-size: 0.95rem; color: var(--inv-premium); display: flex; align-items: center; justify-content: space-between;">
                            <span>✦ Thesis Matches (Ranked Opportunities)</span>
                            <span class="text-xs text-muted font-normal">Updated 10m ago</span>
                        </h3>
                        
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left; vertical-align: middle;">
                                <thead>
                                    <tr style="border-bottom: 1px solid var(--inv-divider);">
                                        <th style="padding: 10px 6px; color: var(--inv-text-secondary); font-weight: 600; width: 32%;">Company / Fit</th>
                                        <th style="padding: 10px 6px; color: var(--inv-text-secondary); font-weight: 600; width: 18%;">Match Score</th>
                                        <th style="padding: 10px 6px; color: var(--inv-text-secondary); font-weight: 600; width: 25%;">Status / Stage</th>
                                        <th style="padding: 10px 6px; color: var(--inv-text-secondary); font-weight: 600; text-align: right; width: 25%;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.state.deals.filter(d => d.status === 'discover' && filterFn(d)).length === 0 ? `
                                        <tr>
                                            <td colspan="4" style="padding: 24px 6px; text-align: center; color: var(--inv-text-secondary);">
                                                No new matches in this sector.
                                            </td>
                                        </tr>
                                    ` : this.state.deals.filter(d => d.status === 'discover' && filterFn(d)).map(op => {
                                        const token = getActionStateToken(op.accessState || 'request-vdr');
                                        const styleClass = token.style === 'primary' ? 'btn-primary' : (token.style === 'secondary' ? 'btn-outline' : `btn-${token.style}`);
                                        
                                        // Explainable Match Detail Popover HTML
                                        const explainHtml = `
                                            <div id="drilldown-${op.id}" class="match-drilldown-container" style="display: none; background: rgba(47, 107, 94, 0.03); border: 1px solid var(--inv-accent); border-radius: 6px; padding: 12px; margin-top: 8px; font-size: 0.75rem; line-height: 1.4;">
                                                <div style="font-weight: 600; color: var(--inv-accent); margin-bottom: 6px;">Mandate Match Breakdown:</div>
                                                <div class="flex justify-between" style="border-bottom: 1px solid var(--inv-divider); padding: 4px 0;"><span>Sector Fit:</span> <strong style="color: var(--inv-success);">Direct Match (${op.sector})</strong></div>
                                                <div class="flex justify-between" style="border-bottom: 1px solid var(--inv-divider); padding: 4px 0;"><span>Check Size:</span> <strong>Fits Check Policy ($1M-$3M)</strong></div>
                                                <div class="flex justify-between" style="border-bottom: 1px solid var(--inv-divider); padding: 4px 0;"><span>Geography:</span> <strong>US/APAC Authorized Sandbox</strong></div>
                                                <div class="flex justify-between" style="padding: 4px 0;"><span>Traction:</span> <strong>${op.revenue || '$10k MRR'} (${op.growth || '10% MoM'} Growth)</strong></div>
                                                
                                                <div style="margin-top: 10px;">
                                                    <div style="font-weight: 600; color: var(--inv-text-primary); margin-bottom: 4px;">Team Notes (Shared Workspace):</div>
                                                    <textarea id="teamNotesArea-${op.id}" placeholder="Type notes here... autosaved to CRM" style="width: 100%; height: 60px; background: var(--inv-surface-2); border: 1px solid var(--inv-divider); color: var(--inv-text-primary); font-size: 0.72rem; border-radius: 4px; padding: 6px; resize: none; outline: none; outline-color: var(--inv-accent);" oninput="
                                                        const val = this.value;
                                                        window.clearTimeout(window.saveNotesTimer);
                                                        window.saveNotesTimer = window.setTimeout(() => {
                                                            const stateStr = localStorage.getItem('investor_dashboard_state');
                                                            if(stateStr) {
                                                                const state = JSON.parse(stateStr);
                                                                const d = state.deals.find(x => x.id === '${op.id}');
                                                                if(d) {
                                                                    d.internalNotes = val;
                                                                    localStorage.setItem('investor_dashboard_state', JSON.stringify(state));
                                                                    console.log('Saved notes to state');
                                                                }
                                                            }
                                                        }, 500);
                                                    ">${op.internalNotes || ''}</textarea>
                                                </div>
                                            </div>
                                        `;

                                        return `
                                            <tr style="border-bottom: 1px solid var(--inv-divider);">
                                                <td style="padding: 12px 6px; width: 32%;">
                                                    <div style="font-weight: 600; color: var(--inv-text-primary);">${op.name}</div>
                                                    <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px; white-space: normal; word-break: break-word;">
                                                        Thesis: <strong>${op.thesis || 'Mandate-aligned'}</strong>
                                                    </div>
                                                    <button class="match-drilldown-trigger" data-id="${op.id}" style="background: transparent; border: none; color: var(--inv-accent); font-size: 0.7rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 4px 0 0 0; outline: none;">
                                                        <span>View Details</span> <span class="arrow-indicator" style="font-size: 0.55rem; color: var(--inv-text-secondary);">▼</span>
                                                    </button>
                                                </td>
                                                <td style="padding: 12px 6px; width: 18%;">
                                                    <span style="font-size: 0.75rem; background: rgba(94, 143, 99, 0.1); border: 1px solid rgba(94, 143, 99, 0.3); color: var(--inv-success); padding: 2px 6px; border-radius: 4px; font-weight: 600;" title="Criteria validation checklist verified">
                                                        ${op.match}%
                                                    </span>
                                                </td>
                                                <td style="padding: 12px 6px; width: 25%; white-space: normal; word-break: break-word;">
                                                    <div style="color: var(--inv-text-primary); font-weight: 500;">${op.stage}</div>
                                                    <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px;">${op.ask || '$2.0M SAFE'}</div>
                                                </td>
                                                <td style="padding: 12px 6px; text-align: right; width: 25%;">
                                                    <button class="btn ${styleClass} btn-sm action-btn" data-action="${token.action}" data-id="${op.id}" title="${token.tooltip}" ${token.disabled ? 'disabled' : ''} style="font-size: 0.7rem; padding: 4px 8px; white-space: nowrap;">
                                                        ${token.icon} ${token.label}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" style="padding: 0; border: none;">
                                                    ${explainHtml}
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Portfolio & Watchlist Oversight (Two distinct structured panels) -->
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        
                        <!-- Panel A: Portfolio Performance -->
                        <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                            <h3 class="font-semibold mb-3" style="font-size: 0.95rem; color: var(--inv-text-primary); display: flex; justify-content: space-between;">
                                <span>💼 Portfolio Performance</span>
                                <span class="text-xs text-muted" style="font-weight: normal;">Active Holdings: 4</span>
                            </h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.01); border: 1px solid var(--inv-divider); padding: 8px 12px; border-radius: 6px; font-size: 0.75rem;">
                                    <div>
                                        <div style="font-weight: 600; color: var(--inv-text-primary);">Stripe</div>
                                        <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px;">Entry Round: Series H • $150M MRR • Profitable</div>
                                    </div>
                                    <span style="color: var(--inv-success); font-weight: 600; font-size: 0.8rem; background: rgba(94, 143, 99, 0.1); border: 1px solid rgba(94, 143, 99, 0.2); padding: 2px 6px; border-radius: 4px;">TVPI 14.5x</span>
                                </div>

                                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.01); border: 1px solid var(--inv-divider); padding: 8px 12px; border-radius: 6px; font-size: 0.75rem;">
                                    <div>
                                        <div style="font-weight: 600; color: var(--inv-text-primary);">SpaceX</div>
                                        <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px;">Entry Round: Series F • Growth • 36+ mos Runway</div>
                                    </div>
                                    <span style="color: var(--inv-success); font-weight: 600; font-size: 0.8rem; background: rgba(94, 143, 99, 0.1); border: 1px solid rgba(94, 143, 99, 0.2); padding: 2px 6px; border-radius: 4px;">TVPI 22.0x</span>
                                </div>
                            </div>
                        </div>

                        <!-- Panel B: Watchlist Activity -->
<div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
    ${this.getWatchlistHeaderHtml()}
    <div class="watchlist-panel" style="background: var(--inv-surface); border:1px solid var(--inv-divider); border-radius:8px; padding:20px;">
        ${this.getWatchlistTableHtml()}
    </div>
</div>

                    </div>
                </div>
            </div>
        `;
    }

    getInsightsHtml() {
        const discoverCount = this.state.deals.filter(d => d.status === 'discover').length;
        const watchlistCount = this.state.deals.filter(d => d.status === 'watchlist').length;
        const activeCount = this.state.deals.filter(d => ['interest_sent', 'intro_review', 'diligence'].includes(d.status)).length;
        const diligenceCount = this.state.deals.filter(d => d.status === 'diligence').length;
        const passedCount = this.state.deals.filter(d => d.status === 'passed').length;

        const activePct = Math.round(((activeCount + 80) / 342) * 100);
        const diligencePct = Math.round(((diligenceCount + 14) / 342) * 100);

        return `
            <div class="view-header"><h1 style="font-size: 1.5rem; font-weight: 600;">Insights & Analytics</h1></div>
            <div class="insights-grid">
                <!-- Funnel -->
                <div class="chart-card">
                    <h3 class="font-semibold mb-6">Pipeline Conversion (LTM)</h3>
                    <div class="funnel-bar">
                        <div class="funnel-fill" style="width: 100%;"></div>
                        <div class="funnel-text">Discovery / Sourced (342)</div>
                        <div class="funnel-label">100%</div>
                    </div>
                    <div class="funnel-bar">
                        <div class="funnel-fill" style="width: ${activePct}%;"></div>
                        <div class="funnel-text">Active Pipeline (${activeCount + 80})</div>
                        <div class="funnel-label">${activePct}%</div>
                    </div>
                    <div class="funnel-bar">
                        <div class="funnel-fill" style="width: ${diligencePct}%;"></div>
                        <div class="funnel-text">Diligence & VDR (${diligenceCount + 14})</div>
                        <div class="funnel-label">${diligencePct}%</div>
                    </div>
                    <div class="funnel-bar">
                        <div class="funnel-fill" style="width: 3.5%;"></div>
                        <div class="funnel-text">Term Sheets Issued (12)</div>
                        <div class="funnel-label">3.5%</div>
                    </div>
                    <div class="funnel-bar">
                        <div class="funnel-fill" style="width: 1.1%;"></div>
                        <div class="funnel-text">Closed Won (4)</div>
                        <div class="funnel-label">1.1%</div>
                    </div>
                </div>
                
                <!-- Decision Velocity KPIs -->
                <div class="chart-card flex flex-col justify-between">
                    <h3 class="font-semibold mb-4 w-full">Decision Velocity</h3>
                    <div style="display:flex; flex-direction:column; gap:16px; flex:1; justify-content:center;">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--inv-divider); padding-bottom: 8px;">
                            <span class="text-sm text-muted">Match to Request Intro</span>
                            <span style="font-weight:600; color:var(--inv-text-primary);">4.2 days</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--inv-divider); padding-bottom: 8px;">
                            <span class="text-sm text-muted">Intro to Diligence Unlock</span>
                            <span style="font-weight:600; color:var(--inv-text-primary);">8.5 days</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--inv-divider); padding-bottom: 8px;">
                            <span class="text-sm text-muted">Diligence to Term Sheet</span>
                            <span style="font-weight:600; color:var(--inv-warning);">15.2 days</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom: 4px;">
                            <span class="text-sm text-muted">Average Decision Span</span>
                            <span style="font-weight:600; color:var(--inv-premium);">27.9 days</span>
                        </div>
                    </div>
                    <div class="text-xs text-muted" style="border-top:1px solid var(--inv-divider); padding-top:12px; margin-top:12px;">
                        ${this.getIcon('WARNING')} Decision velocity is 4.1 days faster than industry average.
                    </div>
                </div>
            </div>

            <div style="padding: 0 32px 32px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                <!-- Conic Sector -->
                <div class="chart-card flex flex-col items-center justify-center">
                    <h3 class="font-semibold mb-6 align-self-start w-full">Sector Distribution</h3>
                    <div class="donut-chart">
                        <div class="donut-hole">
                            <span class="font-semibold text-lg">342</span>
                            <span class="text-xs text-muted">Total Deals</span>
                        </div>
                    </div>
                    <div class="mt-6 w-full text-sm">
                        <div class="flex justify-between mb-2"><span style="color: var(--inv-accent);">■ FinTech</span> <span>45%</span></div>
                        <div class="flex justify-between mb-2"><span style="color: var(--inv-premium);">■ SaaS</span> <span>30%</span></div>
                        <div class="flex justify-between mb-2"><span style="color: var(--inv-warning);">■ DeepTech</span> <span>15%</span></div>
                        <div class="flex justify-between mb-2"><span style="color: var(--inv-surface-2);">■ Other</span> <span>10%</span></div>
                    </div>
                </div>

                <!-- Deal pipeline activity spark bar -->
                <div class="chart-card">
                    <h3 class="font-semibold mb-6">Pipeline Activity (Daily)</h3>
                    <div class="flex" style="position: relative; height: 180px;">
                        <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 30px; display: flex; flex-direction: column; justify-content: space-between; text-align: right; font-size: 0.75rem; color: var(--inv-text-secondary); padding-right: 8px; border-right: 1px solid var(--inv-divider); pb-6">
                            <span>25</span><span>12</span><span style="margin-bottom: 24px;">0</span>
                        </div>
                        <div class="flex items-end gap-4" style="margin-left: 40px; flex: 1; height: 156px; border-bottom: 1px solid var(--inv-divider); padding-bottom: 0;">
                            <div style="flex: 1; background: var(--inv-accent); height: 40%; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 8px; color: #fff; font-size: 0.75rem; font-weight: bold;">10</div>
                            <div style="flex: 1; background: var(--inv-accent); height: 60%; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 8px; color: #fff; font-size: 0.75rem; font-weight: bold;">15</div>
                            <div style="flex: 1; background: var(--inv-accent); height: 35%; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 8px; color: #fff; font-size: 0.75rem; font-weight: bold;">8</div>
                            <div style="flex: 1; background: var(--inv-accent); height: 75%; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 8px; color: #fff; font-size: 0.75rem; font-weight: bold;">18</div>
                            <div style="flex: 1; background: var(--inv-accent); height: 90%; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 8px; color: #fff; font-size: 0.75rem; font-weight: bold;">22</div>
                            <div style="flex: 1; background: var(--inv-premium); height: 100%; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 8px; color: #fff; font-size: 0.75rem; font-weight: bold;">25</div>
                        </div>
                    </div>
                    <div class="flex justify-between text-xs text-muted mt-2" style="margin-left: 40px;">
                        <span style="flex: 1; text-align: center;">Mon</span>
                        <span style="flex: 1; text-align: center;">Tue</span>
                        <span style="flex: 1; text-align: center;">Wed</span>
                        <span style="flex: 1; text-align: center;">Thu</span>
                        <span style="flex: 1; text-align: center;">Fri</span>
                        <span style="flex: 1; text-align: center;">Sat</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Watchlist Header: KPI strip for decision queue
    getWatchlistHeaderHtml() {
        const watchlistDeals = this.state.deals.filter(d => d.status === 'watchlist');
        const onWatchlist = watchlistDeals.length;
        const updatedToday = watchlistDeals.filter(d => d.lastTouch && new Date(d.lastTouch).toDateString() === new Date().toDateString()).length;
        const needsReview = watchlistDeals.filter(d => d.needsReview).length;
        const promoted = watchlistDeals.filter(d => d.promoted).length;
        return `
            <div class="flex items-center justify-between mb-4" style="padding: 8px 0;">
                <h3 class="font-semibold" style="font-size: 1.1rem; color: var(--inv-text-primary);">Watchlist Decision Queue</h3>
                <div class="flex gap-2 text-sm">
                    <span class="badge" style="background: var(--brand-secondary-soft); color: var(--inv-text-primary); padding: 4px 8px; border-radius: 6px;">On watchlist: ${onWatchlist}</span>
                    <span class="badge" style="background: var(--brand-primary-soft); color: var(--inv-text-primary); padding: 4px 8px; border-radius: 6px;">Updated today: ${updatedToday}</span>
                    <span class="badge" style="background: var(--warning-soft); color: var(--inv-warning); padding: 4px 8px; border-radius: 6px;">Needs review: ${needsReview}</span>
                    <span class="badge" style="background: var(--success-soft); color: var(--inv-success); padding: 4px 8px; border-radius: 6px;">Promoted this week: ${promoted}</span>
                </div>
            </div>
        `;
    }

    // Watchlist Table: list of opportunities with rationale and actions
    getWatchlistTableHtml() {
        const rows = this.state.deals.filter(d => d.status === 'watchlist').map(d => {
            const reason = d.reason || '—';
            const lastTouch = d.lastTouch ? new Date(d.lastTouch).toLocaleDateString() : '—';
            return `
                <tr class="border-b border-divider" style="background: var(--inv-surface);"><td class="p-2" style="color: var(--inv-text-primary); font-weight: 600;">${d.name}</td><td class="p-2 text-xs text-muted">${reason}</td><td class="p-2 text-xs text-muted">${lastTouch}</td><td class="p-2 text-right">
                    <button class="btn btn-primary btn-xs" style="margin-right:4px;" onclick="alert('Promote ${d.name}');">Promote</button>
                    <button class="btn btn-outline btn-xs" style="margin-right:4px;" onclick="alert('Pass ${d.name}');">Pass</button>
                    <button class="btn btn-outline btn-xs" onclick="alert('Schedule follow‑up for ${d.name}');">Schedule</button>
                </td></tr>
            `;
        }).join('');
        return `
            <table class="w-full" style="border-collapse: collapse; font-size: 0.85rem;">
                <thead>
                    <tr class="border-b border-divider" style="background: var(--inv-surface-2);">
                        <th class="p-2 text-left" style="color: var(--inv-text-secondary);">Startup</th>
                        <th class="p-2 text-left" style="color: var(--inv-text-secondary);">Why on watchlist</th>
                        <th class="p-2 text-left" style="color: var(--inv-text-secondary);">Last touch</th>
                        <th class="p-2 text-right" style="color: var(--inv-text-secondary);">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows || `<tr><td colspan="4" class="p-4 text-center text-muted">No watchlist items.</td></tr>`}
                </tbody>
            </table>
        `;
    }

    getPortfolioHtml() {
        const rollupStats = {
            totalInvested: "$12.00M",
            currentValue: "$18.50M",
            avgTvpi: "1.54x",
            netIrr: "32.4%"
        };

        let cardsHtml = '';
        this.state.portfolioDeals.forEach(d => {
            const isWarning = d.runway !== 'Profitable' && parseInt(d.runway) <= 12;
            const statusColor = d.runway === 'Profitable' ? 'var(--inv-success)' : (isWarning ? 'var(--inv-error)' : 'var(--inv-warning)');
            const riskFlag = isWarning ? `<span style="font-size: 0.65rem; background: rgba(239, 68, 68, 0.1); color: var(--inv-error); padding: 2px 6px; border-radius: 4px; font-weight: 600;">⚠️ STALE COMPLIANCE / RUNWAY RISK</span>` : `<span style="font-size: 0.65rem; background: rgba(94, 143, 99, 0.1); color: var(--inv-success); padding: 2px 6px; border-radius: 4px; font-weight: 600;">✓ SECURE COMPLIANCE</span>`;

            cardsHtml += `
                <div class="metric-card" style="border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; background: var(--inv-surface); display: flex; flex-direction: column; gap: 12px;">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 style="font-size: 1.1rem; font-weight: 600; color: var(--inv-text-primary);">${d.name}</h4>
                            <span class="text-xs text-muted">${d.sector}</span>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.2rem; font-weight: 700; color: var(--inv-success);">${d.tvpi}</div>
                            <span class="text-xs text-muted">Net IRR: ${d.irr}</span>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.75rem; border-top: 1px dashed var(--inv-divider); border-bottom: 1px dashed var(--inv-divider); padding: 8px 0; margin: 4px 0;">
                        <div><span class="text-muted">Scale MRR:</span> <strong style="color: var(--inv-text-primary);">${d.mrr}</strong></div>
                        <div><span class="text-muted">Burn Runway:</span> <strong style="color: ${statusColor};">${d.runway}</strong></div>
                        <div><span class="text-muted">Next Round:</span> <strong style="color: var(--inv-text-primary);">${d.nextRound}</strong></div>
                        <div><span class="text-muted">LP Tier:</span> <strong style="color: var(--inv-text-primary);">LP Pool A</strong></div>
                    </div>

                    <div class="text-xs text-muted" style="line-height: 1.4; min-height: 36px;">
                        <strong>Latest Update:</strong> ${d.update}
                    </div>

                    <div class="flex justify-between items-center mt-2">
                        ${riskFlag}
                        <button class="btn btn-outline btn-xs" onclick="alert('Opening portfolio detail ledger for ${d.name}...')" style="font-size: 0.65rem; padding: 2px 6px;">Ledger</button>
                    </div>
                </div>
            `;
        });

        if (!cardsHtml) {
            cardsHtml = `<div class="text-muted text-center p-6" style="grid-column: 1 / -1; padding: 40px; border: 1px dashed var(--inv-divider); border-radius: 8px; background: rgba(255,255,255,0.01);">No active holdings currently managed in this sector.</div>`;
        }

        return `
            <div class="view-header flex justify-between items-center" style="margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--inv-text-primary);">Portfolio Monitoring</h1>
                    <p class="text-sm text-muted mt-1">Real-time performance rollup, burn rates, and TVPI analytics of active fund holdings.</p>
                </div>
                <button class="btn btn-primary btn-sm" onclick="alert('Opening LP reporting console...')">Generate LP Report</button>
            </div>

            <!-- Fund Rollup Metrics Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 0 32px; margin-bottom: 24px;">
                <div class="metric-card" style="border: 1px solid var(--inv-divider); padding: 16px; border-radius: 8px;">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase;">Total Committed Capital</div>
                    <div class="metric-value" style="font-size: 1.5rem; color: var(--inv-text-primary); font-weight: 700; margin-top: 4px;">${rollupStats.totalInvested}</div>
                    <div class="text-xs text-muted" style="margin-top: 4px;">Across active segments</div>
                </div>
                <div class="metric-card" style="border: 1px solid var(--inv-divider); padding: 16px; border-radius: 8px;">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase;">Current NAV</div>
                    <div class="metric-value" style="font-size: 1.5rem; color: var(--inv-accent); font-weight: 700; margin-top: 4px;">${rollupStats.currentValue}</div>
                    <div class="text-xs text-success" style="color: var(--inv-success); margin-top: 4px;">+54% net appreciation</div>
                </div>
                <div class="metric-card" style="border: 1px solid var(--inv-divider); padding: 16px; border-radius: 8px;">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase;">Average TVPI</div>
                    <div class="metric-value" style="font-size: 1.5rem; color: var(--inv-success); font-weight: 700; margin-top: 4px;">${rollupStats.avgTvpi}</div>
                    <div class="text-xs text-muted" style="margin-top: 4px;">LTM weighted average</div>
                </div>
                <div class="metric-card" style="border: 1px solid var(--inv-divider); padding: 16px; border-radius: 8px;">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase;">Fund Net IRR</div>
                    <div class="metric-value" style="font-size: 1.5rem; color: var(--inv-text-primary); font-weight: 700; margin-top: 4px;">${rollupStats.netIrr}</div>
                    <div class="text-xs text-muted" style="margin-top: 4px;">Institutional benchmark top-decile</div>
                </div>
            </div>

            <!-- Holding Cards Grid -->
            <div style="padding: 0 32px 32px 32px;">
                <h3 class="font-semibold" style="font-size: 1rem; color: var(--inv-text-primary); margin-bottom: 16px;">Active Holdings Details</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                    ${cardsHtml}
                </div>
            </div>
        `;
    }

    getDiscoverHtml() {
        // Apply filters
        let deals = this.getDealsForTab('discover').filter(d => {
            if (this.state.filters.sector !== 'All' && d.sector !== this.state.filters.sector) return false;
            if (this.state.filters.stage !== 'All' && d.stage !== this.state.filters.stage) return false;
            
            if (this.state.filters.revenue !== 'All') {
                const rev = d.revenue.toLowerCase();
                if (this.state.filters.revenue === 'mvp') {
                    if (rev.includes('arr') || (rev.includes('mrr') && parseInt(rev.replace(/\D/g, '')) > 5)) return false;
                } else if (this.state.filters.revenue === 'growth') {
                    if (!rev.includes('mrr') || parseInt(rev.replace(/\D/g, '')) < 10 || parseInt(rev.replace(/\D/g, '')) > 50) return false;
                } else if (this.state.filters.revenue === 'scale') {
                    if (rev.includes('arr')) {
                        // e.g. $150k ARR
                    } else if (rev.includes('mrr')) {
                        if (parseInt(rev.replace(/\D/g, '')) < 50) return false;
                    } else {
                        return false;
                    }
                }
            }

            if (this.state.filters.checkSize !== 'All') {
                const ask = d.ask.toLowerCase();
                const askVal = parseFloat(ask.replace(/[^0-9.]/g, ''));
                if (this.state.filters.checkSize === 'small') {
                    if (askVal >= 2.0) return false;
                } else if (this.state.filters.checkSize === 'large') {
                    if (askVal < 2.0) return false;
                }
            }

            if (this.state.filters.readiness !== 'All') {
                if (this.state.filters.readiness === 'unlocked' && d.vaultState !== 'unlocked') return false;
                if (this.state.filters.readiness === 'audited' && d.verification !== 'Fully Audited') return false;
            }

            return true;
        });

        // Apply sorting
        const sortOrder = this.state.sortOrder || 'best_match';
        if (sortOrder === 'best_match') {
            deals.sort((a, b) => b.match - a.match);
        } else if (sortOrder === 'conviction') {
            deals.sort((a, b) => (b.convictionScore || 0) - (a.convictionScore || 0));
        } else if (sortOrder === 'ask_low') {
            const getAskVal = (d) => parseFloat(d.ask.replace(/[^0-9.]/g, '')) || 0;
            deals.sort((a, b) => getAskVal(a) - getAskVal(b));
        } else if (sortOrder === 'ask_high') {
            const getAskVal = (d) => parseFloat(d.ask.replace(/[^0-9.]/g, '')) || 0;
            deals.sort((a, b) => getAskVal(b) - getAskVal(a));
        } else if (sortOrder === 'growth') {
            const getGrowthVal = (d) => parseFloat(d.growth.replace(/[^0-9.]/g, '')) || 0;
            deals.sort((a, b) => getGrowthVal(b) - getGrowthVal(a));
        }

        // Setup filter header & chips
        let chipsHtml = '';
        const activeFilters = Object.entries(this.state.filters).filter(([key, val]) => val !== 'All');
        if (activeFilters.length > 0) {
            chipsHtml = `<div class="filter-chips-container">`;
            activeFilters.forEach(([key, val]) => {
                let displayVal = val;
                if (val === 'mvp') displayVal = '< $10k MRR';
                if (val === 'growth') displayVal = '$10k-$50k MRR';
                if (val === 'scale') displayVal = '$50k+ MRR/ARR';
                if (val === 'small') displayVal = 'Under $2M Raise';
                if (val === 'large') displayVal = 'Over $2M Raise';
                chipsHtml += `
                    <div class="filter-chip">
                        <span> ${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayVal} </span>
                        &nbsp;
                        <span class="filter-chip-remove" data-key="${key}" style="cursor: pointer;"> ✕ </span>
                    </div>
                `;
            });
            chipsHtml += `</div>`;
        }

        let header = `
            <div class="view-header" style="position: sticky; top: 0; background: var(--inv-surface); border-bottom: 1px solid var(--inv-divider); width: 100%; z-index: 50;">
                <div class="flex justify-between items-center w-full" style="padding: 4px 0;">
                    <h1 style="font-size: 1.25rem; font-weight: 600;">Discover Feed</h1>
                    <!-- Unified Premium Toolbar -->
                    <div class="flex items-center" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--inv-divider); border-radius: 6px; padding: 2px 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                        <button class="btn btn-outline btn-sm discover-filters-trigger" id="openFiltersBtn" style="border: none; background: transparent; color: var(--inv-text-primary); font-weight: 500; padding: 6px 12px; font-size: 0.8rem;">⚙️ Filters ${activeFilters.length > 0 ? `(${activeFilters.length})` : ''}</button>
                        <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"> </span>
                        <div style="width: 1px; height: 16px; background: var(--inv-divider); margin: 0 8px;"></div>
                        <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"> </span>
                        <!-- Premium Custom Dropdown sorting -->
                        <div class="custom-dropdown-container" style="z-index: 120;">
                            <button id="discoverSortDropdownBtn" class="btn btn-outline btn-sm" style="border: none; background: transparent; color: #fff; gap: 6px; min-width: 170px; justify-content: space-between; font-weight: 500; padding: 6px 12px; font-size: 0.8rem;">
                                <span>${this.getSortOrderLabel(sortOrder)}</span>
                                <span style="font-size: 0.55rem; color: var(--inv-text-secondary);">▼</span>
                            </button>
                            <div id="discoverSortDropdownMenu" class="custom-dropdown-menu" style="right: -6px;">
                                <div class="dropdown-item ${sortOrder === 'best_match' ? 'selected' : ''}" data-value="best_match">Sort: Best Match</div>
                                <div class="dropdown-item ${sortOrder === 'conviction' ? 'selected' : ''}" data-value="conviction">Sort: Highest Conviction</div>
                                <div class="dropdown-item ${sortOrder === 'ask_low' ? 'selected' : ''}" data-value="ask_low">Sort: Check Size (Low to High)</div>
                                <div class="dropdown-item ${sortOrder === 'ask_high' ? 'selected' : ''}" data-value="ask_high">Sort: Check Size (High to Low)</div>
                                <div class="dropdown-item ${sortOrder === 'growth' ? 'selected' : ''}" data-value="growth">Sort: Highest Growth</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${chipsHtml}
        `;

        if (deals.length === 0) return header + `<div class="flex items-center justify-center h-full text-muted" style="min-height: 400px;">No startups match the selected filters.</div>`;

        let scroller = `<div class="feed-scroller" id="feedScroller" style="height: calc(100vh - 120px);">`;
        deals.forEach((d, idx) => {
            const isSelected = this.state.selectedDealId === d.id || (!this.state.selectedDealId && idx === 0);
                        // VDR state badge - Outcome-Oriented Gating Labels
            let vaultBadge = '';
            if (d.vaultState === 'unlocked') {
                vaultBadge = `<span class="badge badge-success" style="padding: 3px 10px; font-size: 0.65rem; white-space: nowrap;">ðŸ—‚ï¸ VDR Available</span>`;
            } else if (d.vaultState === 'requested') {
                vaultBadge = `<span class="badge badge-warning" style="padding: 3px 10px; font-size: 0.65rem; white-space: nowrap;">â³ VDR Access Requested</span>`;
            } else {
                const missingCount = d.diligenceMetrics.missingFiles.length;
                if (missingCount > 0) {
                    vaultBadge = `<span class="badge badge-secondary" style="padding: 3px 10px; font-size: 0.65rem; white-space: nowrap; background: rgba(255,255,255,0.05); color: var(--inv-text-secondary); border: 1px solid var(--inv-divider);">âš ï¸ ${missingCount} Diligence Items Needed</span>`;
                } else if (d.diligenceMetrics.staleDocs.length > 0) {
                    vaultBadge = `<span class="badge badge-secondary" style="padding: 3px 10px; font-size: 0.65rem; white-space: nowrap; background: rgba(255,255,255,0.05); color: var(--inv-text-secondary); border: 1px solid var(--inv-divider);">â³ ${d.diligenceMetrics.staleDocs.length} Documents Need Refresh</span>`;
                } else {
                    vaultBadge = `<span class="badge badge-secondary" style="padding: 3px 10px; font-size: 0.65rem; white-space: nowrap; background: rgba(255,255,255,0.05); color: var(--inv-text-secondary); border: 1px solid var(--inv-divider);">ðŸ” VDR Gated</span>`;
                }
            }

            // Trust badge and taxonomy definitions
            let trustBadgeText = 'Verified Founder';
            if (d.verification === 'Fully Audited' || d.verification === 'Audited Financials') {
                trustBadgeText = 'Audited Financials';
            }

            // VDR Button
            let vdrButtonHtml = '';
            if (d.vaultState === 'locked') {
                vdrButtonHtml = `<button class="btn btn-outline action-btn" data-action="request_vdr" data-id="${d.id}" style="padding: 6px 14px; border-color: var(--inv-warning); color: var(--inv-warning); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;"> Request Access </button>`;
            } else if (d.vaultState === 'requested') {
                vdrButtonHtml = `<button class="btn btn-outline action-btn" data-action="nudge-vdr" data-id="${d.id}" style="padding: 6px 14px; border-color: var(--inv-warning); color: var(--inv-warning); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; opacity: 0.8; letter-spacing: 0.5px; white-space: nowrap;"> Nudge Founder </button>`;
            } else {
                vdrButtonHtml = `<button class="btn btn-outline action-btn" data-action="open_vdr" data-id="${d.id}" style="padding: 6px 14px; border-color: var(--inv-success); color: var(--inv-success); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;"> Enter Data Room </button>`;
            }

            scroller += `
                <div class="startup-snap-card" data-id="${d.id}" style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; margin-bottom: 16px; overflow: hidden; transition: all 0.2s;">
                    <!-- DECISION LAYER (Always Visible) -->
                    <div style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: flex-start; cursor: pointer;" onclick="document.getElementById('evidence-${d.id}').style.display = document.getElementById('evidence-${d.id}').style.display === 'none' ? 'block' : 'none';">
                        <div style="flex: 1;">
                            <div class="flex items-center gap-2 mb-1">
                                <h2 style="font-size: 1.2rem; font-weight: 600; color: var(--inv-text-primary); margin: 0;">${d.name}</h2>
                                <span style="background: rgba(201, 162, 39, 0.08); border: 1px solid var(--inv-premium); color: var(--inv-premium); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 600;"> â˜… ${d.match}% Fit </span>
                                <span style="background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--inv-divider); color: var(--inv-text-secondary); font-size: 0.65rem;">${d.sector}</span>
                                <span style="background: rgba(94, 143, 99, 0.1); color: var(--inv-success); border: 1px solid rgba(94,143,99,0.2); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 600;"> âœ“ ${trustBadgeText} </span>
                            </div>
                            <div class="text-xs text-muted mb-3">${d.founder} â€¢ ${d.location}</div>
                            
                            <div style="display: flex; gap: 16px; font-size: 0.75rem; color: var(--inv-text-primary); align-items: center;">
                                <div><span class="text-muted">Ask:</span> <strong>${d.ask}</strong></div>
                                <div><span class="text-muted">Revenue:</span> <strong style="color: var(--inv-success);">${d.revenue}</strong> <span class="text-xs opacity-75">(${d.growth})</span></div>
                                <div><span class="text-muted">Model:</span> <strong>${d.businessModel}</strong></div>
                            </div>
                        </div>
                        
                        <!-- Primary Status / Action / Gating Label -->
                        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;" onclick="event.stopPropagation();">
                            ${vaultBadge}
                            ${vdrButtonHtml}
                            <div style="font-size: 0.65rem; color: var(--inv-text-secondary); margin-top: 4px; cursor: pointer;" onclick="document.getElementById('evidence-${d.id}').style.display = document.getElementById('evidence-${d.id}').style.display === 'none' ? 'block' : 'none';">Click to expand evidence â–¼</div>
                        </div>
                    </div>

                    <!-- EXPANDABLE EVIDENCE LAYER -->
                    <div id="evidence-${d.id}" style="display: none; border-top: 1px solid var(--inv-divider); padding: 16px 20px; background: rgba(0,0,0,0.15);">
                        <p style="font-size: 0.85rem; color: var(--inv-text-primary); line-height: 1.5; margin-bottom: 16px;"><strong>Investment Thesis:</strong> ${d.thesis}</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                            <!-- Video Section -->
                            <div class="video-section" style="position: relative; width: 100%; height: 160px; background: #000; border-radius: 6px; overflow: hidden;" data-id="${d.id}">
                                <img src="${d.thumb}" class="video-thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                                <div class="play-btn-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.6); border: 2px solid #fff; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; z-index: 5;">â–¶</div>
                                <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.6rem;">${d.videoStats || 'Pitch Video'}</div>
                            </div>
                            
                            <!-- Diligence Checklist Widget -->
                            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); border-radius: 6px; padding: 12px; font-size: 0.75rem; display: flex; flex-direction: column; justify-content: center;">
                                <div style="font-weight: 600; color: var(--inv-text-secondary); text-transform: uppercase; font-size: 0.65rem; margin-bottom: 12px; letter-spacing: 0.5px;"> Diligence Checklist Status </div>
                                <div style="display: flex; gap: 8px; width: 100%;">
                                    <div style="flex: 1; background: rgba(94, 143, 99, 0.08); border: 1px solid rgba(94, 143, 99, 0.2); padding: 10px 8px; border-radius: 4px; text-align: center; color: var(--inv-success);">
                                        <div style="font-size: 0.58rem; text-transform: uppercase; opacity: 0.8; margin-bottom: 4px;"> Verified </div>
                                        <div style="font-size: 1rem; font-weight: bold;"> âœ” ${d.diligenceMetrics.completedReviews} </div>
                                    </div>
                                    <div style="flex: 1; background: ${d.diligenceMetrics.staleDocs.length > 0 ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${d.diligenceMetrics.staleDocs.length > 0 ? 'rgba(245, 158, 11, 0.2)' : 'var(--inv-divider)'}; padding: 10px 8px; border-radius: 4px; text-align: center; color: ${d.diligenceMetrics.staleDocs.length > 0 ? 'var(--inv-warning)' : 'var(--inv-text-secondary)'}; opacity: ${d.diligenceMetrics.staleDocs.length > 0 ? '1' : '0.4'};">
                                        <div style="font-size: 0.58rem; text-transform: uppercase; opacity: 0.8; margin-bottom: 4px;"> Stale </div>
                                        <div style="font-size: 1rem; font-weight: bold;"> â³ ${d.diligenceMetrics.staleDocs.length} </div>
                                    </div>
                                    <div style="flex: 1; background: ${d.diligenceMetrics.missingFiles.length > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${d.diligenceMetrics.missingFiles.length > 0 ? 'rgba(239, 68, 68, 0.2)' : 'var(--inv-divider)'}; padding: 10px 8px; border-radius: 4px; text-align: center; color: ${d.diligenceMetrics.missingFiles.length > 0 ? 'var(--inv-error)' : 'var(--inv-text-secondary)'}; opacity: ${d.diligenceMetrics.missingFiles.length > 0 ? '1' : '0.4'};">
                                        <div style="font-size: 0.58rem; text-transform: uppercase; opacity: 0.8; margin-bottom: 4px;"> Missing </div>
                                        <div style="font-size: 1rem; font-weight: bold;"> âš ï¸ ${d.diligenceMetrics.missingFiles.length} </div>
                                    </div>
                                </div>
                                <div style="margin-top: 12px; font-size: 0.7rem; color: var(--inv-text-secondary); text-align: center;">
                                    Responsiveness: <strong style="color: var(--inv-success);">${d.responsiveness}</strong>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Secondary Actions -->
                        <div style="display: flex; justify-content: flex-end; gap: 8px; padding-top: 12px; border-top: 1px dashed var(--inv-divider);">
                            <button class="btn btn-primary action-btn" data-action="request_intro" data-id="${d.id}" style="padding: 6px 12px; font-weight: 600; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.5px;"> Request Intro </button>
                            <button class="btn btn-outline action-btn" data-action="watchlist" data-id="${d.id}" title="Shortlist" style="padding: 6px 10px; font-size: 0.8rem; border-color: var(--inv-divider);"> â­ Watchlist </button>
                            <button class="btn btn-outline action-btn" data-action="pass" data-id="${d.id}" title="Pass" style="padding: 6px 10px; font-size: 0.8rem; border-color: rgba(239, 68, 68, 0.2); color: var(--inv-error);"> âœ• Pass </button>
                        </div>
                    </div>
                </div>
            `;
        });
        scroller += `<div style="height: 100px;"></div></div>`;
        return header + scroller;
    }

        getWatchlistHtml() {
        let allWatchlistDeals = this.getDealsForTab('watchlist');
        
        // Semantic Filtering
        const filter = this.state.watchlistFilter || 'all';
        let deals = allWatchlistDeals;
        
        if (filter === 'recent') {
            deals = allWatchlistDeals.filter(d => d.updates && d.updates.length > 0);
        } else if (filter === 'review') {
            deals = allWatchlistDeals.filter(d => !d.reason || d.reason === 'No interaction yet');
        } else if (filter === 'priority') {
            deals = allWatchlistDeals.filter(d => d.match >= 90);
        }
        
        // Chronological activity log from watchlist deals
        const logs = [
            { startup: "Nexus Health", event: "Founder uploaded HIPAA compliance cert", time: "2h ago", icon: "ðŸ“" },
            { startup: "Aurora Climate", event: "Intro call scheduled by Mike Operations", time: "Today, 10:00 AM", icon: "ðŸ“…" },
            { startup: "Starlight Solar", event: "Bavaria Pilot Report updated in VDR", time: "Yesterday", icon: "ðŸ“„" },
            { startup: "Finflow", event: "MAS Regulatory audit report approved", time: "2 days ago", icon: "ðŸ›¡ï¸" }
        ];

        let html = `
            <div class="view-header flex justify-between items-center" style="margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--inv-text-primary);">Watchlist Monitoring</h1>
                    <p class="text-sm text-muted mt-1">Track passive watchlist deals, chronological updates, and promote opportunities to Active Review.</p>
                </div>
                <button class="btn btn-outline btn-sm" onclick="alert('Exporting watchlist dataset as CSV...')">Export CSV</button>
            </div>
            
            <div style="display: grid; grid-template-columns: 1.8fr 1fr; gap: 24px; padding: 0 32px 32px 32px;">
                <!-- Watchlist Table -->
                <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 class="font-semibold" style="font-size: 0.95rem; color: var(--inv-text-primary);">â­ Monitored Opportunities (${deals.length})</h3>
                    </div>
                    
                    <!-- Semantic Filters -->
                    <div style="display: flex; gap: 8px; margin-bottom: 20px;">
                        <button class="btn btn-sm action-btn wl-filter-btn" data-action="wl-filter" data-filter="recent" style="border-radius: 16px; padding: 4px 12px; font-size: 0.7rem; background: ${filter === 'recent' ? 'var(--inv-accent)' : 'var(--inv-surface-2)'}; color: ${filter === 'recent' ? '#fff' : 'var(--inv-text-primary)'}; border: none;">Recently Updated</button>
                        <button class="btn btn-sm action-btn wl-filter-btn" data-action="wl-filter" data-filter="review" style="border-radius: 16px; padding: 4px 12px; font-size: 0.7rem; background: ${filter === 'review' ? 'var(--inv-accent)' : 'var(--inv-surface-2)'}; color: ${filter === 'review' ? '#fff' : 'var(--inv-text-primary)'}; border: none;">Needs Review</button>
                        <button class="btn btn-sm action-btn wl-filter-btn" data-action="wl-filter" data-filter="priority" style="border-radius: 16px; padding: 4px 12px; font-size: 0.7rem; background: ${filter === 'priority' ? 'var(--inv-accent)' : 'var(--inv-surface-2)'}; color: ${filter === 'priority' ? '#fff' : 'var(--inv-text-primary)'}; border: none;">High Priority</button>
                        <button class="btn btn-sm action-btn wl-filter-btn" data-action="wl-filter" data-filter="all" style="border-radius: 16px; padding: 4px 12px; font-size: 0.7rem; background: transparent; border: 1px solid ${filter === 'all' ? 'var(--inv-premium)' : 'var(--inv-divider)'}; color: ${filter === 'all' ? 'var(--inv-premium)' : 'var(--inv-text-secondary)'};">Clear Filters</button>
                    </div>

                    <div style="overflow-x: auto;">
                        <table class="wl-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--inv-divider);">
                                    <th style="padding: 10px; color: var(--inv-text-secondary); font-size: 0.75rem; text-align: left;">Startup</th>
                                    <th style="padding: 10px; color: var(--inv-text-secondary); font-size: 0.75rem; text-align: left;">Thesis Fit</th>
                                    <th style="padding: 10px; color: var(--inv-text-secondary); font-size: 0.75rem; text-align: left;">Match Score</th>
                                    <th style="padding: 10px; color: var(--inv-text-secondary); font-size: 0.75rem; text-align: right;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${deals.length === 0 ? `
                                    <tr>
                                        <td colspan="4" style="padding: 24px; text-align: center; color: var(--inv-text-secondary);">
                                            No opportunities found for the selected filter.
                                        </td>
                                    </tr>
                                ` : deals.map(d => `
                                    <tr style="border-bottom: 1px solid var(--inv-divider); cursor: pointer;" class="wl-row ${this.state.selectedDealId === d.id ? 'selected' : ''}" data-id="${d.id}">
                                        <td style="padding: 12px 10px;">
                                            <div style="font-weight: 600; color: var(--inv-text-primary);">${d.name}</div>
                                            <div class="text-xs text-muted">${d.stage} â€¢ ${d.sector}</div>
                                        </td>
                                        <td style="padding: 12px 10px; color: var(--inv-text-secondary); font-size: 0.75rem;">
                                            ${d.thesis || 'Direct Sector Fit'}
                                        </td>
                                        <td style="padding: 12px 10px;">
                                            <span style="font-size: 0.75rem; background: rgba(94, 143, 99, 0.1); border: 1px solid rgba(94, 143, 99, 0.3); color: var(--inv-success); padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                                                ${d.match}%
                                            </span>
                                        </td>
                                        <td style="padding: 12px 10px; text-align: right;">
                                            <div style="display: flex; gap: 6px; justify-content: flex-end;">
                                                <button class="btn btn-outline btn-xs action-btn" data-action="pass" data-id="${d.id}" style="border-color: var(--inv-error); color: var(--inv-error); font-size: 0.68rem; padding: 3px 6px;">Pass</button>
                                                <button class="btn btn-primary btn-xs action-btn" data-action="request_intro" data-id="${d.id}" style="font-size: 0.68rem; padding: 3px 6px;">Promote to Active</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Watchlist Chronological Logs --><!-- Watchlist Chronological Logs -->
                <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 20px;">
                    <h3 class="font-semibold mb-4" style="font-size: 0.95rem; color: var(--inv-text-primary);">📅 Watchlist Activity Feed</h3>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        ${logs.map(log => `
                            <div style="display: flex; gap: 12px; font-size: 0.78rem; border-bottom: 1px dashed var(--inv-divider); padding-bottom: 12px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--inv-surface-2); display: flex; align-items: center; justify-content: center; font-size: 0.85rem;">
                                    ${log.icon}
                                </div>
                                <div style="flex: 1;">
                                    <span style="font-weight: 600; color: var(--inv-text-primary);">${log.startup}:</span>
                                    <span style="color: var(--inv-text-secondary);">${log.event}</span>
                                    <div class="text-xs text-muted" style="margin-top: 4px; font-size: 0.68rem;">${log.time}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        return html;
    }

        getKanbanHtml() {
        const deals = this.getDealsForTab('deals');
        // Mock a live deal for demonstration of Kanban improvements
        if (deals.length > 0 && !deals.find(d => d.status === 'live_deals')) {
            const dToMove = deals.find(d => d.status === 'diligence');
            if (dToMove) { dToMove.status = 'live_deals'; dToMove.closingDate = 'Oct 15, 2026'; }
        }

        const cols = [
            { id: 'interest_sent', title: 'Interest Sent', benchmark: '85% conversion to intro' }, 
            { id: 'intro_review', title: 'Intro Under Review', benchmark: '4.2 days avg duration' }, 
            { id: 'diligence', title: 'Due Diligence', benchmark: '15.2 days avg duration' },
            { id: 'live_deals', title: 'Live Deals', benchmark: 'Closing imminent' }
        ];

        const activeFilterStage = this.state.dealsFilterStage;

        let html = `
            <div class="view-header" style="margin-bottom: 0; padding-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div>
                        <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--inv-text-primary);">Active Pipeline</h1>
                        <p class="text-sm text-muted mt-1">Manage negotiation stages, VDR checklists, and founder response SLAs.</p>
                    </div>
                    <div class="flex items-center gap-2" style="background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); padding: 6px 12px; border-radius: 6px; font-size: 0.72rem;">
                        <span style="color: var(--inv-accent); font-weight: bold;">âš¡ Funnel Velocity:</span>
                        <span style="color: var(--inv-text-secondary);">12.7 days sourced-to-diligence (benchmark: 16 days)</span>
                    </div>
                </div>
            </div>
            
            <div class="kanban-board" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; overflow-x: auto; padding-bottom: 24px;">
        `;

        cols.forEach(col => {
            const colDeals = deals.filter(d => d.status === col.id);
            const isHighlightedColumn = activeFilterStage === col.id;
            const columnStyle = isHighlightedColumn ? 'border-color: var(--inv-accent); background: rgba(47, 107, 94, 0.05);' : '';

            html += `
                <div class="kanban-col" style="background: rgba(255,255,255,0.01); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 12px; ${columnStyle}">
                    <div class="kanban-header" style="display:flex; flex-direction:column; gap:4px; margin-bottom:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; font-weight:600; font-size:0.9rem;">
                            <span style="color: var(--inv-text-primary);">${col.title}</span>
                            <span style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; color: var(--inv-text-primary); border: 1px solid var(--inv-divider);">${colDeals.length}</span>
                        </div>
                        <span style="font-size: 0.65rem; color: var(--inv-text-secondary); font-style: italic;">${col.benchmark}</span>
                    </div>
            `;

            colDeals.forEach(d => {
                let contextActionHtml = '';
                if (d.status === 'interest_sent') {
                    contextActionHtml = `
                        <div style="margin-top: 10px; display: flex; gap: 8px;">
                            <button class="btn btn-outline btn-sm action-btn" data-action="ping-founder" data-id="${d.id}" style="flex: 1; font-size: 0.7rem; padding: 4px 8px; border-color: var(--inv-divider);">Ping Founder</button>
                            <button class="btn btn-outline btn-sm action-btn" data-action="pass" data-id="${d.id}" style="border-color: rgba(239, 68, 68, 0.3); color: var(--inv-error); background: rgba(239, 68, 68, 0.05); font-size: 0.7rem; padding: 4px 8px;">Pass</button>
                        </div>
                        <div style="font-size: 0.65rem; color: var(--inv-warning); margin-top: 8px; background: rgba(245, 158, 11, 0.1); padding: 4px 6px; border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.2);">â³ Responsiveness: ${d.responsiveness}</div>
                    `;
                } else if (d.status === 'intro_review') {
                    contextActionHtml = `
                        <div style="margin-top: 10px; display: flex; gap: 8px;">
                            <button class="btn btn-primary btn-sm action-btn" data-action="schedule-intro" data-id="${d.id}" style="flex: 1; font-size: 0.7rem; padding: 4px 8px;">Schedule Meeting</button>
                        </div>
                        <div style="font-size: 0.65rem; color: var(--inv-success); margin-top: 8px; background: rgba(94, 143, 99, 0.1); padding: 4px 6px; border-radius: 4px; border: 1px solid rgba(94, 143, 99, 0.2);">ðŸ“… Next: Intro call ready</div>
                    `;
                } else if (d.status === 'diligence') {
                    let missingAlert = '';
                    if (d.diligenceMetrics && d.diligenceMetrics.missingFiles.length > 0) {
                        missingAlert = `<div style="font-size: 0.65rem; color: var(--inv-error); background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 4px 6px; border-radius: 4px; margin-top: 8px;">âš ï¸ Missing ${d.diligenceMetrics.missingFiles.length} Files</div>`;
                    }
                    contextActionHtml = `
                        <div style="margin-top: 10px; display: flex; gap: 8px;">
                            <button class="btn btn-outline btn-sm action-btn" data-action="open_vdr" data-id="${d.id}" style="flex: 1; border-color: var(--inv-accent); color: var(--inv-accent); font-size: 0.7rem; padding: 4px 8px;">Review Docs</button>
                        </div>
                        ${missingAlert}
                    `;
                } else if (d.status === 'live_deals') {
                    contextActionHtml = `
                        <div style="margin-top: 10px; display: flex; gap: 8px;">
                            <button class="btn btn-primary btn-sm action-btn" data-action="issue-term-sheet" data-id="${d.id}" style="flex: 1; font-size: 0.7rem; padding: 4px 8px; background: var(--inv-success);">Issue Term Sheet</button>
                        </div>
                        <div style="font-size: 0.65rem; color: var(--inv-success); margin-top: 8px; font-weight: bold; background: rgba(94, 143, 99, 0.1); padding: 4px 6px; border-radius: 4px; border: 1px solid rgba(94, 143, 99, 0.2);">ðŸŽ¯ Closing Date: ${d.closingDate || 'TBD'}</div>
                    `;
                }

                html += `
                    <div class="kanban-card ${this.state.selectedDealId === d.id ? 'selected' : ''}" data-id="${d.id}" style="padding: 14px; background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        <div class="flex justify-between mb-3" style="align-items: flex-start;">
                            <div>
                                <div class="font-semibold text-sm" style="color: var(--inv-text-primary); margin-bottom: 2px;">${d.name}</div>
                                <div style="font-size: 0.65rem; color: var(--inv-text-secondary);">${d.sector} â€¢ ${d.stage}</div>
                            </div>
                            <div style="background: rgba(201, 162, 39, 0.1); border: 1px solid var(--inv-premium); color: var(--inv-premium); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: bold;">â˜… ${d.match}%</div>
                        </div>
                        <div style="display: flex; gap: 12px; font-size: 0.7rem; color: var(--inv-text-primary); margin-bottom: 8px; border-top: 1px dashed var(--inv-divider); padding-top: 8px;">
                            <div><span class="text-muted">Ask:</span> <strong>${d.ask}</strong></div>
                            <div><span class="text-muted">Rev:</span> <strong style="color: var(--inv-success);">${d.revenue}</strong></div>
                        </div>
                        
                        <!-- Contextual Action Layer -->
                        <div style="border-top: 1px solid var(--inv-divider); padding-top: 4px; margin-top: 8px;">
                            ${contextActionHtml}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        });
        return html + `</div>`;


    }

    getMeetingsHtml() {
        const meetings = this.state.meetings || [];
        const filter = this.state.meetingsFilter || 'upcoming';
        const search = (this.state.meetingsSearch || '').toLowerCase();

        // Apply filters & search
        const filteredMeetings = meetings.filter(m => {
            const matchesSearch = m.startupName.toLowerCase().includes(search) || 
                                 m.title.toLowerCase().includes(search) || 
                                 (m.attendees && m.attendees.founder.toLowerCase().includes(search));
            
            const isHistorical = m.status === 'completed' || m.status === 'cancelled';
            if (filter === 'upcoming') {
                return matchesSearch && !isHistorical;
            } else {
                return matchesSearch && isHistorical;
            }
        });

        // Sync Status Bar
        let syncStatusHtml = '';
        if (this.state.calendarSyncStatus === 'error') {
            syncStatusHtml = `
                <div class="calendar-sync-banner error" style="background: var(--danger-soft); border: 1px solid var(--danger); padding: 10px 14px; border-radius: 6px; margin: 16px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; color: var(--danger);">
                    <span>${this.getIcon('INFO')} Calendar sync failed (Auth expired)</span>
                    <button class="btn btn-sm btn-outline reconnect-calendar-btn" style="padding: 2px 6px; font-size: 0.65rem; border-color: var(--danger); color: var(--danger); background: var(--danger-soft); font-weight: 600;">Reconnect</button>
                </div>
            `;
        } else if (this.state.calendarSyncStatus === 'loading') {
            syncStatusHtml = `
                <div class="calendar-sync-banner loading" style="background: var(--warning-soft); border: 1px solid var(--warning); padding: 10px 14px; border-radius: 6px; margin: 16px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; color: var(--warning);">
                    <span>${this.getIcon('LOADING')} Syncing Google Calendar...</span>
                </div>
            `;
        } else {
            syncStatusHtml = `
                <div class="calendar-sync-banner synced" style="background: var(--success-soft); border: 1px solid var(--success); padding: 10px 14px; border-radius: 6px; margin: 16px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; color: var(--success);">
                    <span>${this.getIcon('CHECK')} Calendar Synced (Google Calendar)</span>
                    <span style="font-size: 0.65rem; opacity: 0.7; font-weight: 600; cursor: pointer;" class="disconnect-calendar-btn" title="Disconnect sync for test validation">[Disconnect]</span>
                </div>
            `;
        }

        // Left sidebar meetings list
        let queueHtml = '';
        if (filteredMeetings.length === 0) {
            queueHtml = `
                <div class="flex flex-col items-center justify-center text-muted" style="min-height: 200px; padding: 24px; text-align: center;">
                    <div style="font-size: 1.5rem; margin-bottom: 8px;">${this.getIcon('CALENDAR')}</div>
                    <div style="font-size: 0.8rem; font-weight: 500;">No meetings found</div>
                    <div style="font-size: 0.7rem; opacity: 0.6; margin-top: 4px;">Try checking another tab or clearing search.</div>
                </div>
            `;
        } else {
            filteredMeetings.forEach(m => {
                const isSelected = this.state.selectedMeetingId === m.id;
                
                // Status badge logic
                let badgeClass = 'badge';
                let statusLabel = m.status.toUpperCase();
                if (m.status === 'confirmed') {
                    badgeClass = 'badge badge-success';
                } else if (m.status === 'pending') {
                    badgeClass = 'badge badge-warning';
                } else if (m.status === 'rescheduled') {
                    badgeClass = 'badge badge-info';
                } else if (m.status === 'completed') {
                    badgeClass = 'badge badge-secondary';
                } else if (m.status === 'cancelled') {
                    badgeClass = 'badge badge-danger';
                }

                queueHtml += `
                    <div class="meeting-list-card ${isSelected ? 'selected' : ''}" data-id="${m.id}" style="padding: 16px; border: 1px solid ${isSelected ? 'var(--brand-secondary)' : 'var(--inv-divider)'}; background: ${isSelected ? 'var(--brand-secondary-soft)' : 'rgba(255,255,255,0.01)'}; border-radius: 8px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; box-shadow: ${isSelected ? 'var(--shadow-glow)' : 'none'};">
                        <div class="flex justify-between items-start mb-2">
                            <span style="font-size: 0.68rem; color: var(--inv-text-secondary); font-weight: 500;">${m.time}</span>
                            <span class="${badgeClass}" style="font-size: 0.58rem; padding: 2px 6px; border-radius: 4px;">${statusLabel}</span>
                        </div>
                        <h4 style="font-size: 0.85rem; font-weight: 600; color: var(--inv-text-primary); margin-bottom: 4px;">${m.startupName}</h4>
                        <div class="text-xs text-muted mb-2">${m.title}</div>
                        <div class="text-xs text-secondary flex items-center gap-2">
                            <span>via ${m.platform}</span>
                            <span>•</span>
                            <span>${m.duration}</span>
                        </div>
                    </div>
                `;
            });
        }

        // Selected Meeting Workspace details
        const m = meetings.find(x => x.id === this.state.selectedMeetingId) || filteredMeetings[0] || meetings[0];
        let workspaceHtml = '';

        if (!m) {
            workspaceHtml = `
                <div class="flex flex-col items-center justify-center text-muted h-full" style="min-height: 400px;">
                    <div style="font-size: 3rem; margin-bottom: 16px;">${this.getIcon('CALENDAR')}</div>
                    <h3>No Meeting Selected</h3>
                    <p style="font-size: 0.85rem; max-width: 320px; text-align: center; margin-top: 8px;">Select a meeting from the calendar column to open the workspace.</p>
                </div>
            `;
        } else {
            // Diligence Checklist HTML
            let checklistHtml = '';
            if (m.prepChecklist && m.prepChecklist.length > 0) {
                m.prepChecklist.forEach((item, idx) => {
                    checklistHtml += `
                        <div class="prep-checklist-item" data-meeting-id="${m.id}" data-idx="${idx}" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: background 0.2s;">
                            <input type="checkbox" ${item.done ? 'checked' : ''} style="cursor: pointer; accent-color: var(--inv-accent);">
                            <span style="text-decoration: ${item.done ? 'line-through' : 'none'}; color: ${item.done ? 'var(--inv-text-secondary)' : 'var(--inv-text-primary)'};">${item.task}</span>
                        </div>
                    `;
                });
            } else {
                checklistHtml = `<div class="text-xs text-muted italic">No preparation items defined for this meeting type.</div>`;
            }

            // Post-Meeting CRM Sync check
            const linkedDeal = this.state.deals.find(d => d.id === m.dealId);
            const currentConviction = linkedDeal ? (linkedDeal.convictionScore || 0) : (m.convictionLog || 0);
            
            // Diligence Context Summary
            let diligenceStateHtml = '';
            if (linkedDeal) {
                let vdrBadgeStyle = '';
                if (linkedDeal.vaultState === 'unlocked') {
                    vdrBadgeStyle = 'color: var(--inv-success); font-weight: bold;';
                } else if (linkedDeal.vaultState === 'requested') {
                    vdrBadgeStyle = 'color: var(--inv-warning); font-weight: bold;';
                } else {
                    vdrBadgeStyle = 'color: var(--inv-text-secondary); font-weight: bold;';
                }

                diligenceStateHtml = `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div class="flex justify-between" style="font-size: 0.75rem;">
                            <span class="text-muted">Data Room Access:</span>
                            <span style="${vdrBadgeStyle}">${linkedDeal.vaultState.toUpperCase()}</span>
                        </div>
                        <div class="flex justify-between" style="font-size: 0.75rem;">
                            <span class="text-muted">Completed Reviews:</span>
                            <strong>${linkedDeal.diligenceMetrics.completedReviews} / ${linkedDeal.diligenceMetrics.totalExpected} Docs</strong>
                        </div>
                        <div class="flex justify-between" style="font-size: 0.75rem;">
                            <span class="text-muted">Missing Materials:</span>
                            <span style="color: ${linkedDeal.diligenceMetrics.missingFiles.length > 0 ? 'var(--inv-error)' : 'var(--inv-success)'};">
                                ${linkedDeal.diligenceMetrics.missingFiles.length} outstanding
                            </span>
                        </div>
                    </div>
                `;
            } else {
                diligenceStateHtml = `
                    <div class="text-xs text-muted">No linked active opportunity. Briefing is portfolio-only.</div>
                `;
            }

            // Status Badge
            let statusBadge = '';
            if (m.status === 'confirmed') {
                statusBadge = `<span class="badge badge-success" style="padding: 3px 10px; font-size: 0.65rem;">CONFIRMED</span>`;
            } else if (m.status === 'pending') {
                statusBadge = `<span class="badge badge-warning" style="padding: 3px 10px; font-size: 0.65rem;">PENDING CONFIRMATION</span>`;
            } else if (m.status === 'rescheduled') {
                statusBadge = `<span class="badge badge-info" style="padding: 3px 10px; font-size: 0.65rem;">RESCHEDULED</span>`;
            } else if (m.status === 'completed') {
                statusBadge = `<span class="badge badge-secondary" style="padding: 3px 10px; font-size: 0.65rem;">COMPLETED</span>`;
            } else if (m.status === 'cancelled') {
                statusBadge = `<span class="badge badge-danger" style="padding: 3px 10px; font-size: 0.65rem;">CANCELLED</span>`;
            }

            // Primary Zoom CTA button
            let ctaButtonHtml = '';
            if (m.status === 'cancelled') {
                ctaButtonHtml = `<button class="btn btn-outline" disabled style="opacity: 0.5; cursor: not-allowed;">Meeting Cancelled</button>`;
            } else if (m.status === 'completed') {
                ctaButtonHtml = `<button class="btn btn-outline" style="border-color: var(--inv-success); color: var(--inv-success); cursor: default;">✓ Session Completed</button>`;
            } else if (!m.platformUrl) {
                ctaButtonHtml = `
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                        <button class="btn btn-outline meetings-cta-action-btn" data-action="request-zoom-link" data-id="${m.id}" style="border-color: var(--inv-warning); color: var(--inv-warning); font-size: 0.75rem;">${this.getIcon('INFO')} Request Zoom Link</button>
                    </div>
                `;
            } else {
                ctaButtonHtml = `<a href="${m.platformUrl}" target="_blank" class="btn btn-primary" style="background: var(--inv-accent); color:#fff; font-weight:700; border-radius: 6px;">Join Zoom Call</a>`;
            }

            workspaceHtml = `
                <!-- Meeting Workspace Container -->
                <div class="flex justify-between items-start mb-6" style="padding-bottom: 20px; border-bottom: 1px solid var(--inv-divider);">
                    <div>
                        <div class="flex items-center gap-3 mb-2" style="flex-wrap: wrap;">
                            <h1 style="font-size: 1.75rem; font-weight: 600; color: var(--inv-text-primary); margin:0;">${m.startupName}</h1>
                            ${statusBadge}
                        </div>
                        <div class="text-sm text-muted" style="margin-bottom: 4px;">${m.title}</div>
                        <div class="text-xs text-secondary">${m.time} • ${m.duration} via ${m.platform}</div>
                    </div>
                    <div>
                        ${ctaButtonHtml}
                    </div>
                </div>

                <!-- Attendee Info Card -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                    <h3 class="text-xs font-semibold mb-3 uppercase text-muted" style="letter-spacing: 0.5px;">Attendees & Roles</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                        <div class="flex items-center gap-2">
                            <span style="font-size: 1.2rem;">${this.getIcon('PHONE')}</span>
                            <div>
                                <div class="text-xs text-muted">Founder / Speaker</div>
                                <div class="text-sm font-semibold">${m.attendees.founder}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span style="font-size: 1.2rem;">${this.getIcon('FILE')}</span>
                            <div>
                                <div class="text-xs text-muted">Lead Partner</div>
                                <div class="text-sm font-semibold">${m.attendees.partner}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span style="font-size: 1.2rem;">${this.getIcon('ADMIN')}</span>
                            <div>
                                <div class="text-xs text-muted">Admin Coordinator</div>
                                <div class="text-sm font-semibold">${m.attendees.coordinator}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Split Prep Section -->
                <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; margin-bottom: 24px;">
                    <div class="flex flex-col gap-4">
                        <!-- Objective -->
                        <div style="background: var(--inv-surface); padding: 20px; border-radius: 8px; border: 1px solid var(--inv-divider); flex: 1;">
                            <h3 class="text-xs font-semibold mb-2 uppercase text-muted" style="letter-spacing: 0.5px;">Objective</h3>
                            <p class="text-sm" style="line-height: 1.5; color: var(--inv-text-primary);">${m.objective}</p>
                        </div>
                        <!-- Team Context -->
                        <div style="background: var(--inv-surface); padding: 20px; border-radius: 8px; border: 1px solid var(--inv-divider); flex: 1;">
                            <h3 class="text-xs font-semibold mb-2 uppercase text-muted" style="letter-spacing: 0.5px;">Team Context</h3>
                            <p class="text-sm" style="line-height: 1.5; color: var(--inv-text-primary);">${m.teamContext}</p>
                        </div>
                    </div>

                    <!-- Prep Checklist & Diligence -->
                    <div style="background: var(--inv-surface); padding: 20px; border-radius: 8px; border: 1px solid var(--inv-divider); display: flex; flex-direction: column; gap: 16px;">
                        <div>
                            <h3 class="text-xs font-semibold mb-2 uppercase text-muted" style="letter-spacing: 0.5px;">Prep Checklist</h3>
                            <div class="flex flex-col gap-2">
                                ${checklistHtml}
                            </div>
                        </div>

                        <div style="border-top: 1px dashed var(--inv-divider); padding-top: 16px;">
                            <h3 class="text-xs font-semibold mb-2 uppercase text-muted" style="letter-spacing: 0.5px;">Diligence & Matching Context</h3>
                            <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                                <div style="background: rgba(0,0,0,0.15); border: 1px solid var(--inv-divider); border-radius: 6px; padding: 12px;">
                                    ${diligenceStateHtml}
                                </div>
                                <div style="font-size: 0.72rem; line-height: 1.4; color: var(--inv-text-secondary); background: rgba(255,255,255,0.02); padding: 10px; border-radius: 6px;">
                                    <strong>Previous Interaction:</strong> ${m.previousInteractions}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Live Notes workspace with Autocomplete Templates -->
                <div style="background: var(--inv-surface); border: 1px solid var(--inv-divider); border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--inv-divider);">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <h3 class="text-xs font-semibold uppercase text-muted" style="margin: 0; letter-spacing: 0.5px;">Live Meeting Notes</h3>
                            <select id="meetingTemplateSelector" data-meeting-id="${m.id}" style="background: var(--inv-surface-2); border: 1px solid var(--inv-divider); border-radius: 4px; color: var(--inv-text-primary); font-size: 0.72rem; padding: 2px 6px; outline: none; cursor: pointer;">
                                <option value="" disabled selected>Load Template...</option>
                                <option value="default">Default Prep Template</option>
                                <option value="tech">Technical Audit Template</option>
                                <option value="gtm">GTM & Traction Template</option>
                                <option value="blank">Blank Sheet</option>
                            </select>
                        </div>
                        <div id="notesSaveIndicator" style="font-size: 0.7rem; color: var(--inv-text-secondary); display: flex; align-items: center; gap: 6px;">
                            <span id="notesIndicatorDot" style="width: 6px; height: 6px; border-radius: 50%; background: var(--inv-success);"></span>
                            <span id="notesIndicatorText">${this.getIcon('CHECK')} Autosaved</span>
                        </div>
                    </div>
                    <div style="padding: 16px;">
                        <textarea id="meetingLiveNotesArea" data-meeting-id="${m.id}" placeholder="Type notes here... autosaves to state. Selecting a template will overwrite current notes." style="width: 100%; height: 180px; background: transparent; border: none; color: var(--inv-text-primary); resize: none; outline: none; font-family: 'Inter', sans-serif; font-size: 0.825rem; line-height: 1.6;">${m.notes || ''}</textarea>
                    </div>
                </div>

                <!-- Post-Meeting Decisions Dashboard Handoff -->
                <div style="background: rgba(201, 162, 39, 0.03); border: 1px dashed var(--inv-accent); border-radius: 8px; padding: 20px;">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xs font-semibold uppercase text-accent" style="color: var(--inv-premium); letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px; margin: 0;">
                            <span>${this.getIcon('INFO')}</span> Post-Meeting CRM Decisive Capture
                        </h3>
                        <div style="display: flex; gap: 8px;">
                            ${linkedDeal ? `
                                <button class="btn btn-sm btn-outline meetings-cta-action-btn" data-action="reschedule-meeting" data-id="${m.id}" style="font-size: 0.7rem; padding: 4px 8px;">${this.getIcon('INFO')} Reschedule Meeting</button>
                                <button class="btn btn-sm btn-outline meetings-cta-action-btn" data-action="view-profile" data-id="${m.dealId}" style="font-size: 0.7rem; padding: 8px 12px;">${this.getIcon('INFO')} View Founder Profile</button>
                                <button class="btn btn-sm btn-outline meetings-cta-action-btn" data-action="open-diligence" data-id="${m.dealId}" style="font-size: 0.7rem; padding: 4px 8px;">${this.getIcon('INFO')} Open Diligence Context</button>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: start;">
                        <!-- Conviction log slider -->
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span style="font-size: 0.78rem; font-weight: 600; color: var(--inv-text-primary);">Log Internal Conviction Rating</span>
                                <strong id="convictionSliderDisplay" style="color: var(--inv-premium); font-size: 1rem;">${currentConviction}/10</strong>
                            </div>
                            <div class="flex items-center gap-3">
                                <input type="range" id="postConvictionSlider" min="1" max="10" value="${currentConviction || 5}" style="flex: 1; accent-color: var(--inv-accent); cursor: pointer;">
                                <button class="btn btn-primary btn-sm meetings-cta-action-btn" data-action="log-conviction" data-meeting-id="${m.id}" data-deal-id="${m.dealId}" style="white-space: nowrap; padding: 6px 12px; font-size: 0.72rem;">Log Score</button>
                            </div>
                            <div class="text-xs text-muted mt-2">Log updates conviction tag in the pipeline tracker.</div>
                        </div>

                        <!-- Quick pipeline sync options -->
                        <div>
                            <div style="font-size: 0.78rem; font-weight: 600; color: var(--inv-text-primary); margin-bottom: 8px;">Trigger CRM Handoff Action</div>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${linkedDeal && linkedDeal.status !== 'interest_sent' ? `
                                    <button class="btn btn-outline btn-sm meetings-cta-action-btn" data-action="request_intro" data-id="${m.dealId}" style="font-size: 0.72rem; padding: 6px 12px;">Request Intro</button>
                                ` : ''}
                                ${linkedDeal && linkedDeal.vaultState !== 'unlocked' ? `
                                    <button class="btn btn-outline btn-sm meetings-cta-action-btn" data-action="request_vdr" data-id="${m.dealId}" style="border-color: var(--inv-warning); color: var(--inv-warning); font-size: 0.72rem; padding: 6px 12px;">Request VDR</button>
                                ` : ''}
                                ${linkedDeal && linkedDeal.status !== 'pass' ? `
                                    <button class="btn btn-outline btn-sm meetings-cta-action-btn" data-action="pass" data-id="${m.dealId}" style="border-color: var(--inv-error); color: var(--inv-error); font-size: 0.72rem; padding: 6px 12px;">Pass</button>
                                ` : ''}
                                <button class="btn btn-outline btn-sm meetings-cta-action-btn" data-action="follow-up-meeting" data-id="${m.dealId}" style="font-size: 0.72rem; padding: 6px 12px;">Schedule Follow-up</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="flex h-full" style="height: 100vh; overflow: hidden; background: var(--inv-bg);">
                <!-- Calendar Column -->
                <div class="inv-calendar-sidebar" style="flex: 0 0 360px; border-right: 1px solid var(--inv-divider); display: flex; flex-direction: column; background: var(--inv-surface); height: 100%;">
                    
                    <!-- Search and filters -->
                    <div style="padding: 20px 24px; border-bottom: 1px solid var(--inv-divider);">
                        <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: var(--inv-text-primary);">Meeting Manager</h2>
                        <div class="flex items-center gap-2 mb-3" style="width: 100%;">
                            <input type="text" id="meetingsSearchInput" value="${this.state.meetingsSearch || ''}" placeholder="Search meetings or founders..." style="flex: 1; padding: 8px 12px; font-size: 0.8rem; background: var(--inv-surface-2); border: 1px solid var(--inv-divider); border-radius: 6px; color: var(--inv-text-primary); outline: none;">
                        </div>
                        <div class="flex gap-2" style="background: rgba(255,255,255,0.02); border: 1px solid var(--inv-divider); border-radius: 6px; padding: 2px;">
                            <button class="meetings-filter-btn ${filter === 'upcoming' ? 'active' : ''}" data-filter="upcoming" style="flex: 1; background: ${filter === 'upcoming' ? 'var(--inv-accent)' : 'transparent'}; border: none; border-radius: 4px; padding: 6px 0; font-size: 0.75rem; color: ${filter === 'upcoming' ? '#fff' : 'var(--inv-text-secondary)'}; font-weight: 600; cursor: pointer; transition: all 0.2s; outline: none;">Upcoming</button>
                            <button class="meetings-filter-btn ${filter === 'history' ? 'active' : ''}" data-filter="history" style="flex: 1; background: ${filter === 'history' ? 'var(--inv-accent)' : 'transparent'}; border: none; border-radius: 4px; padding: 6px 0; font-size: 0.75rem; color: ${filter === 'history' ? '#fff' : 'var(--inv-text-secondary)'}; font-weight: 600; cursor: pointer; transition: all 0.2s; outline: none;">History</button>
                        </div>
                    </div>

                    <!-- Sync Banner Alert -->
                    ${syncStatusHtml}

                    <!-- Meetings list queue scrollable -->
                    <div style="flex: 1; overflow-y: auto; padding: 0 24px 24px 24px;">
                        ${queueHtml}
                    </div>
                </div>

                <!-- Meeting Workspace -->
                <div style="flex: 1; padding: 40px; background: var(--inv-bg); overflow-y: auto; height: 100%;">
                    ${workspaceHtml}
                </div>
            </div>
        `;
    }

    getRightRailHtml() {
        if (!this.state.selectedDealId || ['home', 'portfolio', 'insights', 'meetings'].includes(this.state.activeTab)) {
            return `<div class="flex items-center justify-center h-full text-muted">No selection</div>`;
        }

        const deal = this.state.deals.find(d => d.id === this.state.selectedDealId);
        if (!deal) return `<div class="flex items-center justify-center h-full text-muted">No selection</div>`;

        let vdrHtml = '';
        if (deal.vdrFiles && deal.vdrFiles.length > 0) {
            let filesHtml = '';
            deal.vdrFiles.forEach(f => {
                let fileAction = '';
                let fileIcon = 'ðŸ“„';
                if (f.name.endsWith('.pdf')) fileIcon = 'ðŸ“‘';
                else if (f.name.endsWith('.xlsx') || f.name.endsWith('.xls')) fileIcon = 'ðŸ“Š';

                let fileStateLabel = '';
                if (deal.vaultState === 'unlocked' || f.state === 'unlocked') {
                    fileStateLabel = `<span style="color: var(--inv-success); font-size: 0.75rem;">Open â¤“</span>`;
                    fileAction = `style="cursor: pointer;" class="vdr-file-link" data-name="${f.name}" data-deal-id="${deal.id}"`;
                } else if (deal.vaultState === 'requested' || f.state === 'requested') {
                    fileStateLabel = `<span style="color: var(--inv-warning); font-size: 0.75rem;">Requested â³</span>`;
                } else {
                    fileStateLabel = `<span style="color: var(--inv-text-secondary); font-size: 0.75rem;">Locked ðŸ”’</span>`;
                    fileAction = `class="vdr-file-locked" data-name="${f.name}" data-deal-id="${deal.id}" style="cursor: pointer;"`;
                }

                filesHtml += `
                    <div class="vdr-item" ${fileAction}>
                        <div>
                            <span style="font-weight: 500; color: var(--inv-text-primary);">${fileIcon} ${f.name}</span>
                            <div class="text-xs text-muted" style="margin-top: 2px;">${f.size} â€¢ ${f.uploaded}</div>
                        </div>
                        ${fileStateLabel}
                    </div>
                `;
            });

            if (deal.vaultState === 'unlocked') {
                vdrHtml = `
                    <div class="panel-section" style="background: rgba(94, 143, 99, 0.05); border-bottom: 1px solid var(--inv-success);">
                        <div class="panel-title" style="color: var(--inv-success); display:flex; justify-content:space-between; align-items:center;">
                            <span>Virtual Data Room</span>
                            <span style="font-size: 0.65rem; background: rgba(94, 143, 99, 0.2); padding: 2px 6px; border-radius: 4px;">UNLOCKED</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            ${filesHtml}
                        </div>
                        <button class="btn btn-outline btn-sm w-full mt-3" id="requestCustomDocBtn" data-id="${deal.id}" style="width: 100%; margin-top: 12px; border-color: var(--inv-success); color: var(--inv-success);">Request Custom Document</button>
                    </div>
                `;
            } else if (deal.vaultState === 'requested') {
                vdrHtml = `
                    <div class="panel-section" style="background: rgba(245, 158, 11, 0.05); border-bottom: 1px solid var(--inv-warning);">
                        <div class="panel-title" style="color: var(--inv-warning); display:flex; justify-content:space-between; align-items:center;">
                            <span>Virtual Data Room</span>
                            <span style="font-size: 0.65rem; background: rgba(245, 158, 11, 0.2); padding: 2px 6px; border-radius: 4px;">PENDING ACCESS</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:8px; opacity: 0.6; pointer-events: none;">
                            ${filesHtml}
                        </div>
                        <button class="btn btn-primary btn-sm w-full mt-3 action-btn" data-action="nudge-vdr" data-id="${deal.id}" style="width: 100%; margin-top: 12px; background: var(--inv-warning); border-color: var(--inv-warning); color: #000;">Nudge Founder for Access</button>
                    </div>
                `;
            } else {
                vdrHtml = `
                    <div class="panel-section" style="background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--inv-divider);">
                        <div class="panel-title" style="color: var(--inv-text-secondary); display:flex; justify-content:space-between; align-items:center;">
                            <span>Virtual Data Room</span>
                            <span style="font-size: 0.65rem; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--inv-divider);">${this.getIcon('INFO')} LOCKED</span>
                        </div>
                        <div style="padding: 12px; background: rgba(0,0,0,0.2); border: 1px dashed var(--inv-divider); border-radius: 6px; text-align: center; margin-bottom: 12px;">
                            <p style="font-size: 0.75rem; color: var(--inv-text-secondary); line-height: 1.4; margin: 0;">The startup's financial modeling and contracts vault is secure. Request access to begin deep diligence.</p>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:8px; opacity: 0.6; pointer-events: none;">
                            ${filesHtml}
                        </div>
                        <button class="btn btn-primary btn-sm w-full mt-3 action-btn" data-action="request_vdr" data-id="${deal.id}" style="width: 100%; margin-top: 12px; background: var(--inv-accent);">Request Vault Access</button>
                    </div>
                `;
            }
        }

        let activityHtml = '';
        if (deal.crmActivity && deal.crmActivity.length > 0) {
            let timelineItems = '';
            deal.crmActivity.forEach(act => {
                timelineItems += `
                    <div style="display: flex; gap: 10px; font-size: 0.75rem; margin-bottom: 12px;">
                        <span style="color: var(--inv-premium);">${this.getIcon('INFO')}</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: var(--inv-text-primary);">${act.event}</div>
                            <div style="color: var(--inv-text-secondary); font-size: 0.65rem; margin-top: 2px;">${act.user} â€¢ ${act.date}</div>
                        </div>
                    </div>
                `;
            });
            activityHtml = `
                <div class="panel-section" style="border-bottom: 1px solid var(--inv-divider);">
                    <div class="panel-title">Activity Timeline</div>
                    <div style="max-height: 180px; overflow-y: auto; padding-right: 4px; display:flex; flex-direction:column;">
                        ${timelineItems}
                    </div>
                </div>
            `;
        }

        // Generate stage history HTML
        let stageHistoryHtml = '';
        if (deal.stageHistory && deal.stageHistory.length > 0) {
            let steps = deal.stageHistory.map((step) => {
                const dotColor = step.done ? 'var(--inv-success)' : 'var(--inv-divider)';
                const borderStyle = step.done ? 'var(--inv-success)' : 'var(--inv-text-secondary)';
                const textColor = step.done ? 'var(--inv-text-primary)' : 'var(--inv-text-secondary)';
                const fontW = step.done ? 'bold' : 'normal';
                return `
                    <div style="position: relative; margin-bottom: 16px; font-size: 0.75rem; padding-left: 6px;">
                        <div style="position: absolute; left: -25px; top: 3px; width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; border: 1px solid ${borderStyle}; box-shadow: ${step.done ? '0 0 6px var(--inv-success)' : 'none'}; z-index: 5;"></div>
                        <div style="font-weight: ${fontW}; color: ${textColor}; display: flex; justify-content: space-between;">
                            <span>${step.stage}</span>
                            ${step.done ? `<span style="color: var(--inv-success); font-size: 0.65rem;">âœ“ Done</span>` : ''}
                        </div>
                        <div style="font-size: 0.65rem; color: var(--inv-text-secondary); margin-top: 2px;">${step.timestamp}</div>
                    </div>
                `;
            }).join('');

            stageHistoryHtml = `
                <div class="panel-section" style="border-bottom: 1px solid var(--inv-divider);">
                    <div class="panel-title">Stage History</div>
                    <div style="position: relative; padding-left: 20px; border-left: 2px solid var(--inv-divider); margin-left: 8px; margin-top: 12px; margin-bottom: 4px;">
                        ${steps}
                    </div>
                </div>
            `;
        }

        // Generate admin handoff HTML
        let handoffHtml = '';
        if (deal.adminHandoff) {
            const isUrgent = deal.adminHandoff.slaCountdown.toLowerCase().includes('stall') || deal.adminHandoff.slaCountdown.toLowerCase().includes('warning');
            const slaColor = isUrgent ? 'var(--inv-error)' : 'var(--inv-success)';
            handoffHtml = `
                <div class="panel-section" style="border-bottom: 1px solid var(--inv-divider); background: rgba(59, 130, 246, 0.02);">
                    <div class="panel-title" style="display:flex; justify-content:between; align-items:center; width: 100%;">
                        <span>Admin Coordination Handoff</span>
                        <span style="font-size: 0.6rem; background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 1px 4px; border-radius: 2px; margin-left: auto;">OPERATIONS</span>
                    </div>
                    <div style="font-size: 0.75rem; display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                        <div class="flex justify-between">
                            <span class="text-muted">Assigned Coordinator:</span>
                            <span style="font-weight: 600; color: var(--inv-text-primary);">${deal.adminHandoff.assignedAdmin}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted">SLA Status:</span>
                            <span style="font-weight: 600; color: ${slaColor};">${deal.adminHandoff.slaCountdown}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted">Operational State:</span>
                            <span style="font-weight: 600; color: var(--inv-premium);">${deal.adminHandoff.status}</span>
                        </div>
                        <button class="btn btn-outline btn-sm nudge-coordinator-btn" data-id="${deal.id}" style="width: 100%; margin-top: 8px; justify-content: center; font-size: 0.7rem; border-color: var(--inv-divider); color: var(--inv-text-primary);">
                            ðŸ’¬ Nudge Coordinator
                        </button>
                    </div>
                </div>
            `;
        }

        // Generate diligence checklist HTML
        let diligenceChecklistHtml = '';
        if (deal.diligenceMetrics) {
            const met = deal.diligenceMetrics;
            diligenceChecklistHtml = `
                <div class="panel-section" style="border-bottom: 1px solid var(--inv-divider);">
                    <div class="panel-title">Diligence Audit checklist</div>
                    <div style="font-size: 0.75rem; display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                        <div class="flex justify-between items-center" style="background: rgba(94, 143, 99, 0.05); padding: 8px; border-radius: 4px; border: 1px solid rgba(94, 143, 99, 0.2);">
                            <span style="font-weight: 500; color: var(--inv-success);">Review Completion Status:</span>
                            <span style="font-weight: bold; color: var(--inv-success);">${met.completedReviews} of ${met.totalExpected || 3} Files Approved</span>
                        </div>
                        
                        ${met.missingFiles && met.missingFiles.length > 0 ? `
                            <div style="background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 4px; padding: 8px;">
                                <div style="font-weight: 600; color: var(--inv-error); font-size: 0.68rem; text-transform: uppercase; margin-bottom: 4px; display:flex; align-items:center; gap:4px;">
                                    <span>âš ï¸</span> Missing Required Documents (${met.missingFiles.length})
                                </div>
                                <ul style="margin: 0; padding-left: 14px; color: var(--inv-text-secondary); display:flex; flex-direction:column; gap:2px;">
                                    ${met.missingFiles.map(file => `<li>${file}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        ${met.staleDocs && met.staleDocs.length > 0 ? `
                            <div style="background: rgba(245, 158, 11, 0.03); border: 1px solid rgba(245, 158, 11, 0.15); border-radius: 4px; padding: 8px;">
                                <div style="font-weight: 600; color: var(--inv-warning); font-size: 0.68rem; text-transform: uppercase; margin-bottom: 4px; display:flex; align-items:center; gap:4px;">
                                    <span>â³</span> Stale Documents Check (${met.staleDocs.length})
                                </div>
                                <ul style="margin: 0; padding-left: 14px; color: var(--inv-text-secondary); display:flex; flex-direction:column; gap:2px;">
                                    ${met.staleDocs.map(file => `<li style="word-break: break-all;">${file}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        // Generate conviction matrix HTML
        const score = deal.convictionScore || 0;
        const convictionScoreHtml = `
            <div class="panel-section" style="border-bottom: 1px solid var(--inv-divider);">
                <div class="panel-title">Conviction Level</div>
                <div style="margin-top: 10px;">
                    <div class="flex justify-between items-center mb-2" style="font-size: 0.75rem;">
                        <span class="text-muted">My Conviction:</span>
                        <span style="font-weight: bold; color: var(--inv-premium); font-size: 0.85rem;">â˜… ${score}/10</span>
                    </div>
                    <div style="display: flex; gap: 4px; justify-content: space-between;">
                        ${[2, 4, 6, 8, 10].map(s => {
                            const isSel = score === s;
                            const bg = isSel ? 'var(--brand-primary-soft)' : 'transparent';
                            const text = isSel ? 'var(--inv-accent)' : 'var(--inv-text-primary)';
                            const border = isSel ? 'var(--inv-accent)' : 'var(--inv-divider)';
                            return `
                                <button class="btn btn-outline btn-sm conviction-btn" 
                                        data-id="${deal.id}" 
                                        data-score="${s}" 
                                        style="flex: 1; padding: 6px 0; border-color: ${border}; background: ${bg}; color: ${text}; font-weight: ${isSel ? 'bold' : 'normal'}; min-width: 0;">
                                    ${s}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        return `
            <div class="rail-header">
                <div class="live-dot" style="${['discover','watchlist'].includes(deal.status) ? '' : 'background:var(--inv-success); box-shadow:0 0 8px var(--inv-success)'}"></div> 
                ${['discover','watchlist'].includes(deal.status) ? 'Selected for review' : 'Active Deal Tracker'}
            </div>
            
            <div class="panel-section" style="background: rgba(255,255,255,0.02);">
                <div class="flex justify-between items-start mb-2"><h2 style="font-size: 1.25rem; font-weight: 600;">${deal.name}</h2><span style="color: var(--inv-premium); font-size: 0.75rem; font-weight: 600;">${deal.match}% Match</span></div>
                <div class="text-xs text-muted mb-4">${deal.sector} â€¢ ${deal.stage} â€¢ ${deal.location}</div>
                ${deal.status === 'watchlist' ? `<button class="btn btn-primary btn-sm w-full action-btn" data-action="request_intro" data-id="${deal.id}" style="width: 100%;">Express Interest to Advance</button>` : ''}
            </div>

            <div class="panel-section">
                <div class="panel-title">Raise & Traction</div>
                <div class="data-row flex justify-between"><span class="text-muted text-sm">Instrument</span><span class="font-medium text-sm">${deal.ask.includes('SAFE') ? 'SAFE' : 'Priced Equity'}</span></div>
                <div class="data-row flex justify-between mt-2"><span class="text-muted text-sm">Revenue</span><span class="font-medium text-sm text-success" style="color: var(--inv-success);">${deal.revenue} (${deal.growth})</span></div>
                <div class="data-row flex justify-between mt-2"><span class="text-muted text-sm">Business Model</span><span class="font-medium text-sm">${deal.businessModel || 'N/A'}</span></div>
                <div class="data-row flex justify-between mt-2"><span class="text-muted text-sm">Validation State</span><span class="font-medium text-sm">${deal.pilots || 'N/A'}</span></div>
            </div>

            ${convictionScoreHtml}

            ${vdrHtml}

            ${diligenceChecklistHtml}

            ${stageHistoryHtml}

            ${handoffHtml}

            ${activityHtml}

            <div class="panel-section" style="border-bottom: none; flex: 1; display: flex; flex-direction: column;">
                <div class="flex justify-between items-center mb-3">
                    <div class="panel-title" style="margin: 0;">Private Notes</div>
                    <div style="background: var(--inv-surface-2); padding: 2px; border-radius: 4px; display: flex;"><span style="font-size: 0.65rem; padding: 2px 8px; background: var(--inv-surface); border-radius: 2px;">Firm</span><span style="font-size: 0.65rem; padding: 2px 8px; color: var(--inv-text-secondary);">Private</span></div>
                </div>
                <textarea id="memoTextarea" placeholder="Type internal memo... Use #tags to categorize." style="flex: 1; min-height: 100px; width: 100%; padding: 12px; background: var(--inv-bg); border: 1px solid var(--inv-divider); border-radius: 6px; color: var(--inv-text-primary); resize: none; font-size: 0.875rem; margin-bottom: 12px;">${deal.internalNotes || ''}</textarea>
                <div class="flex gap-2">
                    <span class="mandate-chip" onclick="const tx = document.getElementById('memoTextarea'); if (tx) { tx.value += ' #high-conviction'; }">+ Add Tag</span>
                    <button class="btn btn-outline btn-sm" id="saveMemoBtn" data-id="${deal.id}" style="margin-left: auto;">Save Note</button>
                </div>
            </div>
        `;
    }

    attachDiscoverListeners() {
        const scroller = document.getElementById('feedScroller');
        if (scroller) {
            let scrollTimeout;
            scroller.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    let closest = null, minDistance = Infinity;
                    document.querySelectorAll('.startup-snap-card').forEach(card => {
                        const dist = Math.abs(card.getBoundingClientRect().top);
                        if (dist < minDistance) { minDistance = dist; closest = card.dataset.id; }
                    });
                    if (closest && closest !== this.state.selectedDealId) {
                        this.state.selectedDealId = closest;
                        this.render();
                    }
                }, 100);
            });
        }

        // Custom Sort dropdown toggle listener
        const sortDropdownBtn = document.getElementById('discoverSortDropdownBtn');
        const sortDropdownMenu = document.getElementById('discoverSortDropdownMenu');
        if (sortDropdownBtn && sortDropdownMenu) {
            sortDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sortDropdownMenu.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!sortDropdownBtn.contains(e.target) && !sortDropdownMenu.contains(e.target)) {
                    sortDropdownMenu.classList.remove('active');
                }
            });

            // Handle sorting option clicks
            sortDropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = item.dataset.value;
                    this.state.sortOrder = value;
                    sortDropdownMenu.classList.remove('active');
                    
                    // Reset selected card to first item after sorting
                    const sortedDeals = this.getDealsForTab('discover');
                    let deals = sortedDeals.filter(d => {
                        if (this.state.filters.sector !== 'All' && d.sector !== this.state.filters.sector) return false;
                        if (this.state.filters.stage !== 'All' && d.stage !== this.state.filters.stage) return false;
                        if (this.state.filters.revenue !== 'All') {
                            const rev = d.revenue.toLowerCase();
                            if (this.state.filters.revenue === 'mvp') {
                                if (rev.includes('arr') || (rev.includes('mrr') && parseInt(rev.replace(/\D/g, '')) > 5)) return false;
                            } else if (this.state.filters.revenue === 'growth') {
                                if (!rev.includes('mrr') || parseInt(rev.replace(/\D/g, '')) < 10 || parseInt(rev.replace(/\D/g, '')) > 50) return false;
                            } else if (this.state.filters.revenue === 'scale') {
                                if (rev.includes('arr')) {} else if (rev.includes('mrr')) {
                                    if (parseInt(rev.replace(/\D/g, '')) < 50) return false;
                                } else return false;
                            }
                        }
                        if (this.state.filters.checkSize !== 'All') {
                            const ask = d.ask.toLowerCase();
                            const askVal = parseFloat(ask.replace(/[^0-9.]/g, ''));
                            if (this.state.filters.checkSize === 'small') {
                                if (askVal >= 2.0) return false;
                            } else if (this.state.filters.checkSize === 'large') {
                                if (askVal < 2.0) return false;
                            }
                        }
                        if (this.state.filters.readiness !== 'All') {
                            if (this.state.filters.readiness === 'unlocked' && d.vaultState !== 'unlocked') return false;
                            if (this.state.filters.readiness === 'audited' && d.verification !== 'Fully Audited') return false;
                        }
                        return true;
                    });
                    
                    if (value === 'best_match') {
                        deals.sort((a, b) => b.match - a.match);
                    } else if (value === 'conviction') {
                        deals.sort((a, b) => (b.convictionScore || 0) - (a.convictionScore || 0));
                    } else if (value === 'ask_low') {
                        const getAskVal = (d) => parseFloat(d.ask.replace(/[^0-9.]/g, '')) || 0;
                        deals.sort((a, b) => getAskVal(a) - getAskVal(b));
                    } else if (value === 'ask_high') {
                        const getAskVal = (d) => parseFloat(d.ask.replace(/[^0-9.]/g, '')) || 0;
                        deals.sort((a, b) => getAskVal(b) - getAskVal(a));
                    } else if (value === 'growth') {
                        const getGrowthVal = (d) => parseFloat(d.growth.replace(/[^0-9.]/g, '')) || 0;
                        deals.sort((a, b) => getGrowthVal(b) - getGrowthVal(a));
                    }

                    if (deals.length > 0) {
                        this.state.selectedDealId = deals[0].id;
                    } else {
                        this.state.selectedDealId = null;
                    }

                    this.saveStateToLocalStorage();
                    this.render();
                });
            });
        }

        // Interactive video player handlers
        document.querySelectorAll('.video-section').forEach(sec => {
            const video = sec.querySelector('.pitch-video-element');
            const playBtn = sec.querySelector('.play-btn-overlay');
            const videoControls = sec.querySelector('.video-controls-overlay');
            const thumbnail = sec.querySelector('.video-thumbnail');
            
            sec.addEventListener('click', (e) => {
                e.stopPropagation(); // Avoid selecting card
                
                // If progress bar container was clicked, seek
                const progressContainer = e.target.closest('.video-progress-bar-container');
                if (progressContainer) {
                    const rect = progressContainer.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    if (video.duration) {
                        video.currentTime = pct * video.duration;
                    }
                    return;
                }

                if (video.paused) {
                    // Pause other videos
                    document.querySelectorAll('.pitch-video-element').forEach(v => {
                        if (v !== video && !v.paused) {
                            v.pause();
                            const pBtn = v.closest('.video-section').querySelector('.play-btn-overlay');
                            if (pBtn) pBtn.style.display = 'flex';
                        }
                    });

                    video.style.display = 'block';
                    thumbnail.style.display = 'none';
                    playBtn.style.display = 'none';
                    videoControls.style.display = 'flex';
                    video.play();
                } else {
                    video.pause();
                    playBtn.style.display = 'flex';
                }
            });

            if (video) {
                video.addEventListener('timeupdate', () => {
                    const progressBar = sec.querySelector('.video-progress-fill');
                    const timeDisplay = sec.querySelector('.video-time-display');
                    
                    if (video.duration) {
                        const pct = (video.currentTime / video.duration) * 100;
                        if (progressBar) progressBar.style.width = `${pct}%`;
                        
                        const formatTime = (time) => {
                            const m = Math.floor(time / 60);
                            const s = Math.floor(time % 60).toString().padStart(2, '0');
                            return `${m}:${s}`;
                        };
                        if (timeDisplay) timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
                        
                        const dealId = sec.dataset.id;
                        const deal = this.state.deals.find(d => d.id === dealId);
                        if (deal) {
                            const watchSec = Math.round(video.currentTime);
                            const watchPct = Math.round(pct);
                            deal.videoStats = `Watched ${watchSec}s (${watchPct}%)`;
                            
                            const card = sec.closest('.startup-card-inner');
                            if (card) {
                                const watchBadge = card.querySelector('.watch-progress-badge');
                                if (watchBadge) {
                                    watchBadge.textContent = `ðŸ“º Watched ${watchSec}s (${watchPct}%)`;
                                }
                            }
                        }
                    }
                });

                video.addEventListener('pause', () => {
                    playBtn.style.display = 'flex';
                    this.saveStateToLocalStorage();
                });

                video.addEventListener('ended', () => {
                    const dealId = sec.dataset.id;
                    const deal = this.state.deals.find(d => d.id === dealId);
                    if (deal) {
                        deal.videoStats = "Watched full (100%)";
                        const card = sec.closest('.startup-card-inner');
                        if (card) {
                            const watchBadge = card.querySelector('.watch-progress-badge');
                            if (watchBadge) {
                                watchBadge.textContent = `ðŸ“º Watched full (100%)`;
                            }
                        }
                    }
                    playBtn.style.display = 'flex';
                    this.saveStateToLocalStorage();
                });
            }
        });

        this.attachListListeners();
    }

        attachListListeners() {
        // Handle whole-card clicks for drilldown/selection
        document.querySelectorAll('.wl-row, .kanban-card, .startup-card-inner').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.action-btn')) return; // let the action btn handler take it
                if (e.target.closest('.match-drilldown-trigger')) return; // drilldown trigger
                
                const id = el.closest('[data-id]') ? el.closest('[data-id]').dataset.id : null;
                if (id) {
                    this.state.selectedDealId = id;
                    this.saveStateToLocalStorage();
                    this.render();
                }
            });
        });

        // Handle specific action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent bubbling to card
                
                const action = btn.dataset.action;
                const filter = btn.dataset.filter;
                
                if (action === 'wl-filter') {
                    this.state.watchlistFilter = filter;
                    this.saveStateToLocalStorage();
                    this.render();
                    return;
                }

                const id = btn.dataset.id;
                const deal = this.state.deals.find(d => d.id === id);
                if (!deal) return;

                if (action === 'watchlist') {
                    deal.status = 'watchlist';
                    deal.crmActivity.unshift({ event: "Added to Shortlist", user: "Jane Sterling (Investor)", date: "Just now" });
                    const rationale = prompt(`Why are you adding ${deal.name} to your watchlist? (Strongly encouraged for future reference)`);
                    deal.reason = rationale ? rationale : 'No interaction yet';
                    deal.lastTouch = 'No interaction yet';
                    this.showToast(`${deal.name} added to shortlist/watchlist.`);
                    this.logTelemetry('DEAL_SHORTLISTED', { dealId: id, name: deal.name });
                } else if (action === 'request_intro') {
                    deal.status = 'interest_sent';
                    deal.updates.unshift('Interest sent just now');
                    deal.crmActivity.unshift({ event: "Interest Expressed / Intro Requested", user: "Jane Sterling (Investor)", date: "Just now" });
                    this.showToast(`Introduction request sent for ${deal.name}.`);
                    this.logTelemetry('DEAL_STAGE_PROMOTED', { dealId: id, name: deal.name, targetStage: 'interest_sent' });
                } else if (action === 'pass') {
                    deal.status = 'passed';
                    deal.crmActivity.unshift({ event: "Passed on deal", user: "Jane Sterling (Investor)", date: "Just now" });
                    this.showToast(`${deal.name} archived/passed.`);
                    this.logTelemetry('DEAL_ARCHIVED', { dealId: id, name: deal.name });
                } else if (action === 'request_vdr') {
                    deal.vaultState = 'requested';
                    deal.updates.unshift('VDR access requested');
                    deal.crmActivity.unshift({ event: "Requested VDR access", user: "Jane Sterling (Investor)", date: "Just now" });
                    this.showToast(`Diligence vault access requested from ${deal.founder}.`, 'warning');
                    this.logTelemetry('VDR_ACCESS_REQUESTED', { dealId: id, name: deal.name, founder: deal.founder });
                } else if (action === 'nudge-vdr') {
                    deal.crmActivity.unshift({ event: "Nudge sent for VDR access", user: "Jane Sterling (Investor)", date: "Just now" });
                    this.showToast(`System nudge sent to ${deal.founder} for document verification.`, 'warning');
                    this.logTelemetry('VDR_NUDGE_SENT', { dealId: id, name: deal.name });
                } else if (action === 'open_vdr') {
                    this.showToast(`Opening VDR Document Room for ${deal.name}.`);
                    deal.status = 'diligence';
                    this.state.selectedDealId = deal.id;
                    this.state.activeTab = 'vdr';
                    this.logTelemetry('VDR_ROOM_OPENED', { dealId: id, name: deal.name });
                } else if (action === 'ping-founder') {
                    this.showToast(`Ping sent to ${deal.name} founder.`);
                } else if (action === 'schedule-intro') {
                    this.showToast(`Scheduling intro with ${deal.name}.`);
                } else if (action === 'issue-term-sheet') {
                    this.showToast(`Term sheet drafted for ${deal.name}.`);
                }

                if (this.state.activeTab === 'discover' && (action === 'pass' || action === 'request_intro' || action === 'watchlist')) {
                    const remaining = this.getDealsForTab('discover');
                    this.state.selectedDealId = remaining.length > 0 ? remaining[0].id : null;
                }

                this.saveStateToLocalStorage();
                this.render();
            });
        });
    }
 
    showToast(message, type = 'success') {
        this.logTelemetry('TOAST_NOTIFICATION', { message, type });
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.background = type === 'success' ? 'var(--inv-success)' : 'var(--inv-warning)';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '6px';
        toast.style.fontSize = '0.875rem';
        toast.style.fontWeight = '600';
        toast.style.boxShadow = '0 10px 24px rgba(0,0,0,0.3)';
        toast.style.zIndex = '1000';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '8px';
        toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    attachMeetingsListeners() {
        // 1. Meeting selection handler
        document.querySelectorAll('.meeting-list-card').forEach(card => {
            card.addEventListener('click', () => {
                this.state.selectedMeetingId = card.dataset.id;
                this.saveStateToLocalStorage();
                this.render();
            });
        });

        // 2. Search filter handler with focus protection
        const searchInput = document.getElementById('meetingsSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.state.meetingsSearch = e.target.value;
                this.saveStateToLocalStorage();
                
                const cursorPosition = e.target.selectionStart;
                this.render();
                
                const newSearchInput = document.getElementById('meetingsSearchInput');
                if (newSearchInput) {
                    newSearchInput.focus();
                    newSearchInput.setSelectionRange(cursorPosition, cursorPosition);
                }
            });
        }

        // 3. Tab filter buttons
        document.querySelectorAll('.meetings-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.state.meetingsFilter = btn.dataset.filter;
                this.saveStateToLocalStorage();
                this.render();
            });
        });

        // 4. Calendar Sync Status interactions
        const reconnectBtn = document.querySelector('.reconnect-calendar-btn');
        if (reconnectBtn) {
            reconnectBtn.addEventListener('click', () => {
                this.state.calendarSyncStatus = 'loading';
                this.saveStateToLocalStorage();
                this.render();
                
                setTimeout(() => {
                    this.state.calendarSyncStatus = 'synced';
                    this.saveStateToLocalStorage();
                    this.showToast('Calendar connection established successfully!');
                    this.render();
                }, 1500);
            });
        }

        const disconnectBtn = document.querySelector('.disconnect-calendar-btn');
        if (disconnectBtn) {
            disconnectBtn.addEventListener('click', () => {
                this.state.calendarSyncStatus = 'error';
                this.saveStateToLocalStorage();
                this.showToast('Calendar connection disconnected for QA testing.', 'info');
                this.render();
            });
        }

        // 5. Prep Checklist Items toggling
        document.querySelectorAll('.prep-checklist-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Prevent double execution if clicking the checkbox input directly
                if (e.target.tagName === 'INPUT') return;
                
                const meetingId = item.dataset.meetingId;
                const idx = parseInt(item.dataset.idx);
                const m = this.state.meetings.find(x => x.id === meetingId);
                if (m && m.prepChecklist && m.prepChecklist[idx]) {
                    const task = m.prepChecklist[idx];
                    task.done = !task.done;
                    this.saveStateToLocalStorage();
                    this.showToast(`Checked: "${task.task}"`);
                    this.render();
                }
            });
            
            // If clicking directly on checkbox input
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    const meetingId = item.dataset.meetingId;
                    const idx = parseInt(item.dataset.idx);
                    const m = this.state.meetings.find(x => x.id === meetingId);
                    if (m && m.prepChecklist && m.prepChecklist[idx]) {
                        const task = m.prepChecklist[idx];
                        task.done = checkbox.checked;
                        this.saveStateToLocalStorage();
                        this.showToast(`Checked: "${task.task}"`);
                        this.render();
                    }
                });
            }
        });

        // 6. Live Notes textarea auto-saving simulation
        const notesArea = document.getElementById('meetingLiveNotesArea');
        if (notesArea) {
            let saveTimeout;
            notesArea.addEventListener('input', (e) => {
                const meetingId = notesArea.dataset.meetingId;
                const m = this.state.meetings.find(x => x.id === meetingId);
                if (m) {
                    m.notes = e.target.value;
                    this.saveStateToLocalStorage();

                    // Update UI indicator to "Saving..."
                    const dot = document.getElementById('notesIndicatorDot');
                    const text = document.getElementById('notesIndicatorText');
                    if (dot && text) {
                        dot.style.background = 'var(--inv-warning)';
                        text.textContent = 'Saving...';
                    }

                    clearTimeout(saveTimeout);
                    saveTimeout = setTimeout(() => {
                        const savedDot = document.getElementById('notesIndicatorDot');
                        const savedText = document.getElementById('notesIndicatorText');
                        if (savedDot && savedText) {
                            savedDot.style.background = 'var(--inv-success)';
                            savedText.textContent = 'âœ“ Autosaved';
                        }
                    }, 800);
                }
            });
        }

        // 7. Live Notes template selector
        const templateSelector = document.getElementById('meetingTemplateSelector');
        if (templateSelector) {
            templateSelector.addEventListener('change', (e) => {
                const meetingId = templateSelector.dataset.meetingId;
                const value = e.target.value;
                const m = this.state.meetings.find(x => x.id === meetingId);
                if (m) {
                    let notes = '';
                    if (value === 'default') {
                        notes = m.notesTemplate || 'Objective: Assess preparation items.\n\nNotes:\n- \n';
                    } else if (value === 'tech') {
                        notes = 'Objective: Assess Sentinel-2 resolution limits and cloud mask algorithms.\n\nKey findings:\n- Spatial resolution parameters:\n- Technical debt / patents:\n- Go-to-market plan:\n\nNext steps:\n';
                    } else if (value === 'gtm') {
                        notes = 'Objective: Assess go-to-market and sales velocity.\n\nMetrics:\n- ARR/MRR scaling:\n- ACV / expansion dynamics:\n- Customer churn rate:\n\nConviction:\n';
                    } else if (value === 'blank') {
                        notes = '';
                    }

                    m.notes = notes;
                    this.saveStateToLocalStorage();
                    this.showToast('Meeting notes template loaded successfully.');
                    this.render();
                }
            });
        }

        // 8. Conviction score Capture & Update
        const convictionSlider = document.getElementById('postConvictionSlider');
        const convictionDisplay = document.getElementById('convictionSliderDisplay');
        if (convictionSlider && convictionDisplay) {
            convictionSlider.addEventListener('input', (e) => {
                convictionDisplay.textContent = `${e.target.value}/10`;
            });
        }

        // 9. Interactive CRM Action buttons
        document.querySelectorAll('.meetings-cta-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const dealId = btn.dataset.id;
                const meetingId = btn.dataset.meetingId;

                if (action === 'log-conviction') {
                    const slider = document.getElementById('postConvictionSlider');
                    const val = slider ? parseInt(slider.value) : 5;
                    
                    // Update meeting logger
                    const currentMeeting = this.state.meetings.find(x => x.id === meetingId);
                    if (currentMeeting) {
                        currentMeeting.convictionLog = val;
                    }

                    // Update main deals collection if linked
                    const deal = this.state.deals.find(d => d.id === dealId);
                    if (deal) {
                        deal.convictionScore = val;
                        deal.crmActivity.unshift({
                            event: `Logged conviction score at ${val}/10`,
                            user: 'Jane Sterling (Partner)',
                            date: 'Today'
                        });
                    }

                    this.saveStateToLocalStorage();
                    this.showToast(`Logged conviction rating: ${val}/10 successfully.`);
                    this.render();
                } 
                else if (action === 'request_intro') {
                    const deal = this.state.deals.find(d => d.id === dealId);
                    if (deal) {
                        deal.status = 'interest_sent';
                        deal.crmActivity.unshift({
                            event: 'Expressed interest (Request Intro)',
                            user: 'Jane Sterling (Partner)',
                            date: 'Today'
                        });
                        this.saveStateToLocalStorage();
                        this.showToast(`Interest request sent to ${deal.name}.`);
                        this.render();
                    }
                } 
                else if (action === 'request_vdr') {
                    const deal = this.state.deals.find(d => d.id === dealId);
                    if (deal) {
                        deal.vaultState = 'requested';
                        deal.crmActivity.unshift({
                            event: 'Requested VDR Access keys',
                            user: 'Jane Sterling (Partner)',
                            date: 'Today'
                        });
                        this.saveStateToLocalStorage();
                        this.showToast(`Requested VDR Access for ${deal.name}.`);
                        this.render();
                    }
                } 
                else if (action === 'pass') {
                    const deal = this.state.deals.find(d => d.id === dealId);
                    if (deal) {
                        deal.status = 'pass';
                        deal.crmActivity.unshift({
                            event: 'Passed on opportunity',
                            user: 'Jane Sterling (Partner)',
                            date: 'Today'
                        });
                        this.saveStateToLocalStorage();
                        this.showToast(`Opportunity marked as Passed.`);
                        this.render();
                    }
                } 
                else if (action === 'follow-up-meeting') {
                    // Create a follow-up meeting scheduled 7 days in the future
                    const parentMeeting = this.state.meetings.find(x => x.dealId === dealId) || {};
                    const followUpId = 'm_' + Date.now();
                    const newMeeting = {
                        id: followUpId,
                        startupName: parentMeeting.startupName || 'Follow-up Startup',
                        dealId: dealId,
                        title: 'Follow-up Diligence Synch',
                        time: 'June 10, 10:00 AM PST',
                        timestamp: '2026-06-10T10:00:00',
                        duration: '30m',
                        platform: 'Zoom',
                        platformUrl: 'https://zoom.us/j/9998887776',
                        status: 'confirmed',
                        attendees: {
                            founder: parentMeeting.attendees ? parentMeeting.attendees.founder : 'Founder',
                            partner: 'Jane Sterling (Lead Partner)',
                            coordinator: 'Mike Operations (Admin Coordinator)'
                        },
                        objective: 'Deep dive into secondary audit model findings, address team context challenges.',
                        teamContext: 'Further clarification required post-first call.',
                        prepChecklist: [
                            { task: 'Check cap table allocation details', done: false },
                            { task: 'Prepare secondary Term Sheet conditions', done: false }
                        ],
                        previousInteractions: 'First call completed today. Logged follow-up meeting.',
                        linkedDiligence: parentMeeting.linkedDiligence || {
                            completedReviewsCount: 1,
                            missingFilesCount: 0,
                            staleDocsCount: 0,
                            vdrState: 'unlocked'
                        },
                        notes: '',
                        notesTemplate: 'Objective: Follow up on diligence findings.\n\nDiligence verification:\n\nDraft Terms:\n',
                        convictionLog: null
                    };

                    this.state.meetings.push(newMeeting);
                    this.state.selectedMeetingId = followUpId;
                    this.state.meetingsFilter = 'upcoming';
                    
                    const deal = this.state.deals.find(d => d.id === dealId);
                    if (deal) {
                        deal.crmActivity.unshift({
                            event: 'Scheduled follow-up diligence meeting',
                            user: 'Jane Sterling (Partner)',
                            date: 'Today'
                        });
                    }

                    this.saveStateToLocalStorage();
                    this.showToast('Follow-up meeting scheduled & added to queue.');
                    this.render();
                }
               
                if (action === 'reschedule-meeting') {
                    const currentMeeting = this.state.meetings.find(x => x.id === meetingId);
                    if (currentMeeting) {
                        currentMeeting.status = 'rescheduled';
                        currentMeeting.time = 'June 12, 10:00 AM PST';
                        
                        const deal = this.state.deals.find(d => d.id === currentMeeting.dealId);
                        if (deal) {
                            deal.crmActivity.unshift({
                                event: 'Rescheduled meeting to June 12',
                                user: 'Jane Sterling (Partner)',
                                date: 'Today'
                            });
                        }

                        this.saveStateToLocalStorage();
                        this.showToast('Rescheduled meeting to June 12. Notification sent.');
                        this.render();
                    }
                } 
                else if (action === 'view-profile') {
                    this.state.activeTab = 'discover';
                    this.state.selectedDealId = dealId;
                    this.saveStateToLocalStorage();
                    this.render();
                } 
                else if (action === 'open-diligence') {
                    this.state.activeTab = 'discover';
                    this.state.selectedDealId = dealId;
                    this.saveStateToLocalStorage();
                    this.render();
                    // Auto-toggle matching drilldown container open visually after tab load
                    setTimeout(() => {
                        const container = document.getElementById(`drilldown-${dealId}`);
                        if (container) {
                            container.style.display = 'block';
                        }
                    }, 50);
                }
                else if (action === 'request-zoom-link') {
                    const currentMeeting = this.state.meetings.find(x => x.id === meetingId);
                    if (currentMeeting) {
                        currentMeeting.status = 'confirmed';
                        currentMeeting.platformUrl = 'https://zoom.us/j/999123456';
                        this.saveStateToLocalStorage();
                        this.showToast('Zoom link generated and synced!');
                        this.render();
                    }
                }

        });
    });
}
}
    


