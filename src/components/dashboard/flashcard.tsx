import React, { useState } from 'react';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Container, FormControlLabel, FormGroup, Switch, Stack
} from '@mui/material';

import { FlashCardCanvas } from "./FlashCardCanvas";

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
  const _array = [];
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
  const { recording, initRecorder, startRecording, endRecording } = useCanvasRecorder(flashCardCanvasRef);
  const [shuffleChecked, setShuffleChecked] = React.useState(true);
  const [recChecked, setRecChecked] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(20);
  const [loopCount, setLoopCount] = React.useState(1);
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
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ minWidth: "360px" }}>
            <Stack direction="column">
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
              {isPlay ? (
                <Button variant="outlined" disabled={!isReady}
                  onClick={onStop}>停止</Button>
              ) : (
                <Button variant="outlined" disabled={!isReady} onClick={onPlay}>再生</Button>
              )}
              {recording ? (<p>録画中...</p>) : null}
            </Stack>
          </Grid>
          <Grid xs={6} sx={{ minWidth: "360px" }}>
            <Stack direction="column" sx={{ padding: "30px" }}>
              <FormGroup>
                <FormControlLabel
                  disabled={isPlay}
                  label="シャッフル"
                  labelPlacement="start"
                  control={<Switch size="small" checked={shuffleChecked} onChange={toggleShuffleChecked} />}
                  sx={{ margin: 0 }}
                />
                <FormControlLabel
                  disabled={isPlay}
                  label="録画"
                  labelPlacement="start"
                  control={<Switch size="small" checked={recChecked} onChange={toggleRecChecked} />}
                  sx={{ margin: 0 }}
                />
                <FormControlLabel
                  disabled={isPlay}
                  label="ループ回数"
                  labelPlacement="start"
                  control={<LoopCountSlider disabled={isPlay} onChange={changeLoopCount} />}
                  sx={{ margin: 0, paddingLeft: "8px" }}
                />
                <FormControlLabel
                  disabled={isPlay}
                  label="フォントサイズ"
                  labelPlacement="start"
                  control={<FontSlider disabled={isPlay} onChange={changeFontSize} />}
                  sx={{ margin: 0, paddingLeft: "8px" }}
                />
              </FormGroup>
              <FlashCardData
                loadData={loadData}
                onFileInputChange={onFileInputChange} />
            </Stack>
          </Grid>
        </Grid>
      </Container>

    </RootStyle >
  );
}
