import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { Color } from "~/assets/theme/color";
import { Text, useThemeColor, View } from "~/components/Themed";
import useColorScheme from "~/hooks/useColorScheme";

interface Props {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  Icon?: React.ElementType;
  iconProps?: any;
  useGradient?: boolean;
}

/**
 * A CTA button
 */
export const CTAButton = ({
  text,
  onPress,
  backgroundColor,
  textColor,
  style,
  disabled,
  Icon,
  iconProps,
  useGradient,
}: Props) => {
  const Content = () => (
    <>
      <View style={styles.icon}>
        {Icon && (
          <Icon
            {...iconProps}
            color={useGradient ? Color.white : iconProps?.color}
          />
        )}
      </View>
      <Text
        style={{
          ...styles.text,
          ...(useGradient && { color: Color.white }),
          ...(textColor && { color: textColor }),
          ...(disabled && styles.disabledText),
        }}
      >
        {text}
      </Text>
    </>
  );
  const containerStyle: ViewStyle = {
    // look priority on style
    ...styles.container,
    ...style,
    ...(backgroundColor && { backgroundColor }),
    ...(disabled && styles.disabledContainer),
    ...(Icon && { flexDirection: "row" }),
  };
  // darkmode
  const theme = useColorScheme();
  const darkContainerStyle = {
    borderColor: useThemeColor({}, "buttonBorder"),
    borderWidth: 1,
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        /*!useGradient &&*/ ...containerStyle,
        ...(theme === "dark" && darkContainerStyle),
      }}
      onPress={() => !disabled && onPress()}
    >
      <Content />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  fillContainer: {
    height: "100%",
    width: "100%",
  },
  text: {
    //fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  disabledContainer: {
    backgroundColor: Color.lightGrey,
  },
  disabledText: {
    color: Color.darkGrey,
  },
  icon: { right: 16 },
});
