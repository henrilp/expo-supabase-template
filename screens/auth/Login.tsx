import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
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
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn, isLoading } = React.useContext(
    AuthContext
  ) as AuthContextProps;

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
            {t("auth.signIn")}
          </Text>
          <Textbox
            label={t("auth.email")}
            style={{ marginTop: 15 }}
            placeholder={t("auth.emailPlaceholder") as string}
            value={email}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            onInput={(text) => setEmail(text)}
          />

          <Textbox
            label={t("auth.password")}
            style={{ marginTop: 15 }}
            placeholder={t("auth.passwordPlaceholder") as string}
            value={password}
            autoCapitalize="none"
            isPassword
            //autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry
            onInput={(text) => setPassword(text)}
          />
          <CTAButton
            text={isLoading ? t("common.loading") : t("common.continue")}
            onPress={() => {
              signIn(email, password);
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
              {t("auth.dontHaveAnAccountQuestion")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {t("auth.signUp")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {t("auth.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                isDarkmode ? setTheme("light") : setTheme("dark");
              }}
            >
              <Text
                size="md"
                fontWeight="bold"
                style={{
                  marginLeft: 5,
                }}
              >
                {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
