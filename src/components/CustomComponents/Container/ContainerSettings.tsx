import { useNode } from "@craftjs/core";
import { Settings } from "../../Settings";
import { game } from "../../../data/game";
import { DropdownSetting } from "../../Settings/DropdownSetting";

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <Settings
      config={[
        {
          type: DropdownSetting,
          property: "visibilitySource",
          itemsFn: () => Object.keys(game.visibilitySources),
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};
