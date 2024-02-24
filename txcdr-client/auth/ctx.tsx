import React, { createContext, useContext } from "react";
import { useStorageState } from "./useStorageState";
import { Session } from "../types/auth";

/**
 * Base context for auth
 */
export const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

/**
 * Returns the current session context
 * @returns Current session context
 */
export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

/**
 * Component that provides its children with access to useSession
 * @param props Children components
 * @returns Provider that gives children access to useSession
 */
export function AuthProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => {
          // Perform sign-in logic here
          console.log("signing in");
          setSession({
            email,
            token: "xxx",
          });
        },
        signOut: () => {
          console.log("signing out");
          console.log(session?.email, session?.token);
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
