import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { getAllEntries } from '../lib/entry';
import type { Entry } from '../app/models/entry';

(async () => {
  const entries = getAllEntries();
  const pwd = process.cwd();

  entries.forEach(
    ({ title, content, description, createdAt, path: entryPath }) => {
      const dest = join(pwd, 'public', 'content', `${entryPath}.json`);

      mkdirSync(dirname(dest), { recursive: true });
      const entry: Entry = {
        title,
        content,
        description,
        createdAt,
        path: entryPath,
      };
      writeFileSync(dest, JSON.stringify(entry));
    }
  );

  const entryMap = entries.reduce(
    (acc, { title, path: entryPath, createdAt }) => ({
      ...acc,
      ...{
        [entryPath]: {
          title,
          path: entryPath,
          createdAt: createdAt,
        },
      },
    }),
    {}
  );

  writeFileSync(
    join(pwd, 'public', 'content', 'entries.json'),
    JSON.stringify(entryMap)
  );
})();
