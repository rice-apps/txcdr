import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface ILoginForm {
    email: string;
    password: string;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(.{8,})$/;
export const ILoginFormZodObject = z.object({
    email: z.string().email("Email is incorrect"),
    password: z.string()
        .refine(value => passwordRegex.test(value), {
            message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
        })
});

export const ILoginFormResolver = zodResolver(ILoginFormZodObject);
