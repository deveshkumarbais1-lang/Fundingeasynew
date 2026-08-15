# Funding Easy Product Specification

## Security, Privacy & Compliance

Funding Easy must protect sensitive founder and investor data through a privacy-first matching architecture in which personal contact information is stored securely, public transparency is limited to approved professional links, and privileged data access is restricted to authorized internal roles only. This requirement is consistent with the platformâ€™s current promise of controlled workflow, reduced public data leaks, encrypted diligence exchange, and permissioned workspace progression.

The platform must enforce privacy, compliance, and audit protections across profile visibility, introductions, KYC handling, diligence access, authentication, data retention, and administrative tooling. These controls must be implemented at the backend, API, admin, and UI layers rather than relying on frontend hiding alone.

### Objectives

- Prevent exposure of private founder and investor contact details during discovery, matching, and early diligence stages.
- Preserve transparency through approved public professional links such as LinkedIn and company website URLs.
- Support verified participation and encrypted diligence workflows already described on the platform.
- Ensure all privileged actions are logged for compliance, trust, and dispute investigation.
- Create a clear legal and technical basis for KYC retention, deletion handling, and future AML expansion.

### Functional requirements

#### 1. Contact privacy

The platform must store personal contact details, including private email addresses and phone numbers, but must not expose them to counterparties by default at any stage of profile browsing or initial matching. This directly supports the siteâ€™s stated goal of replacing cold outreach and public data leaks with a controlled capital matching workspace.

Only approved public-facing links and non-sensitive profile information may be displayed to counterparties during discovery and match review. Approved public information may include LinkedIn profile URLs, company websites, founder role, company name, sector, funding stage, and other business-facing trust signals.

Full personal contact details must be accessible only to authorized Funding Easy internal roles for compliance, trust-and-safety, support escalation, or approved introduction workflows. The system must use role-based and field-level access controls to enforce this restriction.

#### 2. Mediated introductions

All initial communication between matched parties must be mediated through Funding Easy-controlled channels before direct personal contact details are released, if they are released at all. This is consistent with the platformâ€™s current double opt-in and controlled workflow positioning.

The system must support one or more of the following mediated communication methods:
- Platform messaging.
- Admin-facilitated introductions.
- Funding Easy email relay or alias-based communication using Funding Easy-managed domains.

The product must define explicit release conditions for direct contact sharing, including match confirmation, diligence stage advancement, or admin-approved exception handling.

#### 3. KYC and compliance

Funding Easy must support KYC and verification workflows for founders and investors as part of network participation, consistent with the current platform messaging that identity, entity, and readiness checks are completed before participation.

KYC documents, verification records, and sensitive diligence files must be encrypted at rest using AES-256 or an equivalent strong encryption standard. These materials must be accessible only to authorized internal reviewers and users with valid workflow-based permission to view them.

All traffic involving application usage, authentication, API access, admin tooling, and file transfer must be protected in transit using HTTPS with TLS 1.2 or higher. The system must reject insecure transport.

The platform must support duplicate-account detection and suspicious-account review workflows for fraud reduction, abuse prevention, and trust maintenance. The compliance roadmap should also define AML vendor integration as a later implementation milestone, such as Phase 1.5 or the next compliance release.

#### 4. Data protection

Personally identifiable information, including legal names, private email addresses, phone numbers, and KYC-linked identity information, must be encrypted at rest. Public profile data must be logically and technically separated from restricted contact data and compliance data to prevent accidental exposure through user views, admin surfaces, exports, analytics, and APIs.

Authentication must use JWT-based sessions with short-lived access tokens and refresh-token renewal. The recommended standard is 15-minute access tokens and 7-day refresh tokens, with support for revocation, rotation, and forced invalidation on security events.

The platform must support user deletion requests and account erasure workflows for eligible data. Where legal, regulatory, fraud-prevention, or compliance retention obligations apply, the system must preserve only the minimum required retained record set while excluding it from normal product surfaces.

#### 5. Retention and auditability

Where legally required, Funding Easy must retain relevant compliance and KYC records for 7 years after account deletion or closure. These records must remain archived in restricted-access storage and must not appear in user-facing views or general operational screens.

All privileged admin actions must be logged automatically. This includes hidden-data views, contact-release events, KYC approval or rejection, verification status changes, diligence permission changes, deletion handling, and account restriction actions.

Audit logs must include, at minimum:
- Admin identity.
- Action type.
- Affected user or record.
- Timestamp.
- Resulting status or change summary.

