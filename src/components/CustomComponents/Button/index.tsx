import { Button as MaterialButton } from "@material-ui/core";
import { store } from "../../../lib/context";
import { game } from "../../../data/game";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { ButtonSettings } from "./ButtonSettings";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { customStyles } from "../../../data/customStyles";
import { StringSetting } from "../../Settings";

export const Button = ({
  size,
  variant,
  color,
  text,
  onClickAction,
  actionContext,
  customStyleName,
}: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  const style = useCustomStyle(
    Button.baseStyle,
    customStyles.Button,
    customStyleName
  );

  return (
    <MaterialButton
      style={style}
      ref={refFn}
      className={componentClassName}
      size={size}
      variant={variant}
      color={color}
      onClick={() => {
        const action = game.actions[onClickAction];

        if (action) {
          action(actionContext);
          store.update();
        }
      }}
    >
      {text}
    </MaterialButton>
  );
};

Button.craft = {
  props: {
    size: "small",
    variant: "contained",
    color: "primary",
    text: "Button",
  },
  related: {
    settings: ButtonSettings,
  },
};

Button.baseStyle = {
  margin: "0em",
};

Button.styleProperties = [
  {
    property: "padding",
    type: StringSetting,
  },
];