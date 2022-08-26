import type {
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { schemaForType } from "~/utils/zod";
import { Layout } from "../../components/Layout";
import { format, parseISO } from "date-fns";
import styles from "~/styles/entries.css";
import { links as layoutLinks } from "~/components/Layout";

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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...layoutLinks(),
];

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

const baseUrl = "https://ytakhs.com";
export const meta: MetaFunction = () => ({
  title: "Writings | ytakhs.com",
  "og:title": "Writings | ytakhs.com",
  "og:description": "Writings | ytakhs.com",
  "og:type": "website",
  "og:url": `${baseUrl}/entries`,
  "twitter:card": "summary",
});

export default function Index() {
  const { entries } = useLoaderData<LoaderData>();

  return (
    <Layout breadcrumbs={[{ href: "/entries", label: "writings" }]}>
      <h1>Writings</h1>
      <section>
        <div className="entry">
          {entries.map((entry, i) => {
            const createdAt = parseISO(entry.createdAt);

            return (
              <div className="entry-item" key={i}>
                <Link to={entry.path} className="entry-item-content">
                  {entry.title}
                  <div className="entry-item-meta">
                    <time dateTime={format(createdAt, "yyyy-M-dd")}>
                      {format(createdAt, "LLLL d, yyyy")}
                    </time>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
