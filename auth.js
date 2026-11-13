/**
 * Frontend-only auth for CSC 400 Phase 2.
 * Uses localStorage. Replace with Laravel auth in Phase 3.
 */
const AUTH_USERS_KEY = "mofixaUsers";
const AUTH_SESSION_KEY = "mofixaUser";

const Auth = {
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    getUsers() {
        try {
            const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY));
            return Array.isArray(users) ? users : [];
        } catch {
            return [];
        }
    },

    saveUsers(users) {
        localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
    },

    getSession() {
        try {
            return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY));
        } catch {
            return null;
        }
    },

    setSession(user) {
        localStorage.setItem(
            AUTH_SESSION_KEY,
            JSON.stringify({ name: user.name, email: user.email })
        );
    },

    clearSession() {
        localStorage.removeItem(AUTH_SESSION_KEY);
    },

    findUser(email) {
        const normalized = email.trim().toLowerCase();
        return this.getUsers().find(user => user.email === normalized) || null;
    },

    register({ name, email, password }) {
        const users = this.getUsers();
        const normalized = email.trim().toLowerCase();
        if (users.some(user => user.email === normalized)) {
            return { ok: false, message: "An account with this email already exists." };
        }
        const user = {
            name: name.trim(),
            email: normalized,
            password
        };
        users.push(user);
        this.saveUsers(users);
        this.setSession(user);
        return { ok: true };
    },

    login({ email, password }) {
        const user = this.findUser(email);
        if (!user || user.password !== password) {
            return { ok: false, message: "Invalid email or password." };
        }
        this.setSession(user);
        return { ok: true };
    },

    logout() {
        this.clearSession();
        window.location.href = "index.html";
    },

    validateEmail(email) {
        if (!email.trim()) return "Email is required.";
        if (!this.emailPattern.test(email.trim())) return "Enter a valid email address.";
        return "";
    },

    validatePassword(password, { min = 6 } = {}) {
        if (!password) return "Password is required.";
        if (password.length < min) return `Password must be at least ${min} characters.`;
        return "";
    },

    validateName(name) {
        if (!name.trim()) return "Name is required.";
        if (name.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
    },

    setFieldError(inputId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(`${inputId}-error`);
        if (input) {
            input.classList.toggle("is-invalid", Boolean(message));
            input.setAttribute("aria-invalid", String(Boolean(message)));
        }
        if (error) {
            error.textContent = message || "";
        }
    },

    clearFormErrors(ids) {
        ids.forEach(id => this.setFieldError(id, ""));
    },

    renderNav() {
        const slot = document.getElementById("auth-nav");
        if (!slot) return;

        const session = this.getSession();
        if (session) {
            slot.innerHTML = `
                <span class="auth-user">Hi, ${session.name.split(" ")[0]}</span>
                <button type="button" class="auth-link-button" id="logout-button">Logout</button>
            `;
            document.getElementById("logout-button")?.addEventListener("click", () => this.logout());
        } else {
            slot.innerHTML = `
                <a href="./login.html">Login</a>
                <a href="./register.html">Register</a>
            `;
        }
    }
};

Auth.renderNav();

const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirm = document.getElementById("register-confirm").value;
        const status = document.getElementById("register-status");

        Auth.clearFormErrors([
            "register-name",
            "register-email",
            "register-password",
            "register-confirm"
        ]);

        const nameError = Auth.validateName(name);
        const emailError = Auth.validateEmail(email);
        const passwordError = Auth.validatePassword(password);
        let confirmError = "";
        if (!confirm) confirmError = "Please confirm your password.";
        else if (confirm !== password) confirmError = "Passwords do not match.";

        Auth.setFieldError("register-name", nameError);
        Auth.setFieldError("register-email", emailError);
        Auth.setFieldError("register-password", passwordError);
        Auth.setFieldError("register-confirm", confirmError);

        if (nameError || emailError || passwordError || confirmError) {
            status.textContent = "Please fix the errors above.";
            return;
        }

        const result = Auth.register({ name, email, password });
        if (!result.ok) {
            Auth.setFieldError("register-email", result.message);
            status.textContent = result.message;
            return;
        }

        status.textContent = "Account created. Redirecting…";
        window.location.href = "index.html";
    });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const status = document.getElementById("login-status");

        Auth.clearFormErrors(["login-email", "login-password"]);

        const emailError = Auth.validateEmail(email);
        const passwordError = Auth.validatePassword(password);

        Auth.setFieldError("login-email", emailError);
        Auth.setFieldError("login-password", passwordError);

        if (emailError || passwordError) {
            status.textContent = "Please fix the errors above.";
            return;
        }

        const result = Auth.login({ email, password });
        if (!result.ok) {
            status.textContent = result.message;
            return;
        }

        status.textContent = "Logged in. Redirecting…";
        window.location.href = "index.html";
    });
}
