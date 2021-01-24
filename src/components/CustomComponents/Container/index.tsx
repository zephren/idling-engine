import { Container as MUIContainer } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { checkVisibility } from "../../../lib/checkVisibility";
import { ContainerSettings } from "./ContainerSettings";

export const Container = ({ children, visibilitySource }: any) => {
  const { refFn, componentClassName, enabled } = useSetupComponent();

  const extraStyle = checkVisibility(visibilitySource, enabled);

  if (!extraStyle) {
    return null;
  }

  return (
    <MUIContainer
      ref={refFn}
      style={{ ...Container.baseStyle, ...extraStyle }}
      className={componentClassName}
    >
      {children}
    </MUIContainer>
  );
};

Container.craft = {
  props: {
    padding: "0px",
  },
  related: {
    settings: ContainerSettings,
  },
};

Container.baseStyle = {
  padding: "0em",
};
