const SUPABASE_URL = "https://shwcetghfyabdrxsolok.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_nc09-f1cxsE6aZhGrD_A3A_wb-FsUsj";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
