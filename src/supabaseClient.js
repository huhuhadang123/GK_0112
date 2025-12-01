import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sojstclgzqtoivgyniqz.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvanN0Y2xnenF0b2l2Z3luaXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODI3NTQsImV4cCI6MjA3NzM1ODc1NH0.0v1tQUe-e4KmF5RKbrahLer5JAzQvGtkJNo1nRHVALM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
