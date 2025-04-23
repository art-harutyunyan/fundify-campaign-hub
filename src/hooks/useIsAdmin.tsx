
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
    
    // Log to debug
    console.log("Checking admin status for:", user.email);
    
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
          return;
        }
        
        // Debug log to see what data is returned
        console.log("Admin status data:", data);
        
        // In Supabase, numeric 1 is often returned as a number
        setIsAdmin(!!data && data.is_admin === 1);
      });

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  return isAdmin;
}
