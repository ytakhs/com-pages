import { mkdirSync, writeFileSync } from 'fs';
import xml from 'xml';
import type { XmlObject } from 'xml';
import { getAllEntries, sortEntryByDateDesc } from '../lib/entry';
import type { Entry } from '../lib/entry';

const homeURL = 'https://ytakhs.com/';

(async () => {
  const allEntries = getAllEntries();
  const entries = sortEntryByDateDesc(allEntries);

  createAtomFeedFile(entries);
})();

function createAtomFeedFile(sortedEntries: ReadonlyArray<Entry>): void {
  const atom = createAtomFeed(sortedEntries);
  mkdirSync('public/feeds', { recursive: true });
  writeFileSync('public/feeds/atom.xml', atom);
}

function createAtomFeed(sortedEntries: ReadonlyArray<Entry>): string {
  const latestEntry = sortedEntries[0];

  const feed = {
    feed: [
      { _attr: { xmlns: 'http://www.w3.org/2005/Atom' } },
      { id: homeURL },
      { title: [{ _attr: { type: 'text' } }, 'ytakhs.com'] },
      { link: [{ _attr: { rel: 'alternate', href: homeURL } }] },
      {
        link: [
          {
            _attr: {
              rel: 'self',
              href: new URL('/feeds/atom.xml', homeURL).href,
            },
          },
        ],
      },
      { author: [{ name: 'ytakhs' }] },
      { updated: latestEntry?.createdAt },
      ...sortedEntries.map(createAtomEntry),
    ],
  };

  return xml(feed, { declaration: { encoding: 'UTF-8' } });
}

function createAtomEntry(entry: Entry): XmlObject {
  const permalink = new URL(entry.path, homeURL).href + '/';

  return {
    entry: [
      { id: permalink },
      { title: { _cdata: entry.title } },
      { updated: entry.createdAt },
      { summary: { _cdata: entry.description || entry.title } },
      { link: [{ _attr: { rel: 'alternate', href: permalink } }] },
      { published: entry.createdAt },
    ],
  };
}
