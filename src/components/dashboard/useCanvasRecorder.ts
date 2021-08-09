import { useRef, useState } from "react";
type useCanvasRecorderReturnType = {
  recording: boolean;
  initRecorder: () => void;
  startRecording: () => void;
  endRecording: () => void;
  testDownload: () => void;
}
export const useCanvasRecorder = (targetRef: React.MutableRefObject<HTMLCanvasElement>): useCanvasRecorderReturnType => {
  const recorderRef = useRef<MediaRecorder>();
  const [recording, setRecording] = useState(false);

  const getStream = async () => {
    const stream = await targetRef.current?.captureStream();
    return stream;
  };

  const initRecorder = async () => {
    const stream = await getStream();
    if (!stream) return;
    try {
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9"
      });
      recorder.ondataavailable = function (e) {
        console.info("ondataavailable event:", e);
        const videoBlob = new Blob([e.data], { type: e.data.type });
        const url = URL.createObjectURL(videoBlob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "canvas.webm";
        a.click();
        window.URL.revokeObjectURL(url);
      };
      recorderRef.current = recorder;
    } catch (err) {
      return err.name; /* return the error name */
    }
  };

  const startRecording = async () => {
    await initRecorder();
    if (recorderRef.current) {
      recorderRef.current.start();
    }
    setRecording(true);
  };

  const endRecording = async () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
    setRecording(false);
  };

  const testDownload = async () => {
    const blob = new Blob(["Hello, blob!"], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.download = 'foo.txt';
    link.href = url;
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return {
    recording,
    initRecorder,
    startRecording,
    endRecording,
    testDownload
  };
};
