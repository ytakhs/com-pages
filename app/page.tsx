import { Header } from "../src/components/Header";
import { GlobalNavbar } from "../src/components/GlobalNavbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="m-auto w-[900px] p-8">
        <Header />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[128px]">
            <GlobalNavbar />
          </div>
          <main>
            <div className="h-full py-4 md:px-4 md:py-0">dummy</div>
          </main>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}
