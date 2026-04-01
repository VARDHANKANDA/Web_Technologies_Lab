import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #ff758c, #ff7eb3)"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}>
        <h1>🔢 Counter</h1>
        <h2 style={{ fontSize: "40px", margin: "20px 0" }}>{count}</h2>

        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            margin: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          ➕ Increment
        </button>

        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: "10px 20px",
            margin: "10px",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          ➖ Decrement
        </button>
      </div>
    </div>
  );
}

export default App;