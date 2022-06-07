import React from 'react';
import type { FC } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbSep } from '../Breadcrumb';

export const Layout: FC<{
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
}> = ({ children, breadcrumb }) => {
  return (
    <>
      <header className="sticky top-0 py-4 bg-slate-50 dark:bg-slate-900">
        <div className="px-4 m-auto w-[95%] lg:px-0 lg:w-full lg:max-w-3xl">
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

      <main className="px-4 m-auto w-[95%] rounded-md lg:w-full lg:max-w-4xl">
        <div className="m-auto w-full lg:max-w-3xl">{children}</div>
      </main>

      <footer className="p-8"></footer>
    </>
  );
};
