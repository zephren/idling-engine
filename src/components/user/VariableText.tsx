import { useNode } from "@craftjs/core";
import { useContext } from "react";
import { Context } from "../../lib/context";
import { game } from "../../lib/game";
import { Settings } from "../Settings";
import { StringSetting } from "../Settings/SettingTypes";
import { SliderSetting } from "../Settings/SliderSetting";

export const VariableText = ({ dataProperty, fontSize }: any) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  useContext(Context);

  return (
    <span ref={(ref) => connect(drag(ref))} style={{ fontSize }}>
      {game.data[dataProperty] ?? "##NO VALUE##"}
    </span>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    ...properties
  } = useNode((node) => ({
    dataProperty: node.data.props.dataProperty,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <Settings
      config={[
        { type: StringSetting, property: "dataProperty" },
        { type: SliderSetting, property: "fontSize", min: 1, max: 50, step: 7 },
      ]}
      properties={properties}
      setProp={setProp}
    />
  );
};

VariableText.craft = {
  props: {
    fontSize: 20,
  },
  rules: {
    canDrag: (node: any) => true,
  },
  related: {
    settings: TextSettings,
  },
};
