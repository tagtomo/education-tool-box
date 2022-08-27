// material
// import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';

import { alpha, styled } from '@mui/material/styles';

import { Box, Grid, Button, Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
//
import { varFadeInUp, MotionInView } from './animate';
import Link from 'next/link';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(24, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]
      } 100%)`
      : 'none'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));

// ----------------------------------------------------------------------

export default function LandingContent1(): JSX.Element {
  // const theme = useTheme();
  // const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: 'text.secondary' }}
                >
                  コンテンツその１
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  フラッシュカード
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    // color: isLight ? 'text.secondary' : 'common.white'
                  }}
                >
                  フラッシュカードとは、絵や記号の書いてあるカードをリズムに合わせてテンポよく見せることで、その絵や記号を記憶していくものである。 カードの使い方（テンポ）によって、左脳、右脳両方に刺激を与えることが出来る。 特にフラッシュカードはテンポ速く見せることで右脳が鍛えられ、見て記憶するという能力がつく。
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={8} dir="ltr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'flex-start',
                flexWrap: 'wrap'
              }}
            >
              <Card sx={{ maxWidth: "340px", minWidth: "340px", margin: "10px" }}>
                <CardMedia>
                  <img
                    src={"https://unsplash.it/630/400"}
                    // quality={50}
                    width={340}
                    height={240}
                  />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    フラッシュカード
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    センサからの検知情報は一旦ゲートウェイへ集約されます。 ゲートウェイからはインターネットを通じてデータベースにデータ蓄積を行い、 Webサービスにてデータ可視化・分析を行います。 センサとゲートウェイが現地に設置されるアセット(ローカルネットワーク)となります。
                  </Typography> */}
                  <Link href="/flashcard" passHref>
                    <Button size="large" color="primary" variant="contained">
                      コンテンツ表示
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
