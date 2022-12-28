import { FC } from "react";
import { Layout } from "../../../components/Layout";
import { Markdown } from "../../../components/Markkdown";
import { Writing } from "../type";

type Props = {
  writing: Writing;
};

export const WritingPage: FC<Props> = ({
  writing: {
    content,
    frontmatter: { title },
  },
}) => {
  return (
    <Layout>
      <article>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{title}</h1>
          <div>
            <Markdown src={content} />
          </div>
        </div>
      </article>
    </Layout>
  );
};
