import {
  Container as MUIContainer,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Element, useNode } from "@craftjs/core";
import { useHistory } from "react-router-dom";
import { Settings, StyleSetting, StringSetting } from "../../../core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { PathContainerDocumentation } from "./PathContainerDocumentation";
import { pluginRegistry } from "../../../lib/PluginRegistry";
import { data } from "../../../data/data";

export const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: "0em",
  },
}));

export const PathContainer = ({ path, children, customStyleName }: any) => {
  const { customStyles } = data.gameConfig;
  const history = useHistory();
  const classes = useStyles();

  const { refFn, enabled, componentClassName } = useSetupComponent({
    additionalClasses: [classes.main],
  });

  const visible = history.location.pathname.includes(path);

  const style = useCustomStyle(
    PathContainer.baseStyle,
    customStyles.PathContainer,
    customStyleName
  );

  return (
    <MUIContainer ref={refFn} className={componentClassName} style={style}>
      {enabled && (
        <div>
          <div style={{ float: "right", height: "0em" }}>
            {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
          {path} : {history.location.pathname}
        </div>
      )}
      {visible ? children : null}
    </MUIContainer>
  );
};

PathContainer.styleProperties = [
  {
    property: "margin",
    type: StringSetting,
  },
];

const PathContainerSettings = () => {
  const {
    actions: { setProp },
    componentName,
    props,
  } = useNode((node) => ({
    componentName: node.data.name,
    props: node.data.props,
  }));

  return (
    <Settings
      config={[
        {
          type: StyleSetting,
          property: "customStyleName",
          componentName,
        },
        {
          type: StringSetting,
          property: "path",
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};

PathContainer.componentName = "PathContainer";

PathContainer.craft = {
  props: {
    path: "/tab1",
  },
  related: {
    settings: PathContainerSettings,
  },
};

PathContainer.baseStyle = {
  margin: "0em",
};

PathContainer.documentation = PathContainerDocumentation;

PathContainer.toolboxItem = (connectors: any) => {
  return {
    name: "PathContainer",
    component: PathContainer,
    ref: (ref: any) =>
      connectors.create(ref, <Element is={PathContainer} canvas />),
  };
};

pluginRegistry.registerCustomComponent(PathContainer);
