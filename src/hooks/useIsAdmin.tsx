
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Returns true if the logged in user is an admin according to the userAccount table.
 */
export function useIsAdmin(): boolean | null {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user || loading) {
      setIsAdmin(null);
      return;
    }

    let cancelled = false;
    // Supabase auth user id is a string (uuid); your userAccount.user_id is a bigint → string, so must match types
    supabase
      .from("userAccount")
      .select("is_admin")
      .eq("email", user.email)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data && data.is_admin === 1);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  return isAdmin;
}
