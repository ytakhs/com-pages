import { Link } from '@remix-run/react';

import { H2 } from '~/components/Heading';
import { Layout } from '~/components/Layout';

export default function Index() {
  return (
    <Layout>
      <h1 className="hidden">ytakhs.com</h1>
      <div className="flex justify-start py-8">
        <figure className="block px-2 m-auto w-full max-w-[30%] h-full max-h-[30%]">
          <img
            className="static rounded-full border border-slate-800"
            src="/images/icon.svg"
            alt="icon"
          />
        </figure>
        <div className="px-4 m-auto w-full">
          <H2 style={{ padding: 0 }}>About me</H2>
          <ul className="p-4">
            <li className="tracking-wider leading-relaxed">
              GitHub:{' '}
              <a
                href="https://twitter.com/ytakhs"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                ytakhs
              </a>
            </li>
            <li className="tracking-wider leading-relaxed">
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
          <ul className="p-4">
            <li className="tracking-wider leading-relaxed">
              Writings:{' '}
              <Link to="/entries" className="underline ">
                /entries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
