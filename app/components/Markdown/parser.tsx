import type { marked } from 'marked';
import type { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function isObjectAccessible(val: unknown): val is { [key: string]: unknown } {
  return typeof val === 'object' && val != null;
}

function hasTokens(tok: unknown): tok is { tokens: marked.Token[] } {
  return isObjectAccessible(tok) && tok.tokens != null;
}

export function parseMarkdown(tokens: marked.Token[]): ReactNode[] {
  return tokens.map((token) => {
    switch (token.type) {
      case 'blockquote': {
        return (
          <blockquote key={token.raw}>{parseInline(token.tokens)}</blockquote>
        );
      }
      case 'code': {
        return (
          <SyntaxHighlighter
            key={token.raw}
            style={atomDark}
            language={token.lang}
            PreTag="pre"
          >
            {token.text}
          </SyntaxHighlighter>
        );
      }
      case 'heading': {
        const inline = parseInline(token.tokens);

        switch (token.depth) {
          case 1:
            return <h1 key={token.raw}>{inline}</h1>;
          case 2:
            return <h2 key={token.raw}>{inline}</h2>;
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
      case 'hr': {
        return <hr key={token.raw} />;
      }
      case 'html': {
        return token.text;
      }
      case 'list': {
        const itemList = token.items.map((item, i) => {
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
      case 'paragraph': {
        return <p key={token.raw}>{parseInline(token.tokens)}</p>;
      }
      case 'space': {
        return null;
      }
      case 'table': {
        const headerCells = token.header.map((item, i) => {
          return (
            <th align={token.align[i] || 'justify'} key={i}>
              {parseInline(item.tokens)}
            </th>
          );
        });
        const bodyRows = token.rows.map((cells, index) => {
          return (
            <td key={index}>
              {cells.map((cel, i) => (
                <td align={token.align[index] || 'justify'} key={i}>
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
      case 'text': {
        return hasTokens(token) ? parseInline(token.tokens) : token.text;
      }
      default:
        throw new Error(`type ${token.type} is invalid`);
    }
  });
}

function parseInline(tokens: marked.Token[]): ReactNode[] {
  return tokens.map((token) => {
    switch (token.type) {
      case 'br': {
        return <br />;
      }
      case 'codespan': {
        const { text } = token;

        return <code key={token.raw}>{unescapeText(text)}</code>;
      }
      case 'del': {
        return <del key={token.raw}>{parseInline(token.tokens)}</del>;
      }
      case 'em': {
        return <em key={token.raw}>{parseInline(token.tokens)}</em>;
      }
      case 'escape': {
        return token.text;
      }
      case 'html': {
        return token.text;
      }
      case 'image': {
        const { href, text, title } = token;

        return <img src={href} alt={text} title={title} key={token.raw} />;
      }
      case 'link': {
        const { href } = token;

        return (
          <a href={href} target="_blank" rel="noreferrer" key={token.raw}>
            {parseInline(token.tokens)}
          </a>
        );
      }
      case 'strong': {
        return <strong key={token.raw}>{parseInline(token.tokens)}</strong>;
      }
      case 'text': {
        return unescapeText(token.text);
      }
      default: {
        throw new Error(`type ${token.type} is invalid`);
      }
    }
  });
}

function unescapeText(text: string): string {
  return text.replace(/&(?:amp|quet|gt|lt);/g, (v) => {
    switch (v) {
      case '&amp;':
        return '&';
      case '&quot;':
        return '"';
      case '&gt;':
        return '>';
      case '&lt;':
        return '<';
      default:
        return '';
    }
  });
}
