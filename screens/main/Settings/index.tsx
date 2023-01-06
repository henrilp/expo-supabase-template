import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import Button from "./Button";

import { Icon, View } from "~/components/Themed";
import { MainTabScreenProps } from "~/navigation/navTypes";
import { AuthContext } from "~/provider/AuthProvider";

export default function Settings({
  navigation,
}: MainTabScreenProps<"Settings">) {
  const { t } = useTranslation();
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button
        Icon={(props) => <Icon name="sign-out" {...props} />}
        onPress={signOut}
        text={t("settings.logOut")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
