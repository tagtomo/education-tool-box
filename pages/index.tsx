import { styled } from '@mui/material/styles';
import Page from "../src/components/Page";

import LandingHero from '../src/components/LandingHero';
import LandingContent1 from '../src/components/LandingContent1';

const RootStyle = styled(Page)({
  height: "100%",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

const Home = (): JSX.Element => {
  return (
    <RootStyle
      title="教育ツールボックス"
      id="move_top"
    >

      <main>
        <LandingHero />
        <ContentStyle>
          <LandingContent1 />
        </ContentStyle>
      </main>

      <footer>
      </footer>
    </RootStyle>
  )
}


export default Home
