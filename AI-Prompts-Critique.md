## AI-Assisted Development: Prompts and Critique

For this assignment, I used ChatGPT as an AI co-pilot to help develop, debug, and test SecureAccess. The following are comprehensive, reconstructed prompts representing the development tasks. They are not verbatim transcripts.

### Prompt 1: Build the Full-Stack Authentication Application

**AI Prompt:**

"Act as a full-stack software developer and help me build a secure authentication and Role-Based Access Control (RBAC) application called SecureAccess.

Use the following technologies:
- Node.js and Express for the backend
- SQLite for the database
- HTML, CSS, and vanilla JavaScript for the frontend
- bcrypt for password hashing
- express-session for session-based authentication
- dotenv for environment variables

The application must allow users to register, log in, log out, and access protected resources.

Create a clear project structure with server.js, database.js, a public folder containing index.html, script.js, and style.css, and a .env file for the session secret.

Explain each step and provide code that I can test locally using VS Code and http://localhost:3000."

**Critique:**

The AI helped establish the project architecture and organize the backend and frontend. I reviewed the generated code and tested each feature instead of assuming it worked correctly.

### Prompt 2: Implement Secure Registration and Login

**AI Prompt:**

"Implement secure user registration and login endpoints in my Express application.

For registration:
- Create a POST /register endpoint.
- Accept username, email, and password.
- Validate required fields and enforce a minimum password length of eight characters.
- Hash passwords using bcrypt with a cost factor of 12.
- Store users in SQLite using parameterized SQL queries.
- Assign every newly registered account the user role by default.
- Reject duplicate email addresses.
- Never return password hashes in API responses.

For login:
- Create a POST /login endpoint.
- Verify submitted passwords using bcrypt.compare().
- Return a generic error for invalid credentials.
- Regenerate the session after successful authentication.
- Save the authenticated user's ID in the session.

Explain how the registration and login processes work and provide curl commands to test successful and unsuccessful requests."

**Critique:**

I verified successful registration and login, duplicate email handling, and invalid password rejection. I also inspected SQLite to confirm that passwords were stored as bcrypt hashes rather than plaintext.

### Prompt 3: Implement Role-Based Access Control

**AI Prompt:**

"Help me implement backend Role-Based Access Control using two roles: user and admin.

Create a requireAuth middleware function that checks whether a user has an authenticated session.

Create a requireAdmin middleware function that verifies the authenticated user's role is admin.

Implement:
- GET /dashboard, accessible to authenticated users.
- GET /admin/users, accessible only to administrators.

The administrator endpoint should return usernames, emails, and roles, but never passwords.

Use appropriate HTTP status codes:
- 401 Unauthorized when the user is not authenticated.
- 403 Forbidden when an authenticated user lacks permission.
- 200 OK when access is allowed.

Explain why authorization must be enforced on the backend instead of relying on hidden frontend buttons."

**Critique:**

I tested all three authorization scenarios. Unauthenticated users received 401, regular users attempting administrator access received 403, and administrators received 200 with the registered user list.

### Prompt 4: Implement Secure Session Management and Logout

**AI Prompt:**

"Implement session-based authentication using express-session.

Store the session signing secret in a .env file and configure the session cookie with HttpOnly, SameSite=Lax, and a one-hour expiration.

Use a secure cookie when the application runs over HTTPS in production.

Regenerate the session after successful login to reduce session fixation risks.

Create a POST /logout endpoint that destroys the authenticated user's session and clears the session cookie.

Provide instructions to test login, authenticated access, logout, and attempted access after logout.

Also identify limitations of using the default in-memory session store and explain what would need to change before production deployment."

**Critique:**

I tested logout by logging in, destroying the session, and attempting to access the dashboard using the old cookie. The server returned 401 after logout. I also identified that the default session store is appropriate only for local development.

### Prompt 5: Create the Frontend Interface

**AI Prompt:**

"Create a simple, responsive frontend for my SecureAccess application using HTML, CSS, and vanilla JavaScript.

