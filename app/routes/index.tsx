const baseUrl = 'https://ytakhs.com';

export function links() {
  return [
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
}

export function meta() {
  return {
    title: 'ytakhs.com',
    'og:title': 'ytakhs.com',
    'og:description': 'ytakhs.com',
    'og:type': 'website',
    'og:url': baseUrl,
    'og:image': `${baseUrl}/images/og-image.png`,
    'twitter:card': 'summary',
  };
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
