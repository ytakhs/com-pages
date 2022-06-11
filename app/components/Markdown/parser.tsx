import type { marked } from 'marked';
import type { ReactNode } from 'react';
import { createElement } from 'react';

export function parseMarkdown(tokens: marked.Token[]): ReactNode[] {
  return tokens.map((token) => {
    switch (token.type) {
      case 'blockquote': {
        return createElement('blockquote', {}, parseInline(token.tokens));
      }
      case 'code': {
        return createElement('pre', {}, createElement('code', {}, token.text));
      }
      case 'heading': {
        return createElement(`h${token.depth}`, {}, parseInline(token.tokens));
      }
      case 'hr': {
        return createElement('hr');
      }
      case 'html': {
        return token.text;
      }
      case 'list': {
        const type = token.ordered ? 'ol' : 'ul';

        return createElement(
          type,
          {},
          token.items.map((item) => {
            if (item.task) {
              return createElement('li', {}, [
                createElement('input', {
                  type: 'checkbox',
                  disabled: true,
                  checked: item.checked,
                }),
                ...parseMarkdown(item.tokens),
              ]);
            } else {
              return createElement('li', {}, parseMarkdown(item.tokens));
            }
          })
        );
      }
      case 'paragraph': {
        return createElement('p', {}, parseInline(token.tokens));
      }
      case 'space': {
        return null;
      }
      case 'table': {
        const headerCells = token.header.map((item, i) => {
          return createElement(
            'th',
            { align: token.align[i] },
            parseInline(item.tokens)
          );
        });
        const headerRow = createElement('tr', {}, headerCells);
        const header = createElement('thead', {}, headerRow);

        const bodyRows = token.rows.map((cells, index) => {
          return createElement(
            'td',
            {},
            cells.map((cel) =>
              createElement(
                'td',
                { align: token.align[index] },
                parseInline(cel.tokens)
              )
            )
          );
        });
        const body = createElement('tbody', {}, bodyRows);

        return createElement('table', {}, [header, body]);
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
        return createElement('br');
      }
      case 'codespan': {
        const { text } = token;
        return createElement('code', {}, text);
      }
      case 'del': {
        return createElement('del', {}, parseInline(token.tokens));
      }
      case 'em': {
        return createElement('em', parseInline(token.tokens));
      }
      case 'escape': {
        return token.text;
      }
      case 'html': {
        return token.text;
      }
      case 'image': {
        const { href, text, title } = token;
        return createElement('img', { src: href, alt: text, title });
      }
      case 'link': {
        const { href } = token;
        return createElement(
          'a',
          { href, target: '_blank' },
          parseInline(token.tokens)
        );
      }
      case 'strong': {
        return createElement('strong', parseInline(token.tokens));
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
