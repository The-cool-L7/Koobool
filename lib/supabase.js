import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://klaqoarttawlrpftzomo.supabase.co';
const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsYXFvYXJ0dGF3bHJwZnR6b21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyOTAyODYsImV4cCI6MTk4NDg2NjI4Nn0.WK33Dc6BgXiJOc0L8GdTZGiTtEDa1fmp731wTGTsRio';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
