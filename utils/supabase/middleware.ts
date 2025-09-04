
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (request: NextRequest) => {
  const supabase = createSupabaseClient(
    supabaseUrl!,
    supabaseKey!,
  );

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return { supabase, response };
};

