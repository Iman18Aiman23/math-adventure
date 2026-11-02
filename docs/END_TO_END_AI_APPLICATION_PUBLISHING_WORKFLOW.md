# End-to-End Workflow Process: Publishing AI Applications from GitHub to Live Production

Architecting and publishing a production-ready Web AI application requires a continuous deployment pipeline that seamlessly bridges source control with edge computing, authenticated databases, secure monetization platforms, and hardened network infrastructure. This report articulates the complete deployment workflow starting from a GitHub repository push through to a fully published, enterprise-secured web application, detailing each intermediate component, security control, and cost tier based on your technical blueprint.

## 1. System Architectural Overview & Core Stack Components

Modern serverless architectures separate the application lifecycle into distinct operational tiers: version-controlled source code, edge-rendered user interfaces, serverless application logic, authenticated relational databases, and third-party payment rails. Establishing automated integrations across these systems eliminates manual deployment friction while enforcing cryptographic security boundaries at every transit point.

The end-to-end publishing pipeline connects five foundational technology providers:

- **GitHub**: Operates as the central version-controlled source of truth, managing application logic, environment configuration schemas, and automated build triggers.
- **Cloudflare (Pages / Workers)**: Serves as the primary deployment target, hosting static assets and edge computing functions across a global Content Delivery Network (CDN) while providing Web Application Firewall (WAF) filtering.
- **Supabase (Auth & PostgreSQL)**: Provides identity management and relational data persistence, exposing auto-generated application programming interfaces (APIs) protected by database-level security policies.
- **Stripe**: Manages subscription billing and transactional payment processing via decoupled client interfaces and server-side webhook callbacks.
- **Exabytes**: Functions as the top-level domain registrar, supplying Domain Name System (DNS) records and identity protection.

## 2. Phase 1: Core Backend & Database Implementation

The foundation of the application relies on identity provisioning and data storage hosted on Supabase, establishing isolated user sessions and granular data access rights before any web traffic is served.

### Identity Management via Supabase Auth

Identity workflows execute through Supabase Auth, which leverages the open-source GoTrue microservice engine under the hood. GoTrue issues cryptographically signed JSON Web Tokens (JWTs) upon successful authentication. These JWTs carry session metadata and user identifiers passed in HTTP request headers to authorize downstream database operations.

To safeguard administrative access and prevent automated account creation attacks, identity flows require two critical protective mechanisms:

1. **Administrative Multi-Factor Authentication (MFA)**: Enforce Time-based One-Time Passwords (TOTP) for all administrative accounts to protect elevated credentials against password compromise or reuse.
2. **Bot Prevention on Signup Endpoints**: Integrate Cloudflare Turnstile or reCAPTCHA on sign-up routes. This prevents automated botnets from creating fake accounts, which would otherwise exhaust database connection limits and storage quotas.

### Relational Storage & Database Hardening

Data persistence relies on PostgreSQL hosted on Supabase, which automatically exposes a RESTful interface via PostgREST. Standard client libraries interface with this layer using parameterized prepared statements, automatically guarding against SQL injection vectors.

Database security mandates strict key separation and access controls:

**Critical API Key Boundary**: Never expose the Supabase `service_role` key in client-side code repositories or browser bundles. The `service_role` key bypasses all Row Level Security rules. Frontend client applications must strictly utilize the `anon` (public) key, reserving `service_role` privileges exclusively for secure server-side Edge Functions.

Data protection and recovery controls operate on two primary layers:

1. **Row Level Security (RLS)**: RLS serves as the primary defense against horizontal privilege escalation. Configure RLS policies across all database tables so that client connections can only `SELECT`, `INSERT`, or `UPDATE` records where the row's `user_id` strictly matches the authenticated user ID extracted from the JWT token.
2. **Disaster Recovery via Point-in-Time Recovery (PITR)**: Production installations leverage daily backups and PITR to restore database state to specific timestamps, mitigating data loss from accidental deletion or ransomware events.

## 3. Phase 2: Payment Gateway & Webhook Integration

