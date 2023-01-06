import { StyleSheet } from "react-native";

import MyMapView from "~/components/MapView/MapView";
import { View } from "~/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <MyMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
