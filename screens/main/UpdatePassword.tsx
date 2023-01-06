import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "~/components/Themed";
import { CTAButton } from "~/components/UI/CTAButton";
import { Textbox } from "~/components/UI/Textbox";
import { MainStackParamList } from "~/navigation/navTypes";
import { AuthContext, AuthContextProps } from "~/provider/AuthProvider";

// needs to be "connected" (the reset link gives a session)
export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "UpdatePassword">) {
  // after clicking email link, arriving should look like this :

  // /update-password#
  // access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjcyODU4ODQyLCJzdWIiOiJmNDQyMTJlMy05N2Y2LTQyM2ItOTE0NC1mY2NlZTY4YmExMWMiLCJlbWFpbCI6ImhlbnJpbGVwYWdlQGhvdG1haWwuZnIiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE2NzI4NTUyNDJ9XSwic2Vzc2lvbl9pZCI6ImMwNjM3MGE4LTY4ZjctNDVjZi04NzQ0LTAwOGJjY2Q4YTA0NyJ9.nAi5ZhJlZ8HW_UQ69y2wqUCU2ZGgyfFEuPPbxgep6ZA
  // &expires_in=3600
  // &refresh_token=Xbb-M7JPu1_u-4bi44jWXA
  // &token_type=bearer
  // &type=recovery

  // we should do a "setSession" with the access_token and refresh_token in order to auth.updateUser({password: "newPassword"}})
  // https://supabase.com/docs/reference/javascript/auth-setsession
  // https://reactnavigation.org/docs/configuring-links#passing-params
  const { t } = useTranslation();
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  // type casting because context will be null at the beginning
  const { updatePassword, isLoading, signOut } = useContext(
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
            {t("auth.updatePassword")}
          </Text>

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
            text={isLoading ? t("common.loading") : t("auth.updatePassword")}
            onPress={() => {
              if (password !== password2) {
                alert(t("auth.passwordsDontMatch"));
                return;
              }
              updatePassword(t, password, navigation);
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
              {t("auth.alreadyHaveAnAccountQuestion")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                signOut(); // signout will redirect to Login
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
