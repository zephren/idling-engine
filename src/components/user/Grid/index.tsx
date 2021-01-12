import "./gridProperties";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { componentProperties } from "../../../data/componentProperties";
import { GridContainerSettings, GridItemSettings } from "./GridSettings";

// const { styles } = componentProperties.Grid;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export const GridContainer = ({ children }: any) => {
  const classes = useStyles();
  const { refFn, componentClassName } = useSetupComponent({
    additionalClasses: [classes.root],
  });

  return (
    <Grid container ref={refFn} className={componentClassName} spacing={2}>
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

export const GridItem = ({ children, size }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  return (
    <Grid item xs={size} ref={refFn} className={componentClassName}>
      <Paper style={componentProperties.GridItem.styles.base}>{children}</Paper>
    </Grid>
  );
};

GridItem.craft = {
  props: componentProperties.GridItem.default,
  related: {
    settings: GridItemSettings,
  },
};
