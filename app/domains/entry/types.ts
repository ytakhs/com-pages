export type Entry = {
  title: string;
  content: string;
  createdAt: string;
  path: string;
  description?: string | undefined;
};

export type EntryMap = Record<
  string,
  { title: string; createdAt: string; path: string }
>;
