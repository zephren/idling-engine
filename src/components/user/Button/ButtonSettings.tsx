import { useNode } from "@craftjs/core";
import { Settings, StyleSetting } from "../../Settings";
import { StringSetting } from "../../Settings";
import { game } from "../../../data/game";
import { DropdownSetting } from "../../Settings/DropdownSetting";

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
    componentName,
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
          type: DropdownSetting,
          property: "onClickAction",
          itemsFn: () => Object.keys(game.actions),
        },
        {
          type: StringSetting,
          property: "text",
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};
