import { useSetupComponent } from "../../../config/useSetupComponent";
import { game } from "../../../data/game";
import { StringSetting } from "../../../core";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { VariableTextSettings } from "./VariableTextSettings";
import { VariableTextDocumentation } from "./VariableTextDocumentation";
import { pluginRegistry } from "../../../lib/PluginRegistry";
import { data } from "../../../data/data";

export const VariableText = ({
  dataProperty,
  subProperty,
  customStyleName,
}: any) => {
  const { customStyles } = data.gameConfig;
  const { refFn, componentClassName } = useSetupComponent();

  const style = useCustomStyle(
    VariableText.baseStyle,
    customStyles.VariableText,
    customStyleName
  );

  let value = game.data[dataProperty];
  if (value && subProperty) {
    value = value[subProperty];
  }

  if (typeof value === "object") {
    value = undefined;
  }

  return (
    <span ref={refFn} className={componentClassName} style={style}>
      {value ?? "##NO VALUE##"}
    </span>
  );
};

VariableText.componentName = "VariableText";

VariableText.craft = {
  props: {},
  rules: {
    canDrag: (node: any) => true,
  },
  related: {
    settings: VariableTextSettings,
  },
};

VariableText.baseStyle = {
  margin: "0em",
};

VariableText.styleProperties = [
  {
    property: "fontSize",
    type: StringSetting,
  },
];

VariableText.documentation = VariableTextDocumentation;

VariableText.toolboxItem = (connectors: any) => {
  return {
    name: "VariableText",
    component: VariableText,
    ref: (ref: any) => connectors.create(ref, <VariableText />),
  };
};

pluginRegistry.registerCustomComponent(VariableText);
