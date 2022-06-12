import type { ComponentProps, FC } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import zig from 'react-syntax-highlighter/dist/esm/languages/prism/zig';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';

type Props = {
  key: ComponentProps<typeof SyntaxHighlighter>['key'];
  PreTag: ComponentProps<typeof SyntaxHighlighter>['PreTag'];
  language: ComponentProps<typeof SyntaxHighlighter>['language'];
  children: ComponentProps<typeof SyntaxHighlighter>['children'];
};

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('zig', zig);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('yaml', yaml);

export const Syntax: FC<Props> = ({ key, PreTag, language, children }) => {
  return (
    <SyntaxHighlighter
      key={key}
      style={atomDark}
      language={language}
      PreTag={PreTag}
    >
      {children}
    </SyntaxHighlighter>
  );
};
