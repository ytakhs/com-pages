import { FC, ReactNode } from "react";
import { GlobalNavbar } from "../GlobalNavbar";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="flex min-h-screen w-full flex-col items-start p-8 md:max-w-[900px] md:flex-row">
        <div className="sticky top-4 w-full shrink-0 md:w-[128px]">
          <GlobalNavbar />
        </div>
        <main className="w-full">
          <div className="h-full w-full py-4 md:px-4 md:py-0">{children}</div>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};
