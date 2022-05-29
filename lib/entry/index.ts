
import assert from 'assert';
import { formatISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path, { posix } from 'path';

const contentDir = path.join(
  process.cwd(),
  process.env.CONTENT_DIR || 'content'
);

export type EntryMatter = {
  title: string;
  description?: string;
  content: string;
  createdAt: string;
  draft?: boolean;
};

export type EntryPathParams = {
  date: string;
  slug: string;
  path: string;
};

export type Entry = EntryMatter & EntryPathParams;

export function getAllEntries(filePaths: string[] = getFilePaths()): Entry[] {
  const entries = filePaths
    .map((filePath) => {
      const entryMatter = getEntryMatter(filePath);
      const entryPathParams = getEntryPathParams(filePath);

      return {
        ...entryPathParams,
        ...entryMatter,
      };
    })
    .filter((entry) => !entry.draft);

  return entries;
}

export function getAllEntryPathParams(
  filePaths: string[] = getFilePaths()
): EntryPathParams[] {
  return getAllEntries(filePaths).map(({ date, slug, path }) => {
    return {
      date,
      slug,
      path,
    };
  });
}

export async function getEntryBy(date: string, slug: string): Promise<Entry> {
  const fullPath = path.join(contentDir, 'entries', date, slug, 'index.md');
  const entryMatter = getEntryMatter(fullPath);
  const entryPath = path.join('/entries', date, slug);

  return {
    slug,
    date,
    path: entryPath,
    ...entryMatter,
  };
}

function getFilePaths(): string[] {
  const recursiveDir = (dir: string): string[] => {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
      const current = path.join(dir, dirent.name);
      return dirent.isFile() ? [current] : recursiveDir(current);
    });
  };

  const paths = recursiveDir(contentDir);

  return paths.filter((p) => p.endsWith('.md'));
}

function getEntryPathParams(filePath: string): EntryPathParams {
  const match: RegExpMatchArray | null =
    /.+\/entries\/(?<date>\d\d\d\d-\d\d-\d\d)\/(?<slug>.+)\/index.md/.exec(
      filePath
    );

  assert(match?.groups);

  const { date, slug } = match.groups;

  assert(date, "date must be present");
  assert(slug, "slug must be present");

  const entryPath = posix.join('/entries', date, slug);
  return {
    date,
    slug,
    path: entryPath,
  };
}

function getEntryMatter(fullPath: string): EntryMatter {
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(fileContent);
  const content = matterResult.content;
  const { title, description, createdAt, draft } = matterResult.data;

  assert(typeof title === 'string', "title must be string");
  assert(createdAt instanceof Date, "createdAt must be Date");

  return {
    title,
    description: description,
    content,
    createdAt: formatISO(createdAt),
    draft: draft,
  };
}

export function sortEntryByDateDesc(entries: Entry[]): Entry[] {
  const result = entries.slice();
  result.sort(({ createdAt: a }, { createdAt: b }) => {
    const aDate = Date.parse(a);
    const bDate = Date.parse(b);

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