Monetization capabilities are embedded using Stripe to process credit card transactions and manage recurring subscription states without exposing the core backend to sensitive payment data.

### Decoupled PCI Compliance Scope

To eliminate compliance overhead, payment integration must utilize Stripe Checkout or Stripe Elements. By implementing these client-side interfaces, raw credit card numbers are collected directly within Stripe's hosted environment and never touch the application server or Supabase database. This configuration keeps the application entirely out of scope for complex PCI-DSS audits.

### Server-Side Webhook Verification

When a user completes a transaction, Stripe dispatches an asynchronous HTTP POST payload to the server's webhook endpoint to update user entitlement statuses.

**Webhook Security Mandatory Protocol**: Server endpoints handling Stripe webhooks must cryptographically verify the `Stripe-Signature` header against the endpoint's secret before executing account upgrades. Rejecting unverified signatures prevents malicious actors from forging payment success notifications to unlock paid application features.

### Fraud Mitigation with Stripe Radar

Integrate Stripe Radar to analyze incoming transactions in real time using machine learning algorithms. Stripe Radar detects and blocks card-testing bot attacks and stolen credit card usage patterns before chargebacks occur.

## 4. Phase 3: Domain Routing, Edge Deployment, and CDN Infrastructure

Publishing the codebase from GitHub to live internet traffic involves establishing an automated continuous integration and continuous deployment (CI/CD) pipeline coupled with edge networking and top-level domain routing.

### Domain Name Configuration & Registrar Privacy

The domain name is registered through Exabytes, supporting extensions such as `.com` or `.my`. Domain records must be protected immediately upon registration:

- **WHOIS Privacy Protection**: Enable WHOIS privacy filtering via Exabytes to redact personal contact details (name, address, telephone number) from public lookup registries, preventing social engineering and targeted phishing campaigns.
- **DNSSEC Implementation**: Enable Domain Name System Security Extensions (DNSSEC) across Exabytes and Cloudflare nameservers. DNSSEC cryptographically signs DNS resource records, mitigating DNS cache poisoning and man-in-the-middle redirection attacks.

### GitHub Continuous Integration to Cloudflare Edge

Deploying the frontend codebase utilizes Cloudflare Pages or Workers linked directly to the GitHub repository. Upon pushing code commits to the `main` branch, Cloudflare automatically executes build scripts, packages static assets, and distributes artifacts across its global CDN edge locations.

### Network Layer & WAF Defenses

Cloudflare acts as a reverse proxy between incoming web traffic and backend compute resources, enforcing network security controls across three core capabilities:

1. **Web Application Firewall (WAF)**: Configured to inspect HTTP/HTTPS payloads in transit, blocking common exploit payloads such as Cross-Site Scripting (XSS) and SQL Injection (SQLi) before execution.
2. **Hidden Origin IP**: Because Cloudflare proxies all incoming DNS requests, the true IP address of origin servers remains hidden, preventing direct Layer 3 and Layer 4 Distributed Denial of Service (DDoS) attacks.
3. **Under Attack Mode**: Toggling Under Attack Mode during active Layer 7 DDoS incidents presents a JavaScript computational challenge to all incoming requests, neutralizing malicious bot traffic.

## 5. Phase 4: Enterprise Security Controls & Environment Management

Operating a live application requires zero-trust security enforcement across configuration files, transport protocols, origin rules, and request volumes.

### Secrets Management & Environment Isolation

Secrets, API tokens, and database credentials must never exist in plain text within source code files:

- **Version Control Exclusions**: Maintain a strict `.gitignore` configuration ensuring `.env` files are never committed to GitHub. If a secret is accidentally pushed, rotate and revoke the credential immediately rather than attempting to delete historical commits.
- **Secret Injection**: Environment secrets must be securely injected at build time using Cloudflare Pages dashboard environment variables or centralized key managers such as Doppler.

### Transport Security & Header Enforcement

Enforce Transport Layer Security (TLS/HTTPS) across all custom domains using strict browser directives:

