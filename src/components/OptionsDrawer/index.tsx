import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import LoopIcon from "@material-ui/icons/Loop";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import { store } from "../../lib/context";
import { useState } from "react";
import { ImportExportDialog } from "./ImportExportDialog";
import { ConfirmResetDialog } from "./ConfirmResetDialog";
import packageJson from "../../../package.json";

export const OptionsDrawer = () => {
  const [showImportExprt, setShowImportExport] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  return (
    <div>
      <Drawer
        open={store.state.optionsDrawerOpen}
        onClose={() => {
          store.state.optionsDrawerOpen = false;
          store.update();
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              setShowConfirmReset(true);
            }}
          >
            <ListItemIcon>
              <LoopIcon />
            </ListItemIcon>
            <ListItemText
              primary="Reset Game Data"
              secondary="Reset all game configuration"
            />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setShowImportExport(true);
            }}
          >
            <ListItemIcon>
              <ImportExportIcon />
            </ListItemIcon>
            <ListItemText
              primary="Import / Export"
              secondary="Import or export your game data"
            />
          </ListItem>
          <Divider />
          <ListItem onClick={() => {}}>
            <ListItemText
              primary="Idling Engine"
              secondary={`Version ${packageJson.version}`}
            />
          </ListItem>
        </List>
      </Drawer>

      {showImportExprt && (
        <ImportExportDialog onClose={() => setShowImportExport(false)} />
      )}

      {showConfirmReset && (
        <ConfirmResetDialog onClose={() => setShowConfirmReset(false)} />
      )}
    </div>
  );
};
