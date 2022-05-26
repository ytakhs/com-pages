import React from 'react';
import type { FC } from 'react';

type BreadcrumbItemProps = {
  text: string;
  href?: string;
};

export const Breadcrumb: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ text, href }) => {
  return (
    <li className="inline-block">{href ? <a href={href}>{text}</a> : text}</li>
  );
};

export const BreadcrumbSep = () => {
  return <li className="inline-block px-2">/</li>;
};
