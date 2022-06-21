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

export function validateEntry(entry: Entry): Entry | false {
  const res = entrySchema.safeParse(entry);

  return res.success && res.data;
}

export function validateEntryMap(entryMap: EntryMap): EntryMap | false {
  const res = entryMapSchema.safeParse(entryMap);

  return res.success && res.data;
}
