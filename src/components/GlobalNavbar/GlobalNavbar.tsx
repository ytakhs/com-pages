import { FC } from "react";
import Link from "next/link";
import { TextLink } from "../TextLink/TextLink";

const items: { title: string; href: string }[] = [
  {
    title: "Top",
    href: "/",
  },
];

export const GlobalNavbar: FC = () => {
  return (
    <aside>
      <div className="flex flex-col gap-4 md:gap-8">
        <Link href="/">ytakhs.com</Link>
        <nav>
          <ul className="flex justify-start gap-4 md:flex-col">
            {items.map(({ title, href }) => (
              <li key={href}>
                <TextLink href={href}>{title}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
