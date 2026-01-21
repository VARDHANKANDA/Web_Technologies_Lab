const form = document.getElementById("regForm");

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const ageEl = document.getElementById("age");
const roleEl = document.getElementById("role");
const passEl = document.getElementById("password");
const confirmEl = document.getElementById("confirm");
const skillsEl = document.getElementById("skills");

const skillsBox = document.getElementById("skillsBox");
const submitBtn = document.getElementById("submitBtn");

const emailHint = document.getElementById("emailHint");
const passHint = document.getElementById("passHint");

const allowedDomains = {
  student: ["gmail.com", "yahoo.com", "outlook.com"],
  teacher: ["school.edu", "college.edu"],
  admin: ["company.com", "admin.com"]
};

function setState(input, msgId, ok) {
  const msg = document.getElementById(msgId);

  input.classList.remove("error", "success");
  msg.classList.remove("show");

  if (ok) {
    input.classList.add("success");
  } else {
    input.classList.add("error");
    msg.classList.add("show");
  }
}

function emailDomain(email) {
  return email.includes("@") ? email.split("@")[1].toLowerCase() : "";
}

function strongPassword(pass, role) {
  if (role === "student") return pass.length >= 6;
  if (role === "teacher") return pass.length >= 8 && /\d/.test(pass);
  if (role === "admin")
    return pass.length >= 10 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /\d/.test(pass) && /[^A-Za-z0-9]/.test(pass);
  return false;
}

function validate() {
  let ok = true;

  // Name
  ok &= setCheck(nameEl, "nameMsg", nameEl.value.trim().length >= 3);

  // Role
  ok &= setCheck(roleEl, "roleMsg", roleEl.value !== "");

  const role = roleEl.value;

  // Email
  const domain = emailDomain(emailEl.value.trim());
  if (role) {
    emailHint.textContent = `Allowed domains: ${allowedDomains[role].join(", ")}`;
    ok &= setCheck(emailEl, "emailMsg", allowedDomains[role].includes(domain));
  } else {
    emailHint.textContent = "";
    ok &= setCheck(emailEl, "emailMsg", emailEl.value.includes("@"));
  }

  // Age
  const age = Number(ageEl.value);
  let ageValid = false;
  if (role === "student") ageValid = age >= 10 && age <= 25;
  if (role === "teacher") ageValid = age >= 21 && age <= 65;
  if (role === "admin") ageValid = age >= 25 && age <= 60;
  ok &= setCheck(ageEl, "ageMsg", ageValid);

  // Password
  passHint.textContent = role
    ? (role === "student"
      ? "Student: min 6 characters"
      : role === "teacher"
      ? "Teacher: min 8 characters + 1 number"
      : "Admin: min 10 chars + upper + lower + number + special")
    : "Select a role first";

  ok &= setCheck(passEl, "passMsg", strongPassword(passEl.value, role));

  // Confirm Password
  ok &= setCheck(confirmEl, "confirmMsg", confirmEl.value === passEl.value && confirmEl.value !== "");

  // Skills show/hide
  if (role === "teacher" || role === "admin") {
    skillsBox.classList.remove("hidden");
    ok &= setCheck(skillsEl, "skillsMsg", skillsEl.value.trim().length >= 3);
  } else {
    skillsBox.classList.add("hidden");
    skillsEl.value = "";
  }

  submitBtn.disabled = !ok;
  return ok;
}

function setCheck(input, msgId, condition) {
  setState(input, msgId, condition);
  return condition;
}

form.addEventListener("input", validate);
roleEl.addEventListener("change", validate);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validate()) {
    alert("✅ Registration Successful!");
    form.reset();
    submitBtn.disabled = true;
    skillsBox.classList.add("hidden");
    emailHint.textContent = "";
    passHint.textContent = "";
  }
});
