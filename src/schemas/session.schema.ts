import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  fingerprint: z.string(),
  createdAt: z.coerce.date(),
});

export type Session = z.infer<typeof sessionSchema>;

export const sessionsSchema = z.array(sessionSchema);

export type Sessions = z.infer<typeof sessionsSchema>;