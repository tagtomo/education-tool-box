import React, { useState, useEffect } from 'react';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import { FlashCardCanvas, FlashCard } from "./FlashCardCanvas";

import { useFullScreen } from '../../hooks/useFullscreen';
import { useCanvasRecorder } from "./useCanvasRecorder";
// ----------------------------------------------------------------------
declare global {
  interface HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
  }
}

const RootStyle = styled('div')(({ theme }) => ({
  // padding: theme.spacing(24, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]
      } 100%)`
      : 'none'
}));

// models
const initialStateFlashcard: FlashCard = {
  title: "",
  endText: "",
  items: []
};

function shuffleArray(inputArray: any) {
  inputArray.sort(() => Math.random() - 0.5);
}
// function gcd(x, y) {
//   if (y === 0) return x
//   return gcd(y, x % y)
// }

export default function FlashcardComponent(): JSX.Element {
  const [flashcard, setFlashcard] = React.useState<FlashCard>(initialStateFlashcard);
  const [inData, setInData] = useState(flashcard);

  const width = 1920; // FullHD
  const height = 1080; // FullHD
  const dispalyWidth = 320; // FullHD
  const dispalyHeight = 180; // FullHD

  const flashCardCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const { testDownload } = useCanvasRecorder(flashCardCanvasRef);
  // const ref = React.createRef<HTMLCanvasElement>();

  let recorder: any;
  useEffect(() => {
    // if (process.browser) {
    const stream = flashCardCanvasRef.current?.captureStream();
    console.info("useEffect stream:", stream);
    recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    console.info("useEffect befor recorder:", recorder);
    recorder.ondataavailable = function (e) {
      console.info("recorder ondataavailable e:", e);
      const videoBlob = new Blob([e.data], { type: e.data.type });
      const blobUrl = window.URL.createObjectURL(videoBlob);
      const anchor = document.getElementById('downloadlink') as HTMLAnchorElement;
      anchor.download = 'movie.webm';
      anchor.href = blobUrl;
      anchor.style.display = 'block';
    }
    console.info("useEffect after recorder:recorder", recorder);
    // }
  }, []);
  const fullScreenElement = React.useRef(null);
  const { open } = useFullScreen(fullScreenElement);
  const [isPlay, setIsPlay] = useState(false);
  const onPlay = () => {
    setInData(flashcard);
    setIsPlay(true);
  };
  const onShufflePlay = () => {
    setInData(() => {
      const inData = flashcard;
      shuffleArray(inData.items);
      return inData;
    });
    setIsPlay(true);
    // console.info("onShufflePlay recorder:", recorder);
    // recorder.start();
  };
  const onStop = () => {
    setIsPlay(false);
    // recorder.stop();
  };

  const onFullScreen = () => {
    open();
  };

  const onTest = () => {
    testDownload();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const fileReader = new FileReader();
    if (e.target.files.length > 0) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target.result) {
          try {
            const obj = JSON.parse(e.target.result as string);
            setFlashcard(obj);
          } catch (error) {
            console.error(error);
            setFlashcard(initialStateFlashcard);
          }
        } else {
          setFlashcard(initialStateFlashcard);
        }
      };
    } else {
      setFlashcard(initialStateFlashcard);
    }
    e.target.value = '';
  };

  return (
    <RootStyle>
      <Container maxWidth="lg" ref={fullScreenElement}>
        <div>
          <FlashCardCanvas
            width={width}
            height={height}
            isPlay={isPlay}
            data={inData}
            flashTime={2000}
            style={{ height: dispalyHeight, width: dispalyWidth }}
            elmRef={flashCardCanvasRef}
          />
        </div>
        {isPlay ? (
          <button onClick={onStop}>STOP</button>
        ) : (
          <React.Fragment>
            <button onClick={onPlay}>PLAY</button>
            <button onClick={onShufflePlay}>Shuffle Play</button>
          </React.Fragment>
        )}
        <Button onClick={onFullScreen}>フルスクリーン</Button>
        <input type='file' onChange={onFileInputChange} />
        <Button onClick={onTest}>download</Button>
        <a id="downloadlink" >download</a>
        <div>
          <p>タイトル：{flashcard.title}</p>
          <p>終了テキスト：{flashcard.endText}</p>
          <table>
            <thead>
              <tr>
                <th>左側</th>
                <th>右側</th>
              </tr>
            </thead>
            <tbody>
              {flashcard.items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{item.leftSide}</td>
                      <td>{item.rightSide}</td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </Container>
      {/* <canvas ref={ref} />; */}

    </RootStyle >
  );
}
