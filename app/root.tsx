import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from './styles/app.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/images/favicon-apple-touch.png',
  },
  { rel: 'icon', href: '/images/favicon-48.png', type: 'image/png' },
  { rel: 'icon', href: '/images/favicon.svg', type: 'image/svg+xml' },
  {
    rel: 'alternate',
    href: '/feeds/atom.xml',
    type: 'application/atom+xml',
  },
];

const baseUrl = 'https://ytakhs.com';
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ytakhs.com',
  viewport: 'width=device-width,initial-scale=1',
  'og:title': 'ytakhs.com',
  'og:description': 'ytakhs.com',
  'og:type': 'website',
  'og:url': baseUrl,
  'og:image': `${baseUrl}/images/og-image.png`,
  'twitter:card': 'summary',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="
        font-sans text-tiny text-left text-neutral-800 dark:text-neutral-300
        break-words bg-neutral-50
        dark:bg-neutral-900
        sm:text-base
      "
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
