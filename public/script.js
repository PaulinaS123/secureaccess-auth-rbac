
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = `Welcome, ${data.user.username}!`;
    } else {
      message.textContent = data.message;
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    console.error("Login error:", error);
  }
});

const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    registerMessage.textContent = data.message;

    if (response.ok) {
      registerForm.reset();
    }
  } catch (error) {
    registerMessage.textContent = "Registration failed. Please try again.";
    console.error("Registration error:", error);
  }
});

const dashboardButton = document.getElementById("dashboard-button");
const dashboardMessage = document.getElementById("dashboard-message");

dashboardButton.addEventListener("click", async () => {
  try {
    const response = await fetch("/dashboard");

    const data = await response.json();

    if (response.ok) {
      dashboardMessage.textContent =
        `${data.message} Your role is: ${data.role}`;
    } else {
      dashboardMessage.textContent = data.message;
    }
  } catch (error) {
    dashboardMessage.textContent = "Unable to load dashboard.";
    console.error("Dashboard error:", error);
  }
});

const adminButton = document.getElementById("admin-button");
const adminMessage = document.getElementById("admin-message");
const adminUsers = document.getElementById("admin-users");

adminButton.addEventListener("click", async () => {
  adminUsers.replaceChildren();

  try {
    const response = await fetch("/admin/users");
    const data = await response.json();

    if (!response.ok) {
      adminMessage.textContent = data.message;
      return;
    }

    adminMessage.textContent = "Registered users:";

    data.users.forEach((user) => {
      const item = document.createElement("li");
      item.textContent =
        `${user.username} (${user.email}) - Role: ${user.role}`;
      adminUsers.appendChild(item);
    });
  } catch (error) {
    adminMessage.textContent = "Unable to load admin dashboard.";
    console.error("Admin dashboard error:", error);
  }
});

