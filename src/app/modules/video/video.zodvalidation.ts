import { z } from 'zod';

// Define the Zod schema for validating video data
export const createVideoSchema = z.object({
  url: z.string().url('Invalid URL format').nonempty('URL is required'), // Validate URL format
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters'), // Validate title length
  category: z
    .string()
    .min(1, 'Category is required')
    .max(50, 'Category must not exceed 50 characters'), // Validate category length
  isDeleted: z.boolean().default(false), // Optional field, default to false
});

// Define the TypeScript type from the Zod schema
export type CreateVideoInput = z.infer<typeof createVideoSchema>;
