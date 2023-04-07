import { useState } from "react";
import { useEffect } from "react";
import Text from "./Text";

export default function ListItem({ recording, setRecordings }) {
  const { blob, id, result } = recording;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

        // update global list
        setRecordings((prev) =>
          prev.map((item) =>
            item.id !== id ? item : { ...item, result: data }
          )
        );
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
        <Text recording={recording} setRecordings={setRecordings} />
      ) : null}
    </div>
  );
}
