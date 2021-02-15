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
import AppsIcon from "@material-ui/icons/Apps";
import packageJson from "../../../package.json";
import { store } from "../../lib/context";
import { useState } from "react";
import { ImportExportDialog } from "./ImportExportDialog";
import { ConfirmResetDialog } from "./ConfirmResetDialog";
import { CustomComponentsDialog } from "./CustomComponentsDialog";
import { game } from "../../data/game";
import { gameManager } from "../../lib/GameManager";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import AddIcon from "@material-ui/icons/Add";

let games: any[] = [];

function getGames() {
  setTimeout(async () => {
    games = await gameManager.getAll();
    getGames();
  }, 2000);
}
getGames();

function listGames() {
  return games.map((game: any) => {
    return (
      <ListItem button onClick={() => {}}>
        <ListItemIcon>
          <VideogameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Game ABC" secondary={game.id} />
      </ListItem>
    );
  });
}

export const OptionsDrawer = () => {
  const [showImportExprt, setShowImportExport] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showCustomComponents, setShowCustomComponents] = useState(false);

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
          {/* Initialize Game Data */}
          <ListItem
            button
            onClick={() => {
              game.initializeGameData();
            }}
          >
            <ListItemIcon>
              <LoopIcon />
            </ListItemIcon>
            <ListItemText primary="Initialize Game Data" />
          </ListItem>
          {/* Reset Game Configuration */}
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
              primary="Reset Game Configuration"
              secondary="Reset all game configuration"
            />
          </ListItem>
          {/* Import / Export */}
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
          {/* Custom Components */}
          <ListItem
            button
            onClick={() => {
              setShowCustomComponents(true);
            }}
          >
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Custom Components"
              secondary="Custom components for your game"
            />
          </ListItem>
          <Divider />
          {/* Games */}
          {listGames()}
          <ListItem
            button
            onClick={() => {
              delete localStorage.lastGameId;
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create New Game"
              secondary="Start building a new game"
            />
          </ListItem>
          <Divider />
          {/* Version */}
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

      {showCustomComponents && (
        <CustomComponentsDialog
          onClose={() => setShowCustomComponents(false)}
        />
      )}
    </div>
  );
};
