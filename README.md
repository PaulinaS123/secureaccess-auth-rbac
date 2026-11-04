# SecureAccess – Authentication & RBAC

## Project Overview

SecureAccess is a full-stack authentication application built with Node.js, Express, SQLite, HTML, CSS, and JavaScript.

The application allows users to register, log in, access protected resources, and log out. It implements Role-Based Access Control (RBAC) to restrict administrator-only functionality.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** SQLite
- **Password Security:** bcrypt
- **Authentication:** Express sessions
- **Frontend:** HTML, CSS, JavaScript

## Features

- User registration
- Secure login and logout
- Password hashing with bcrypt
- Session-based authentication
- User and administrator roles
- Protected dashboard endpoint
- Administrator-only user list
- Backend authorization middleware

## Installation and Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file containing `SESSION_SECRET` with a securely generated random value.
4. Start the application using `node --watch server.js`.
5. Open `http://localhost:3000` in your browser.

## Security Implementation

- Passwords are hashed with bcrypt using a cost factor of 12.
- SQL queries use parameters to reduce SQL injection risk.
- Sessions use an environment-based signing secret.
- Session cookies use `HttpOnly` and `SameSite=Lax`.
- Authentication is enforced by backend middleware.
- Administrator routes require the `admin` role.
- Public registration assigns the `user` role.
- Invalid login credentials return a generic error message.
- Sensitive files are excluded from Git through `.gitignore`.

**Limitations:** This project currently uses Express's in-memory session store for local development. A production deployment would require a persistent session store and additional protections, including CSRF mitigation and login rate limiting.

## QA Testing

| Test | Expected Result | Status |
|---|---|---|
| Register a valid user | 201 Created | Pass |
| Register duplicate email | 409 Conflict | Pass |
| Login with valid credentials | 200 OK | Pass |
| Login with invalid password | 401 Unauthorized | Pass |
| Access dashboard without login | 401 Unauthorized | Pass |
| Access dashboard after login | 200 OK | Pass |
| Regular user accesses admin endpoint | 403 Forbidden | Pass |
| Admin accesses admin endpoint | 200 OK | Pass |
| Logout | 200 OK | Pass |
| Access dashboard after logout | 401 Unauthorized | Pass |
| Inspect stored password | bcrypt hash | Pass |
| Submit empty login form | Browser blocks submission | Pass |
| Chrome DevTools Console check | No JavaScript errors | Pass |
| Dependency security audit | npm audit reports 0 vulnerabilities | Pass |

## AI-Assisted Development and Audit

ChatGPT was used as an AI co-pilot to help generate application code, explain implementation decisions, debug errors, and develop security tests.

The generated code was reviewed and tested manually. During development, dependency vulnerabilities were identified through npm auditing, and unnecessary dependencies were removed.

## Demo Video

(https://scedu-my.sharepoint.com/:v:/r/personal/victoriapaulina_sa1_seattlecolleges_edu/_layouts/15/stream.aspx?id=%2Fpersonal%2Fvictoriapaulina_sa1_seattlecolleges_edu%2FDocuments%2FRecordings%2FSecureAccess%20Assignment%20Victoria%20Salomon-20261103_194741-Grabaci%C3%B3n%20de%20la%20reuni%C3%B3n.mp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&share=cQqahqwnwYrjSom2C0hFruICEgUCZ0EhfBsFGV-0WHv1T0Iayg)

