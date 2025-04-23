
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
    
    // Log to debug
    console.log("Checking admin status for user:", user.id, user.email);
    
    // First let's try to query by email
    supabase
      .from("userAccount")
      .select("is_admin")
      .eq("email", user.email)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        
        if (error) {
          console.error("Error checking admin status by email:", error);
          
          // If email lookup fails, try with lowercase email as a fallback
          const lowercaseEmail = user.email?.toLowerCase();
          if (lowercaseEmail && lowercaseEmail !== user.email) {
            console.log("Trying with lowercase email:", lowercaseEmail);
            
            supabase
              .from("userAccount")
              .select("is_admin")
              .eq("email", lowercaseEmail)
              .maybeSingle()
              .then(({ data: lowercaseData, error: lowercaseError }) => {
                if (cancelled) return;
                
                if (lowercaseError) {
                  console.error("Error checking admin status with lowercase email:", lowercaseError);
                  setIsAdmin(false);
                  return;
                }
                
                console.log("Admin status data (lowercase email):", lowercaseData);
                setIsAdmin(!!lowercaseData && lowercaseData.is_admin === 1);
              });
          } else {
            setIsAdmin(false);
          }
          return;
        }
        
        console.log("Admin status data from email lookup:", data);
        
        if (data) {
          // Log the exact value and type of is_admin for debugging
          console.log("is_admin value:", data.is_admin, "type:", typeof data.is_admin);
          setIsAdmin(data.is_admin === 1);
        } else {
          console.log("No data found for email:", user.email);
          setIsAdmin(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  // Log the result value that we're returning
  console.log("useIsAdmin hook returning:", isAdmin);
  return isAdmin;
}
