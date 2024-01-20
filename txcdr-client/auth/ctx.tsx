import React, { createContext, useContext } from "react";
import { useStorageState } from "./useStorageState";

/**
 * Base context for auth
 */
export const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
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
        signIn: () => {
          // Perform sign-in logic here
          console.log("signed in");
          setSession("xxx");
        },
        signOut: () => {
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
