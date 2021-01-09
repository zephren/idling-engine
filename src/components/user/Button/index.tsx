import "./buttonProperties";
import { Button as MaterialButton } from "@material-ui/core";
import { store } from "../../../lib/context";
import { game } from "../../../data/game";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { ButtonSettings } from "./ButtonSettings";
import { componentProperties } from "../../../data/componentProperties";

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

  return (
    <MaterialButton
      style={styles.base}
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
