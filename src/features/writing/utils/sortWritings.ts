import { Writing } from "../type";

type Args = {
  writings: ReadonlyArray<Writing>;
};
export const sortWritings = ({ writings }: Args): Promise<Writing[]> => {
  return Promise.resolve(
    writings
      .slice()
      .sort(
        (
          { frontmatter: { createdAt: createdAtLeft } },
          { frontmatter: { createdAt: createdAtRight } }
        ) => {
          const left = Date.parse(createdAtLeft);
          const right = Date.parse(createdAtRight);

          if (left < right) {
            return 1;
          } else if (left > right) {
            return -1;
          } else {
            return 0;
          }
        }
      )
  );
};
