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
                <!-- KPI 1: New Matches -->
                <div class="metric-card metric-card-trigger" data-tab="discover" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">New Matches</div>
                    <div class="metric-value" style="font-size: 1.75rem; color: var(--inv-accent); font-weight: 700; margin: 4px 0;"> ${discoverCount} </div>
                    <div class="text-xs text-success" style="color: var(--inv-success); display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                        <span>↑</span> +2 vs yesterday
                    </div>
                    <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);"> Sourced deals </div>
                </div>
                
                <!-- KPI 2: Deals in Review -->
                <div class="metric-card metric-card-trigger" data-tab="deals" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">Deals in Review</div>
                    <div class="metric-value" style="font-size: 1.75rem; color: var(--inv-text-primary); font-weight: 700; margin: 4px 0;"> ${activeDealsCount} </div>
                    <div class="text-xs text-success" style="color: var(--inv-success); display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                        <span>↑</span> +1 this week
                    </div>
                    <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);"> Active pipeline flow </div>
                </div>

                <!-- KPI 3: Diligence in Progress -->
                <div class="metric-card metric-card-trigger" data-tab="deals" data-stage="diligence" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">Diligence Active</div>
                    <div class="metric-value" style="font-size: 1.75rem; color: var(--inv-warning); font-weight: 700; margin: 4px 0;"> ${diligenceCount} </div>
                    <div class="text-xs text-muted" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                        <span>✔</span> 1 clear / ${diligenceCount - 1 > 0 ? diligenceCount - 1 : 0} blocked
                    </div>
                    <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);"> Data room reviews </div>
                </div>

                <!-- KPI 4: Meetings Today -->
                <div class="metric-card metric-card-trigger" data-tab="meetings" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">Meetings Today</div>
                    <div class="metric-value" style="font-size: 1.75rem; color: var(--inv-text-primary); font-weight: 700; margin: 4px 0;"> ${meetingsToday} </div>
                    <div class="text-xs text-success" style="color: var(--inv-success); display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                        <span>•</span> Sync schedule
                    </div>
                    <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);"> Scheduled interactions </div>
                </div>

                <!-- KPI 5: Founder SLA Risk -->
                <div class="metric-card metric-card-trigger" data-tab="deals" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">SLA Risk Alerts</div>
                    <div class="metric-value" style="font-size: 1.75rem; color: var(--inv-error); font-weight: 700; margin: 4px 0;"> ${riskAlerts.length} </div>
                    <div class="text-xs text-danger" style="color: var(--inv-error); display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                        <span>⚠️</span> Actions pending
                    </div>
                    <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);"> Responsiveness alerts </div>
                </div>

                <!-- KPI 6: Capital Committed -->
                <div class="metric-card metric-card-trigger" data-tab="portfolio" style="cursor: pointer; border: 1px solid var(--inv-divider); padding: 20px; border-radius: 8px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div class="metric-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; color: var(--inv-text-secondary);">Capital Committed</div>
                    <div class="metric-value" style="font-size: 1.75rem; color: var(--inv-text-primary); font-weight: 700; margin: 4px 0;"> ${committedAmt} </div>
                    <div class="text-xs text-muted" style="display: flex; align-items: center; gap: 4px; margin-top: 4px; color: var(--inv-text-secondary);" title="${poolDetail}">
                        <span>★</span> ${poolDetail}
                    </div>
                    <div class="text-xs text-muted" style="margin-top: 4px; color: var(--inv-text-secondary);"> Across ${holdingsCount} holdings </div>
                </div>
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
                                                    <button class="btn btn-outline btn-xs" onclick="alert('Snoozed alert for 24 hours.')" style="font-size: 0.65rem; padding: 2px 6px; border-color: var(--inv-divider); color: var(--inv-text-secondary);">Snooze</button>
                                                    <button class="btn btn-outline btn-xs" onclick="const newAssignee = prompt('Enter new assignee name:', '${alert.assignee}'); if(newAssignee) alert('Reassigned task to ' + newAssignee);" style="font-size: 0.65rem; padding: 2px 6px; border-color: var(--inv-divider); color: var(--inv-text-secondary);">Reassign</button>
                                                    <button class="btn btn-outline btn-xs metric-card-trigger" data-tab="${alert.action}" style="border-color: ${alert.severity === 'URGENT' || alert.severity === 'BLOCKED' ? 'var(--inv-error)' : 'var(--inv-warning)'}; color: ${alert.severity === 'URGENT' || alert.severity === 'BLOCKED' ? 'var(--inv-error)' : 'var(--inv-warning)'}; font-size: 0.65rem; padding: 2px 6px;">${alert.actionLabel}</button>
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
                            <h3 class="font-semibold mb-3" style="font-size: 0.95rem; color: var(--inv-text-primary); display: flex; justify-content: space-between;">
                                <span>⭐ Watchlist Activity</span>
                                <span class="text-xs text-muted" style="font-weight: normal;">Monitored: ${watchlistCount}</span>
                            </h3>

                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${watchlistCount === 0 ? `
                                    <div class="text-xs text-muted text-center py-3">No monitored watchlist items in sector.</div>
                                ` : `
                                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.01); border: 1px solid var(--inv-divider); padding: 8px 12px; border-radius: 6px; font-size: 0.75rem;">
                                        <div>
                                            <div style="font-weight: 600; color: var(--inv-text-primary);">Nexus Health</div>
                                            <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px;">Deck updated 2h ago</div>
                                        </div>
                                        <span style="color: var(--inv-accent); font-weight: 600; font-size: 0.75rem;">Watchlist</span>
                                    </div>

                                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.01); border: 1px solid var(--inv-divider); padding: 8px 12px; border-radius: 6px; font-size: 0.75rem;">
                                        <div>
                                            <div style="font-weight: 600; color: var(--inv-text-primary);">Aurora Climate</div>
                                            <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 2px; display: flex; align-items: center; gap: 4px;">
                                                Sync call today 2:00 PM
                                                <span style="display: inline-block; width: 6px; height: 6px; background: var(--inv-warning); border-radius: 50%;" title="Unconfirmed sync call warning"></span>
                                                <span style="color: var(--inv-warning); font-size: 0.65rem;">(Unconfirmed)</span>
                                            </div>
                                        </div>
                                        <span style="color: var(--inv-accent); font-weight: 600; font-size: 0.75rem;">Active Review</span>
                                    </div>
                                `}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }
