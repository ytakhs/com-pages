import { FC, ReactNode } from "react";
import { GlobalNavbar } from "../GlobalNavbar";
import { Header } from "../Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen bg-slate-900 text-white">
      <div className="m-auto w-[900px] p-8">
        <Header />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[128px]">
            <GlobalNavbar />
          </div>
          <main>
            <div className="h-full w-full py-4 md:px-4 md:py-0">{children}</div>
          </main>
        </div>
        <footer></footer>
      </div>
    </div>
  );
};
