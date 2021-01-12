import "./buttonProperties";
import { Button as MaterialButton } from "@material-ui/core";
import { store } from "../../../lib/context";
import { game } from "../../../data/game";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { ButtonSettings } from "./ButtonSettings";
import { componentProperties } from "../../../data/componentProperties";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { customStyles } from "../../../data/customStyles";

const { styles } = componentProperties.Button;

export const Button = ({
  size,
  variant,
  color,
  text,
  onClickAction,
  actionContext,
}: any) => {
  const { refFn, componentClassName } = useSetupComponent();
  const style = useCustomStyle(styles.base, customStyles.button.style1);

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
  props: componentProperties.Button.default,
  related: {
    settings: ButtonSettings,
  },
};
