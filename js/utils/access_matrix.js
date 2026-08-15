export const ACCESS_STATE = {
    OPEN_VDR: 'OPEN_VDR',
    REQUEST_VDR: 'REQUEST_VDR',
    REQUEST_INTRO: 'REQUEST_INTRO',
    BLOCKED: 'BLOCKED',
    PENDING_APPROVAL: 'PENDING_APPROVAL',
    LOCKED_KYC: 'LOCKED_KYC',
    MEETING_SCHEDULED: 'MEETING_SCHEDULED'
};

export const AccessMatrix = {
    [ACCESS_STATE.OPEN_VDR]: {
        label: 'Open Data Room',
        action: 'open_vdr',
        style: 'primary', // maps to var(--brand-primary) / .btn-primary
        icon: '🔓',
        tooltip: 'Full access granted to diligence vault',
        disabled: false
    },
    [ACCESS_STATE.REQUEST_VDR]: {
        label: 'Request Access',
        action: 'request_vdr',
        style: 'secondary',
        icon: '🔒',
        tooltip: 'Founder must approve access to detailed financials',
        disabled: false
    },
    [ACCESS_STATE.REQUEST_INTRO]: {
        label: 'Request Introduction',
        action: 'request_intro',
        style: 'primary',
        icon: '🤝',
        tooltip: 'Initiate matching protocol with founder',
        disabled: false
    },
    [ACCESS_STATE.BLOCKED]: {
        label: 'Access Blocked',
        action: 'blocked',
        style: 'danger',
        icon: '🚫',
        tooltip: 'You do not meet the mandate requirements for this deal',
        disabled: true
    },
    [ACCESS_STATE.PENDING_APPROVAL]: {
        label: 'Pending Approval',
        action: 'pending',
        style: 'warning',
        icon: '⏳',
        tooltip: 'Awaiting admin or founder approval',
        disabled: true
    },
    [ACCESS_STATE.LOCKED_KYC]: {
        label: 'Complete KYC to Unlock',
        action: 'locked_kyc',
        style: 'secondary',
        icon: '🛡️',
        tooltip: 'Identity verification required before proceeding',
        disabled: true
    },
    [ACCESS_STATE.MEETING_SCHEDULED]: {
        label: 'Join Meeting',
        action: 'join_meeting',
        style: 'success',
        icon: '📅',
        tooltip: 'Meeting has been scheduled',
        disabled: false
    }
};

export function getActionStateToken(stateKey) {
    if (AccessMatrix[stateKey]) {
        return AccessMatrix[stateKey];
    }
    // Fallback
    return {
        label: 'Unknown State',
        action: 'unknown',
        style: 'secondary',
        icon: '❓',
        tooltip: 'Unknown access state',
        disabled: true
    };
}
