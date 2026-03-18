const student = {
    id: 8389,
    name: "Vardhan",
    department: "CSE",
    marks: 99
};

const { id, name, department, marks } = student;
console.log(id, name, department, marks);

const updatedStudent = {
    ...student,
    grade: "A"
};

console.log(updatedStudent);