import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Login from "../screens/auth/Login";
import { AuthStackParamList } from "./navTypes";

import ForgotPassword from "~/screens/auth/ForgotPassword";
import Register from "~/screens/auth/Register";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};
