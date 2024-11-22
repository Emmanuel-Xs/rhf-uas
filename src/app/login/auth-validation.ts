import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(2, "2 or more char").email(),
  password: z.string().trim().min(8, "min char is 8"),
});