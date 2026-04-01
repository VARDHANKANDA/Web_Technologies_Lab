import React from "react";

function App() {
  const student = {
    name: "Vardhan",
    department: "CSE",
    year: "3rd Year",
    section: "A"
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #4facfe, #00f2fe)"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "300px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#333" }}>🎓 Student Profile</h2>
        <hr />

        <p><b>Name:</b> {student.name}</p>
        <p><b>Department:</b> {student.department}</p>
        <p><b>Year:</b> {student.year}</p>
        <p><b>Section:</b> {student.section}</p>
      </div>
    </div>
  );
}

export default App;