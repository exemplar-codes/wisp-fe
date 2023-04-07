import { useEffect } from "react";
import { useState } from "react";
import Icon from "./Icon";

export default function Text({ result, setRecordings }) {
  // copied tick
  const [copiedVisible, setCopiedVisible] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(result.text);
    setCopiedVisible(true);
  };
  useEffect(() => {
    if (copiedVisible) {
      const timeout = setTimeout(() => setCopiedVisible(false), 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copiedVisible]);

  // delete recording
  const deleteButtonHandler = () => {
    setRecordings((existingRecordings) => {
      const idx = existingRecordings.indexOf(result.id);
      if (idx === -1) return;

      return [
        ...existingRecordings.slice(0, idx),
        ...existingRecordings.slice(idx + 1, 0),
      ];
    });
  };

  return (
    <div className="flex items-center gap-md">
      <p className="result-text shrink-0" onClick={copyToClipboard}>
        {result.text}
      </p>
      <button onClick={deleteButtonHandler}>
        <Icon name="trash" />
      </button>
      <details>
        <summary>Details</summary>
        {JSON.stringify(result)}
      </details>
      {copiedVisible ? <Icon name="tick" height="40px" /> : null}
    </div>
  );
}
