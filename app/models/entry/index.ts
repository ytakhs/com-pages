import { z } from 'zod';
import { schemaForType } from '~/utils/zod';

export type Entry = {
  title: string;
  content: string;
  createdAt: string;
  path: string;
  description?: string | undefined;
};

const EntrySchema = schemaForType<Entry>()(
  z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
    createdAt: z.string(),
    path: z.string(),
  })
);

export const validateEntry = (entry: Entry): Entry | false => {
  const res = EntrySchema.safeParse(entry);

  return res.success && res.data;
};
