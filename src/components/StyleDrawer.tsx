import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import LoopIcon from "@material-ui/icons/Loop";
import ImportExportIcon from "@material-ui/icons/ImportExport";
// import { useHistory } from "react-router-dom";
import { store } from "../lib/context";
import { useState } from "react";
import { Settings, StringSetting } from "./Settings";
import { customStyles } from "../data/customStyles";

// const propertyConfigDefinitions: {
//   [key: string]: any;
// } = {
//   margin: {
//     property: "margin",
//     type: StringSetting,
//   },
//   padding: {
//     property: "padding",
//     type: StringSetting,
//   },
//   height: {
//     property: "height",
//     type: StringSetting,
//   },
// };

export const StyleDrawer = () => {
  return (
    <div>
      <Drawer
        open={store.state.styleDrawerOpen}
        onClose={() => {
          store.state.styleDrawerOpen = false;
          store.state.highlightComponents =
            store.state.previoushighlightComponents;
          store.update();
        }}
        anchor="right"
        BackdropProps={{ invisible: true }}
      >
        <Settings
          config={[
            {
              property: "padding",
              type: StringSetting,
            },
          ]}
          properties={customStyles.button.style1}
          setProp={(callback: (props: any) => void) => {
            const newProps = Object.assign({}, customStyles.button.style1, {
              customId: Math.random(),
            });
            callback(newProps);
            customStyles.button.style1 = newProps;
            console.log(newProps);
            store.update();
          }}
        />
      </Drawer>
    </div>
  );
};
