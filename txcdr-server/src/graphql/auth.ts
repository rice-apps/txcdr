import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPERBASE_URL!;
const supabaseKey = process.env.SUPERBASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type AuthTokenFunction = (token: string) => Promise<boolean>;
const authToken: AuthTokenFunction = async (token: string) => {
    const response = await supabase.auth.getUser(token);
    const user = response.data.user;
    
    // Check if the user is authenticated
    if (user != null && user.aud === 'authenticated') {
        return true;
    } else {
        return false;
    }
};

export { authToken };
export default supabase;