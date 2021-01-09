import "./containerProperties";
import { Container as MUIContainer } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { componentProperties } from "../../../data/componentProperties";
import { ContainerSettings } from "./ContainerSettings";

const { styles } = componentProperties.Container;

export const Container = ({ children }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  return (
    <MUIContainer
      ref={refFn}
      style={styles.base}
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
