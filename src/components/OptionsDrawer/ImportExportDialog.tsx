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

export const ImportExportDialog = ({ onClose }: any) => {
  const currentAllGameData = {
    gameData: localStorage.gameData,
    gameCode: localStorage.gameCode,
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
