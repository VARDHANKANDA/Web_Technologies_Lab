import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;

    setItems([...items, { id: Date.now(), text: input }]);
    setInput("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📋 Task Manager</h2>

        <div style={styles.row}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task"
            style={styles.input}
          />
          <button onClick={addItem} style={styles.addBtn}>Add</button>
        </div>

        {items.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          items.map(item => (
            <div key={item.id} style={styles.item}>
              <span>{item.text}</span>
              <button onClick={() => removeItem(item.id)} style={styles.delBtn}>
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", justifyContent: "center",
    alignItems: "center", height: "100vh",
    background: "#eef2f3"
  },
  card: {
    background: "white", padding: "20px",
    borderRadius: "10px", width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },
  row: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "8px" },
  addBtn: { padding: "8px", background: "green", color: "white", border: "none" },
  item: {
    display: "flex", justifyContent: "space-between",
    marginTop: "10px", padding: "8px",
    background: "#f5f5f5", borderRadius: "5px"
  },
  delBtn: { background: "red", color: "white", border: "none" }
};

export default App;