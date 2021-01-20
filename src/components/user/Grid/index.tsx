import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { GridContainerSettings, GridItemSettings } from "./GridSettings";
import { customStyles } from "../../../data/customStyles";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { StringSetting } from "../../Settings";
import { checkVisibility } from "../../../lib/checkVisibility";

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
