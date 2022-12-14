import { FC, ReactNode } from "react";
import { GlobalNavbar } from "../GlobalNavbar";
import { Header } from "../Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center bg-slate-900 text-white">
      <div className="w-full p-8 lg:w-[900px]">
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
