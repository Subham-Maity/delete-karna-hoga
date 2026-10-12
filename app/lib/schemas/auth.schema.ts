import { email, z } from "zod";

export const registerSchema = z.object({
    email : z.string()
    .trim()
    .toLowerCase()
    .email('Invalid email address'),

    password : z.string()
    .min(4,"Password must be atleast 4 charachters")
    .max(12,"Password must be atleast 12 charachters")
})

export type RegisterInput = z.infer<typeof registerSchema>;