import { FC } from "react";
import Link from "next/link";

export const Header: FC = () => (
  <header>
    <div className="py-8">
      <Link href="/">ytakhs.com</Link>
    </div>
  </header>
);
