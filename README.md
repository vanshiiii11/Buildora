# Buildora

**One Team. One Vision. One Perfect Home.**
An end-to-end construction and home services platform that replaces the fragmented, open contractor-marketplace model with a single verified in-house workforce — covering everything from AI-powered cost estimation and live package customization to on-site supervision, workforce dispatch, and executive-level company analytics.

---

## Why This Is Different

Most home-building platforms are just marketplaces — they connect you to independent contractors and step out of the picture. **Buildora is not an open worker marketplace.** Buildora recruits, equips, verifies, and directly operates its entire workforce under one brand. When a customer hires Buildora, Buildora takes complete ownership of the project — from blueprint to final handover — with one accountable team, not a patchwork of subcontractors.

**Company credentials:**
-  100% direct-employed staff (no gig-market subcontracting)
-  10,000+ projects delivered
-  25-year structural warranty
-  4.95 / 5 customer audit rating

---

## Features

### For Customers
- **Dynamic Package Builder** — customize a full home-build in real time: property type, plot size, built-up area, number of floors, and per-department tier (Basic → Standard → Premium → Elite) for everything from structural design to painting — with a **live cost engine** that recalculates instantly as selections change
- **AI Cost Estimator** — a neural estimation model (Buildora Neural AI Estimator v3.2) that analyzes live steel, cement, and skilled-labour rates by city to generate an instant, itemized budget projection with an accuracy index and over/under-budget warnings
- **On-Demand Home Services** — book standalone repair/installation jobs (plumbing, electrical, painting, carpentry, HVAC, smart home) with transparent upfront pricing and estimated completion time, delivered by uniformed, verified Buildora specialists
- **Assigned Team Leader visibility** — every locked-in project shows its dedicated, verified Team Leader with experience and rating before the customer commits

### For Team Leaders (Site Supervisors)
- **Site Console** — submit daily site logs with activity headlines, supervisor notes, progress percentage, worker count, and site photos, all **directly synced to the customer's live view**
- **Mandatory safety/uniform compliance checklist** — helmet, high-vis jacket, official T-shirt, steel-toe shoes verified daily before work begins
- **Single point of contact protocol** — Team Leaders are the customer's one accountable contact, reinforcing the "no unregistered workers" policy

### For Operations Managers
- **Centralized Workforce Dispatch** — assign verified Team Leaders to active construction sites and incoming home-service bookings from one dispatch queue
- **Workforce Directory & Uniform Compliance tracking** across all in-house departments
- **Live project assignment control** — reassign supervisors per project (e.g. Civil & Masonry, Electrical & Power) with real-time status

### For Admins (Executive Control Panel)
- **Company-wide analytics** — gross contracted value, amount collected, active turnkey sites, verified workforce size, and overall customer satisfaction (based on 1,400+ site audits)
- **Department performance metrics** — team leaders, skilled craftsmen, active project count, and audit rating broken down per department (Civil & Masonry, Plumbing & Drainage, Electrical & Power, Painting & Coating, Carpentry & Woodwork, Interior Design, Architecture & Structural, and more)

---

## Screenshots
### Landing Page
Verified-workforce positioning, trust stats, and three entry points: Build My Home, Book a Service, Get Free AI Estimate.
<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 17 28 PM" src="https://github.com/user-attachments/assets/9b4d308a-3100-473a-8c19-02305f5aa9de" />


### Dynamic Package Builder — Live Cost Engine
Every slider and tier change recalculates the estimated investment, cost-factor breakdown, and materials/labour/management split instantly.

<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 17 53 PM" src="https://github.com/user-attachments/assets/9e4a46e5-3fff-4b91-970e-d933e30e5fc1" />


### Package Builder — Department Tiers & Package Lock-In
Per-department tier selection (Basic/Standard/Premium/Elite) with real material brand transparency, assigned Team Leader, and final customer detail capture to lock the package.
<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 18 16 PM" src="https://github.com/user-attachments/assets/f7dc0260-7f9a-4781-a54b-288a1c50a4ef" />


### AI Cost Estimator
Instant AI-projected total cost with a 98.4% accuracy index, itemized cost factors, and automatic budget-overage warnings.

<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 18 37 PM" src="https://github.com/user-attachments/assets/8cf929b3-bcf3-4e8d-a164-81e02c101489" />


### On-Demand Home Services
Standalone repair/installation booking with category filters, service inclusions, starting price, and estimated turnaround time.
<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 18 49 PM" src="https://github.com/user-attachments/assets/a1aab7d2-82a5-485c-abb4-7470e7a53c00" />

