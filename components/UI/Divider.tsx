import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { Color } from "~/assets/theme/color";

interface Props {
  text?: string;
  styleContainer?: ViewStyle;
  color?: string;
}

export const Divider = ({ text, styleContainer, color }: Props) => {
  const dividerStyle = {
    flex: 1,
    height: 1,
    backgroundColor: color ?? Color.white,
  };
  return (
    <View style={{ ...styles.container, ...styleContainer }}>
      <View style={dividerStyle} />
      <View>{text && <Text style={styles.text}>{text}</Text>}</View>
      <View style={dividerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  text: { width: 50, textAlign: "center", color: Color.white },
});
