import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtcutjksipkorbecoevo.supabase.co';
const supabaseKey = 'sb_publishable_mmes49ZjzanfROERQXri8g_ZScR_Q1s';

export const supabase = createClient(supabaseUrl, supabaseKey);