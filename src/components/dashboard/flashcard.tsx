import React, { useState } from 'react';
// material
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Container, Box } from '@material-ui/core';
import { FlashCardCanvas } from "./FlashCardCanvas";

// import { useFullScreen } from '../../hooks/useFullscreen';
import { useCanvasRecorder } from "./useCanvasRecorder";
import { useFlashCardData } from "./useFlashCardData";
import FlashCardData from "./FlashCardData";
import LoopCountSlider from "./LoopCountSlider";
import FontSlider from "./FontSlider";
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

// 配列シャッフルロジック
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 配列シャッフルロジック
const loop = (loopCount, array) => {
  let _array = []
  for (let i = 0; i < loopCount; i++) {
    _array.push(...array)
  }
  return _array;
}

export default function FlashcardComponent(): JSX.Element {
  const resolution = [
    { type: "4k", width: 3840, height: 2160 },
    { type: "FullHD", width: 1920, height: 1080 },
  ]
  const flashCardCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const displayRef = React.useRef<HTMLElement>(null);
  const { recording, initRecorder, startRecording, endRecording } = useCanvasRecorder(flashCardCanvasRef);
  const [shuffleChecked, setShuffleChecked] = React.useState(true);
  const [recChecked, setRecChecked] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(20);
  const [loopCount, setLoopCount] = React.useState(1);
  // const { open } = useFullScreen(flashCardCanvasRef);
  const [isPlay, setIsPlay] = useState(false);
  const { isReady, loadData, onFileInputChange } = useFlashCardData();
  const [inData, setInData] = useState(loadData);

  const toggleShuffleChecked = () => {
    setShuffleChecked((prev) => !prev);
  };

  const toggleRecChecked = () => {
    setRecChecked((prev) => !prev);
  };

  const changeLoopCount = (e: any) => {
    setLoopCount(e.target.value);
  };

  const changeFontSize = (e: any) => {
    setFontSize(e.target.value);
  };

  const width = resolution[0].width;
  const height = resolution[0].height;
  const dispalyWidth = 320;
  const dispalyHeight = 180;

  const onPlay = () => {
    if (shuffleChecked) {
      console.log(loadData)
      setInData({
        ...loadData,
        items: loop(loopCount, shuffle(loadData.items))
      });
    } else {
      setInData({
        ...loadData,
        items: loop(loopCount, loadData.items)
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
            flashTime={3000}
            style={{ height: dispalyHeight, width: dispalyWidth }}
            elmRef={flashCardCanvasRef}
            fontSize={fontSize}
          />
          <Box sx={{
            position: "relative",
            left: "10px"
          }}>
            {isPlay ? (
              <Button disabled={!isReady}
                onClick={onStop}>停止</Button>
            ) : (
              <Button disabled={!isReady} onClick={onPlay}>再生</Button>
            )}
            {recording ? (<p>録画中...</p>) : null}
            <FormGroup>
              <FormControlLabel
                disabled={isPlay}
                label="シャッフル"
                control={<Switch size="small" checked={shuffleChecked} onChange={toggleShuffleChecked} />}
              />
              <FormControlLabel
                disabled={isPlay}
                label="録画"
                control={<Switch size="small" checked={recChecked} onChange={toggleRecChecked} />}
              />
              <FormControlLabel
                disabled={isPlay}
                label="ループ回数"
                control={<LoopCountSlider disabled={isPlay} onChange={changeLoopCount} />}
              />
              <FormControlLabel
                disabled={isPlay}
                label="フォントサイズ"
                control={<FontSlider disabled={isPlay} onChange={changeFontSize} />}
              />
            </FormGroup>
            {/* <Button onClick={open}>フルスクリーン</Button> */}
          </Box>
        </Box>
        <Box>
          <FlashCardData
            loadData={loadData}
            onFileInputChange={onFileInputChange} />
        </Box>
      </Container>

    </RootStyle >
  );
}
