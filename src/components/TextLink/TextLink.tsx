import Link from "next/link";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Link>;

export const TextLink: FC<Props> = ({ ...props }) => (
  <Link
    className="underline underline-offset-4 hover:text-gray-400"
    {...props}
  />
);
