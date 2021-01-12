import { useNode } from "@craftjs/core";
import { useSetupComponent } from "../../config/useSetupComponent";
import { game } from "../../data/game";
import { Settings } from "../Settings";
import { StringSetting } from "../Settings";

export const VariableText = ({ dataProperty }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  return (
    <span ref={refFn} className={componentClassName}>
      {game.data[dataProperty] ?? "##NO VALUE##"}
    </span>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <Settings
      config={[{ type: StringSetting, property: "dataProperty" }]}
      properties={props}
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
