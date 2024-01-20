import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabaseUrl = process.env.SUPERBASE_URL!;
const supabaseKey = process.env.SUPERBASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type AuthTokenFunction = (token: string) => Promise<boolean>;
const authToken: AuthTokenFunction = async (token: string) => {
    const response = await supabase.auth.getUser(token);
    const user = response.data.user;

    const dbUser = await prisma.user.findUnique({ where: { email: user?.email } });
    
    // Check if the user is authenticated
    if (user != null && user.aud === 'authenticated') {
        const lastSignInTime = new Date(user?.last_sign_in_at!).getTime();
        const currentTime = new Date().getTime();
        const logginTimeHoursInMs = 12 * 60 * 60 * 1000;

        if (currentTime - lastSignInTime <= logginTimeHoursInMs && dbUser?.isAuth) {
            return true;
        }

        return false;
    } else {
        return false;
    }
};

export { authToken };
export default supabase;