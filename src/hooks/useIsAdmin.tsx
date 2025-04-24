
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
    
    console.log("Checking admin status for user:", user.id, user.email);
    
    // Query by user email
    supabase
      .from("userAccount")
      .select("is_admin")
      .eq("email", user.email)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        
        if (error) {
          console.error("Error checking admin status by email:", error);
          setIsAdmin(false);
          return;
        }
        
        console.log("Admin status data from email lookup:", data);
        
        if (data) {
          console.log("is_admin value:", data.is_admin, "type:", typeof data.is_admin);
          // Cast to number and compare with 1
          const adminValue = Number(data.is_admin);
          console.log("adminValue after conversion:", adminValue, "isNaN:", isNaN(adminValue));
          
          setIsAdmin(adminValue === 1);
        } else {
          console.log("No data found for email, trying lowercase email");
          
          // Try with lowercase email as fallback
          const lowercaseEmail = user.email?.toLowerCase();
          if (lowercaseEmail && lowercaseEmail !== user.email) {
            supabase
              .from("userAccount")
              .select("is_admin")
              .eq("email", lowercaseEmail)
              .maybeSingle()
              .then(({ data: lowercaseData, error: lowercaseError }) => {
                if (cancelled) return;
                
                if (lowercaseError) {
                  console.error("Error with lowercase email:", lowercaseError);
                  setIsAdmin(false);
                  return;
                }
                
                console.log("Lowercase email data:", lowercaseData);
                if (lowercaseData) {
                  const adminValue = Number(lowercaseData.is_admin);
                  setIsAdmin(adminValue === 1);
                } else {
                  setIsAdmin(false);
                }
              });
          } else {
            setIsAdmin(false);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  console.log("useIsAdmin hook returning:", isAdmin);
  return isAdmin;
}
