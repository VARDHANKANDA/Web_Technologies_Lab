import { useEffect, useState } from "react";

function App() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=India")
      .then((res) => res.json())
      .then((data) => {
        setUniversities(data.slice(0, 6)); // show 6 only
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch universities");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2>🎓 Indian Universities</h2>

      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={styles.grid}>
        {universities.map((uni, index) => (
          <div key={index} style={styles.card}>
            <h4>{uni.name}</h4>
            <p>{uni.country}</p>
            <a href={uni.web_pages[0]} target="_blank">
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    background: "#eef2f3",
    minHeight: "100vh"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "15px",
    marginTop: "20px"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }
};

export default App;