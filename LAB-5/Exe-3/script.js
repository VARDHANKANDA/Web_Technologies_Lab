let students = [];

// LOAD (READ)
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file.");
            }
            return response.json();   // Parsing JSON
        })
        .then(data => {
            students = data;
            displayStudents();
            showMessage("Students loaded successfully!", "green");
        })
        .catch(error => {
            showMessage("JSON Error: " + error.message, "red");
        });
}

// DISPLAY TABLE
function displayStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    if (students.length === 0) {
        showMessage("No student records found!", "orange");
        return;
    }

    students.forEach(student => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
            </tr>
        `;
    });
}

// VALIDATION
function validateInputs(requireAll = true) {
    const id = studentId.value.trim();
    const name = studentName.value.trim();
    const course = studentCourse.value.trim();
    const marks = studentMarks.value.trim();

    if (!id) {
        showMessage("Student ID is required!", "red");
        return false;
    }

    if (requireAll && (!name || !course || !marks)) {
        showMessage("All fields are required!", "red");
        return false;
    }

    if (marks && (marks < 0 || marks > 100)) {
        showMessage("Marks must be between 0 and 100!", "red");
        return false;
    }

    return true;
}

// CREATE
function addStudent() {
    if (!validateInputs(true)) return;

    const id = parseInt(studentId.value);

    if (students.some(student => student.id === id)) {
        showMessage("Student ID already exists!", "red");
        return;
    }

    const newStudent = {
        id: id,
        name: studentName.value,
        course: studentCourse.value,
        marks: parseInt(studentMarks.value)
    };

    students.push(newStudent);
    displayStudents();
    showMessage("Student added successfully!", "green");
}

// UPDATE
function updateStudent() {
    if (!validateInputs(false)) return;

    const id = parseInt(studentId.value);
    const student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student not found!", "red");
        return;
    }

    if (studentCourse.value) {
        student.course = studentCourse.value;
    }

    if (studentMarks.value) {
        student.marks = parseInt(studentMarks.value);
    }

    displayStudents();
    showMessage("Student updated successfully!", "green");
}

// DELETE
function deleteStudent() {
    if (!validateInputs(false)) return;

    const id = parseInt(studentId.value);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student not found!", "red");
        return;
    }

    students.splice(index, 1);
    displayStudents();
    showMessage("Student deleted successfully!", "green");
}

// MESSAGE FUNCTION
function showMessage(msg, color) {
    const messageDiv = document.getElementById("message");
    messageDiv.style.color = color;
    messageDiv.textContent = msg;
}