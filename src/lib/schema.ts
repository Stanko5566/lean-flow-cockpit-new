import { z } from "zod";

// 5S Checklist schema
export const createChecklistSchema = z.object({
  title: z.string().min(1).max(100),
  area: z.string().min(1).max(100),
  sort: z.string().min(1).max(100),
  set_in_order: z.string().min(1).max(100),
  shine: z.string().min(1).max(100),
  standardize: z.string().min(1).max(100),
  sustain: z.string().min(1).max(100),
});

export const checklistSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string(),
  area: z.string(),
  sort: z.string(),
  set_in_order: z.string(),
  shine: z.string(),
  standardize: z.string(),
  sustain: z.string(),
});

// Gemba Walk schema
export const createGembaWalkSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  area: z.string().min(1).max(100),
  observations: z.array(z.string()),
});

export const gembaWalkSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string(),
  description: z.string(),
  area: z.string(),
  observations: z.array(z.string()),
});

export type Checklist = z.infer<typeof checklistSchema>;
export type CreateChecklistDto = z.infer<typeof createChecklistSchema>;
export type GembaWalk = z.infer<typeof gembaWalkSchema>;
export type CreateGembaWalkDto = z.infer<typeof createGembaWalkSchema>; 