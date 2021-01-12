import { useNode } from "@craftjs/core";
import { Settings } from "../../Settings";
import { StringSetting } from "../../Settings";
import { game } from "../../../data/game";
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
    props: node.data.props,
  }));

  return (
    <Settings
      config={[
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

export const GridItemSettings = () => {
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
          property: "size",
          itemsFn: () => sizes,
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};
