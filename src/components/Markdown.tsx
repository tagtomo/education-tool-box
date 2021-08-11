import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  CodeComponent,
} from 'react-markdown/src/ast-to-react';

type MarkdownProps = {
  content: string;
}

export default function Markdown({ content }: MarkdownProps): JSX.Element {
  return (
    <>
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
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
