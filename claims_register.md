# Claims Register

This document tracks all public-facing statistics, trust claims, and endorsements used across Funding Easy's marketing and product surfaces. Every claim must have a single owner, a verifiable data source, and a last-reviewed date before it can be pushed to production.

## Security, Privacy & Compliance Claims

All security, privacy, KYC, diligence, and contact-visibility claims made in product copy, marketing assets, or sales collateral are governed by the **Security, Privacy & Compliance** section in `PRODUCT_SPEC.md`.

For any new or updated claim in these areas, the corresponding requirements **must** be:

- Defined or updated in `PRODUCT_SPEC.md`.
- Implemented in code, infra, and operations.
- Mapped back to this register with evidence (links to code, configs, runbooks, or tests).

### Claim: Controlled, double opt-in capital matching workspace

**Public wording (homepage):**  
“Funding Easy replaces cold broker spam and public data leaks with a controlled, double opt-in capital matching workspace.”

**Spec reference:**  
See `PRODUCT_SPEC.md` → Security, Privacy & Compliance → _Mediated introductions_ and _Contact privacy_.  

**Required behavior (summary):**  
- Personal email and phone are never exposed by default to counterparties.  
- All first-contact intros are mediated via Funding Easy-controlled channels.  
- Intros and diligence unlocks only occur after double opt-in match confirmation.

**Evidence (to be filled):**  
- [ ] Backend: intro workflow implementation link  
- [ ] Frontend: UI states for opt-in/opt-out  
- [ ] Ops: runbook for manual intro exceptions

### Claim: Encrypted sensitive diligence files and controlled unlock

**Public wording (homepage):**  
“Sensitive cap tables and financial models are encrypted. Files are unlocked only when both founder and investor confirm mandate fit.”

**Spec reference:**  
See `PRODUCT_SPEC.md` → Security, Privacy & Compliance → _KYC and compliance_, _Data protection_, and _Retention and auditability_.  

**Required behavior (summary):**  
- Diligence files are encrypted at rest (AES-256 or equivalent).  
- Files are accessible only via permissioned vault views, not raw storage URLs.  
- Unlock is tied to workflow: both sides must confirm mandate fit before access is granted.

**Evidence (to be filled):**  
- [ ] Storage config (encryption at rest)  
- [ ] Vault permission model in code  
- [ ] Tests for unlock conditions

### Claim: Verified founders and mandate-aligned investors

**Public wording (homepage):**  
“PLATFORM FOR VERIFIED FOUNDERS & VCS”  
“Identity, entity, and readiness checks completed before network participation.”

**Spec reference:**  
See `PRODUCT_SPEC.md` → Security, Privacy & Compliance → _KYC and compliance_.  

**Required behavior (summary):**  
- Founders/investors cannot access the network until verification status is approved.  
- KYC/compliance reviewers have restricted access to KYC records.  
- Duplicate/suspicious accounts are flagged for review.

**Evidence (to be filled):**  
- [ ] Onboarding gating logic  
- [ ] Admin KYC review tools  
- [ ] Duplicate/suspicious detection implementation

### Claim: Permissioned workspace and reduced public data leaks

**Public wording (homepage):**  
“Funding Easy replaces cold broker spam and public data leaks with a controlled, double opt-in capital matching workspace.”  
“Verified matches • Mandate fit • Permissioned workspace”

**Spec reference:**  
See `PRODUCT_SPEC.md` → Security, Privacy & Compliance → _Contact privacy_, _Mediated introductions_, and _Data protection_.  

**Required behavior (summary):**  
- Only approved public professional links (e.g., LinkedIn, company site) are visible to counterparties.  
- Private contact and legal identity data remain hidden, accessible only to authorized admins.  
- No public directory or search of personal contact information is exposed.

**Evidence (to be filled):**  
- [ ] Profile response schemas (public vs restricted)  
- [ ] UI checks for visible fields  
- [ ] API/DB-level field-visibility enforcement

### Claim: Regulated security controls and secure payment pipelines

**Public wording (pricing):**  
“✓ Secure payment pipelines · ✓ Cancel anytime on investor plans · ✓ Regulated security controls”

**Spec reference:**  
See `PRODUCT_SPEC.md` → Security, Privacy & Compliance → _Data protection_ and _Retention and auditability_.  

**Required behavior (summary):**  
- All app + billing traffic over HTTPS/TLS 1.2+.  
- Payment providers integrated via PCI-compliant flows (no raw card handling in app).  
- Security controls and retention policies aligned with applicable regulatory expectations.

**Evidence (to be filled):**  
- [ ] Payment provider configuration  
- [ ] TLS/HTTPS enforcement details  
- [ ] Retention policy configuration and runbooks

| Claim / Stat | Location | Owner | Source of Truth | Last Verified | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| "Verified participants" | Homepage (Hero) | Compliance | Admin DB (User table `status = verified`) | 2026-06-03 | **Active** (Replaced numeric "500+" with non-quantified statement) |
| "Strict Mandate alignment" | Homepage (Hero) | Product | Match algorithm criteria | 2026-06-03 | **Active** (Replaced numeric "98%" with non-quantified statement) |
| "Efficient Capital matching" | Homepage (Hero) | Ops | Deals DB (Closed Won value) | 2026-06-03 | **Active** (Replaced numeric "$120M+" with non-quantified statement) |
| VC Logos (Sequoia, a16z, etc) | Homepage | Legal | Legal/Partnerships Agreements | 2026-06-03 | **REMOVED** pending authorization |

## Workflow for adding new claims
1. Add proposed claim to this register with `Status = Draft`.
2. Link the internal data source or dashboard query that proves the claim.
3. Obtain Legal/Compliance approval (Updates status to `Approved`).
4. Update product UI with the approved claim.

---

**Source of truth:**  
For complete details on how these claims must behave in product, see `PRODUCT_SPEC.md` → “Security, Privacy & Compliance”. Any new user-facing security/privacy/compliance claim must reference that section before going live.
