import { FC } from "react";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { Layout } from "../../../components/Layout";
import { Writing } from "../type";

type Props = {
  writings: ReadonlyArray<Writing>;
};

export const WritingListPage: FC<Props> = ({ writings }) => {
  return (
    <Layout>
      <ul>
        {writings.map(
          ({ path: { date, slug }, frontmatter: { title, createdAt } }) => (
            <li key={`${date}-${slug}`}>
              <Link href={`/writings/${date}/${slug}`}>
                <div className="flex justify-between gap-2 border-b py-4 text-lg font-bold hover:text-gray-400">
                  <p className="w-full grow overflow-hidden text-ellipsis whitespace-nowrap">
                    {title}
                  </p>
                  <time
                    dateTime={format(parseISO(createdAt), "yyyy-MM-dd")}
                    className="w-fit whitespace-nowrap text-sm font-normal"
                  >
                    {format(parseISO(createdAt), "MMM dd, yyyy")}
                  </time>
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
    </Layout>
  );
};
