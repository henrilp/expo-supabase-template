/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import { AuthNavigator } from "./AuthStack";
import LinkingConfiguration from "./LinkingConfiguration";
import { MainNavigator } from "./MainStack";

import { AuthContext, AuthContextProps } from "~/provider/AuthProvider";
import Loading from "~/screens/Loading";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { session } = React.useContext(AuthContext) as AuthContextProps;

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {session == false ? (
        <Loading />
      ) : session === null ? (
        <AuthNavigator />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
}
