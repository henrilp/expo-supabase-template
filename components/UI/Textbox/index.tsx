import React, { useMemo, useState } from "react";
import {
  Keyboard,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { TextboxColor } from "./colors";
import { styles } from "./style";

import { Icon, Text, useThemeColor, View } from "~/components/Themed";

export interface TextboxProps extends TextInputProps {
  customContainerStyles?: StyleProp<ViewStyle>;

  /** Label to show above the input */
  label?: string | null;

  /** Input placeholder */
  placeholder?: string;

  /** icon component to show */
  RightIcon?: (o: any) => JSX.Element;

  value?: string;

  /** Whether the value is a password */
  isPassword?: boolean;

  /** Whether the input should fit in the space */
  fit?: boolean;

  error?: string;

  onInput?: (value: string) => void;

  onFocus?: () => void;

  onBlur?: () => void;

  wrapperStyle?: StyleProp<ViewStyle>;

  /** if true, it will show a cross button (replacing existing icon) to clear text */
  clearable?: boolean;

  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";

  required?: boolean;

  leftComponent?: JSX.Element;
}

/**
 * Custom text input that can have Left and Right components
 * can be controlled by external ref
 * has callbacks on blur and focus
 */
export const Textbox = React.forwardRef(
  (textBoxProps: TextboxProps, ref: React.Ref<TextInput>) => {
    const {
      customContainerStyles,
      label,
      placeholder,
      RightIcon,
      value,
      isPassword,
      fit,
      error,
      onInput,
      onFocus,
      onBlur,
      wrapperStyle,
      clearable,
      required,
      keyboardType,
      leftComponent,
    } = textBoxProps;
    const localRef = React.useRef<TextInput>(null); // used to focus the input on pressing container
    const [isDirty, setIsDirty] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [focused, setFocused] = useState(false);

    const containerStyles = useMemo(
      () => [styles.container, focused && styles.containerFocused],
      [focused]
    );

    const inputStyles = useMemo(
      () => ({
        ...styles.input,
        ...(isDirty && error && value && styles.inputError),
      }),
      [isDirty, error, value]
    );
    const placeholderColor = useMemo(() => {
      return focused
        ? TextboxColor.placeholder.focused
        : TextboxColor.placeholder.default;
    }, [focused]);

    function localOnInput(text: any) {
      onInput?.(text);
    }
    // use local or external ref if provided
    const myRef = useMemo(() => ref || localRef, [ref, localRef]);
    // darkmode
    const color = useThemeColor({}, "text");
    return (
      <View style={[styles.wrapper, fit && styles.wrapperFit, wrapperStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TouchableOpacity
          // we use a TouchableOpacity wrapper in order to focus the TextInput
          // even when clicking on the border of the container
          activeOpacity={1}
          style={customContainerStyles ?? containerStyles}
          onPress={() => {
            //@ts-ignore
            myRef?.current?.focus();
          }}
        >
          {leftComponent}
          <TextInput
            ref={myRef}
            {...textBoxProps}
            // if "required", add a * to the label
            placeholder={!focused ? placeholder + (required ? "*" : "") : ""}
            placeholderTextColor={placeholderColor}
            style={{ ...inputStyles, color }}
            value={value || ""}
            secureTextEntry={isPassword && !passwordVisible}
            onChangeText={localOnInput}
            onFocus={() => {
              onFocus?.();
              setFocused(true);
            }}
            keyboardType={keyboardType}
            onBlur={() => {
              onBlur?.();
              setIsDirty(true);
              setFocused(false);
            }}
          />

          {clearable && value !== "" ? (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                localOnInput("");
              }}
              style={styles.icon}
            >
              <Icon name="times" />
            </TouchableOpacity>
          ) : RightIcon ? (
            <View style={styles.icon}>
              <RightIcon />
            </View>
          ) : null}

          {isPassword && (
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.iconContainer}
            >
              {passwordVisible ? (
                <Icon name="eye" size={16} />
              ) : (
                <Icon name="eye-slash" size={16} />
              )}
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {isDirty && value && error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);
