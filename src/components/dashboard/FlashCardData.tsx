import React from 'react';
import { Container, Box } from '@material-ui/core';
import { FlashCard } from "./FlashCardCanvas";
// import Editor from "../Editor";

type FlashcardDataProps = {
  loadData: FlashCard;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FlashcardData({ loadData, onFileInputChange }: FlashcardDataProps): JSX.Element {
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <input type='file' onChange={onFileInputChange} />
          {loadData ? (
            <>
              <div>
                <p>タイトル：{loadData.title}</p>
                <p>終了テキスト：{loadData.endText}</p>
                <table>
                  <thead>
                    <tr>
                      <th>左側</th>
                      <th>右側</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadData.items.map((item, index) => {
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
            </>
          ) : null}
        </Box>
        {/* <Editor content={JSON.stringify(loadData)} /> */}
      </Container>
    </ >
  );
}
