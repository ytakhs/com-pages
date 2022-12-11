import { FC } from "react";

const items: { title: string; href: string }[] = [
  {
    title: "Top",
    href: "/",
  },
  {
    title: "Writing",
    href: "/writings",
  },
];

export const GlobalNavbar: FC = () => {
  return (
    <nav>
      <ul className="flex gap-4 md:flex-col">
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
  );
};