Include:
- A login form with email and password.
- A registration form with username, email, and password.
- A user dashboard button.
- An administrator dashboard button.
- Clear success and error messages.

Use JavaScript fetch() to communicate with the Express backend.

Make sure form submissions do not refresh the page, input fields have appropriate labels and autocomplete attributes, and the JavaScript file loads after the HTML elements.

Display returned API messages safely using textContent instead of inserting untrusted HTML.

Style the interface with a light background, white cards, blue buttons, and accessible focus indicators."

**Critique:**

During testing, I discovered that the registration form was not functioning because JavaScript was loaded before the HTML elements and some inputs were duplicated. I corrected the HTML structure and verified that registration, login, and both dashboards worked.

### Prompt 6: Develop Positive and Negative QA Tests

**AI Prompt:**

"Act as a software QA tester and create a test plan for my SecureAccess authentication and RBAC application.

Include positive and negative test cases for:
- Successful registration
- Duplicate email registration
- Successful login
- Invalid login credentials
- Empty form submission
- Password shorter than eight characters
- Authenticated dashboard access
- Unauthenticated dashboard access
- Regular user attempting administrator access
- Administrator accessing the user list
- Successful logout
- Attempting protected access after logout

For each test, identify the action, expected HTTP status code or browser behavior, and how to verify the result.

Use curl for backend testing and Chrome Developer Tools Network and Console for frontend testing.

Explain the difference between 400, 401, 403, and 409 responses."

**Critique:**

I manually executed the test cases and documented the results in the README. I verified both frontend validation and backend validation because browser restrictions can be bypassed through direct API requests.

### Prompt 7: Perform a Security Audit

**AI Prompt:**

"Review my SecureAccess application as a security auditor.

Evaluate:
- Password hashing and bcrypt configuration
- SQL injection prevention
- Input validation
- Authentication and authorization middleware
- Session creation and destruction
- Cookie security settings
- Environment variable protection
- Sensitive information in API responses
- Dependency vulnerabilities
- Potential weaknesses in the current implementation

Explain which protections are already implemented, which should be tested, and which are still missing.

Provide commands to inspect password hashes in SQLite, check Git-tracked files, and run npm audit.

Do not assume the application is production-ready simply because the tests pass."

**Critique:**

I confirmed that passwords were hashed, sensitive files were excluded from Git, and npm audit reported zero known vulnerabilities at the time of testing. I also documented remaining production concerns, including persistent session storage, CSRF protection, and login rate limiting.

### Prompt 8: Prepare GitHub Documentation and Submission

**AI Prompt:**

"Help me prepare my SecureAccess application for submission as a software development assignment.

Create a README.md that includes:
- Project overview
- Technologies used
- Application features
- Installation and setup instructions
- Security implementation
- QA test results
- AI-assisted development prompts and critique
- Known limitations
- Demo video link

Explain how to use .gitignore to exclude .env, SQLite database files, node_modules, and session cookie files.

Guide me through initializing a Git repository inside the correct project folder, committing files, and pushing the application to GitHub.

Help me prepare a six-minute video walkthrough demonstrating the architecture, functionality, security tests, and lessons learned."

**Critique:**

I used Git to track the project and verified that sensitive files were excluded from the repository. I also documented the development process, test results, and limitations. The final video demonstrates the application's functionality and security behavior.

## Overall AI Reflection

Using ChatGPT helped me build SecureAccess incrementally and better understand how authentication and authorization work.

The most useful part of AI assistance was receiving explanations alongside code and being able to troubleshoot errors as they appeared.

I learned that AI-generated code should always be reviewed and tested. Even when an application appears functional, it can still have security weaknesses.

Through this project, I gained practical experience with password hashing, session management, backend middleware, role-based permissions, API testing, Chrome Developer Tools, and GitHub documentation.

I also learned the importance of distinguishing between authentication, which verifies who a user is, and authorization, which determines what the user is allowed to access.
