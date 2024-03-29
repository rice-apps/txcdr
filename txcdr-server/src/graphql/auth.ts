import { $Enums, PrismaClient, User } from "@prisma/client";
import { AuthUser, createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./config.js";

const prisma = new PrismaClient();
const supabase = createClient(supabaseUrl, supabaseKey);

type AuthResultWithRole = {
  isAuthenticated: boolean;
  role: $Enums.Role | null;
};

type AuthTokenFunction = (token: string) => Promise<boolean>;
type AuthTokenWithRoleFunction = (token: string) => Promise<AuthResultWithRole>;
type BaseAuthVerificationFunction = (
  dbUser: User | null,
  user: AuthUser | null,
) => boolean;

const getSupabaseAndDbUser = async (token: string) => {
  const response = await supabase.auth.getUser(token);
  const user = response.data.user;


    if (!user?.email) {
        return {
            dbUser: null, 
            user: null
        };
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user?.email } });
    return {
        dbUser: dbUser, 
        user: user
    };
};

const baseAuthVerification: BaseAuthVerificationFunction = (dbUser: User | null, user: AuthUser | null) => {
  if (user != null && user.aud === 'authenticated' && dbUser) {
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

const authenticate: AuthTokenFunction = async (token: string) => {
  const { dbUser, user } = await getSupabaseAndDbUser(token);

  // Check if the user is authenticated
  return baseAuthVerification(dbUser, user);
};

const authenticateWithRole: AuthTokenWithRoleFunction = async (
  token: string,
) => {
  const { dbUser, user } = await getSupabaseAndDbUser(token);

  // Check if the user is authenticated
  const authResult = baseAuthVerification(dbUser, user);
  return {
    isAuthenticated: authResult as boolean,
    role: dbUser?.role as $Enums.Role | null,
  } as AuthResultWithRole;
};

export { authenticate, authenticateWithRole };
export default supabase;
