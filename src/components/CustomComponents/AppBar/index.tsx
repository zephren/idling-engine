import { useNode } from "@craftjs/core";
import {
  AppBar as MUIAppBar,
  Button,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { pluginRegistry } from "../../../lib/PluginRegistry";
import { game } from "../../../data/game";
import {
  DropdownSetting,
  Settings,
  StringSetting,
  SwitchSetting,
} from "../../../core";
import { AppBarDocumentation } from "./AppBarDocumentation";
import { ToolBarTabs } from "./ToolBarTabs";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  spacer: {
    flexGrow: 1,
  },
  fullHeight: {
    ...theme.mixins.toolbar,
  },
}));

export function AppBar({ tabs }: any) {
  const classes = useStyles();
  const { refFn, componentClassName, store } = useSetupComponent({
    additionalClasses: [classes.root],
  });

  const history = useHistory();

  const [updateValue, update] = useState(true);

  return (
    <div
      ref={refFn}
      className={classes.root}
      onClick={() => {
        setTimeout(() => {
          update(!updateValue);
          store.update();
        });
      }}
    >
      <MUIAppBar position="static" className={componentClassName}>
        <Toolbar>
          <ToolBarTabs
            path={history.location.pathname}
            tabs={tabs}
            className={classes.fullHeight}
          />
          <div className={classes.spacer}></div>
        </Toolbar>
      </MUIAppBar>
    </div>
  );
}

const AppBarSettings = () => {
  const {
    actions: { setProp },
    triggerUpdate,
    tabs,
  } = useNode((node) => ({
    props: node.data.props,
    triggerUpdate: !!node.data.props.triggerUpdate,
    tabs: node.data.props.tabs,
  }));

  const setDefault = (defaultTab: any) => {
    for (const tab of tabs) {
      tab.default = false;
    }

    defaultTab.default = true;

    return setProp((props: any) => {
      props.triggerUpdate = !triggerUpdate;
    });
  };

  const visibilitySources = Object.keys(game.visibilitySources);

  return (
    <div>
      {tabs.map((tab: any, index: number) => {
        return (
          <Settings
            key={index}
            config={[
              {
                type: StringSetting,
                property: "name",
              },
              {
                type: StringSetting,
                property: "path",
              },
              {
                type: StringSetting,
                property: "to",
              },
              {
                type: DropdownSetting,
                property: "visibilitySource",
                itemsFn: () => visibilitySources,
              },
              {
                type: SwitchSetting,
                property: "default",
                onChange: () => setDefault(tab),
              },
            ]}
            properties={tab}
            setProp={(callback: any) => {
              // Custom set prop function
              // Call the callback with the tab as the "props" we want to update
              callback(tab);

              // Then call the actual setProp to trigger the update
              setProp((props: any) => {
                props.triggerUpdate = !triggerUpdate;
              });
            }}
          />
        );

        // return (
        //   <div key={index}>
        //     <TextField
        //       label="Name"
        //       value={tab.name}
        //       onChange={(event) => updateTab(tab, "name", event.target.value)}
        //     />
        //     <TextField
        //       label="Path"
        //       value={tab.path}
        //       onChange={(event) => updateTab(tab, "path", event.target.value)}
        //     />
        //     <TextField
        //       label="To"
        //       value={tab.to}
        //       onChange={(event) => updateTab(tab, "to", event.target.value)}
        //     />
        //     <Switch
        //       checked={tab.default || false}
        //       onChange={() => setDefault(tab)}
        //     />
        //   </div>
        // );
      })}
      <Button
        onClick={() => {
          tabs.push({ name: "New Tab", path: "", to: "" });
          return setProp((props) => (props.triggerUpdate = !triggerUpdate));
        }}
      >
        Add Tab
      </Button>
    </div>
  );
};

AppBar.componentName = "AppBar";

AppBar.craft = {
  props: {
    tabs: [
      {
        name: "Tab 1",
        path: "tab1",
        to: `/tab1`,
        default: true,
      },
      {
        name: "Tab 2",
        path: "tab2",
        to: `/tab2`,
      },
      {
        name: "Tab 3",
        path: "tab3",
        to: `/tab3`,
      },
    ],
  },
  related: {
    settings: AppBarSettings,
  },
};

AppBar.documentation = AppBarDocumentation;

AppBar.toolboxItem = (connectors: any) => {
  return {
    name: "AppBar",
    component: AppBar,
    ref: (ref: any) => connectors.create(ref, <AppBar />),
  };
};

pluginRegistry.registerCustomComponent(AppBar);
