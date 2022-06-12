import { Lexer } from 'marked';
import type { FC } from 'react';
import { parseMarkdown } from './parser';

type Props = {
  markdown: string;
};

export const Markdown: FC<Props> = ({ markdown }) => {
  const lex = new Lexer();
  const tokens = lex.lex(markdown);
  const children = parseMarkdown(tokens);

  return <>{children}</>;
};
