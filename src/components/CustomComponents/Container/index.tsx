import { Element } from "@craftjs/core";
import { Container as MUIContainer } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { registerCustomComponent } from "../../../data/components";
import { documentation } from "../../../data/documentation";
import { checkVisibility } from "../../../lib/checkVisibility";
import { Text } from "../Text";
import { ContainerDocumentation } from "./ContainerDocumentation";
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

Container.componentName = "Container";

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

Container.documentation = ContainerDocumentation;

Container.toolboxItem = (connectors: any) => {
  return {
    name: "Container",
    component: Container,
    ref: (ref: any) =>
      connectors.create(
        ref,
        <Element is={Container} canvas>
          <Text text="Container" />
        </Element>
      ),
  };
};

registerCustomComponent(Container);
