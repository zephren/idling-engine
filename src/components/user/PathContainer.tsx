import {
  Container as MUIContainer,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useNode } from "@craftjs/core";
import { useHistory } from "react-router-dom";
import { Settings } from "../Settings";
import { StringSetting } from "../Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useSetupComponent } from "../../config/useSetupComponent";

export const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: "0em",
  },
}));

export const PathContainer = ({ path, children }: any) => {
  const history = useHistory();
  const classes = useStyles();

  const { refFn, enabled, componentClassName } = useSetupComponent({
    additionalClasses: [classes.main],
  });

  const visible = history.location.pathname.includes(path);

  return (
    <MUIContainer ref={refFn} className={componentClassName}>
      <div style={{ float: "right", height: "0em" }}>
        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </div>
      {enabled && (
        <div>
          {path} : {history.location.pathname}
        </div>
      )}
      {visible ? children : null}
    </MUIContainer>
  );
};

const PathContainerSettings = () => {
  const {
    actions: { setProp },
    ...properties
  } = useNode((node) => ({
    path: node.data.props.path,
  }));

  return (
    <Settings
      config={[{ type: StringSetting, property: "path" }]}
      properties={properties}
      setProp={setProp}
    />
  );
};

PathContainer.craft = {
  props: {
    path: "/tab1",
  },
  related: {
    settings: PathContainerSettings,
  },
};
