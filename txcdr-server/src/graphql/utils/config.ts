import 'dotenv/config';

// Put env vars in txcdr-server/.env
export const supabaseUrl = process.env.SUPERBASE_URL ?? 'NO URL';
export const supabaseKey = process.env.SUPERBASE_KEY ?? 'NO KEY';