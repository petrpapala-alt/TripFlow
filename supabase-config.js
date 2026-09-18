/*
  TripFlow - konfigurace Supabase.
  Vložte pouze Project URL a Publishable/anon key.
  NIKDY sem nevkládejte service_role key.
*/
window.TRIPFLOW_SUPABASE_URL = "SEM_VLOZTE_PROJECT_URL";
window.TRIPFLOW_SUPABASE_ANON_KEY = "SEM_VLOZTE_PUBLISHABLE_KEY";

window.tripflowSupabase = null;

if (
  window.supabase &&
  window.TRIPFLOW_SUPABASE_URL &&
  window.TRIPFLOW_SUPABASE_ANON_KEY &&
  !window.TRIPFLOW_SUPABASE_URL.startsWith("SEM_") &&
  !window.TRIPFLOW_SUPABASE_ANON_KEY.startsWith("SEM_")
) {
  window.tripflowSupabase = window.supabase.createClient(
    window.TRIPFLOW_SUPABASE_URL,
    window.TRIPFLOW_SUPABASE_ANON_KEY
  );
}
