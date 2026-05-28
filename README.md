<div align="center">

<br />

# She Can Foundation

### Production-Ready MERN Stack Platform for Women Empowerment

*A modern nonprofit communication and management platform — engineered for scale, built for impact.*

<br />

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-F7DF1E?style=flat-square&logo=jsonwebtokens&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Portfolio-blueviolet?style=flat-square)

<br />

[Live Demo](#live-demo) · [Features](#key-features) · [Architecture](#system-architecture) · [Setup](#installation--local-development) · [API Docs](#api-reference) · [Roadmap](#future-roadmap)

<br />

</div>

---

## Overview

**She Can Foundation** is a production-grade MERN Stack platform engineered to modernize the internal operations of a women empowerment nonprofit organization. Rather than a static landing page or a tutorial-style contact form, this application is architected as a deployable MVP — simulating the communication infrastructure a real NGO would need to operate at scale.

The platform delivers two distinct surfaces:

- **Public-facing website** — A polished, accessible landing page communicating the organization's mission, featuring animated testimonials, an FAQ system, and a contact intake form.
- **Secure Admin Operations Dashboard** — A SaaS-style internal tool enabling administrators to manage inbound submissions, track engagement analytics, execute status workflows, and export operational data.

Every engineering decision — from API design to component architecture to UX animation — was made through the lens of a production deployment.

---

## Problem Statement

Nonprofit organizations routinely face a fragmented operational reality: outreach queries arrive through informal channels, volunteers go untracked, mentorship requests pile up in email inboxes, and there's no unified system for managing communication status or generating insights.

**She Can Foundation** addresses this gap by providing:

- A reliable public submission intake system with real-time feedback
- A secure, role-protected admin environment to review and action every message
- A workflow-driven status system to track the full lifecycle of each inquiry (`New → Reviewed → Responded`)
- Analytics to surface submission trends and guide operational decisions
- Email automation to immediately acknowledge users and alert administrators

---

## Live Demo

| Surface | URL |
|---|---|
| Frontend | `Deployment Pending` |
| Backend API | `Deployment Pending` |

> Screenshots available in the [Screenshots](#screenshots) section below.

---

## Screenshots

| View | Preview |
|---|---|
| Landing Page — Hero | *(Add Screenshot)* |
| Landing Page — Testimonials & FAQ | *(Add Screenshot)* |
| Admin Login | *(Add Screenshot)* |
| Admin Dashboard — Overview | *(Add Screenshot)* |
| Message Management Table | *(Add Screenshot)* |
| Analytics Charts | *(Add Screenshot)* |
| Mobile Responsive View | *(Add Screenshot)* |

---

## Key Features

### Public Platform

| Feature | Details |
|---|---|
| Responsive Landing Page | Hero, mission statement, CTA sections — mobile-first layout |
| Testimonials Section | Animated success story cards with stagger transitions |
| FAQ Accordion | Smooth expand/collapse with Framer Motion |
| Contact Intake Form | Validated, async submission with real-time toast feedback |
| Glassmorphism UI | Modern frosted-glass aesthetic with gradient accents |
| Framer Motion Animations | Section fade-ins, slide-ups, hover interactions, stagger effects |

### Contact System

| Feature | Details |
|---|---|
| Client-side Validation | Real-time field validation before API dispatch |
| Backend Validation | Server-enforced schema and sanitization |
| Async Toast Notifications | Success, error, and loading states via React Hot Toast |
| MongoDB Persistence | Timestamped document storage via Mongoose |
| Email Automation | Dual-direction notifications — admin alert + user confirmation |
| Graceful Error Handling | Network and SMTP failures handled without UX disruption |

### Authentication System

| Feature | Details |
|---|---|
| JWT Token Authentication | Stateless, expiry-aware access tokens |
| bcrypt Password Hashing | Salted hashing with configurable cost factor |
| Protected Route System | Client-side guards redirecting unauthorized access |
| Auth Middleware | Server-side token validation on all secured endpoints |
| Persistent Sessions | Token stored in `localStorage` with auth context sync |
| Logout | Full client-state teardown on session termination |

### Admin Dashboard

| Feature | Details |
|---|---|
| Sidebar Navigation | Collapsible, responsive navigation system |
| Analytics Cards | KPI tiles with animated counters |
| Recharts Visualizations | Messages per day, status distribution, submission trends |
| Message Table | Sortable, searchable, paginated submission view |
| Status Workflow | Inline status updates — `New`, `Reviewed`, `Responded` |
| Search & Filter | Real-time search by name/email + status-based filtering |
| CSV Export | One-click structured data export via React CSV |
| Skeleton Loaders | Pulse-animated placeholders during async fetches |
| Recent Activity Feed | Live log of new submissions, status changes, and exports |

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React.js 18** | Component-driven UI with Hooks and Context API |
| **Vite** | Next-gen build tooling — sub-second HMR, optimized production bundles |
| **Tailwind CSS** | Utility-first styling with dark mode and responsive variants |
| **Framer Motion** | Declarative animation engine for production-quality motion design |
| **Axios** | Promise-based HTTP client with interceptors for auth headers |
| **React Router DOM** | Declarative client-side routing with protected route composition |
| **Recharts** | Composable chart library built on SVG for responsive analytics |
| **React CSV** | Structured CSV generation and browser download trigger |
| **React Hot Toast** | Lightweight, accessible notification toasts |
| **Lucide React** | Clean, consistent icon system |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | Non-blocking JavaScript runtime for the API server |
| **Express.js** | Minimal, performant REST API framework |
| **MongoDB Atlas** | Managed cloud NoSQL database with automatic scaling |
| **Mongoose** | ODM with schema validation, middleware hooks, and population |
| **JSON Web Tokens** | Stateless authentication with configurable expiry |
| **bcryptjs** | Secure password hashing with salt rounds |
| **Nodemailer** | SMTP-based transactional email delivery |
| **dotenv** | Secure environment variable isolation |
| **CORS** | Cross-origin policy management for API access control |

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────┐        ┌──────────────────────────┐
│      React Frontend      │◄──────►│     Express REST API      │
│  (Vite + Tailwind + FM)  │  HTTP  │     (Node.js + JWT)       │
└─────────────────────────┘        └────────────┬─────────────┘
                                                 │
                                    ┌────────────▼─────────────┐
                                    │      MongoDB Atlas        │
                                    │   (Mongoose ODM Layer)    │
                                    └──────────────────────────┘
                                                 │
                                    ┌────────────▼─────────────┐
                                    │    Nodemailer / SMTP      │
                                    │  (Transactional Emails)   │
                                    └──────────────────────────┘
```

### Frontend Structure

```
client/
├── public/
└── src/
    ├── api/
    │   ├── authApi.js          # Auth request abstractions
    │   └── messageApi.js       # Message CRUD abstractions
    │
    ├── assets/                 # Static images and icons
    │
    ├── components/
    │   ├── common/             # Shared UI primitives (Button, Badge, Loader)
    │   ├── dashboard/          # Dashboard-specific feature components
    │   └── layout/             # Navbar, Footer, Sidebar, PageWrapper
    │
    ├── context/
    │   └── AuthContext.jsx     # Global authentication state provider
    │
    ├── hooks/
    │   └── useAuth.js          # Auth state access hook
    │
    ├── pages/
    │   ├── public/             # Landing, Contact, About
    │   └── admin/              # Login, Dashboard, Messages, Analytics
    │
    ├── routes/
    │   └── ProtectedRoute.jsx  # JWT-guard HOC for admin routes
    │
    ├── utils/
    │   └── helpers.js          # Date formatters, status mappers, validators
    │
    ├── App.jsx
    └── main.jsx
```

### Backend Structure

```
server/
├── config/
│   └── db.js                  # MongoDB Atlas connection handler
│
├── controllers/
│   ├── adminController.js     # Auth logic — login, token issuance
│   └── messageController.js  # Message CRUD and status management
│
├── middleware/
│   └── authMiddleware.js      # JWT extraction, verification, and injection
│
├── models/
│   ├── Admin.js               # Admin schema with bcrypt pre-save hook
│   └── Message.js             # Contact submission schema with timestamps
│
├── routes/
│   ├── adminRoutes.js         # /api/admin — authentication endpoints
│   └── messageRoutes.js       # /api/messages — submission endpoints
│
├── utils/
│   └── emailService.js        # Nodemailer transporter and email templates
│
├── createAdmin.js             # One-time admin seed script
├── server.js                  # Express app bootstrap and middleware chain
└── .env                       # Environment configuration (not committed)
```

---

## Authentication Workflow

```
User submits credentials
        │
        ▼
POST /api/admin/login
        │
        ▼
adminController → query MongoDB for matching admin
        │
        ├── Not found → 401 Unauthorized
        │
        ▼
bcrypt.compare(inputPassword, hashedPassword)
        │
        ├── Mismatch → 401 Unauthorized
        │
        ▼
jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' })
        │
        ▼
Token returned to client → stored in localStorage
        │
        ▼
AuthContext updated → user state hydrated
        │
        ▼
Protected routes now accessible
        │
        ▼
Every subsequent API request → Authorization: Bearer <token>
        │
        ▼
authMiddleware.js → jwt.verify() → req.admin attached
        │
        ├── Invalid/Expired → 403 Forbidden
        │
        ▼
Controller executes → response returned
```

---

## Contact Form Workflow

```
User fills form (name, email, message)
        │
        ▼
Client-side validation (empty fields, email format)
        │
        ├── Fails → inline error states + toast
        │
        ▼
POST /api/messages — Axios dispatches request
        │
        ▼
Backend validates incoming payload
        │
        ▼
Mongoose saves document to MongoDB Atlas
{ name, email, message, status: 'New', createdAt }
        │
        ▼
emailService.js dispatches two emails in parallel:
  ├── Admin alert → "New submission received"
  └── User confirmation → "We received your message"
        │
        ▼
200 OK → Frontend shows success toast + form reset
```

---

## Dashboard Workflow

```
Admin authenticates → JWT validated by middleware
        │
        ▼
Dashboard mounts → parallel API calls initiated:
  ├── GET /api/messages       → populate message table
  └── GET /api/messages/stats → populate analytics cards + charts
        │
        ▼
Skeleton loaders displayed during async resolution
        │
        ▼
Data resolves → components hydrate with live data
        │
        ▼
Admin interactions:
  ├── Search        → client-side filter on name/email
  ├── Status filter → filter by New / Reviewed / Responded
  ├── Status update → PATCH /api/messages/:id/status
  ├── Delete        → DELETE /api/messages/:id
  └── Export CSV    → React CSV triggers browser download
```

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | Public | Validate credentials, return JWT |

**Request Body:**
```json
{
  "email": "admin@sheccan.org",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": { "id": "...", "email": "admin@shecan.org" }
}
```

---

### Messages

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/messages` | Public | Submit contact form |
| `GET` | `/api/messages` | 🔒 JWT | Fetch all submissions |
| `PATCH` | `/api/messages/:id/status` | 🔒 JWT | Update message status |
| `DELETE` | `/api/messages/:id` | 🔒 JWT | Delete a submission |

**POST `/api/messages` — Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "message": "I would like to learn more about your mentorship program."
}
```

**PATCH `/api/messages/:id/status` — Request Body:**
```json
{
  "status": "Reviewed"
}
```

> Status values: `New` | `Reviewed` | `Responded`

---

## Environment Configuration

Create a `.env` file inside the `server/` directory:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shecan

# Authentication
JWT_SECRET=your_secure_random_secret_minimum_32_chars
JWT_EXPIRES_IN=7d

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Application
ADMIN_EMAIL=admin@shecanfoundation.org
CLIENT_URL=http://localhost:5173
```

> **Security note:** Never commit `.env` to version control. The `.gitignore` should exclude it explicitly.

---

## Installation & Local Development

### Prerequisites

- Node.js `v18+`
- npm `v9+` or Yarn
- MongoDB Atlas account (free tier sufficient)
- Gmail account with App Password enabled (for email features)

---

### 1. Clone the Repository

```bash
git clone https://github.com/VedaPriya-Thota/she-can-foundation.git
cd she-can-foundation
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env   # populate with your credentials
npm run dev
```

Server starts at: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

### 4. Seed Admin User

```bash
cd server
node createAdmin.js
```

This creates the initial admin account. Credentials are defined inside the script — update them before running.

---

## MongoDB Atlas Setup

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new **Free Tier** cluster (M0)
3. Under **Database Access** — create a database user with read/write permissions
4. Under **Network Access** — add your IP address (or `0.0.0.0/0` for development)
5. Click **Connect → Connect your application** and copy the connection string
6. Paste into `MONGO_URI` in your `.env`, replacing `<password>` with your database user's password

---

## Deployment

### Frontend → Vercel

```bash
# From /client
npm run build

# Push to GitHub → Import project in Vercel
# Set environment variable: VITE_API_URL=https://your-backend.onrender.com
```

### Backend → Render

1. Push `server/` to a GitHub repository
2. Create a new **Web Service** in Render
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `node server.js`
5. Add all `.env` variables under **Environment Variables**

### Database → MongoDB Atlas

No additional configuration required for deployment — Atlas is fully managed. Ensure your Render service's outbound IP is whitelisted in Atlas Network Access.

---

## UI/UX Design Philosophy

The visual and interaction design of this platform was driven by four principles:

**1. SaaS Dashboard Aesthetics**
The admin interface draws inspiration from tools like Linear, Notion, and Vercel — clean information hierarchy, purposeful whitespace, and data-dense layouts that don't feel cluttered.

**2. Motion as Communication**
Framer Motion animations are used to guide attention and communicate state changes — not as decoration. Staggered list entries, smooth status transitions, and contextual hover states all carry semantic weight.

**3. Mobile-First Responsiveness**
Every component was built mobile-first. Breakpoints were tested across 320px to 1440px. The dashboard sidebar collapses gracefully on smaller viewports.

**4. Accessibility-Informed Decisions**
Color contrast ratios, semantic HTML, keyboard navigability, and ARIA-aware interactive elements were considered throughout — not retrofitted after.

---

## Scalability Considerations

The current architecture supports horizontal scaling with minimal refactoring:

| Concern | Current Approach | Scalable Path |
|---|---|---|
| Auth | JWT (stateless) | Already horizontally scalable |
| Database | MongoDB Atlas | Atlas scaling tiers + sharding |
| API | Monolithic Express | Decompose into microservices |
| File Storage | N/A | AWS S3 / Cloudinary |
| Real-time | Polling | WebSockets / Socket.io |
| Email | SMTP | SendGrid / AWS SES at volume |
| Access Control | Single admin | RBAC with role permissions |

---

## Future Roadmap

| Feature | Priority | Notes |
|---|---|---|
| Role-Based Access Control | High | Multiple admin tiers |
| Volunteer Onboarding Portal | High | Application + approval workflow |
| Real-time Notifications | Medium | Socket.io-based alert system |
| AI Message Categorization | Medium | Auto-tagging with OpenAI API |
| Mentorship Matching System | Medium | Mentor/mentee pairing engine |
| Event Management Module | Low | NGO event creation and RSVP |
| Multi-language Support | Low | i18n for regional accessibility |
| Notification Center | Low | In-app inbox for admin alerts |

---

## Why This Project Stands Out

Most internship-level portfolio submissions demonstrate CRUD competency. This project demonstrates **engineering judgment**.

- **Architecture over scaffolding** — The folder structure, API layer abstraction, and middleware chain reflect decisions made at the system level, not the component level.
- **Operational realism** — The status workflow system (`New → Reviewed → Responded`) mirrors real CRM and helpdesk tooling logic, not a simplified checkbox.
- **Frontend maturity** — Skeleton loaders, optimistic UI patterns, toast notifications, and animation systems reflect an understanding that UX quality is an engineering deliverable.
- **Security by default** — JWT middleware, bcrypt hashing, CORS configuration, and environment isolation are not afterthoughts — they're architectural requirements.
- **Deployability** — The application is ready to ship. Environment configuration, build tooling, and deployment documentation are production-complete.


---