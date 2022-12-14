import { styled } from '@mui/material/styles';
import Page from "../../src/components/Page";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

import FlashcardComponent from '../../src/components/dashboard/flashcard';
import FlashCardManual from '../../src/components/dashboard/FlashCardManual';

import { GetStaticProps } from 'next';
import { importAll } from '../../src/utils/importAll';

const RootStyle = styled(Page)({
  height: "100%",
});

const Flashcard = ({ steps }): JSX.Element => {
  return (
    <RootStyle
      title="Flashcard"
      id="move_top"
    >
      <main>
        <Paper variant="outlined" square >
          <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
            フラッシュカード作成ツール
          </Typography>
          <FlashcardComponent />
          <FlashCardManual steps={steps} />
        </Paper>
      </main>
    </RootStyle>
  )
}

export default Flashcard;

export const getStaticProps: GetStaticProps = async () => {
  const steps = importAll(require.context('../../public/markdown/flashcard', true, /\.md$/));
  return { props: { steps } };
}