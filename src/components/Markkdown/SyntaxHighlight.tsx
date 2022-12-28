import type { ComponentProps, FC } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import zig from "react-syntax-highlighter/dist/cjs/languages/prism/zig";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";

type Props = {
  PreTag: ComponentProps<typeof SyntaxHighlighter>["PreTag"];
  language: ComponentProps<typeof SyntaxHighlighter>["language"];
  children: ComponentProps<typeof SyntaxHighlighter>["children"];
};

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("zig", zig);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);

export const SyntaxHighlight: FC<Props> = ({ PreTag, language, children }) => {
  return (
    <SyntaxHighlighter style={atomDark} language={language} PreTag={PreTag}>
      {children}
    </SyntaxHighlighter>
  );
};
