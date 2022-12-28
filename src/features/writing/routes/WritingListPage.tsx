import Link from "next/link";
import { FC } from "react";
import { Layout } from "../../../components/Layout";
import { Writing } from "../type";

type Props = {
  writings: ReadonlyArray<Writing>;
};

export const WritingListPage: FC<Props> = ({ writings }) => {
  return (
    <Layout>
      <ul>
        {writings.map(({ path: { date, slug } }) => (
          <li key={`${date}-${slug}`}>
            <Link href={`/writings/${date}/${slug}`}>
              <div className="border-b py-4 text-lg font-bold hover:text-gray-400">
                {slug}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
