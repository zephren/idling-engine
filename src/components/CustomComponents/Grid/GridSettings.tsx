import { useNode } from "@craftjs/core";
import { game } from "../../../data/game";
import { Settings, StyleSetting } from "../../Settings";
import { DropdownSetting } from "../../Settings/DropdownSetting";

const sizes = [
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "6", value: 6 },
];

export const GridContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    componentName: node.data.name,
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

export const GridItemSettings = () => {
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
          property: "size",
          itemsFn: () => sizes,
        },
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
