import type { marked } from 'marked';
import type { ReactNode } from 'react';
import { H1, H2, H3, H4, H5, H6 } from '../Heading';
import { Syntax } from './syntax';

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
          <blockquote
            className="pl-3 ml-2 rounded-l-sm border-l-4 border-slate-400"
            key={token.raw}
          >
            {parseInline(token.tokens)}
          </blockquote>
        );
      }
      case 'code': {
        return (
          <div className="rounded" key={token.raw}>
            <Syntax key={token.raw} language={token.lang} PreTag="pre">
              {token.text}
            </Syntax>
          </div>
        );
      }
      case 'heading': {
        const inline = parseInline(token.tokens);

        switch (token.depth) {
          case 1:
            return (
              <H1 key={token.raw} hasAnchor={true}>
                {inline}
              </H1>
            );
          case 2:
            return (
              <H2 key={token.raw} hasAnchor={true}>
                {inline}
              </H2>
            );
          case 3:
            return <H3 key={token.raw}>{inline}</H3>;
          case 4:
            return <H4 key={token.raw}>{inline}</H4>;
          case 5:
            return <H5 key={token.raw}>{inline}</H5>;
          case 6:
            return <H6 key={token.raw}>{inline}</H6>;
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
          return (
            <li className="list-item py-1.5 leading-relaxed" key={item.raw}>
              {content}
            </li>
          );
        });

        if (token.ordered) {
          return <ol key={token.raw}>{itemList}</ol>;
        } else {
          return <ul key={token.raw}>{itemList}</ul>;
        }
      }
      case 'paragraph': {
        return (
          <p className="py-3 tracking-wider leading-relaxed" key={token.raw}>
            {parseInline(token.tokens)}
          </p>
        );
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

        return (
          <code
            className="py-0.5 px-1 dark:text-slate-800 bg-slate-300 dark:bg-slate-400 rounded-sm"
            key={token.raw}
          >
            {unescapeText(text)}
          </code>
        );
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

        return (
          <figure>
            <img src={href} alt={text} title={title} key={token.raw} />
          </figure>
        );
      }
      case 'link': {
        const { href } = token;

        let props: { rel: string; target?: string } = { rel: 'noreferrer' };
        if (href.startsWith('http')) {
          props = { rel: 'noreferrer nofollow', target: '_blank' };
        }

        return (
          <a className="border-b" href={href} key={token.raw} {...props}>
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
