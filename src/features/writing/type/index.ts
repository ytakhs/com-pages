export type Writing = {
  content: string;
  path: WritingPath;
  frontmatter: WritingFrontmatter;
};

export type WritingFrontmatter = {
  title: string;
  description: string | null;
  createdAt: string;
};

export type WritingPath = {
  slug: string;
  date: string;
};
