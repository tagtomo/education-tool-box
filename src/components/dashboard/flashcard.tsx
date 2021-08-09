import React, { useState } from 'react';
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

// 配列シャッフルロジック
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function FlashcardComponent(): JSX.Element {
  const [flashcard, setFlashcard] = React.useState<FlashCard>(initialStateFlashcard);
  const [inData, setInData] = useState(flashcard);
  const resolution = [
    { type: "4k", width: 3840, height: 2160 },
    { type: "FullHD", width: 1920, height: 1080 },
  ]

  const width = resolution[0].width;
  const height = resolution[0].height;
  const dispalyWidth = 320;
  const dispalyHeight = 180;

  const flashCardCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const { recording, initRecorder, startRecording, endRecording } = useCanvasRecorder(flashCardCanvasRef);

  const { open } = useFullScreen(flashCardCanvasRef);
  const [isPlay, setIsPlay] = useState(false);
  const onPlay = () => {
    setInData({
      ...flashcard,
      items: flashcard.items
    });
    setIsPlay(true);
  };
  const onShufflePlay = () => {
    setInData({
      ...flashcard,
      items: shuffle(flashcard.items)
    });
    setIsPlay(true);
  };

  const onStop = () => {
    setIsPlay(false);
  };

  const onStartRecoding = () => {
    initRecorder();
    startRecording();
  };

  const onEndRecoding = () => {
    endRecording();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Container maxWidth="lg">
        <FlashCardCanvas
          width={width}
          height={height}
          isPlay={isPlay}
          data={inData}
          flashTime={2000}
          style={{ height: dispalyHeight, width: dispalyWidth }}
          elmRef={flashCardCanvasRef}
        />
        {isPlay ? (
          <button onClick={onStop}>STOP</button>
        ) : (
          <React.Fragment>
            <button onClick={onPlay}>PLAY</button>
            <button onClick={onShufflePlay}>Shuffle Play</button>
          </React.Fragment>
        )}
        <Button onClick={open}>フルスクリーン</Button>
        <input type='file' onChange={onFileInputChange} />
        {recording ? (
          <Button onClick={onEndRecoding}>REC END</Button>
        ) : (
          <Button onClick={onStartRecoding}>REC START</Button>
        )}

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

    </RootStyle >
  );
}
