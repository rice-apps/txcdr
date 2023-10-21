import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(.{8,})$/;
export const IRegisterFormZodObject = z.object({
    firstName: z.string({ required_error: 'Name is required' }).min(1, "Name is required"),
    lastName: z.string({ required_error: 'Last name is required' }).min(1, "Last name is required"),
    email: z.string().email("Email is incorrect"),
    password: z.string()
        .refine(value => passwordRegex.test(value), {
            message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
        }),
    repeatPassword: z.string()
});

export const IRegisterFormResolver = zodResolver(IRegisterFormZodObject);