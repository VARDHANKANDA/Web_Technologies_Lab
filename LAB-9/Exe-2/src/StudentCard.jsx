function StudentCard({ name, department, marks }) {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      width: "220px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      transition: "0.3s"
    }}>
      <h3 style={{ color: "#4facfe" }}>{name}</h3>
      <p>{department}</p>
      <p><b>Marks:</b> {marks}</p>
    </div>
  );
}

export default StudentCard;