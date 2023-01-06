import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";

import { View } from "./Themed";

import { AuthContext, AuthContextProps } from "~/provider/AuthProvider";

export const GoogleLogin = ({ style }: { style?: any }) => {
  const { signinWithGoogle } = useContext(AuthContext) as AuthContextProps;
  return (
    <View style={style}>
      <FontAwesome.Button
        // https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth
        name="google"
        backgroundColor="#DC4935"
        onPress={signinWithGoogle}
      >
        Google
      </FontAwesome.Button>
    </View>
  );
};
