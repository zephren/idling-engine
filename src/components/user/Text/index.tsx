import ContentEditable from "react-contenteditable";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { customStyles } from "../../../data/customStyles";
import { TextSettings } from "./TextSettings";
import { StringSetting } from "../../Settings";

export const Text = ({ text, customStyleName }: any) => {
  const { refFn, selected, componentClassName } = useSetupComponent();

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