- **HTTP Strict Transport Security (HSTS)**: Configure HSTS response headers across Cloudflare edge rules. HSTS forces web browsers to communicate exclusively over encrypted HTTPS connections, guarding against SSL stripping and Wi-Fi Man-in-the-Middle (MitM) attacks.

### Cross-Origin Resource Sharing (CORS) Restrictions

Explicitly define allowed CORS origins in backend API handlers. Avoid wildcard origins in production environments:

```http
Access-Control-Allow-Origin: https://yourdomain.com
```

Never configure `Access-Control-Allow-Origin: *` in production environments. Explicit origin matching prevents Cross-Site Request Forgery (CSRF) and unauthorized cross-domain API invocation.

### Rate Limiting & Brute-Force Defense

Implement rate-limiting controls using token-bucket algorithms built into Upstash Redis or Cloudflare Rate Limiting rules. Sensitive routes—such as authentication endpoints—must enforce strict thresholds (e.g., limiting requests to a maximum of 5 login attempts per IP address per 15-minute window) to block credential stuffing and brute-force dictionary attacks.

## 6. Phase 5: Financial Operations & Tiered Cost Matrix

Managing operational expenditure requires projecting costs across early development and production scale. The architecture allows for starting at minimal infrastructure cost during initial building, scaling into dedicated resources as active user volumes grow.

| Service Category | Bootstrapper / Developer Tier | Production / Pro Tier | Key Service Specifications & Operational Limits |
|---|---:|---:|---|
| **Supabase (Auth + DB)** | **$0.00 / month** | **$25.00 / month** | Free tier includes 50k active users and 500MB DB (pauses after 1 week inactivity). Pro tier includes 100k users, 8GB DB, daily PITR backups, and no project pausing. |
| **Cloudflare (Hosting + CDN)** | **$0.00 / month** | **$20.00 – $25.00 / month** | Free tier includes 500 builds/month and 100k requests/day. Pro tier provides faster build concurrency, advanced WAF rule sets, and image optimization. |
| **Stripe (Payments)** | **$0.00 monthly fee** | **$0.00 monthly fee** | Transactional pricing model charging ~2.9% + $0.30 per successful credit card transaction across both tiers. |
| **Exabytes Domain (.com)** | **~$1.25 / month** | **~$1.25 / month** | Domain registration cost averaging approximately RM55 – RM70 / year (~$1.25/month equivalent) depending on promotional renewal rates. |
| **Domain Privacy (WHOIS)** | **~$0.50 / month** | **~$0.50 / month** | Redaction service for registrar databases averaging approximately RM20 – RM30 / year (~$0.50/month equivalent). |
| **Total Monthly Expense** | **~$1.75 / month** | **~$46.75 – $51.75 / month** | Fixed operational costs excluding variable transaction fees. |
| **Total Yearly Expense** | **~$21.00 / year** | **~$561.00 – $621.00 / year** | Combined annual expenditure commitment for maintaining live production systems. |

## 7. Execution Summary & Step-by-Step Publishing Checklist

To transition the codebase from GitHub to a fully published live application, execute the following implementation sequence:

1. **Repository Initialization**: Commit application code to GitHub with `.env` added to `.gitignore`.
2. **Database & Identity Provisioning**: Provision a Supabase project, configure GoTrue authentication with TOTP MFA and Turnstile CAPTCHA, and enforce RLS policies across all PostgreSQL tables.
3. **Payment Processing Setup**: Implement Stripe Elements/Checkout, enable Stripe Radar, and enforce cryptographic `Stripe-Signature` header verification on backend webhooks.
4. **Domain & DNS Configuration**: Register a `.com` or `.my` domain via Exabytes, enable WHOIS privacy protection, delegate DNS nameservers to Cloudflare, and activate DNSSEC.
5. **CI/CD Automated Deployment**: Connect the GitHub repository to Cloudflare Pages/Workers, inject environment variables in the Cloudflare dashboard (or Doppler), and trigger the primary production build.
6. **Edge Network Hardening**: Enable HSTS headers, configure explicit CORS origins (`https://yourdomain.com`), and establish Upstash Redis or Cloudflare rate-limiting rules (maximum 5 login attempts per IP per 15 minutes).
