import { Header } from "../src/components/Header";
import { Sidebar } from "../src/components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
      </div>
    </div>
  );
}
