import { experimentalStyled as styled } from "@material-ui/core/styles";
import Page from "../../src/components/Page";
import Paper from '@material-ui/core/Paper';

import FlashcardComponent from '../../src/components/dashboard/flashcard';

const RootStyle = styled(Page)({
  height: "100%",
});

const Flashcard = (): JSX.Element => {
  return (
    <RootStyle
      title="Flashcard"
      id="move_top"
    >
      <main>
        <Paper variant="outlined" square >
          <h3>フラッシュカード作成ツール</h3>
          <FlashcardComponent />
        </Paper>
      </main>
    </RootStyle>
  )
}

export default Flashcard;

