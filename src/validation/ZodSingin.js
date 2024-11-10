
import { z } from "zod";
export const ZodSingInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(5)
})