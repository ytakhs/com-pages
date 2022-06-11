import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { BreadcrumbItem } from '~/components/Breadcrumb';
import { H1 } from '~/components/Heading';
import { Layout } from '~/components/Layout';
import { Markdown } from '~/components/Markdown';
import { schemForType } from '~/utils/zod';

type Entry = { title: string; createdAt: string; path: string };
type EntryMap = Record<string, Entry>;
type LoaderData = {
  title: string;
  content: string;
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
    content: z.string(),
  })
);

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const entriesUrl = `${url.origin}/content/entries.json`;
  const entryUrl = `${url.origin}/content/${url.pathname}.json`;
  const res = await fetch(entriesUrl);
  const data = await res.json();

  const entryMap = entryMapSchema.parse(data);
  if (!entryMap[url.pathname]) {
    throw new Error('error');
  }
  const entryRes = await fetch(entryUrl);
  const entryData = await entryRes.json();
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
