import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { data } from "../../data/data";
import { gameManager } from "../../lib/GameManager";

export const ImportExportDialog = ({ onClose }: any) => {
  const currentAllGameData = {
    gameData: data.gameData,
  };

  const [allGameData, setAllGameData] = useState(
    btoa(JSON.stringify(currentAllGameData))
  );

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Import or export game data</DialogTitle>
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
            console.debug("Imported game data", JSON.stringify(data, null, 2));
            gameManager.save(data.gameData);
            localStorage.lastGameId = data.gameData.id;
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
