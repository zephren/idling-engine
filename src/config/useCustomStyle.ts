import { useState } from "react";

export function useCustomStyle(
  base: any,
  styleGroup: any,
  customStyleName: string
) {
  const [style, setStyle] = useState(null as any);

  if (!styleGroup) {
    return base;
  }

  let customStyle = null;
  if (customStyleName) {
    customStyle = styleGroup[customStyleName];
  }

  // console.log(
  //   "style && customStyle.customId !== style.customId",
  //   style && customStyle.customId !== style.customId
  // );
  // console.log(customStyle);

  // Already have a style and the customId is different
  // Don't have a style and we have a custom style
  if (
    (style && customStyle && customStyle.customId !== style.customId) ||
    (!style && customStyle)
  ) {
    setStyle({
      ...base,
      ...customStyle,
    });
  }

  // If the customStyle is reset
  if (style && !customStyle) {
    setStyle(null);
  }

  // Return the base style if nothing else
  return style || base;
}
