import "./gridProperties";
import { Grid } from "@material-ui/core";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { componentProperties } from "../../../data/componentProperties";
import { GridSettings } from "./GridSettings";

const { styles } = componentProperties.Grid;

export const GridContainer = ({ children }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  return (
    <Grid container ref={refFn} className={componentClassName}>
      {children}
    </Grid>
  );
};

GridContainer.craft = {
  props: {},
  related: {
    settings: GridSettings,
  },
};
