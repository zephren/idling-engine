import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useUpdate } from "../../config/useUpdate";
import { data } from "../../data/data";
import { saveGameData } from "../../lib/saveGameData";

export const GameSettingsDialog = ({ onClose }: any) => {
  const { gameData } = data;
  const [name, setName] = useState(gameData.name);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Game Settings</DialogTitle>
      <DialogContent>
        {/* <DialogContentText></DialogContentText> */}
        <TextField
          fullWidth
          label="Game Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={async () => {
            // Need to re-get the gameData as the reference to the object could have changed
            const { gameData } = data;

            gameData.name = name;

            await saveGameData();
            onClose();
          }}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
