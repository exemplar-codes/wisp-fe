import { useState } from "react";
import MicIcon from "./assets/mic.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="main-page">
        <img src={MicIcon} alt="mic" height="100" />
      </div>
    </div>
  );
}

export default App;
