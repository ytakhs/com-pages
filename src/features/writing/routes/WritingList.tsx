import Link from "next/link";
import { FC } from "react";
import { GlobalNavbar } from "../../../components/GlobalNavbar";
import { Header } from "../../../components/Header";
import { Writing } from "../type";

type Props = {
  writings: ReadonlyArray<Writing>;
};

export const WritingList: FC<Props> = ({ writings }) => {
  return (
    <div className="h-screen bg-slate-900 text-white">
      <div className="m-auto w-[900px] p-8">
        <Header />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[128px]">
            <GlobalNavbar />
          </div>
          <main>
            <div className="h-full w-full py-4 md:px-4 md:py-0">
              <ul>
                {writings.map(({ path: { date, slug } }, i) => (
                  <li key={`${date}-${slug}`}>
                    <Link href={`/writings/${date}/${slug}`}>{slug}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
        <footer></footer>
      </div>
    </div>
  );
};
