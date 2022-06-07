import type { FC } from 'react';
import { fromUnixTime, format } from 'date-fns';

export const Date: FC<{ unixTime: number }> = ({ unixTime }) => {
  const date = fromUnixTime(unixTime);

  return (
    <time dateTime={format(date, 'yyyy-M-dd')}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
};
