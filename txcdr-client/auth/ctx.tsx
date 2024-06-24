import React, { createContext, useContext } from "react";
import { useStorageState } from "./useStorageState";
import { Session } from "../types/auth";
import {
  CreateUserInput,
  LoginUserInput,
} from "../../txcdr-server/src/graphql/interfaces";
import { apolloClient } from "../graphql/client";
import { gql } from "@apollo/client";

/**
 * Base context for auth
 */
export const AuthContext = createContext<{
  signIn: (input: LoginUserInput) => Promise<string>;
  signOut: () => Promise<boolean>;
  signUp: (input: CreateUserInput) => Promise<number>;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: async () => "",
  signOut: async () => false,
  signUp: async () => -1,
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
        signIn: async (input: LoginUserInput) => {
          const LOGIN = gql`
            mutation Login($input: LoginUserInput!) {
              login(input: $input)
            }
          `;
          console.log("hello from login");

          return new Promise((resolve, reject) => {
            apolloClient
              .mutate({ mutation: LOGIN, variables: input })
              .then((res) => {
                // Null token indicates error
                if (!res["data"]["login"]) {
                  reject("Null token");
                }

                console.log(res);
                setSession({
                  email: input.input.email,
                  token: res["data"]["login"],
                });
                resolve(res["data"]["login"]);
              })
              .catch((e) => reject(e));
          });
        },
        signOut: async () => {
          console.log("signing out");
          console.log(session?.email, session?.token);
          setSession(null);
          return true;
        },
        signUp: async (input: CreateUserInput) => {
          const CREATE_USER = gql`
            mutation CreateUser($input: CreateUserInput!, $password: String!) {
              createUser(input: $input, password: $password) {
                id
                email
              }
            }
          `;
          return new Promise((resolve, reject) => {
            console.log("hello from sign up");
            apolloClient
              .mutate({
                mutation: CREATE_USER,
                variables: input,
              })
              .then((res) => {
                console.log("signup success");
                resolve(res["data"]["createUser"]["id"]);
              })
              .catch((e) => {
                console.log(e);
                reject(e);
              });
          });
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
