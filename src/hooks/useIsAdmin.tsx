
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
    
    // Query by user id first
    const checkAdminStatus = async () => {
      try {
        // Try to get user by email
        const { data: emailData, error: emailError } = await supabase
          .from("userAccount")
          .select("is_admin")
          .eq("email", user.email)
          .maybeSingle();
          
        console.log("Admin status data from email lookup:", emailData);
        
        if (emailData) {
          const adminValue = Number(emailData.is_admin);
          console.log("adminValue after conversion:", adminValue, "isNaN:", isNaN(adminValue));
          setIsAdmin(adminValue === 1);
          return;
        }
        
        // Try lowercase email
        const lowercaseEmail = user.email?.toLowerCase();
        if (lowercaseEmail && lowercaseEmail !== user.email) {
          const { data: lowercaseData } = await supabase
            .from("userAccount")
            .select("is_admin")
            .eq("email", lowercaseEmail)
            .maybeSingle();
          
          console.log("Lowercase email data:", lowercaseData);
          if (lowercaseData) {
            const adminValue = Number(lowercaseData.is_admin);
            setIsAdmin(adminValue === 1);
            return;
          }
        }
        
        // Not found with either case, make one more attempt with different table case
        const { data: data2, error: error2 } = await supabase
          .from("useraccount") // Try with lowercase table name
          .select("is_admin")
          .eq("email", user.email)
          .maybeSingle();
          
        console.log("Trying lowercase table name 'useraccount':", data2);
        
        if (data2) {
          const adminValue = Number(data2.is_admin);
          setIsAdmin(adminValue === 1);
          return;
        }
        
        // If we get here, no admin record was found
        console.log("No admin record found for user", user.email);
        setIsAdmin(false);
        
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
    
    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  console.log("useIsAdmin hook returning:", isAdmin);
  return isAdmin;
}
