import { z } from 'zod';

export const zodPostschema = z.object({
  caption: z.string().min(3, { message: 'Caption must be at least 3 characters long' })
});
