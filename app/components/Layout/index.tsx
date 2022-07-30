import React from 'react';
import type { FC } from 'react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSep } from '../Breadcrumb';
import styles from './index.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const Layout: FC<{
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
}> = ({ children, breadcrumb }) => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <Breadcrumb>
            <BreadcrumbItem href="/" text="ytakhs.com" />
            {breadcrumb ? (
              <>
                <BreadcrumbSep />
                {breadcrumb}
              </>
            ) : null}
          </Breadcrumb>
        </div>
      </header>

      <main className="main">
        <div className="main-content">{children}</div>
      </main>

      <footer className="footer"></footer>
    </>
  );
};
