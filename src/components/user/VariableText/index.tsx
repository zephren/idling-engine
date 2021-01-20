import { useSetupComponent } from "../../../config/useSetupComponent";
import { game } from "../../../data/game";
import { StringSetting } from "../../Settings";
import { customStyles } from "../../../data/customStyles";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { VariableTextSettings } from "./VariableTextSettings";

export const VariableText = ({ dataProperty, customStyleName }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  const style = useCustomStyle(
    VariableText.baseStyle,
    customStyles.Text,
    customStyleName
  );

  return (
    <span ref={refFn} className={componentClassName} style={style}>
      {game.data[dataProperty] ?? "##NO VALUE##"}
    </span>
  );
};

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
