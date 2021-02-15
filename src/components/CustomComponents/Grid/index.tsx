import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { GridContainerSettings, GridItemSettings } from "./GridSettings";
import { customStyles } from "../../../data/customStyles";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { StringSetting } from "../../../core";
import { checkVisibility } from "../../../lib/checkVisibility";
import { GridContainerDocumentation } from "./GridContainerDocumentation";
import { GridItemDocumentation } from "./GridItemDocumentation";
import { documentation } from "../../../data/documentation";
import { pluginRegistry } from "../../../lib/PluginRegistry";
import { Element } from "@craftjs/core";
import { Text } from "../Text";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export const GridContainer = ({ children, visibilitySource }: any) => {
  const classes = useStyles();
  const { refFn, componentClassName, enabled } = useSetupComponent({
    additionalClasses: [classes.root],
  });

  const extraStyle = checkVisibility(visibilitySource, enabled);

  if (!extraStyle) {
    return null;
  }

  return (
    <Grid
      container
      ref={refFn}
      className={componentClassName}
      style={extraStyle}
      spacing={2}
    >
      {children}
    </Grid>
  );
};

GridContainer.componentName = "GridContiainer";

GridContainer.craft = {
  props: {},
  related: {
    settings: GridContainerSettings,
  },
};

export const GridItem = ({
  children,
  size,
  visibilitySource,
  customStyleName,
}: any) => {
  const { refFn, componentClassName, enabled } = useSetupComponent();

  const style = useCustomStyle(
    GridItem.baseStyle,
    customStyles.GridItem,
    customStyleName
  );

  const extraStyle = checkVisibility(visibilitySource, enabled);

  if (!extraStyle) {
    return null;
  }

  return (
    <Grid
      item
      xs={size}
      ref={refFn}
      className={componentClassName}
      style={extraStyle}
    >
      <Paper style={style}>{children}</Paper>
    </Grid>
  );
};

GridItem.componentName = "GridItem";

GridItem.craft = {
  props: { size: 6 },
  related: {
    settings: GridItemSettings,
  },
};

GridItem.baseStyle = {
  padding: "0em",
  height: "100%",
};

GridItem.styleProperties = [
  {
    property: "padding",
    type: StringSetting,
  },
];

GridContainer.documentation = GridContainerDocumentation;
GridItem.documentation = GridItemDocumentation;

documentation.addComponent(GridContainer);
documentation.addComponent(GridItem);

GridContainer.toolboxItem = (connectors: any) => {
  return {
    name: "GridContainer",
    component: GridContainer,
    ref: (ref: any) =>
      connectors.create(
        ref,
        <Element is={GridContainer} canvas>
          <Element is={GridItem} canvas>
            <Text text="Grid Item" />
          </Element>
          <Element is={GridItem} canvas>
            <Text text="Grid Item" />
          </Element>
        </Element>
      ),
  };
};

pluginRegistry.registerCustomComponent(GridContainer);

GridItem.toolboxItem = (connectors: any) => {
  return {
    name: "GridItem",
    component: GridItem,
    ref: (ref: any) =>
      connectors.create(
        ref,
        <Element is={GridItem} canvas>
          <Text text="Grid Item" />
        </Element>
      ),
  };
};

pluginRegistry.registerCustomComponent(GridItem);
