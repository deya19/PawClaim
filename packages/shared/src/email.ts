import { z } from "zod";

/** A trimmed, lower-cased email address. Validate every external email input with this. */
export const EmailSchema = z.string().trim().toLowerCase().pipe(z.email());

export type Email = z.infer<typeof EmailSchema>;
