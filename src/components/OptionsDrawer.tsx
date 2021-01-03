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

const ImportExportDialog = ({ onClose }: any) => {
  const currentAllGameData = {
    gameData: localStorage.gameData,
    gameCode: localStorage.gameCode,
  };

  const [allGameData, setAllGameData] = useState(
    btoa(JSON.stringify(currentAllGameData))
  );

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Import or export game data
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Copy and paste the existing data somewhere to save it. Or paste in
          data you have and import it.
        </DialogContentText>
        <TextField
          fullWidth
          label="Current Game Data"
          multiline
          rows={4}
          value={allGameData}
          onChange={(event) => {
            setAllGameData(event.target.value);
          }}
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const data = JSON.parse(atob(allGameData));
            localStorage.gameData = data.gameData;
            localStorage.gameCode = data.gameCode;
            window.location.reload();
          }}
          color="primary"
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const OptionsDrawer = () => {
  // const history = useHistory();

  const [showImportExprt, setShowImportExport] = useState(false);

  return (
    <div>
      <Drawer
        open={store.state.drawerOpen}
        onClose={() => {
          store.state.drawerOpen = false;
          store.update();
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              delete localStorage.gameData;
              delete localStorage.gameCode;
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <LoopIcon />
            </ListItemIcon>
            <ListItemText
              primary="Reset All"
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
        </List>
      </Drawer>

      {showImportExprt && (
        <ImportExportDialog onClose={() => setShowImportExport(false)} />
      )}
    </div>
  );
};
