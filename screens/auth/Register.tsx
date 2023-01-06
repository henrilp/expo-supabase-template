import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { GoogleLogin } from "~/components/GoogleLogin";
import { Text, View } from "~/components/Themed";
import { CTAButton } from "~/components/UI/CTAButton";
import { Textbox } from "~/components/UI/Textbox";
import { AuthStackParamList } from "~/navigation/navTypes";
import { AuthContext, AuthContextProps } from "~/provider/AuthProvider";

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  // type casting because context will be null at the beginning
  const { signUp, isLoading } = useContext(AuthContext) as AuthContextProps;

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              padding: 30,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {t("auth.signUp")}
          </Text>
          <Textbox
            label={t("auth.email")}
            style={{ marginTop: 15 }}
            placeholder={t("auth.emailPlaceholder") || ""}
            value={email}
            autoCapitalize="none"
            // autoCompleteType="off"
            autoCorrect={false}
            keyboardType="email-address"
            onInput={(text) => setEmail(text)}
          />

          <Textbox
            label={t("auth.password")}
            style={{ marginTop: 15 }}
            placeholder={t("auth.passwordPlaceholder") || ""}
            value={password}
            autoCapitalize="none"
            // autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry
            onInput={(text) => setPassword(text)}
            isPassword
          />
          <Textbox
            label={t("auth.confirmPassword")}
            style={{ marginTop: 15 }}
            placeholder={t("auth.passwordPlaceholder") || ""}
            value={password2}
            autoCapitalize="none"
            // autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry
            onInput={(text) => setPassword2(text)}
            isPassword
          />
          <CTAButton
            text={isLoading ? t("common.loading") : t("auth.signUp")}
            onPress={() => {
              if (password !== password2) {
                alert(t("auth.passwordsDontMatch"));
                return;
              }
              signUp(t, email, password);
            }}
            style={{
              marginTop: 20,
            }}
            disabled={isLoading}
          />
          <GoogleLogin style={{ marginTop: 16 }} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>
              {t("auth.alreadyHaveAnAccountQuestion")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {t("auth.signIn")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
