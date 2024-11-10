
import { z } from "zod";
export const zodSignup = z.object({
    userName: z.string().min(5, 'Username must be at least 5 characters long'),
    email: z.string().email('Invalid email format').min(5),
    password: z.string().min(5, 'Password must be at least 5 characters long'),
});
