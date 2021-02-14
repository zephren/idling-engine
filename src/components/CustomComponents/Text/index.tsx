import { useCustomStyle } from "../../../config/useCustomStyle";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { customStyles } from "../../../data/customStyles";
import { TextSettings } from "./TextSettings";
import { StringSetting } from "../../../core";
import { TextDocumentation } from "./TextDocumentation";
import { registerCustomComponent } from "../../../data/components";

export const Text = ({ text, customStyleName }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  const style = useCustomStyle(
    Text.baseStyle,
    customStyles.Text,
    customStyleName
  );

  return (
    <span ref={refFn} className={componentClassName} style={style}>
      {text}
    </span>
  );
};

Text.componentName = "Text";

Text.craft = {
  props: {
    text: "Text",
  },
  rules: {
    canDrag: (node: any) => true,
  },
  related: {
    settings: TextSettings,
  },
};

Text.baseStyle = {
  margin: "0em",
};

Text.styleProperties = [
  {
    property: "fontSize",
    type: StringSetting,
  },
];

Text.documentation = TextDocumentation;

Text.toolboxItem = (connectors: any) => {
  return {
    name: "Text",
    component: Text,
    ref: (ref: any) => connectors.create(ref, <Text text="Some text" />),
  };
};

registerCustomComponent(Text);
