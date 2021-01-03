import { useNode } from "@craftjs/core";
import {
  AppBar as MUIAppBar,
  Button,
  makeStyles,
  Switch,
  TextField,
  Theme,
  Toolbar,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../lib/context";
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
  const {
    connectors: { connect, drag },
  } = useNode();
  const classes = useStyles();
  const history = useHistory();

  const [updateValue, update] = useState(true);
  const store = useContext(Context);

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={classes.root}
      onClick={() => {
        setTimeout(() => {
          update(!updateValue);
          store.update();
        });
      }}
    >
      <MUIAppBar position="static">
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
    triggerUpdate: !!node.data.props.triggerUpdate,
    tabs: node.data.props.tabs,
  }));

  const updateTab = (tab: any, property: string, value: any) => {
    tab[property] = value;

    return setProp((props: any) => {
      props.triggerUpdate = !triggerUpdate;
    });
  };

  const setDefault = (tab: any) => {
    for (const tab of tabs) {
      tab.default = false;
    }

    updateTab(tab, "default", true);
  };

  return (
    <div>
      {tabs.map((tab: any, index: number) => {
        return (
          <div key={index}>
            <TextField
              label="Name"
              value={tab.name}
              onChange={(event) => updateTab(tab, "name", event.target.value)}
            />
            <TextField
              label="Path"
              value={tab.path}
              onChange={(event) => updateTab(tab, "path", event.target.value)}
            />
            <TextField
              label="To"
              value={tab.to}
              onChange={(event) => updateTab(tab, "to", event.target.value)}
            />
            <Switch
              checked={tab.default || false}
              onChange={() => setDefault(tab)}
            />
          </div>
        );
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
