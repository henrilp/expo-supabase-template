import { StyleSheet } from "react-native";

import { TextboxColor } from "./colors";

import { bodyFont } from "~/assets/theme/font";

export const styles = StyleSheet.create({
  container: {
    borderColor: TextboxColor.container,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerFocused: {
    borderColor: TextboxColor.containerFocused,
  },

  containerMultiline: {
    alignItems: "flex-start",
    height: 150,
    paddingTop: 12,
  },
  containerSmall: {
    height: 41,
  },
  error: {
    color: TextboxColor.error,
    marginLeft: 10,
    marginTop: 6,
  },

  iconBig: {
    fontSize: 24,
  },

  iconBlack: {
    color: TextboxColor.icon.black,
  },
  iconContainer: {
    bottom: 5,
    height: 24,
    margin: 0,
    position: "absolute",
    right: 12,
    top: 16,
    width: 24,
  },
  icon: {
    marginRight: 16,
  },

  iconGrey: {
    color: TextboxColor.icon.grey,
  },
  input: {
    all: "unset", // to avoid browser style
    fontFamily: bodyFont,
    color: TextboxColor.input,
    flex: 1,
    paddingHorizontal: 15,
    paddingRight: 15 + 18,
  },
  inputError: {
    color: TextboxColor.inputError,
  },
  inputMultiline: {
    textAlignVertical: "top",
  },
  label: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "700",
  },

  wrapper: {
    alignItems: "flex-start",
    marginBottom: 24,
  },

  wrapperFit: {
    width: "100%",
  },
});
