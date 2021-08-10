import React from 'react';
import { Container, Box } from '@material-ui/core';
import { FlashCard } from "./FlashCardCanvas";
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  CodeComponent,
} from 'react-markdown/src/ast-to-react';

type FlashcardDataProps = {
  loadData: FlashCard;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FlashcardData({ loadData, onFileInputChange }: FlashcardDataProps): JSX.Element {

  const markdown = `
### ファイル作成方法
ファイルを作成してアップロードします。
* ファイル名は任意の名前.jsonで作成
* ファイルの内容は作成例を元に作成
#### 作成例
~~~json
  {
    "title": "たしざん",
    "endText": "おわり",
    "items": [
      { "leftSide": "1+1=", "rightSide": "2" },
      { "leftSide": "1+2=", "rightSide": "3" }
    ]
  }
~~~
`
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
        <Box>
          <ReactMarkdown
            // children={markdown}
            components={{
              code: CodeBlock,
            }}
          >{markdown}</ReactMarkdown>
        </Box>
      </Container>
    </ >
  );
}

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  return (
    <SyntaxHighlighter
      style={dark}
      language={lang}
    >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
  );
};