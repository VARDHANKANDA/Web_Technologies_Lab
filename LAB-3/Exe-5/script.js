const form = document.getElementById("multiForm");

const stages = document.querySelectorAll(".stage");
const stepNum = document.getElementById("stepNum");
const progressFill = document.getElementById("progressFill");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const reviewBox = document.getElementById("reviewBox");
const successMsg = document.getElementById("successMsg");

// Inputs
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const terms = document.getElementById("terms");

// Errors
const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");
const confirmErr = document.getElementById("confirmErr");
const ageErr = document.getElementById("ageErr");
const genderErr = document.getElementById("genderErr");
const termsErr = document.getElementById("termsErr");

// Store input temporarily in JS object
let formData = {
  fullName: "",
  email: "",
  password: "",
  age: "",
  gender: ""
};

let currentStep = 1;

// Allowed Email Domains
const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

// Helpers
function showStep(step) {
  stages.forEach((s) => s.classList.remove("active"));
  document.querySelector(`.stage[data-step="${step}"]`).classList.add("active");

  stepNum.textContent = step;
  progressFill.style.width = (step * 25) + "%";

  prevBtn.disabled = step === 1;

  if (step === 4) {
    nextBtn.classList.add("hide");
    submitBtn.classList.remove("hide");
    updateReview();
  } else {
    nextBtn.classList.remove("hide");
    submitBtn.classList.add("hide");
  }
}

function setError(input, errEl, msg) {
  input.classList.add("invalid");
  errEl.textContent = msg;
}

function clearError(input, errEl) {
  input.classList.remove("invalid");
  errEl.textContent = "";
}

// ----------------------------
// Stage Validations (with constraints)
// ----------------------------
function validateStep(step) {
  let ok = true;

  // STAGE 1: Name + Email
  if (step === 1) {
    const nameVal = fullName.value.trim();
    const emailVal = email.value.trim();

    // Name constraints: letters + spaces only, 3-25 chars
    if (nameVal.length < 3 || nameVal.length > 25) {
      setError(fullName, nameErr, "Name must be 3 to 25 characters.");
      ok = false;
    } else if (!/^[A-Za-z ]+$/.test(nameVal)) {
      setError(fullName, nameErr, "Name must contain only letters and spaces.");
      ok = false;
    } else {
      clearError(fullName, nameErr);
    }

    // Email constraints: valid format + allowed domains
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      setError(email, emailErr, "Enter a valid email format.");
      ok = false;
    } else {
      const domain = emailVal.split("@")[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
        setError(email, emailErr, `Email domain must be: ${allowedDomains.join(", ")}`);
        ok = false;
      } else {
        clearError(email, emailErr);
      }
    }

    if (ok) {
      formData.fullName = nameVal;
      formData.email = emailVal;
    }
  }

  // STAGE 2: Password rules
  if (step === 2) {
    const passVal = password.value;
    const confirmVal = confirmPassword.value;

    // Password constraints:
    // 8+ chars, 1 uppercase, 1 number, 1 special char
    if (passVal.length < 8) {
      setError(password, passErr, "Password must be at least 8 characters.");
      ok = false;
    } else if (!/[A-Z]/.test(passVal)) {
      setError(password, passErr, "Password must contain 1 uppercase letter.");
      ok = false;
    } else if (!/[0-9]/.test(passVal)) {
      setError(password, passErr, "Password must contain 1 number.");
      ok = false;
    } else if (!/[!@#$%^&*]/.test(passVal)) {
      setError(password, passErr, "Password must contain 1 special character (!@#$%^&*).");
      ok = false;
    } else {
      clearError(password, passErr);
    }

    // Confirm password
    if (confirmVal !== passVal || confirmVal === "") {
      setError(confirmPassword, confirmErr, "Passwords do not match.");
      ok = false;
    } else {
      clearError(confirmPassword, confirmErr);
    }

    if (ok) {
      formData.password = passVal;
    }
  }

  // STAGE 3: Age + Gender
  if (step === 3) {
    const ageVal = Number(age.value);

    // Age constraints: 13 to 60
    if (!ageVal || ageVal < 13 || ageVal > 60) {
      setError(age, ageErr, "Age must be between 13 and 60.");
      ok = false;
    } else {
      clearError(age, ageErr);
    }

    // Gender required
    if (gender.value === "") {
      setError(gender, genderErr, "Please select gender.");
      ok = false;
    } else {
      clearError(gender, genderErr);
    }

    if (ok) {
      formData.age = ageVal;
      formData.gender = gender.value;
    }
  }

  // STAGE 4: Terms checkbox
  if (step === 4) {
    if (!terms.checked) {
      termsErr.textContent = "You must accept the terms & conditions.";
      ok = false;
    } else {
      termsErr.textContent = "";
    }
  }

  return ok;
}

// Review Stage 4
function updateReview() {
  reviewBox.innerHTML = `
    <b>Review Your Details:</b><br/>
    Name: ${formData.fullName}<br/>
    Email: ${formData.email}<br/>
    Age: ${formData.age}<br/>
    Gender: ${formData.gender}
  `;
}

// Navigation
nextBtn.addEventListener("click", () => {
  successMsg.textContent = "";

  if (!validateStep(currentStep)) return;

  currentStep++;
  showStep(currentStep);
});

prevBtn.addEventListener("click", () => {
  successMsg.textContent = "";

  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  successMsg.textContent = "";

  // Validate all steps strictly
  for (let s = 1; s <= 4; s++) {
    if (!validateStep(s)) {
      currentStep = s;
      showStep(currentStep);
      return;
    }
  }

  successMsg.textContent = "✅ Form submitted successfully!";
  form.reset();

  // Reset stored data
  formData = { fullName: "", email: "", password: "", age: "", gender: "" };
  currentStep = 1;
  showStep(currentStep);
});

// Start
showStep(currentStep);
