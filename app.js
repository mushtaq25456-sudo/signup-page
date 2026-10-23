const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const contactInput = document.getElementById("contact");
const toggleBtn = document.getElementById("toggle");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?\d{10,15}$/;

// Password show / hide
toggleBtn.addEventListener("click", function () {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    toggleBtn.textContent = hidden ? "Hide" : "Show";
});

// Field ke neeche error dikhana ya hatana
function setError(name, message) {
    const field = document.getElementById("field-" + name);
    const text = document.getElementById("err-" + name);
    if (message) {
        field.classList.add("has-error");
        text.textContent = message;
    } else {
        field.classList.remove("has-error");
        text.textContent = "";
    }
}

// Jab user type kare to us field ka error hat jaye
[["email", emailInput], ["password", passwordInput], ["contact", contactInput]]
    .forEach(function (pair) {
        pair[1].addEventListener("input", function () {
            setError(pair[0], "");
        });
    });

function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        style: { background: "#1f4d3a", borderRadius: "6px" }
    }).showToast();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const contact = contactInput.value.replace(/[\s-]/g, "");

    let valid = true;

    if (email === "") {
        setError("email", "Email is required.");
        valid = false;
    } else if (!emailPattern.test(email)) {
        setError("email", "Enter a valid email address.");
        valid = false;
    } else {
        setError("email", "");
    }

    if (password === "") {
        setError("password", "Password is required.");
        valid = false;
    } else if (password.length < 6) {
        setError("password", "Password must be at least 6 characters.");
        valid = false;
    } else {
        setError("password", "");
    }

    if (contact === "") {
        setError("contact", "Phone number is required.");
        valid = false;
    } else if (!phonePattern.test(contact)) {
        setError("contact", "Enter a valid phone number (10 to 15 digits).");
        valid = false;
    } else {
        setError("contact", "");
    }

    if (!valid) return;

    showToast("Account created successfully.");
    form.reset();
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
});
