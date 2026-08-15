const fs = require('fs');

const path = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\funding-easy\\js\\views\\AdminDashboardView.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Accepted and Declined to top stats bar
content = content.replace(
    `<div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Sent</span>
                        <span style="font-weight:600; color:#1d4ed8;">\${sent}</span>
                    </div>`,
    `<div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Sent</span>
                        <span style="font-weight:600; color:#1d4ed8;">\${sent}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Accepted</span>
                        <span style="font-weight:600; color:#047857;">\${accepted}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; background:var(--adm-surface); padding:8px 16px; border-radius:6px; border:1px solid var(--adm-border);">
                        <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--adm-text-muted);">Declined</span>
                        <span style="font-weight:600; color:#b91c1c;">\${declined}</span>
                    </div>`
);

// 2. Expand role filter, add batch buttons
content = content.replace(
    `<select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Role: All</option><option>Angel Investors</option><option>VCs</option></select>
                <div style="flex:1;"></div>`,
    `<select style="padding: 6px 12px; border: 1px solid var(--adm-border); border-radius: 4px; background: var(--adm-bg); font-size: 0.875rem; outline:none;"><option>Role: All</option><option>Angel Investors</option><option>VCs</option><option>Corporate Investors</option><option>Family Offices</option><option>Funds</option></select>
                <button class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Batch Remind</button>
                <div style="flex:1;"></div>
                <button class="adm-btn adm-btn-outline" style="padding: 6px 12px; font-size: 0.875rem;">Export CSV</button>`
);

// 3. Update table headers
content = content.replace(
    `                            <tr>
                                <th>Intro ID</th>
                                <th>Entrepreneur</th>
                                <th>Investor</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>`,
    `                            <tr>
                                <th style="width: 40px;"><input type="checkbox"></th>
                                <th>Intro ID</th>
                                <th>Entrepreneur</th>
                                <th>Investor</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>`
);

// 4. Update table rows mapping logic
content = content.replace(
    `            this.state.introductionsQueue.map(i => \`
                <tr data-intro-id="\${i.id}" style="\${this.state.selectedIntroId === i.id ? 'background: #f1f5f9;' : ''}; cursor:pointer;">
                    <td><span style="font-family: monospace; font-weight: 600; color: var(--adm-text-muted);">\${i.id}</span></td>
                    <td style="font-weight: 500;">\${i.startup}</td>
                    <td>\${i.investor}</td>
                    <td><span class="adm-badge" style="\${getStatusStyle(i.status)}">\${i.status}</span></td>
                    <td style="color:var(--adm-text-muted);">\${i.date}</td>
                </tr>
            \`).join('');`,
    `            this.state.introductionsQueue.map(i => {
                const scoreIndicator = i.score >= 90 ? '🟢' : (i.score >= 75 ? '🟡' : '🔴');
                const escalation = (i.status === 'Intro Sent' && i.date === 'May 30') ? '<span title="Over 48h without response" style="margin-left:4px;">⚠️</span>' : '';
                return \`
                <tr data-intro-id="\${i.id}" style="\${this.state.selectedIntroId === i.id ? 'background: #f1f5f9;' : ''}; cursor:pointer;">
                    <td onclick="event.stopPropagation()"><input type="checkbox"></td>
                    <td><span style="font-family: monospace; font-weight: 600; color: var(--adm-text-muted);">\${i.id}</span></td>
                    <td style="font-weight: 500;">\${i.startup}</td>
                    <td>\${i.investor}</td>
                    <td><span style="font-weight: 600;">\${i.score}%</span> \${scoreIndicator}</td>
                    <td><span class="adm-badge" style="\${getStatusStyle(i.status)}">\${i.status}</span>\${escalation}</td>
                    <td style="color:var(--adm-text-muted);">\${i.date}</td>
                </tr>
            \`}).join('');`
);

// 5. Update Status Styles to handle 'Coordination'
content = content.replace(
    `                    if (status === 'Accepted') return 'background:#d1fae5; color:#047857; border:1px solid #a7f3d0;';`,
    `                    if (status === 'Accepted') return 'background:#d1fae5; color:#047857; border:1px solid #a7f3d0;';
                    if (status === 'Coordination') return 'background:#d1fae5; color:#047857; border:1px solid #a7f3d0;';`
);

// 6. Pipeline Visualization inject and update action buttons
const sidePanelOriginal = `                        <div style="padding: 24px; flex: 1;">
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Match Overview</h4>`;

