import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";
    if (!form.email.includes("@")) err.email = "Invalid email";
    if (form.password.length < 6)
      err.password = "Min 6 characters";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      alert("Submitted Successfully!");
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>📝 Registration</h2>

        <input name="name" placeholder="Name"
          value={form.name} onChange={handleChange} style={styles.input}/>
        <span style={styles.error}>{errors.name}</span>

        <input name="email" placeholder="Email"
          value={form.email} onChange={handleChange} style={styles.input}/>
        <span style={styles.error}>{errors.email}</span>

        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} style={styles.input}/>
        <span style={styles.error}>{errors.password}</span>

        <button style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", justifyContent: "center",
    alignItems: "center", height: "100vh",
    background: "linear-gradient(to right, #36d1dc, #5b86e5)"
  },
  card: {
    background: "white", padding: "30px",
    borderRadius: "12px", width: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    display: "flex", flexDirection: "column", gap: "10px"
  },
  input: {
    padding: "10px", borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px", background: "#5b86e5",
    color: "white", border: "none",
    borderRadius: "5px", cursor: "pointer"
  },
  error: { color: "red", fontSize: "12px" }
};

export default App;