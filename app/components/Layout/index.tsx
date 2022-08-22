import React from 'react';
import type { FC } from 'react';
import type { LinksFunction } from '@remix-run/cloudflare';
import styles from '~/styles/components/Layout/index.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type Breadcrumb = {
  label: string;
  href: string;
};

export const Layout: FC<{
  children: React.ReactNode;
  breadcrumbs: ReadonlyArray<Breadcrumb>;
}> = ({ children, breadcrumbs }) => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <nav>
            <ul className="breadcrumb">
              <li>
                <a href="/">ytakhs.com</a>
              </li>
              {breadcrumbs.map(({ label, href }) => (
                <>
                  <li>/</li>
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                </>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="main-content">{children}</div>
      </main>

      <footer className="footer"></footer>
    </>
  );
};
