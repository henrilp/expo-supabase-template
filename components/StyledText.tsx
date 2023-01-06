import { Text, TextProps } from "./Themed";

import { bodyFont } from "~/assets/theme/font";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: bodyFont }]} />;
}
