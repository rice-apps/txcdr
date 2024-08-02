import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export function useUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    supabase.auth.getUser().then((authRes) => {
      if (!authRes.error) {
        setUser(authRes.data.user);
      }
    });
  }, []);

  return user;
}
