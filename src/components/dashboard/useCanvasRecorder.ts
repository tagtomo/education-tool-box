import { useRef, useState } from "react";
type useCanvasRecorderReturnType = {
  recording: boolean;
  initRecorder: () => void;
  startRecording: () => void;
  endRecording: () => void;
  testDownload: () => void;
}
export const useCanvasRecorder = (targetRef: React.MutableRefObject<HTMLCanvasElement>): useCanvasRecorderReturnType => {
  let recorderRef = useRef<MediaRecorder>();
  const [recording, setRecording] = useState(false);

  const getStream = async () => {
    const stream = await targetRef.current?.captureStream();
    return stream;
  };

  const initRecorder = async () => {
    let stream = await getStream();
    if (!stream) return;
    try {
      let recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9"
      });
      recorder.ondataavailable = function (e) {
        console.log("ondataavailable event:", e);
        const videoBlob = new Blob([e.data], { type: e.data.type });
        console.log("ondataavailable videoBlob:", videoBlob);
        // const blobUrl = window.URL.createObjectURL(videoBlob);
        // const anchor = document.getElementById(
        //   "downloadlink"
        // ) as HTMLAnchorElement;
        // anchor.download = "movie.webm";
        // anchor.href = blobUrl;
        // anchor.style.display = "block";

        var url = URL.createObjectURL(videoBlob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        // a.style = 'display: none';
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
      };
      recorderRef.current = recorder;
      // console.log("recorderRef.current:", recorderRef);
      // setRecorder(recorder);
    } catch (err) {
      console.log(err.name);
      return err.name; /* return the error name */
    }
  };

  const startRecording = async () => {
    if (recorderRef.current) {
      recorderRef.current.start();
      console.log("startRecording recorderRef.current:", recorderRef.current);
    }
    setRecording(true);
  };

  const endRecording = async () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      console.log("endRecording recorderRef.current:", recorderRef.current);
    }
    setRecording(false);
  };

  const testDownload = async () => {
    const blob = new Blob(["Hello, blob!"], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    let link = document.createElement("a");
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
