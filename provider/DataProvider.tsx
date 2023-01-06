import React, { createContext, useState } from "react";

import { supabase } from "../initSupabase";

import { treatError } from "~/lib/error";

export type DataContextProps = {
  nodes: Node[];
  isLoading: boolean;
  getNodes: () => void;
};

const DataContext = createContext<Partial<DataContextProps>>({});

interface Props {
  children: React.ReactNode;
}
// https://supabase.com/docs/guides/api#rest-api
const DataProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // data
  const [nodes, setNodes] = useState<Node[]>([]);

  const getNodes = async () => {
    setIsLoading(true);
    const { data: newNodes, error } = await supabase.from("nodes").select("*");
    setIsLoading(false);
    treatError(error);
    if (!error) {
      setNodes(newNodes);
    }
  };
  // const signUp = async (
  //   t: (key: string) => string,
  //   email: string,
  //   password: string
  // ) => {
  //   // By default, the user needs to verify their email address before logging in. To turn this off, disable Confirm email in your project.
  //   // Confirm email determines if users need to confirm their email address after signing up.

  //   // If Confirm email is enabled, a user is returned but session is null.
  //   // If Confirm email is disabled, both a user and a session are returned.
  //   console.log("signup");
  //   setIsLoading(true);
  //   const {
  //     data: { user, session: newSession },
  //     error,
  //   } = await supabase.auth.signUp({ email, password });
  //   setIsLoading(false);
  //   treatError(error);

  //   // put this logic in "callback" "authstatechanged" ?
  //   if (user && !error && !newSession) {
  //     alert(t("auth.verifyEmailLinkSent"));
  //   }
  // };

  return (
    <DataContext.Provider
      value={{
        nodes,
        isLoading,
        getNodes,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
