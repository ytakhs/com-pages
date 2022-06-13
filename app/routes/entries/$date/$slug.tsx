import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { BreadcrumbItem } from '~/components/Breadcrumb';
import { H1 } from '~/components/Heading';
import { Layout } from '~/components/Layout';
import { Markdown } from '~/components/Markdown';
import { removeTralingSlash } from '~/utils/url';
import { schemForType } from '~/utils/zod';

type Entry = { title: string; createdAt: string; path: string };
type EntryMap = Record<string, Entry>;
type LoaderData = {
  title: string;
  description?: string | null;
  content: string;
  path: string;
};
const entryMapSchema = schemForType<EntryMap>()(
  z.record(
    z.string(),
    z.object({ title: z.string(), createdAt: z.string(), path: z.string() })
  )
);

const entrySchema = schemForType<LoaderData>()(
  z.object({
    title: z.string(),
    description: z.string().nullable(),
    content: z.string(),
    path: z.string(),
  })
);

const baseUrl = 'https://ytakhs.com';
export const meta: MetaFunction = ({ data }) => {
  const entry = entrySchema.parse(data);
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

  const entryMap = entryMapSchema.parse(data);
  if (!entryMap[pathname]) {
    return new Response('Not found', { status: 404 });
  }

  const entryRes = await fetch(entryUrl);
  const entryData = await entryRes.json<LoaderData>();
  const entry = entrySchema.parse(entryData);

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