const sidePanelNew = `                const stages = ['Match', 'Intro Sent', 'Accepted', 'Handoff'];
                let currentStageIndex = 0;
                if (intro.status === 'Intro Sent') currentStageIndex = 1;
                if (intro.status === 'Accepted') currentStageIndex = 2;
                if (intro.status === 'Coordination') currentStageIndex = 3;
                if (intro.status === 'Declined' || intro.status === 'Expired') currentStageIndex = -1;

                const pipelineHtml = currentStageIndex >= 0 ? \`
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative;">
                        <div style="position: absolute; top: 12px; left: 10%; right: 10%; height: 2px; background: var(--adm-border); z-index: 1;"></div>
                        \${stages.map((stage, idx) => \`
                            <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; width: 25%;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; background: \${idx <= currentStageIndex ? 'var(--adm-accent)' : 'var(--adm-surface)'}; border: 2px solid \${idx <= currentStageIndex ? 'var(--adm-accent)' : 'var(--adm-border)'}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; font-weight: bold; margin-bottom: 8px;">
                                    \${idx < currentStageIndex ? '✓' : (idx === currentStageIndex ? '●' : '')}
                                </div>
                                <div style="font-size: 0.75rem; font-weight: 500; color: \${idx <= currentStageIndex ? 'var(--adm-text)' : 'var(--adm-text-muted)'}; text-align: center;">\${stage}</div>
                            </div>
                        \`).join('')}
                    </div>
                \` : \`<div style="padding: 12px; background: #fee2e2; color: #b91c1c; border-radius: 6px; font-size: 0.875rem; font-weight: 500; margin-bottom: 24px; text-align: center;">Pipeline Halted: \${intro.status}</div>\`;

                        <div style="padding: 24px; flex: 1;">
                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Pipeline Stage</h4>
                            \${pipelineHtml}

                            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--adm-text-muted); font-weight: 600; margin-bottom: 12px; letter-spacing:0.5px;">Match Overview</h4>`;

content = content.replace(sidePanelOriginal, sidePanelNew);

// 7. Action buttons
const buttonsOriginal = `                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <button class="adm-btn adm-btn-primary intro-action-btn" data-action="Send">Send Intro</button>
                                <button class="adm-btn adm-btn-outline intro-action-btn" data-action="Remind">Remind</button>
                                <button class="adm-btn adm-btn-danger intro-action-btn" data-action="Decline">Decline</button>
                                <button class="adm-btn adm-btn-outline intro-action-btn" data-action="Log">Log Note</button>
                            </div>`;

const buttonsNew = `                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                \${intro.status === 'Accepted' ? \`<button class="adm-btn adm-btn-primary intro-action-btn" data-action="Handoff" style="grid-column: span 2;">Bridge to Coordination Case</button>\` : ''}
                                <button class="adm-btn adm-btn-primary intro-action-btn" data-action="Send" \${intro.status === 'Accepted' || intro.status === 'Coordination' ? 'style="display:none;"' : ''}>Send Intro</button>
                                <button class="adm-btn adm-btn-outline intro-action-btn" data-action="Remind" \${intro.status === 'Accepted' || intro.status === 'Coordination' ? 'style="display:none;"' : ''}>Remind</button>
                                <button class="adm-btn adm-btn-danger intro-action-btn" data-action="Decline" \${intro.status === 'Accepted' || intro.status === 'Coordination' ? 'style="display:none;"' : ''}>Decline</button>
                                <button class="adm-btn adm-btn-outline intro-action-btn" data-action="Log">Log Note</button>
                            </div>`;
content = content.replace(buttonsOriginal, buttonsNew);

// 8. JS listener updates for Handoff
const jsOriginal = `                } else if (action === 'Remind') {
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Sent reminder.' + (note ? ' Note: ' + note : '') });
                } else if (action === 'Log') {`;
                
const jsNew = `                } else if (action === 'Remind') {
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Sent reminder.' + (note ? ' Note: ' + note : '') });
                } else if (action === 'Handoff') {
                    intro.history.push({ time: 'Just now', actor: 'System Admin', action: 'Bridged intro to Coordination workspace.' });
                    intro.status = 'Coordination';
                } else if (action === 'Log') {`;
content = content.replace(jsOriginal, jsNew);

fs.writeFileSync(path, content);
console.log('Patched AdminDashboardView.js successfully');
