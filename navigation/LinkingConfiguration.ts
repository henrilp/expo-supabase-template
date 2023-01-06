/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { AuthStackParamList, MainStackParamList } from "./navTypes";

// routing

const linking: LinkingOptions<AuthStackParamList | MainStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Login: "login",
      Register: "register",
      ForgotPassword: "reset-password",

      MainTab: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
          Settings: "settings",
        },
      },
      Modal: "modal",
      NotFound: "*",
      UpdatePassword: "update-password",
    },
  },
};

export default linking;
