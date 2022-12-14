import { z } from "zod";
import { impl } from "../../../lib/zod";
import { Writing, WritingFrontmatter, WritingPath } from "../type";

export const writingMatterSchema = impl<WritingFrontmatter>().with(
  z.object({
    title: z.string(),
    description: z.string().nullable(),
    createdAt: z.string(),
  })
);

export const writingPathSchema = impl<WritingPath>().with(
  z.object({
    slug: z.string(),
    date: z.string(),
  })
);

export const writingSchema = impl<Writing>().with(
  z.object({
    content: z.string(),
    frontmatter: writingMatterSchema,
    path: writingPathSchema,
  })
);
