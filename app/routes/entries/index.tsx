import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { schemForType } from '~/utils/zod';
import { Layout } from '../../components/Layout';
import { BreadcrumbItem } from '~/components/Breadcrumb';
import { H1 } from '~/components/Heading';
import { Date } from '~/components/Date';

type Entry = { title: string; createdAt: number; path: string };

type EntryMap = Record<string, Entry>;

type LoaderData = {
  entries: ReadonlyArray<Entry>;
};

const sortEntries = (entries: ReadonlyArray<Entry>): ReadonlyArray<Entry> => {
  return entries.slice().sort(({ createdAt: a }, { createdAt: b }) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const entriesUrl = `${new URL(request.url).origin}/content/entries.json`;
  const res = await fetch(entriesUrl);
  const data = await res.json();

  const schema = schemForType<EntryMap>()(
    z.record(
      z.string(),
      z.object({ title: z.string(), createdAt: z.number(), path: z.string() })
    )
  );
  const entryMap = schema.parse(data);
  const entries = sortEntries(Object.values(entryMap));

  return json<LoaderData>({ entries });
};

export default function Index() {
  const { entries } = useLoaderData<LoaderData>();

  return (
    <Layout breadcrumb={<BreadcrumbItem href="/entries" text="writings" />}>
      <H1>Writings</H1>
      <section>
        <ul>
          {entries.map((entry, i) => {
            return (
              <li key={i}>
                <Link to={entry.path}>
                  <div className="py-4 border-b">
                    {entry.title}
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      <Date unixTime={entry.createdAt} />
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
