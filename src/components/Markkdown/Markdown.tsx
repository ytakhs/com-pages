import { Lexer } from "marked";
import { FC } from "react";
import { parseMarkdown } from "./parseMarkdown";

type Props = {
  src: string;
};

export const Markdown: FC<Props> = ({ src }) => {
  const lex = new Lexer();
  const tokens = lex.lex(src);
  const children = parseMarkdown(tokens);

  return <>{children}</>;
};
