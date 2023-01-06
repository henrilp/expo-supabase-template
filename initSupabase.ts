import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

if (
  !Constants.expoConfig?.extra?.supabaseUrl ||
  !Constants.expoConfig?.extra?.supabaseKey
) {
  throw new Error("Missing Supabase URL or Key");
}

const options = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};
export const supabase = createClient(
  Constants.expoConfig?.extra?.supabaseUrl,
  Constants.expoConfig?.extra?.supabaseKey,
  options
);
