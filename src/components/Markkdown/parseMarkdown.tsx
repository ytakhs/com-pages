import type { marked } from "marked";
import type { ReactNode } from "react";
import { TextLink } from "../TextLink/TextLink";
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
  return tokens.map((token, i) => {
    switch (token.type) {
      case "blockquote": {
        return (
          <blockquote
            className="ml-2 border-l-4 border-gray-400 py-2 pl-4"
            key={i}
          >
            {parseInline(token.tokens)}
          </blockquote>
        );
      }
      case "code": {
        return (
          <div key={i}>
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
              <h1
                className="inline-flex gap-2 py-2 text-3xl font-bold"
                id={encodeURI(token.text)}
                key={i}
              >
                <a href={`#${encodeURI(token.text)}`}>#</a>
                {inline}
              </h1>
            );
          case 2:
            return (
              <h2
                className="inline-flex gap-2 py-2 text-2xl font-bold"
                id={encodeURI(token.text)}
                key={i}
              >
                <a href={`#${encodeURI(token.text)}`}>#</a>
                {inline}
              </h2>
            );
          case 3:
            return (
              <h3 className="py-2 text-xl font-bold" key={i}>
                {inline}
              </h3>
            );
          case 4:
            return (
              <h4 className="py-2 text-lg font-bold" key={i}>
                {inline}
              </h4>
            );
          case 5:
            return (
              <h5 className="py-2 text-base font-bold" key={i}>
                {inline}
              </h5>
            );
          case 6:
            return (
              <h6 className="py-2 text-base font-bold" key={i}>
                {inline}
              </h6>
            );
          default:
            throw Error(`invalid heading ${token.depth}`);
        }
      }
      case "hr": {
        return <hr key={i} />;
      }
      case "html": {
        return token.text;
      }
      case "list": {
        const itemList = token.items.map((item, i2) => {
          const task = item.task
            ? [
                <input
                  type="checkbox"
                  disabled={true}
                  checked={item.checked}
                  key={`input-${i}-${i2}`}
                />,
              ]
            : [];

          const content = [...task, ...parseMarkdown(item.tokens)];
          return (
            <li className="ml-5 list-disc leading-8" key={`list-${i}-${i2}`}>
              {content}
            </li>
          );
        });

        if (token.ordered) {
          return <ol key={i}>{itemList}</ol>;
        } else {
          return <ul key={i}>{itemList}</ul>;
        }
      }
      case "paragraph": {
        return (
          <p className="leading-8" key={i}>
            {parseInline(token.tokens)}
          </p>
        );
      }
      case "space": {
        return null;
      }
      case "table": {
        const headerCells = token.header.map((item, i2) => {
          return (
            <th align={token.align[i2] || "justify"} key={`header-${i}-${i2}`}>
              {parseInline(item.tokens)}
            </th>
          );
        });
        const bodyRows = token.rows.map((cells, i2) => {
          return (
            <td key={`data-${i}-${i2}`}>
              {cells.map((cel, i3) => (
                <td
                  align={token.align[i2] || "justify"}
                  key={`cell-${i}-${i2}-${i3}`}
                >
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
  return tokens.map((token, i) => {
    switch (token.type) {
      case "br": {
        return <br />;
      }
      case "codespan": {
        const { text } = token;

        return (
          <code
            className="text-amber-400 before:content-['`'] after:content-['`']"
            key={i}
          >
            {unescapeText(text)}
          </code>
        );
      }
      case "del": {
        return <del key={i}>{parseInline(token.tokens)}</del>;
      }
      case "em": {
        return <em key={i}>{parseInline(token.tokens)}</em>;
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
          <figure key={i}>
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
          <TextLink key={i} href={href} {...props}>
            {parseInline(token.tokens)}
          </TextLink>
        );
      }
      case "paragraph": {
        return <p key={i}>{parseInline(token.tokens)}</p>;
      }
      case "strong": {
        return <strong key={i}>{parseInline(token.tokens)}</strong>;
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