Audit records should be immutable or tamper-evident and accessible only to authorized internal reviewers.

### User stories

- As a founder, I want my private email and phone number hidden from investors so I can evaluate fit without exposing personal contact details too early.
- As an investor, I want to see credible public trust signals such as LinkedIn and company website links so I can validate legitimacy without needing direct personal contact data.
- As a compliance admin, I want access to full KYC and contact records so I can verify users and facilitate approved introductions securely.
- As a support or trust-and-safety reviewer, I want suspicious or duplicate accounts flagged so I can prevent abuse inside the network.
- As a platform operator, I want all sensitive admin actions logged with timestamps so I can investigate incidents and demonstrate internal control.

### Acceptance criteria

| Requirement | Acceptance criteria |
|---|---|
| Hidden contact data | Founder and investor counterparties cannot view private email addresses or phone numbers in profile pages, match cards, APIs, exports, notifications, or diligence views. |
| Public links only | Counterparty-facing profiles show approved public links only, including LinkedIn and company website where provided. |
| Admin-only access | Only authorized internal roles can access restricted contact fields and KYC materials. |
| Mediated communication | Initial intros are routed through Funding Easy-controlled channels before direct contact release. |
| KYC encryption | KYC and sensitive diligence files are encrypted at rest and access-controlled. |
| Transport security | All application and file traffic uses HTTPS with TLS 1.2+ only. |
| Fraud controls | Duplicate-account and suspicious-account review flows exist in onboarding and admin tooling. |
| Session security | JWT access tokens expire after 15 minutes and refresh tokens after 7 days, with revocation support. |
| Deletion workflow | Users can request deletion, and the system applies retention exceptions only where required. |
| Retention policy | Required compliance/KYC records can be archived for 7 years post-deletion in restricted storage. |
| Audit logs | Every privileged admin action is logged with actor identity and timestamp. |

### Non-functional requirements

- Field-level access control must be enforced server-side, not only in frontend rendering.
- Sensitive data classes must be separated in the data model into public profile data, restricted contact data, and compliance/KYC data.
- All admin visibility and export surfaces must inherit the same privacy rules to avoid leakage through secondary interfaces.
- Diligence vault permissions must remain stage-based and permissioned, matching the platformâ€™s existing double opt-in file unlocking model.
- Compliance and security events must be queryable for internal review and incident response.

### Edge cases

- A user requests deletion while their account is under compliance review; the system must suppress public access immediately while preserving required retained records.
- An admin attempts to access hidden data outside their role scope; the request must be denied and logged.
- A duplicate or suspicious account is detected after onboarding; matching and introductions must be restricted pending manual review.
- A founder and investor are matched but have not both confirmed fit; diligence files remain locked and contact details remain hidden.
- A user exports operational data; restricted fields must be omitted unless the requester has authorized internal export scope.

### Recommended tickets

- Create a privacy visibility matrix by role and field.
- Split user schema into `public_profile`, `private_contact`, and `compliance_records`.
- Add admin-only contact reveal permissions.
- Build Funding Easy relay-based intro workflow.
- Encrypt KYC and sensitive document storage at rest.
- Add duplicate and suspicious account review queue.
- Add JWT refresh rotation and revocation logic.
- Add deletion request workflow with retention exceptions.
- Implement immutable or tamper-evident audit logging.
- Define AML integration phase and screening trigger events.

### UI copy

Use the following labels in product surfaces to make the privacy model obvious to users and reduce confusion:
- Public profile information.
- Hidden contact information.
- Intro managed by Funding Easy.
- Visible to admins only.
- Restricted compliance record.
- Encrypted diligence file.

## Role definitions

- Founder – Verified founder or company representative using Funding Easy for capital raising.
- Investor – Verified investor user (individual GP, principal, or team member) with mandate-based access.
- Fund Admin – Internal role for a specific fund or investor organization (manages team members, mandates, and LP reporting; future-facing).
- LP (Limited Partner) – Capital provider to a fund or multi-entity structure; gets mandate- and fund-level views, not individual founder PII by default. (future role)
- Compliance Reviewer – Funding Easy internal role focused on KYC/AML, verification, and suspicious-activity review.
- Support – Funding Easy internal customer-support role with minimal access to sensitive data.
- Super Admin – Funding Easy internal superuser for configuration, emergency access, and audit oversight.

## Role-Based Access Matrix

Legend: ? Allowed · ?? Not allowed · ?? Allowed with justification & logging

