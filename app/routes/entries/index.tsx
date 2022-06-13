import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { schemaForType } from '~/utils/zod';
import { Layout } from '../../components/Layout';
import { BreadcrumbItem } from '~/components/Breadcrumb';
import { H1 } from '~/components/Heading';
import { format, parseISO } from 'date-fns';

type Entry = { title: string; createdAt: string; path: string };
type EntryMap = Record<string, Entry>;
type LoaderData = {
  entries: ReadonlyArray<Entry>;
};

function sortEntryByDateDesc(entries: Entry[]): Entry[] {
  const result = entries.slice();
  result.sort(({ createdAt: a }, { createdAt: b }) => {
    const aDate = parseISO(a);
    const bDate = parseISO(b);

    if (aDate < bDate) {
      return 1;
    } else if (aDate > bDate) {
      return -1;
    } else {
      return 0;
    }
  });

  return result;
}

export const loader: LoaderFunction = async ({ request }) => {
  const entriesUrl = `${new URL(request.url).origin}/content/entries.json`;
  const res = await fetch(entriesUrl);
  const data = await res.json();

  const schema = schemaForType<EntryMap>()(
    z.record(
      z.string(),
      z.object({ title: z.string(), createdAt: z.string(), path: z.string() })
    )
  );
  const entryMap = schema.parse(data);
  const entries = sortEntryByDateDesc(Object.values(entryMap));

  return json<LoaderData>({ entries });
};

const baseUrl = 'https://ytakhs.com';
export const meta: MetaFunction = () => ({
  title: 'Writings | ytakhs.com',
  'og:title': 'Writings | ytakhs.com',
  'og:description': 'Writings | ytakhs.com',
  'og:type': 'website',
  'og:url': `${baseUrl}/entries`,
  'twitter:card': 'summary',
});

export default function Index() {
  const { entries } = useLoaderData<LoaderData>();

  return (
    <Layout breadcrumb={<BreadcrumbItem href="/entries" text="writings" />}>
      <H1>Writings</H1>
      <section>
        <ul>
          {entries.map((entry, i) => {
            const createdAt = parseISO(entry.createdAt);

            return (
              <li key={i}>
                <Link to={entry.path}>
                  <div className="py-4 border-b">
                    {entry.title}
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      <time dateTime={format(createdAt, 'yyyy-M-dd')}>
                        {format(createdAt, 'LLLL d, yyyy')}
                      </time>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
