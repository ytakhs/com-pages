import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { join } from "path";
import { WritingPage } from "../../../features/writing/routes/WritingPage";
import { writingPathSchema } from "../../../features/writing/schema/writing";
import { Writing } from "../../../features/writing/type";
import { getWritingPaths } from "../../../features/writing/utils/getWritingPaths";
import {
  getWriting,
  getWritings,
} from "../../../features/writing/utils/getWritings";

type Props = {
  writing: Writing;
};

const Writing: NextPage<Props> = ({ writing }) => {
  return <WritingPage writing={writing} />;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { date, slug } = writingPathSchema.parse({
    date: params?.date,
    slug: params?.slug,
  });

  const writing = await getWriting({ date, slug });

  return {
    props: {
      writing: writing,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const rootDir = join(process.cwd(), "content");
  const filePaths = await getWritingPaths({ rootDir });
  const writings = await getWritings({ filePaths });

  return {
    paths: writings.map(({ path: { slug, date } }) => ({
      params: { slug, date },
    })),
    fallback: false,
  };
};

export default Writing;
