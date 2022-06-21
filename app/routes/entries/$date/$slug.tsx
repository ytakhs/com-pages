import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { BreadcrumbItem } from '~/components/Breadcrumb';
import { H1 } from '~/components/Heading';
import { Layout } from '~/components/Layout';
import { Markdown } from '~/components/Markdown';
import type { Entry, EntryMap } from '~/domains/entry';
import { validateEntry, validateEntryMap } from '~/domains/entry';
import { removeTralingSlash } from '~/utils/url';

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
  const entry = useLoaderData();

  return (
    <Layout breadcrumb={<BreadcrumbItem href="/entries" text="writings" />}>
      <article>
        <H1>{entry.title}</H1>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="pr-2">Created at:</span>
        </div>
        <div className="py-2">
          <Markdown markdown={entry.content} />
        </div>
      </article>
    </Layout>
  );
}
