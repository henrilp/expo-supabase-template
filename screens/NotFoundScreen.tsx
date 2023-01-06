import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "~/components/Themed";
import { MainStackScreenProps } from "~/navigation/navTypes";

export default function NotFoundScreen({
  navigation,
}: MainStackScreenProps<"NotFound">) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("notFound.title")}</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("MainTab")}
        style={styles.link}
      >
        <Text style={styles.linkText}>{t("notFound.link")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
