import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

import { Color } from "~/assets/theme/color";
import { Text, View } from "~/components/Themed";
import { Divider } from "~/components/UI/Divider";

interface Props {
  Icon: ({ weight, color, size, style, mirrored }: any) => JSX.Element;
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const Button = ({ Icon, text, onPress }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <View style={styles.textIcon}>
        <Icon style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
    <Divider color={Color.extraLightGrey} />
  </View>
);
export default Button;

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  touch: {
    paddingTop: 12,
    paddingBottom: 14,
  },
  icon: { marginRight: 16 },
  text: { fontSize: 14 },
  textIcon: { flexDirection: "row", alignItems: "center" },
});
