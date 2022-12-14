import Link from "next/link";
import { FC } from "react";
import { Layout } from "../../../components/Layout";
import { Writing } from "../type";

type Props = {
  writings: ReadonlyArray<Writing>;
};

export const WritingList: FC<Props> = ({ writings }) => {
  return (
    <Layout>
      <ul>
        {writings.map(({ path: { date, slug } }) => (
          <li key={`${date}-${slug}`}>
            <Link href={`/writings/${date}/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