### Team Leader — Site Console
Daily site log submission with safety compliance checklist, synced live to the customer.
<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 18 59 PM" src="https://github.com/user-attachments/assets/d388cecb-eac2-435e-9142-aea2a1b8aabb" />


### Operations Manager — Workforce Dispatch
Centralized assignment of Team Leaders to construction projects and home-service bookings.
<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 19 11 PM" src="https://github.com/user-attachments/assets/245e8d93-c836-4aee-881a-22e481c4dedb" />


### Admin — Executive Control Panel
Company-wide financial and workforce analytics, department-by-department performance and audit ratings.
<img width="1000" height="500" alt="Screenshot 2026-08-08 at 8 19 19 PM" src="https://github.com/user-attachments/assets/d3a9286f-2ead-42b2-8ec1-fffe857ef1b4" />

---

## How It Works — End-to-End Flow

```mermaid
flowchart TD
    A[Customer visits Buildora] --> B{Entry Point}
    B -- Build a home --> C[Package Builder: set property specs & department tiers]
    B -- Quick estimate --> D[AI Cost Estimator: instant budget projection]
    B -- Small job --> E[Home Services: book a single repair/installation]

    C --> F[Live cost engine updates in real time]
    F --> G[Customer enters details & locks package]
    D --> G
    E --> H[Booking enters Home Service Dispatch Queue]

    G --> I[Operations Manager assigns a verified Team Leader]
    H --> I

    I --> J[Team Leader assigned to project / booking]
    J --> K[Team Leader runs daily Site Console]
    K --> L[Uniform & safety compliance check]
    K --> M[Daily site log: progress %, notes, photos]
    L --> N[Synced live to Customer Portal]
    M --> N

    N --> O[Customer tracks progress in real time]
    O --> P{Project complete?}
    P -- No --> K
    P -- Yes --> Q[Final handover]

    I --> R[Admin Console: company-wide analytics]
    K --> R
    R --> S[Executive tracks revenue, active sites, workforce compliance, satisfaction]
```

**In short:**
1. A customer enters through the **Package Builder**, **AI Cost Estimator**, or **Home Services** booking flow.
2. Once a project or booking is confirmed, the **Operations Manager** dispatches a verified, in-house **Team Leader**.
3. The Team Leader runs daily operations through the **Site Console** — logging progress, notes, and mandatory safety/uniform compliance — all synced live to the customer.
4. The customer tracks their project in real time with full transparency, until final handover.
5. Throughout, the **Admin Console** aggregates company-wide financials, active sites, department performance, and audit ratings for executive oversight.

---

## Roles & Access

| Role | Portal | Core Responsibility |
|---|---|---|
| **Customer** | Customer Portal | Build/estimate a project, book home services, track live progress |
| **Team Leader** | Site Console | Daily site logging, safety compliance, direct customer communication |
| **Operations Manager** | Workforce Dispatch | Assign Team Leaders to projects & bookings, manage workforce directory |
| **Admin** | Executive Control Panel | Company-wide analytics, department performance, quality compliance oversight |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Custom dark-themed, component-based UI |
| Estimation Engine | Rule-based / AI-assisted live cost calculation (property type × plot size × tier multipliers) |
| Dev Environment | `npm run dev` — served on `localhost:5173` |

---

## Getting Started

```bash
# clone the repo
git clone https://github.com/YOUR_USERNAME/buildora.git
cd buildora

# install dependencies
npm install

# run the app
npm run dev
```

App runs at `http://localhost:5173`.

---

## Roadmap

- [x] Dynamic Package Builder with live multi-department cost engine
- [x] AI Cost Estimator with budget-overage detection
- [x] Home Services on-demand booking flow
- [x] Team Leader Site Console with safety compliance checklist
- [x] Operations Manager workforce dispatch queue
- [x] Admin executive analytics dashboard
- [ ] Real payment/checkout flow for locked-in packages
- [ ] Push notifications for daily site log updates to customers
- [ ] Role-based authentication & permissions (currently role switcher, not secured login)
- [ ] Persistent backend/database (currently demo data)
- [ ] Customer-facing project timeline / Gantt view

---

## Author

**Vanshika Motwani**
## Email: vanshikamotwani120031@gmail.com
## Linkedin: https://www.linkedin.com/in/vanshika-motwani-2834b632b/

---

*Buildora is a concept platform demonstrating an end-to-end, in-house-workforce alternative to the open contractor marketplace model — spanning customer-facing estimation tools, field supervision, workforce dispatch, and executive analytics in one connected system.*
