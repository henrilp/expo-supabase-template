import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { setupI18n } from "./locales/i18n";
import Navigation from "./navigation";
import { AuthProvider } from "./provider/AuthProvider";

setupI18n();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AuthProvider>
    );
  }
}