| Data / Action                                      | Founder | Investor | Fund Admin | LP (Future) | Compliance Reviewer | Support | Super Admin |
|----------------------------------------------------|:-------:|:--------:|:----------:|:-----------:|:-------------------:|:-------:|:-----------:|
| View their own public profile                      | ?      | ?       | ?         | ?          | ?                  | ?      | ?          |
| Edit their own public profile                      | ?      | ?       | ?         | ?          | ??                  | ?? (with user consent) | ? |
| View their own private contact info                | ?      | ?       | ?         | ?          | ?                  | ?? (for support cases) | ? |
| View counterparty public profile (match context)   | ?      | ?       | ?         | ? (aggregated) | ?               | ?      | ?          |
| View counterparty private contact info (email/phone)| ??     | ??      | ??         | ??          | ?? (for KYC / fraud) | ??     | ?? (emergency only) |
| View diligence vault metadata (titles, sizes)      | ? (their own vault) | ? (post-opt-in) | ? (fund-level, no raw files) | ? (aggregated, no raw files) | ? | ?? | ? |
| View/download raw diligence files (cap table, models)| ? (their own uploads) | ? (post double opt-in & permission) | ?? (unless explicitly granted by fund + founder) | ?? | ? (for review) | ?? | ? |
| Upload diligence files                             | ?      | ? (own notes / internal docs) | ? (fund internal docs) | ?? | ? (internal only) | ?? | ? |
| Manage investor mandate filters                    | ??      | ?       | ? (for their fund team) | ?? | ?? | ?? | ? |
| See match suggestions for themselves / their fund  | ?      | ?       | ? (aggregated for fund) | ? (aggregated view only) | ?? | ?? | ? |
| Initiate introductions via platform                | ?      | ?       | ?         | ??          | ??                  | ??      | ?          |
| Bypass or manually force introductions             | ??      | ??       | ??         | ??          | ?? (with reason + audit) | ?? | ?? (with reason + audit) |
| View verification / KYC status (yes/no, reason codes)| ?    | ?       | ?         | ? (fund-level) | ?               | ?? (limited status only) | ? |
| View raw KYC documents                             | ??      | ??       | ??         | ??          | ?                  | ??      | ?? (emergency + logged) |
| Perform KYC/AML review actions                     | ??      | ??       | ??         | ??          | ?                  | ??      | ?          |
| See suspicious-activity flags                      | ??      | ??       | ??         | ??          | ?                  | ?? (minimal surface) | ? |
| Manage fund team members & investor seats          | ??      | ? (for own account) | ? (for fund org) | ?? | ?? | ?? | ? |
| View fund-level performance & pipeline metrics     | ??      | ? (for own user) | ? (for fund) | ? (for their subscribed funds, aggregated) | ?? | ?? | ? |
| View network-wide aggregate stats (de-identified)  | ??      | ??       | ??         | ??          | ? (for compliance) | ? (for ops) | ? |
| View user support tickets & contact history        | ? (their own) | ? (their own) | ? (their org) | ? (their org) | ?? | ? | ? |
| Access billing details (cards, invoices)           | ? (their account) | ? (their account) | ? (fund / org billing) | ?? | ?? | ?? (redacted) | ? |
| Change pricing plan / cancel subscription          | ? (founder-facing flows) | ? (investor) | ? (fund level) | ?? | ?? | ?? (at user request) | ? |
| View detailed audit logs (who accessed what)       | ??      | ??       | ??         | ??          | ? (for investigations) | ?? | ? |
| Export data (CSV/JSON)                             | ? (their own data only) | ? (their own data only) | ? (fund-level, no raw PII) | ? (aggregated only) | ? (for compliance) | ?? (scoped) | ? |
| Delete their own account (subject to retention)    | ?      | ?       | ?         | ?          | ??                  | ?? (at user request) | ? |
| Override deletion / retention flags                | ??      | ??       | ??         | ??          | ? (with reason)   | ??      | ?          |

### Notes for institution-grade strictness

- LPs and Fund Admins **never** receive raw founder PII or raw diligence files by default; access is either aggregated, fund-level, or explicitly permissioned by both the fund and the founder.
- Compliance Reviewers can view raw KYC docs and suspicious-activity data but cannot initiate introductions or change commercial terms.
- Support has the narrowest possible access: they see only what is required to resolve tickets and cannot view raw KYC or unrestricted diligence files.
- Super Admin emergency access must be gated by a “break glass” flow with mandatory reason entry and automatic high-sensitivity audit logging.

