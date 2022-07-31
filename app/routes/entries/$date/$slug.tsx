import { format, parseISO } from 'date-fns';
import type {
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { BreadcrumbItem } from '~/components/Breadcrumb';
import { Layout } from '~/components/Layout';
import { Markdown } from '~/components/Markdown';
import type { Entry, EntryMap } from '~/domains/entry';
import { validateEntry, validateEntryMap } from '~/domains/entry';
import { removeTralingSlash } from '~/utils/url';
import styles from '~/styles/entries/$date/$slug.css';
import { links as layoutLinks } from '~/components/Layout';

const baseUrl = 'https://ytakhs.com';
export const meta: MetaFunction = ({ data }) => {
  const entry = validateEntry(data);
  if (!entry) {
    return {};
  }

  const url = new URL(entry.path, baseUrl);

  return {
    title: 'Writings | ytakhs.com',
    'og:title': `${entry.title} | ytakhs.com`,
    'og:description': entry.description,
    'og:type': 'article',
    'og:url': url.href,
    'twitter:card': 'summary',
  };
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...layoutLinks(),
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = removeTralingSlash(url.pathname);
  const entriesUrl = `${url.origin}/content/entries.json`;
  const entryUrl = `${url.origin}/content${pathname}.json`;
  const res = await fetch(entriesUrl);
  const data = await res.json<EntryMap>();

  const entryMap = validateEntryMap(data);
  if (!entryMap || !entryMap[pathname]) {
    throw new Response('Not found', { status: 404 });
  }

  const entryRes = await fetch(entryUrl);
  const entryData = await entryRes.json<Entry>();
  const entry = validateEntry(entryData);

  return json(entry);
};

export default function Index() {
  const entry = useLoaderData<Entry>();

  const { content } = entry;
  const createdAt = parseISO(entry.createdAt);

  return (
    <Layout breadcrumb={<BreadcrumbItem href="/entries" text="writings" />}>
      <article>
        <div className="entry">
          <div className="entry-meta">
            <h1>{entry.title}</h1>
            <div className="entry-meta-date">
              <span>Created at:</span>
              <time dateTime={format(createdAt, 'yyyy-M-dd')}>
                {format(createdAt, 'LLLL d, yyyy')}
              </time>
            </div>
          </div>
          <div>
            <Markdown markdown={content} />
          </div>
        </div>
      </article>
    </Layout>
  );
}
