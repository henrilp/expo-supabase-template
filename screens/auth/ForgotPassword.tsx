import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "~/components/Themed";
import { CTAButton } from "~/components/UI/CTAButton";
import { Textbox } from "~/components/UI/Textbox";
import { supabase } from "~/initSupabase";
import { AuthStackParamList } from "~/navigation/navTypes";
import { AuthContext, AuthContextProps } from "~/provider/AuthProvider";

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "ForgotPassword">) {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const { resetPassword, isLoading } = useContext(
    AuthContext
  ) as AuthContextProps;

  // callback from successful password update
  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigation.navigate("UpdatePassword");
      }
    });
    return () => listener.unsubscribe?.();
  }, []);

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
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {t("auth.forgotPassword")}
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
          <CTAButton
            text={isLoading ? t("common.loading") : t("auth.sendEmail")}
            onPress={() => {
              resetPassword(t, email);
            }}
            style={{
              marginTop: 20,
            }}
            disabled={isLoading}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>
              {" "}
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
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {t("auth.signIn")}
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
