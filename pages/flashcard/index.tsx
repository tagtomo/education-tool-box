import { experimentalStyled as styled } from "@material-ui/core/styles";
import Page from "../../src/components/Page";
import Paper from '@material-ui/core/Paper';

import FlashcardComponent from '../../src/components/dashboard/flashcard';
import FlashCardManual from '../../src/components/dashboard/FlashCardManual';

import { GetStaticProps } from 'next';
// import matter from "gray-matter"
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
          <h3>フラッシュカード作成ツール</h3>
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