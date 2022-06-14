import React from 'react';
import type { CSSProperties } from 'react';

type Props = HeadingProps & { as: React.ElementType };

type HeadingProps = {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  hasAnchor?: boolean;
};

export function H1(props: HeadingProps) {
  return (
    <Heading
      as="h1"
      className="py-3 text-2xl font-medium tracking-wide leading-tight sm:text-3xl"
      {...props}
    />
  );
}

export function H2(props: HeadingProps) {
  return (
    <Heading
      as="h2"
      className="py-3 text-xl font-medium tracking-wide leading-tight sm:text-2xl"
      {...props}
    />
  );
}

export function H3(props: HeadingProps) {
  return (
    <Heading
      as="h3"
      className="py-3 text-lg font-medium sm:text-xl"
      {...props}
    />
  );
}

export function H4(props: HeadingProps) {
  return (
    <Heading
      as="h2"
      className="py-2 text-base font-medium sm:text-xl"
      {...props}
    />
  );
}

export function H5(props: HeadingProps) {
  return (
    <Heading
      as="h2"
      className="py-1 text-tiny font-medium sm:text-base"
      {...props}
    />
  );
}

export function H6(props: HeadingProps) {
  return <Heading as="h2" className="py-1 text-base font-medium" {...props} />;
}

export function Heading({ as, children, hasAnchor, ...props }: Props) {
  const Tag = as;

  return (
    <Tag
      id={hasAnchor ? encodeURI(children?.toString() || '') : null}
      {...props}
    >
      {hasAnchor ? (
        <a href={`#${encodeURI(children?.toString() || '')}`} className="pr-2">
          #
        </a>
      ) : null}
      {children}
    </Tag>
  );
}
