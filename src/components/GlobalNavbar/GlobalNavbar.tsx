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
      <ul>
        {items.map(({ title, href }) => (
          <li key={href}>
            <a href={href}>{title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
