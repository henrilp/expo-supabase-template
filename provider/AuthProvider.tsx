import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";

import { supabase } from "../initSupabase";

import { treatError } from "~/lib/error";
import { log } from "~/lib/log";

// henrilepage@hotmail.fr
// testtest

// localhost:19006/update-password#
// access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjcyODU4ODQyLCJzdWIiOiJmNDQyMTJlMy05N2Y2LTQyM2ItOTE0NC1mY2NlZTY4YmExMWMiLCJlbWFpbCI6ImhlbnJpbGVwYWdlQGhvdG1haWwuZnIiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE2NzI4NTUyNDJ9XSwic2Vzc2lvbl9pZCI6ImMwNjM3MGE4LTY4ZjctNDVjZi04NzQ0LTAwOGJjY2Q4YTA0NyJ9.nAi5ZhJlZ8HW_UQ69y2wqUCU2ZGgyfFEuPPbxgep6ZA
// &expires_in=3600
// &refresh_token=Xbb-M7JPu1_u-4bi44jWXA
// &token_type=bearer
// &type=recovery
export type AuthContextProps = {
  // SESSION WILL BE FALSE AT FIRST then null (payback from getSession) if not logged in
  // user is included in session.user when instantiated
  session: Session | null | false; // type comes from supabase
  isLoading: boolean;
  signUp: (t: (key: string) => string, email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signinWithGoogle: () => void;
  signOut: () => void;
  resetPassword: (t: (key: string) => string, email: string) => void;
  updatePassword: (
    t: (key: string) => string,
    password: string,
    navigation: any
  ) => void;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

interface Props {
  children: React.ReactNode;
}
// based on this, but api changed !
// https://github.com/codingki/react-native-expo-template/blob/master/template-typescript-bottom-tabs-supabase-auth-flow/src/provider/AuthProvider.tsx
// https://supabase.com/docs/reference/javascript/auth-onauthstatechange

const AuthProvider = (props: Props) => {
  const [session, setSession] = useState<Session | false | null>(false);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (
    t: (key: string) => string,
    email: string,
    password: string
  ) => {
    // By default, the user needs to verify their email address before logging in. To turn this off, disable Confirm email in your project.
    // Confirm email determines if users need to confirm their email address after signing up.

    // If Confirm email is enabled, a user is returned but session is null.
    // If Confirm email is disabled, both a user and a session are returned.
    console.log("signup");
    setIsLoading(true);
    const {
      data: { user, session: newSession },
      error,
    } = await supabase.auth.signUp({ email, password });
    setIsLoading(false);
    treatError(error);

    // put this logic in "callback" "authstatechanged" ?
    if (user && !error && !newSession) {
      alert(t("auth.verifyEmailLinkSent"));
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("signin");
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    treatError(error);
  };

  const signinWithGoogle = async () => {
    console.log("signin google");
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("== data");
    log(data);
    console.log("== error");
    log(error);
    setIsLoading(false);
    treatError(error);
  };

  const signOut = async () => {
    console.log("signout");
    setIsLoading(true);
    setSession(false);
    const { error } = await supabase.auth.signOut();
    setIsLoading(false);
    treatError(error);
  };

  const resetPassword = async (t: (key: string) => string, email: string) => {
    console.log("resetPassword");
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:19006/update-password",
    });
    setIsLoading(false);
    treatError(error);
    if (!error) {
      alert(t("auth.resetPasswordLinkSent"));
    }
  };

  const updatePassword = async (
    t: (key: string) => string,
    password: string,
    navigation: any
  ) => {
    console.log("updatePassword");
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);
    treatError(error);
    if (!error) {
      alert(t("auth.passwordUpdated"));
      // go to main
      navigation.navigate("MainTab");
    }
  };

  // listener on auth state changed, "callback" from all other functions
  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(`Supabase auth event: ${event}`);
      setSession(newSession);
      setIsLoading(false);
    });
    return () => listener.unsubscribe?.();
  }, []);

  // get session on mount
  useEffect(() => {
    console.log("get session on mount");
    // isLoading is initially true
    const getSession = async () => {
      const {
        data: { session: newSession },
      } = await supabase.auth.getSession();
      setSession(newSession);
      setIsLoading(false);
    };
    getSession();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signUp,
        signIn,
        signinWithGoogle,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
