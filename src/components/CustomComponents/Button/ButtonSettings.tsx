import { useNode } from "@craftjs/core";
import {
  Settings,
  StyleSetting,
  StringSetting,
  DropdownSetting,
} from "../../../core";
import { game } from "../../../data/game";

export const ButtonSettings = () => {
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
