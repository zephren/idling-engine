import { useNode } from "@craftjs/core";
import { Settings, StringSetting, StyleSetting } from "../../Settings";

export const VariableTextSettings = () => {
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
        {
          type: StringSetting,
          property: "dataProperty",
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};
