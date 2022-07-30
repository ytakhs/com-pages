import { Link } from '@remix-run/react';

import { H2 } from '~/components/Heading';
import { Layout } from '~/components/Layout';

export default function Index() {
  return (
    <Layout>
      <h1 style={{ display: 'none' }}>ytakhs.com</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '1rem',
          padding: '2rem 0',
        }}
      >
        <figure
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 0.5rem',
            maxWidth: '30%',
            maxHeight: '30%',
          }}
        >
          <img
            style={{
              borderRadius: '9999px',
              borderWidth: '1px',
              borderColor: 'rgb(30 41 59)',
            }}
            src="/images/icon.svg"
            alt="icon"
          />
        </figure>
        <div>
          <H2 style={{ padding: 0 }}>About me</H2>
          <ul
            style={{
              padding: '1rem',
              letterSpacing: '0.1rem',
              lineHeight: '2rem',
            }}
          >
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/ytakhs"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                ytakhs
              </a>
            </li>
            <li>
              Twitter:{' '}
              <a
                href="https://twitter.com/ytakhs"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                @ytakhs
              </a>
            </li>
          </ul>
          <H2 style={{ padding: 0 }}>Content</H2>
          <ul
            style={{
              padding: '1rem',
              letterSpacing: '0.1rem',
              lineHeight: '1.5rem',
            }}
          >
            <li>
              Writings:{' '}
              <Link
                to="/entries"
                style={{
                  textDecorationLine: 'underline',
                }}
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
