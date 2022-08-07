import type { LinksFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { Layout } from '~/components/Layout';
import styles from '~/styles/root.css';
import { links as layoutLinks } from '~/components/Layout';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...layoutLinks(),
];

export default function Index() {
  return (
    <Layout breadcrumbs={[]}>
      <h1 className="title">ytakhs.com</h1>
      <div className="container">
        <figure className="main-icon">
          <img src="/images/icon.svg" alt="icon" />
        </figure>
        <div>
          <h2 className="section-title">About me</h2>
          <ul className="list">
            <li className="list-item">
              GitHub:
              <a
                href="https://github.com/ytakhs"
                target="_blank"
                rel="noreferrer"
                className='list-item-link'
              >
                ytakhs
              </a>
            </li>
            <li className="list-item">
              Twitter:
              <a
                href="https://twitter.com/ytakhs"
                target="_blank"
                rel="noreferrer"
                className='list-item-link'
              >
                @ytakhs
              </a>
            </li>
          </ul>
          <h2 className="section-title">Content</h2>
          <ul className="list">
            <li className="list-item">
              Writings:
              <Link
                to="/entries"
                className='list-item-link'
              >
                /entries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
