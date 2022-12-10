import type { marked } from "marked";
import type { ReactNode } from "react";
import { SyntaxHighlight } from "./SyntaxHighlight";

const isObjectAccessible = (
  val: unknown
): val is { [key: string]: unknown } => {
  return typeof val === "object" && val != null;
};

const hasTokens = (tok: unknown): tok is { tokens: marked.Token[] } => {
  return isObjectAccessible(tok) && tok.tokens != null;
};

export const parseMarkdown = (tokens: marked.Token[]): ReactNode[] => {
  return tokens.map((token) => {
    switch (token.type) {
      case "blockquote": {
        return (
          <blockquote key={token.raw}>{parseInline(token.tokens)}</blockquote>
        );
      }
      case "code": {
        return (
          <div key={token.raw}>
            <SyntaxHighlight language={token.lang} PreTag="pre">
              {token.text}
            </SyntaxHighlight>
          </div>
        );
      }
      case "heading": {
        const inline = parseInline(token.tokens);

        switch (token.depth) {
          case 1:
            return (
              <h1 id={encodeURI(token.text)} key={token.raw}>
                <a href={`#${encodeURI(token.text)}`}>#</a>
                {inline}
              </h1>
            );
          case 2:
            return (
              <h2 id={encodeURI(token.text)} key={token.raw}>
                <a href={`#${encodeURI(token.text)}`}>#</a>
                {inline}
              </h2>
            );
          case 3:
            return <h3 key={token.raw}>{inline}</h3>;
          case 4:
            return <h4 key={token.raw}>{inline}</h4>;
          case 5:
            return <h5 key={token.raw}>{inline}</h5>;
          case 6:
            return <h6 key={token.raw}>{inline}</h6>;
          default:
            throw Error(`invalid heading ${token.depth}`);
        }
      }
      case "hr": {
        return <hr key={token.raw} />;
      }
      case "html": {
        return token.text;
      }
      case "list": {
        const itemList = token.items.map((item) => {
          const task = item.task
            ? [
                <input
                  type="checkbox"
                  disabled={true}
                  checked={item.checked}
                  key={item.raw}
                />,
              ]
            : [];

          const content = [...task, ...parseMarkdown(item.tokens)];
          return <li key={item.raw}>{content}</li>;
        });

        if (token.ordered) {
          return <ol key={token.raw}>{itemList}</ol>;
        } else {
          return <ul key={token.raw}>{itemList}</ul>;
        }
      }
      case "paragraph": {
        return <p key={token.raw}>{parseInline(token.tokens)}</p>;
      }
      case "space": {
        return null;
      }
      case "table": {
        const headerCells = token.header.map((item, i) => {
          return (
            <th align={token.align[i] || "justify"} key={i}>
              {parseInline(item.tokens)}
            </th>
          );
        });
        const bodyRows = token.rows.map((cells, index) => {
          return (
            <td key={index}>
              {cells.map((cel, i) => (
                <td align={token.align[index] || "justify"} key={i}>
                  {parseInline(cel.tokens)}
                </td>
              ))}
            </td>
          );
        });

        return (
          <table>
            <thead>
              <tr>{headerCells}</tr>
            </thead>
            <tbody>{bodyRows}</tbody>
          </table>
        );
      }
      case "text": {
        return hasTokens(token) ? parseInline(token.tokens) : token.text;
      }
      default:
        throw new Error(`type ${token.type} is invalid`);
    }
  });
};

const parseInline = (tokens: marked.Token[]): ReactNode[] => {
  return tokens.map((token) => {
    switch (token.type) {
      case "br": {
        return <br />;
      }
      case "codespan": {
        const { text } = token;

        return <code key={token.raw}>{unescapeText(text)}</code>;
      }
      case "del": {
        return <del key={token.raw}>{parseInline(token.tokens)}</del>;
      }
      case "em": {
        return <em key={token.raw}>{parseInline(token.tokens)}</em>;
      }
      case "escape": {
        return token.text;
      }
      case "html": {
        return token.text;
      }
      case "image": {
        const { href, text, title } = token;

        return (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={href} alt={text} title={title} key={token.raw} />
          </figure>
        );
      }
      case "link": {
        const { href } = token;

        let props: { rel: string; target?: string } = { rel: "noreferrer" };
        if (href.startsWith("http")) {
          props = { rel: "noreferrer nofollow", target: "_blank" };
        }

        return (
          <a href={href} key={token.raw} {...props}>
            {parseInline(token.tokens)}
          </a>
        );
      }
      case "paragraph": {
        return <p key={token.text}>{parseInline(token.tokens)}</p>;
      }
      case "strong": {
        return <strong key={token.raw}>{parseInline(token.tokens)}</strong>;
      }
      case "text": {
        return unescapeText(token.text);
      }
      default: {
        throw new Error(`type ${token.type} is invalid`);
      }
    }
  });
};

const unescapeText = (text: string): string => {
  return text.replace(/&(?:amp|quet|gt|lt|#39);/g, (v) => {
    switch (v) {
      case "&amp;":
        return "&";
      case "&quot;":
        return '"';
      case "&gt;":
        return ">";
      case "&lt;":
        return "<";
      case "&#39;":
        return "'";
      default:
        return "";
    }
  });
};
