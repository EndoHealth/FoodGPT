import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const insertEmailToSupabase = async (email: string) => {
	const { data, error } = await supabase
		.from('food_gpt_email')
		.insert([{ email: email }])
		.select();
	if (error) {
		console.log(error);
	}
};
