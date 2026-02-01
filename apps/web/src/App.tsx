import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [health, setHealth] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios.get(`${API}/health`)
      .then(res => setHealth(res.data))
      .catch(err => setError(err?.message || "API error"));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Erasmus CRM Foundation</h1>
      <p>API: {API}</p>

      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {health ? <pre>{JSON.stringify(health, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}
