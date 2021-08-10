import React, { useState } from 'react';
// material
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Container, Box } from '@material-ui/core';
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
  const flashCardCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const displayRef = React.useRef<HTMLElement>(null);
  const { recording, initRecorder, startRecording, endRecording } = useCanvasRecorder(flashCardCanvasRef);
  const [shuffleChecked, setShuffleChecked] = React.useState(true);
  const [recChecked, setRecChecked] = React.useState(true);
  const { open } = useFullScreen(flashCardCanvasRef);
  const [isPlay, setIsPlay] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const toggleShuffleChecked = () => {
    setShuffleChecked((prev) => !prev);
  };

  const toggleRecChecked = () => {
    setRecChecked((prev) => !prev);
  };

  const width = resolution[0].width;
  const height = resolution[0].height;
  const dispalyWidth = 320;
  const dispalyHeight = 180;

  const onPlay = () => {
    if (shuffleChecked) {
      setInData({
        ...flashcard,
        items: shuffle(flashcard.items)
      });
    } else {
      setInData({
        ...flashcard,
        items: flashcard.items
      });
    }
    if (recChecked) {
      initRecorder();
      startRecording();
    }

    setIsPlay(true);
  };

  const onStop = () => {
    setIsPlay(false);
    if (recChecked) {
      endRecording();
    }
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
            setIsReady(true);
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
        <Box ref={displayRef} sx={{
          display: "inline-block",
          position: "relative"
        }}>
          <FlashCardCanvas
            width={width}
            height={height}
            isPlay={isPlay}
            data={inData}
            flashTime={2000}
            style={{ height: dispalyHeight, width: dispalyWidth }}
            elmRef={flashCardCanvasRef}
          />
          <Box sx={{
            position: "relative",
            left: "10px"
          }}>
            <FormGroup>
              <FormControlLabel
                disabled={isPlay}
                control={<Switch size="small" checked={shuffleChecked} onChange={toggleShuffleChecked} />}
                label="シャッフル"
              />
              <FormControlLabel
                disabled={isPlay}
                control={<Switch size="small" checked={recChecked} onChange={toggleRecChecked} />}
                label="録画"
              />
            </FormGroup>
            {isPlay ? (
              <Button disabled={!isReady}
                onClick={onStop}>停止</Button>
            ) : (
              <Button disabled={!isReady} onClick={onPlay}>再生</Button>
            )}
            {recording ? (<p>録画中...</p>) : null}
            <Button onClick={open}>フルスクリーン</Button>
          </Box>
        </Box>
        <Box>
          <input type='file' onChange={onFileInputChange} />
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
        </Box>
      </Container>

    </RootStyle >
  );
}
