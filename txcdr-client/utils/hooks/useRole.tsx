import { useEffect, useState } from "react";
import { Tables } from "../../types/supabase";
import { supabase } from "../supabase";

/**
 *
 * @returns 2 element array: user's role (string) and loading status (boolean)
 */
export function useRole() {
  const [role, setRole] = useState<Tables<"User2">["role"]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const authRes = await supabase.auth.getUser();
      if (!authRes.error) {
        const user = await supabase
          .from("User2")
          .select("role")
          .eq("id", authRes.data.user.id)
          .maybeSingle();
        setRole(user.data?.role);
        setLoading(false);
      }
    };

    func();
  }, []);

  return [role, loading];
}
