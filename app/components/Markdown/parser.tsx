import type { marked } from 'marked';
import type { ReactNode } from 'react';
import { createElement } from 'react';

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
          <pre key={token.raw}>
            <code>{token.text}</code>
          </pre>
        );
      }
      case 'heading': {
        return createElement(
          `h${token.depth}`,
          { key: token.raw },
          parseInline(token.tokens)
        );
      }
      case 'hr': {
        return <hr key={token.raw} />;
      }
      case 'html': {
        return token.text;
      }
      case 'list': {
        const type = token.ordered ? 'ol' : 'ul';

        return createElement(
          type,
          {},
          token.items.map((item, i) => {
            if (item.task) {
              return createElement('li', { key: i }, [
                <li key={item.raw}>
                  [
                  <input
                    type="checkbox"
                    disabled={true}
                    checked={item.checked}
                    key={item.raw}
                  />
                  ...parseMarkdown(item.tokens) ]
                </li>,
              ]);
            } else {
              return <li key={item.raw}>{parseMarkdown(item.tokens)}</li>;
            }
          })
        );
      }
      case 'paragraph': {
        return <p key={token.raw}>{parseInline(token.tokens)}</p>;
      }
      case 'space': {
        return null;
      }
      case 'table': {
        const headerCells = token.header.map((item, i) => {
          return createElement(
            'th',
            { align: token.align[i], key: i },
            parseInline(item.tokens)
          );
        });
        const headerRow = createElement('tr', {}, headerCells);
        const header = createElement('thead', {}, headerRow);

        const bodyRows = token.rows.map((cells, index) => {
          return createElement(
            'td',
            { key: index },
            cells.map((cel) =>
              createElement(
                'td',
                { align: token.align[index] },
                parseInline(cel.tokens)
              )
            )
          );
        });
        const body = <tbody>{bodyRows}</tbody>;

        return <table>{[header, body]}</table>;
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
        return <code key={token.raw}>{text}</code>;
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
        return token.text;
      }
      default: {
        throw new Error(`type ${token.type} is invalid`);
      }
    }
  });
}
