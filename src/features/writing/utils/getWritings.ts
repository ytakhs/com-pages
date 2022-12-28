import { readFile } from "fs/promises";
import { join } from "path";
import { Writing } from "../type";
import matter from "gray-matter";
import { WritingPath } from "../type";
import { writingSchema } from "../schema/writing";
import { load, JSON_SCHEMA } from "js-yaml";

type Args = {
  filePaths: ReadonlyArray<string>;
};

export const getWritings = async ({ filePaths }: Args) => {
  return await Promise.all(filePaths.map(readWriting));
};

export const getWriting = async ({ date, slug }: WritingPath) => {
  const filePath = join(
    process.cwd(),
    "content",
    "writings",
    date,
    slug,
    "index.md"
  );

  return readWriting(filePath);
};

const readWriting = async (filePath: string): Promise<Writing> => {
  const raw = await readFile(filePath);
  const match = /.+\/(?<date>\d\d\d\d-\d\d-\d\d)\/(?<slug>.+)\/index.md/.exec(
    filePath
  );

  const { slug, date } = match?.groups || {};

  const { data, content } = matter(raw, {
    engines: { yaml: (s) => load(s, { schema: JSON_SCHEMA }) as object },
  });
  const { title, description, createdAt } = data;

  const writing = writingSchema.parse({
    content,
    path: {
      slug,
      date,
    },
    frontmatter: {
      title,
      description: description || null,
      createdAt,
    },
  });

  return writing;
};
