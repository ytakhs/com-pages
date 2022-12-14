import { readdirSync } from "fs";
import { join } from "path";

type Args = {
  rootDir: string;
};

export const getWritingPaths = ({ rootDir }: Args): string[] => {
  const paths = recursiveDir(rootDir);

  return paths.filter((p) => p.endsWith(".md"));
};

const recursiveDir = (dir: string): string[] => {
  return readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const current = join(dir, dirent.name);
    return dirent.isFile() ? [current] : recursiveDir(current);
  });
};
