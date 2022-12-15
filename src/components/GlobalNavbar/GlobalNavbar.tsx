import { FC } from "react";
import Link from "next/link";

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
                <a
                  className="underline underline-offset-4 hover:text-gray-400"
                  href={href}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
