import { useState } from "react";
import { useEffect } from "react";
import Text from "./Text";

export default function ListItem({ blob, id, setRecordings }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchText = async (blob) => {
      setLoading(true);
      try {
        const resp = await fetch("http://localhost:3000/audio", {
          method: "POST",
          body: blob,
          headers: {
            "Content-Type": "audio/ogg",
          },
        });
        const data = await resp.json();
        setResult(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchText(blob);
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {loading ? "Loading" : null}
      {!loading && error ? JSON.stringify(error) : null}
      {!loading && result ? (
        <Text result={result} setRecordings={setRecordings} />
      ) : null}
    </div>
  );
}
