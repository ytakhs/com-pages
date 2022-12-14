import { GetStaticProps, NextPage } from "next";
import { join } from "path";
import { Writing } from "../features/writing/type";
import { getWritingPaths } from "../features/writing/utils/getWritingPaths";
import { getWritings } from "../features/writing/utils/getWritings";
import { WritingList } from "../features/writing/routes/WritingList";
import { sortWritings } from "../features/writing/utils/sortWritings";

type Props = {
  writings: ReadonlyArray<Writing>;
};

const Home: NextPage<Props> = ({ writings }) => {
  return <WritingList writings={writings} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const rootDir = join(process.cwd(), "content");
  const filePaths = await getWritingPaths({ rootDir });
  const writings = await getWritings({ filePaths }).then((w) =>
    sortWritings({ writings: w })
  );

  return {
    props: {
      writings,
    },
  };
};

export default Home;
