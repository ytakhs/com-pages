import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { join } from "path";
import { Writing } from "../features/writing/type";
import { getWritingPaths } from "../features/writing/utils/getWritingPaths";
import { getWritings } from "../features/writing/utils/getWritings";
import { WritingListPage } from "../features/writing/routes/WritingListPage";
import { sortWritings } from "../features/writing/utils/sortWritings";

type Props = {
  writings: ReadonlyArray<Writing>;
};

const Home: NextPage<Props> = ({ writings }) => {
  return (
    <>
      <Head>
        <title key="title">ytakhs.com</title>
        <meta property="og:title" content="ytakhs.com" key="og:title" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:url" content="https://ytakhs.com" key="og:url" />
        <meta property="twitter:card" content="summary" key="twitter:card" />
      </Head>
      <WritingListPage writings={writings} />;
    </>
  );
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
