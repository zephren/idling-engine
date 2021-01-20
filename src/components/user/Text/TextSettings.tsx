import { useNode } from "@craftjs/core";
import { Settings, StyleSetting } from "../../Settings";

export const TextSettings = () => {
  const {
    actions: { setProp },
    componentName,
    props,
  } = useNode((node) => ({
    componentName: node.data.name,
    props: node.data.props,
  }));

  return (
    <Settings
      config={[
        {
          type: StyleSetting,
          property: "customStyleName",
          componentName,
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};
