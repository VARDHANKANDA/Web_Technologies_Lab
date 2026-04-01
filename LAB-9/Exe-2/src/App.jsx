import StudentCard from "./StudentCard";

function App() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      height: "100vh",
      alignItems: "center",
      background: "#f0f2f5"
    }}>
      <StudentCard name="Vardhan" department="CSE" marks="100" />
      <StudentCard name="Manoj" department="ECE" marks="90" />
      <StudentCard name="Kiran" department="IT" marks="78" />
    </div>
  );
}

export default App;