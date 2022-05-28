import { Link } from '@remix-run/react';
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid';

import { H2 } from '~/components/Heading';
import { Layout } from '~/components/Layout';

export default function Index() {
  return (
    <Layout>
      <h1 className="hidden">ytakhs.com</h1>
      <div className="flex justify-start">
        <figure className="block px-2 w-full max-w-[30%] h-full max-h-[30%]">
          <img
            className="static rounded-full"
            src="/images/icon.svg"
            alt="icon"
          />
        </figure>
        <div className="px-4 m-auto w-full">
          <H2 style={{ padding: 0 }}>About me</H2>
          <p>@ytakhs</p>
        </div>
      </div>
      <div className="pt-4">
        <H2>Links</H2>
        <ul>
          <li className="list-item py-1.5 leading-relaxed">
            <Link to="/entries">
              <div className="border-b">
                <span className="inline-flex items-center">
                  Writings <ChevronRightIcon className="mx-2 w-5 h-5" />
                </span>
              </div>
            </Link>
          </li>
          <li className="list-item py-1.5 leading-relaxed">
            <Link to="/profile">
              <div className="border-b">
                <span className="inline-flex items-center">
                  Profile <ChevronRightIcon className="mx-2 w-5 h-5" />
                </span>
              </div>
            </Link>
          </li>
          <li className="list-item py-1.5 leading-relaxed">
            <Link to="https://github.com/ytakhs" target="_blank">
              <div className="border-b">
                <span className="inline-flex items-center">
                  GitHub <ExternalLinkIcon className="mx-2 w-5 h-5" />
                </span>
              </div>
            </Link>
          </li>
          <li className="list-item py-1.5 leading-relaxed">
            <Link to="https://twitter.com/ytakhs" target="_blank">
              <div className="border-b">
                <span className="inline-flex items-center">
                  Twitter <ExternalLinkIcon className="mx-2 w-5 h-5" />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
