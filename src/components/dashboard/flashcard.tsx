import React, { useEffect } from 'react';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Container, Typography } from '@material-ui/core';

import { useFullScreen } from '../../hooks/useFullscreen';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // padding: theme.spacing(24, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]
      } 100%)`
      : 'none'
}));

// models
type item = {
  leftSide: string;
  rightSide: string;
};
type Flashcard = {
  title: string;
  items: item[];
};
const initialStateFlashcard = {
  title: "",
  items: []
};

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useCounter = () => {
  const [count, setCount] = React.useState(null);
  const intervalRef = React.useRef(null);

  const start = React.useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    };
    setCount(1);
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 4000);
  }, []);

  const stop = React.useCallback(() => {
    if (intervalRef.current === null) {
      return;
    };
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const restart = React.useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    start();
  }, []);

  const reset = React.useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(0);
  }, []);

  return {
    count,
    start,
    stop,
    restart,
    reset
  }
};

export default function FlashcardComponent(): JSX.Element {
  const theme = useTheme();
  const { count, start, stop, restart, reset } = useCounter();

  const [leftSide, setLeftSide] = React.useState("");
  const [rightSide, setRightSide] = React.useState("");
  const fullScreenElement = React.useRef(null);
  const { fullScreen, open, close, toggle } = useFullScreen(fullScreenElement);
  const [flashcard, setFlashcard] = React.useState<Flashcard>(initialStateFlashcard);

  const onStart = () => {
    start();
  };

  const onFullScreen = () => {
    open();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const fileReader = new FileReader();
    if (e.target.files.length > 0) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target.result) {
          try {
            const obj = JSON.parse(e.target.result as string);
            console.log(obj);
            setFlashcard(obj);
          } catch (error) {
            console.error(error);
            setFlashcard(initialStateFlashcard);
          }
        } else {
          setFlashcard(initialStateFlashcard);
        };
      };
    } else {
      setFlashcard(initialStateFlashcard);
    };
    e.target.value = '';
  };

  useEffect(() => {
    const func = async () => {
      console.debug("count useEffect flashcard:", flashcard);

      if (count <= flashcard.items.length && count > 0) {
        setLeftSide(flashcard.items[count - 1].leftSide);
        setRightSide("");
        await _sleep(2000);
        setRightSide(flashcard.items[count - 1].rightSide);
      } else {
        stop()
      };
    };
    if (count === null) {
      return;
    };

    func();

  }, [count]);

  return (
    <RootStyle>
      <Container maxWidth="lg" ref={fullScreenElement}>
        <Grid container spacing={0}>
          <Grid item xs={6} sm={6} dir="ltr">
            <Box display="flex" justifyContent="center" bgcolor="background.paper" height="80vh">
              <Typography
                gutterBottom
                component="div"
                sx={{ margin: "auto", fontSize: 100, fontWeight: 900 }}>
                {leftSide}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} dir="ltr">
            <Box display="flex" justifyContent="center" bgcolor="background.paper" height="80vh">
              <Typography
                gutterBottom
                component="div"
                color="secondary"
                sx={{ margin: "auto", fontSize: 100, fontWeight: 900 }}>
                {rightSide}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Button onClick={onStart}>開始</Button>
        <Button onClick={onFullScreen}>フルスクリーン</Button>
        <input type='file' onChange={onFileInputChange} />
        <div>count:{count}</div>
        <div>
          タイトル：{flashcard.title}
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

        {/* <FlashcardForm /> */}
      </Container>
    </RootStyle >
  );
}
