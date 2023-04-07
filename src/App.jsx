import "./App.css";

import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import ListItem from "./components/ListItem";
import { isCtrlC, isEscape, isSpace } from "./utils/KeyChecker";

function App() {
  const [recordings, setRecordings] = useState([]);
  const [ignoreRecording, setIgnoreRecording] = useState(false);

  const onRecordingComplete = (blob) => {
    if (ignoreRecording) setIgnoreRecording(false);
    else setRecordings((_) => _.concat({ id: Date.now().toString(), blob }));
  };

  const recorderControls = useAudioRecorder();
  const toggleRecordingStartStop = () => {
    recorderControls.isRecording
      ? recorderControls.stopRecording()
      : recorderControls.startRecording();
  };

  // at top level to avoid stale values (closure)
  document.onkeydown = (event) => {
    switch (true) {
      case isCtrlC(event):
        {
          console.log("Ctrl+C Pressed");
        }
        break;
      case isSpace(event):
        {
          console.log("Recorder toggled");
          toggleRecordingStartStop();
        }
        break;
      case isEscape(event):
        {
          console.log("Trashing current record");
          setIgnoreRecording(true);
          recorderControls.stopRecording();
        }
        break;
      default: {
        console.log("No key matches", event);
      }
    }
  };

  return (
    <div className="main-page">
      <AudioRecorder
        onRecordingComplete={onRecordingComplete}
        recorderControls={recorderControls}
      />
      <div className="main-listing">
        {recordings.map((item) => (
          <ListItem {...item} key={item.id} setRecordings={setRecordings} />
        ))}
      </div>
    </div>
  );
}

export default App;
