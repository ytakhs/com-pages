import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { getUnixTime, parseISO } from 'date-fns';
import { getAllEntries } from '../lib/entry';

async function main() {
  const entries = getAllEntries();
  const pwd = process.cwd();

  entries.forEach(
    ({ title, content, description, createdAt, path: entryPath }) => {
      const dest = join(pwd, 'public', 'content', `${entryPath}.json`);

      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(
        dest,
        JSON.stringify({ title, content, description, createdAt })
      );
    }
  );

  const entryMap = entries.reduce(
    (acc, { title, path: entryPath, createdAt }) => ({
      ...acc,
      ...{
        [entryPath]: {
          title,
          createdAt: getUnixTime(parseISO(createdAt)),
        },
      },
    }),
    {}
  );

  writeFileSync(
    join(pwd, 'public', 'content', 'entries.json'),
    JSON.stringify(entryMap)
  );
}

main();
