import {
  Container as MUIContainer,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useNode, useEditor } from "@craftjs/core";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../lib/context";
import { Settings } from "../Settings";
import { StringSetting } from "../Settings/SettingTypes";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { componentClass, useSharedStyles } from "../../config/sharedStyle";

export const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: "0em",
  },
}));

export const PathContainer = ({ path, children }: any) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const history = useHistory();
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  useContext(Context);

  const visible = history.location.pathname.includes(path);

  return (
    <MUIContainer
      ref={(ref: any) => connect(drag(ref))}
      className={componentClass(enabled, selected, sharedClasses, [
        classes.main,
      ])}
    >
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
