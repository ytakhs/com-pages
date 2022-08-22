import { Lexer } from 'marked';
import type { FC } from 'react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { parseMarkdown } from './parser';
import styles from '~/styles/components/Markdown/index.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type Props = {
  markdown: string;
};

export const Markdown: FC<Props> = ({ markdown }) => {
  const lex = new Lexer();
  const tokens = lex.lex(markdown);
  const children = parseMarkdown(tokens);

  return <>{children}</>;
};
