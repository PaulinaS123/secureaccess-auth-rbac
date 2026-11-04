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

### AI Prompts and Critique

### AI Prompts and Critique

I used ChatGPT as an AI co-pilot throughout the development of SecureAccess. AI helped me understand authentication, generate code, troubleshoot errors, and test the application.

**1. Authentication and Registration**

AI assistance: Generate an Express application with user registration, login, SQLite storage, and bcrypt password hashing.

**Critique:** I verified that passwords were hashed rather than stored as plaintext. I also tested successful registration, duplicate emails, and invalid login credentials.

**2. Role-Based Access Control (RBAC)**

AI assistance: Implement middleware to distinguish authenticated users from administrators.

**Critique:** I tested the backend endpoints with different account roles. A regular user received `403 Forbidden` when accessing the admin endpoint, while an administrator received `200 OK`. An unauthenticated request received `401 Unauthorized`.

**3. Session Management**

AI assistance: Implement session-based authentication and logout using Express sessions.

**Critique:** I verified that logging out invalidated the session and prevented further access to the protected dashboard. I also identified that the default in-memory session store is not suitable for production.

**4. Frontend Development**

AI assistance: Create HTML forms and JavaScript `fetch()` requests to connect the frontend to the backend.

**Critique:** During testing, I discovered that the registration form was not working because the JavaScript loaded before the HTML elements and some form inputs were duplicated. I corrected the HTML structure and confirmed that registration and login worked.

**5. Dependency Security**

AI assistance: Identify and troubleshoot npm dependency vulnerabilities.

**Critique:** I reviewed npm audit results and removed unnecessary dependencies, including `connect-sqlite3` and `nodemon`, which reduced the reported vulnerabilities to zero at the time of testing.

**Overall Reflection**

AI helped speed up development, but I still needed to review, test, and debug the generated code. I learned that working functionality alone does not guarantee security. Testing authentication, authorization, password storage, and session behavior was essential.


## Demo Video

*Add the video link after recording the walkthrough.*
