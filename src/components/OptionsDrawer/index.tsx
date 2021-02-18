import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import LoopIcon from "@material-ui/icons/Loop";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import AppsIcon from "@material-ui/icons/Apps";
import SettingsIcon from "@material-ui/icons/Settings";
import packageJson from "../../../package.json";
import { store } from "../../lib/context";
import { useState } from "react";
import { ImportExportDialog } from "./ImportExportDialog";
import { ConfirmResetDialog } from "./ConfirmResetDialog";
import { CustomComponentsDialog } from "./CustomComponentsDialog";
import { GameSettingsDialog } from "./GameSettingsDialog";
import { game } from "../../data/game";
import { gameManager } from "../../lib/GameManager";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import AddIcon from "@material-ui/icons/Add";
import { useUpdate } from "../../config/useUpdate";
import { data } from "../../data/data";

function listGames(games: any[] | null) {
  if (games) {
    return games.map((game: any) => {
      return (
        <ListItem
          key={game.id}
          button
          onClick={() => {
            // No need to reload
            if (localStorage.lastGameId === game.id) {
              return;
            }

            localStorage.lastGameId = game.id;

            window.location.reload();
          }}
        >
          <ListItemIcon>
            <VideogameAssetIcon />
          </ListItemIcon>
          <ListItemText primary={game.name} secondary={game.id} />
        </ListItem>
      );
    });
  }
}

function ButtonOption({ Icon, onClick, primary, secondary }: any) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

export const OptionsDrawer = () => {
  const [games, setGames] = useState(null);
  const [showImportExprt, setShowImportExport] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showCustomComponents, setShowCustomComponents] = useState(false);
  const [showGameSettings, setShowGameSettings] = useState(false);
  const { gameData } = data;

  if (!games) {
    (async () => {
      console.log("Getting games");
      setGames(await gameManager.getAll());
    })();
  }

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
          <ListItem onClick={() => {}}>
            <div>
              <Typography variant="h4">{gameData.name}</Typography>
              <div>{gameData.id}</div>
            </div>
          </ListItem>
          <Divider />
          {/* Settings */}
          <ButtonOption
            Icon={SettingsIcon}
            onClick={() => setShowGameSettings(true)}
            primary="Game Settings"
          />
          {/* Initialize Game Data */}
          <ButtonOption
            Icon={LoopIcon}
            onClick={() => game.initializeGameData()}
            primary="Initialize Game Data"
          />
          {/* Reset Game Configuration */}
          <ButtonOption
            Icon={LoopIcon}
            onClick={() => setShowConfirmReset(true)}
            primary="Reset Game Configuration"
            secondary="Reset all game configuration"
          />
          {/* Import / Export */}
          <ButtonOption
            Icon={ImportExportIcon}
            onClick={() => setShowImportExport(true)}
            primary="Import / Export"
            secondary="Import or export your game data"
          />
          {/* Custom Components */}
          <ButtonOption
            Icon={AppsIcon}
            onClick={() => setShowCustomComponents(true)}
            primary="Custom Components"
            secondary="Custom components for your game"
          />
          <Divider />
          {/* Games */}
          {listGames(games)}
          <ButtonOption
            Icon={AddIcon}
            onClick={() => {
              delete localStorage.lastGameId;

              window.location.reload();
            }}
            primary="Create New Game"
            secondary="Start building a new game"
          />
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

      {showGameSettings && (
        <GameSettingsDialog
          onClose={async () => {
            setGames(await gameManager.getAll());
            setShowGameSettings(false);
          }}
        />
      )}

      {showCustomComponents && (
        <CustomComponentsDialog
          onClose={() => setShowCustomComponents(false)}
        />
      )}
    </div>
  );
};
