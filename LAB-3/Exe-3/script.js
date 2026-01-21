// 1) Questions structure (text, radio, checkbox)
const questions = [
  {
    id: "q1",
    type: "text",
    label: "1) Student Name",
    required: true,
    minLength: 3,
    maxLength: 25,
    placeholder: "Enter your full name"
  },
  {
    id: "q2",
    type: "radio",
    label: "2) How do you rate this course?",
    required: true,
    options: ["Excellent ⭐⭐⭐⭐⭐", "Good ⭐⭐⭐⭐", "Average ⭐⭐⭐", "Poor ⭐⭐"]
  },
  {
    id: "q3",
    type: "checkbox",
    label: "3) What topics did you enjoy?",
    required: true,
    options: ["HTML", "CSS", "JavaScript", "Projects", "Assignments"],
    minSelect: 1,
    maxSelect: 3
  },
  {
    id: "q4",
    type: "radio",
    label: "4) Would you recommend this course to others?",
    required: true,
    options: ["Yes", "No"]
  },
  {
    id: "q5",
    type: "text",
    label: "5) Any Suggestions (Max 60 characters)",
    required: false,
    minLength: 0,
    maxLength: 60,
    placeholder: "Write a short suggestion..."
  }
];

const surveyContainer = document.getElementById("surveyContainer");
const surveyForm = document.getElementById("surveyForm");
const successMsg = document.getElementById("successMsg");

// 2) Generate fields dynamically
function generateSurvey() {
  surveyContainer.innerHTML = "";

  questions.forEach((q) => {
    const box = document.createElement("div");
    box.className = "question";
    box.dataset.qid = q.id;

    const title = document.createElement("div");
    title.className = "q-title";
    title.textContent = q.label;
    box.appendChild(title);

    if (q.type === "checkbox") {
      const desc = document.createElement("div");
      desc.className = "q-desc";
      desc.textContent = `Select between ${q.minSelect} and ${q.maxSelect} options.`;
      box.appendChild(desc);
    }

    // TEXT
    if (q.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.id = q.id;
      input.placeholder = q.placeholder || "";
      input.maxLength = q.maxLength || 999;

      input.addEventListener("input", () => validateQuestion(q.id));
      box.appendChild(input);
    }

    // RADIO
    if (q.type === "radio") {
      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options";

      q.options.forEach((opt, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = q.id;
        input.value = opt;
        input.id = `${q.id}_${index}`;

        input.addEventListener("change", () => validateQuestion(q.id));

        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        optionsDiv.appendChild(label);
      });

      box.appendChild(optionsDiv);
    }

    // CHECKBOX
    if (q.type === "checkbox") {
      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options";

      q.options.forEach((opt, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = q.id;
        input.value = opt;
        input.id = `${q.id}_${index}`;

        input.addEventListener("change", () => validateQuestion(q.id));

        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        optionsDiv.appendChild(label);
      });

      box.appendChild(optionsDiv);
    }

    // Error message
    const err = document.createElement("div");
    err.className = "error-msg";
    err.id = q.id + "_error";
    box.appendChild(err);

    surveyContainer.appendChild(box);
  });
}

// 3) Validate question
function validateQuestion(qid) {
  const q = questions.find((x) => x.id === qid);
  const errorEl = document.getElementById(qid + "_error");

  let valid = true;
  let message = "";

  // TEXT validation
  if (q.type === "text") {
    const input = document.getElementById(qid);
    const value = input.value.trim();

    if (q.required && value === "") {
      valid = false;
      message = "This field is required.";
    } else if (value.length < (q.minLength || 0)) {
      valid = false;
      message = `Minimum ${q.minLength} characters required.`;
    } else if (value.length > (q.maxLength || 999)) {
      valid = false;
      message = `Maximum ${q.maxLength} characters allowed.`;
    }

    if (!valid) input.classList.add("invalid-input");
    else input.classList.remove("invalid-input");
  }

  // RADIO validation
  if (q.type === "radio") {
    const selected = document.querySelector(`input[name="${qid}"]:checked`);
    if (q.required && !selected) {
      valid = false;
      message = "Please select one option.";
    }
  }

  // CHECKBOX validation
  if (q.type === "checkbox") {
    const selected = document.querySelectorAll(`input[name="${qid}"]:checked`);
    const count = selected.length;

    if (q.required && count === 0) {
      valid = false;
      message = "Select at least 1 option.";
    }

    if (q.minSelect && count < q.minSelect) {
      valid = false;
      message = `Select at least ${q.minSelect} options.`;
    }

    if (q.maxSelect && count > q.maxSelect) {
      valid = false;
      message = `Select maximum ${q.maxSelect} options only.`;
    }
  }

  // Show error message
  if (!valid) {
    errorEl.textContent = message;
    errorEl.classList.add("show");
  } else {
    errorEl.textContent = "";
    errorEl.classList.remove("show");
  }

  return valid;
}

// Validate all
function validateAll() {
  let ok = true;
  questions.forEach((q) => {
    if (!validateQuestion(q.id)) ok = false;
  });
  return ok;
}

// 6) Prevent submit
surveyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successMsg.textContent = "";

  if (!validateAll()) return;

  successMsg.textContent = "✅ Thank you! Your feedback is submitted.";
  surveyForm.reset();

  // Clear errors after reset
  questions.forEach((q) => validateQuestion(q.id));
});

// Start
generateSurvey();
