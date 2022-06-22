import { z } from 'zod';
import { schemaForType } from '~/utils/zod';
import type { EntryMap, Entry } from './types';

const entrySchema = schemaForType<Entry>()(
  z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
    createdAt: z.string(),
    path: z.string(),
  })
);

const entryMapSchema = schemaForType<EntryMap>()(
  z.record(
    z.string(),
    z.object({ title: z.string(), createdAt: z.string(), path: z.string() })
  )
);

export function validateEntry(v: unknown): Entry | false {
  const res = entrySchema.safeParse(v);

  return res.success && res.data;
}

export function validateEntryMap(v: unknown): EntryMap | false {
  const res = entryMapSchema.safeParse(v);

  return res.success && res.data;
}
