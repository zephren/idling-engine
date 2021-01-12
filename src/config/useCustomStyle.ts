import { useState } from "react";

export function useCustomStyle(base: any, customStyle: any) {
  const [style, setStyle] = useState(null as any);

  // console.log(
  //   "style && customStyle.customId !== style.customId",
  //   style && customStyle.customId !== style.customId
  // );
  // console.log(customStyle);

  // Already have a style and the customId is different
  // Don't have a style and we have a custom style
  if (
    (style && customStyle.customId !== style.customId) ||
    (!style && customStyle)
  ) {
    setStyle({
      ...base,
      ...customStyle,
    });
  }

  return style;
}
