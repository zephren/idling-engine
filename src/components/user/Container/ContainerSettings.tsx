import { useNode } from "@craftjs/core";
import { Settings } from "../../Settings";
import { StringSetting } from "../../Settings";
import { game } from "../../../data/game";
import { DropdownSetting } from "../../Settings/DropdownSetting";

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return null;

  // return (
  //   <Settings
  //     config={[
  //       {
  //         type: DropdownSetting,
  //         property: "onClickAction",
  //         itemsFn: () => Object.keys(game.actions),
  //       },
  //       {
  //         type: StringSetting,
  //         property: "text",
  //       },
  //     ]}
  //     properties={props}
  //     setProp={setProp}
  //   />
  // );
};
