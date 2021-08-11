import React from 'react';
import { Container, Box } from '@material-ui/core';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  CodeComponent,
} from 'react-markdown/src/ast-to-react';

type FlashcardManualProps = {
  steps: any;
}

export default function FlashcardManual({ steps }: FlashcardManualProps): JSX.Element {
  console.log("FlashcardManual steps:", steps);
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ backgroundColor: "white", padding: "18px" }}>
          {steps.map((step: any) => {
            return <ReactMarkdown
              components={{
                code: CodeBlock,
              }}
            >{step.document.content}</ReactMarkdown>
          })}
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
