import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
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
  const {
    frontmatter: { title },
    path: { date, slug },
  } = writing;
  const baseUrl = "https://ytakhs.com";
  const contentUrl = new URL(`writings/${date}/${slug}`, baseUrl);
  const imageUrl = new URL("/api/og", baseUrl);
  const imageUrlQuery = new URLSearchParams({ title: encodeURI(title) });

  const titleText = `${title} | ytakhs.com`;

  return (
    <>
      <Head>
        <title key="title">{titleText}</title>
        <meta
          property="og:title"
          content={`${title} | ytakhs.com`}
          key="og:title"
        />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:url" content={contentUrl.href} key="og:url" />
        <meta
          property="og:image"
          content={`${imageUrl.href}?${imageUrlQuery.toString()}`}
          key="og:image"
        />
        <meta property="twitter:card" content="summary" key="twitter:card" />
      </Head>
      <WritingPage writing={writing} />
    </>
  );
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
