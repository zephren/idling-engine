import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { data } from "../../data/data";
import { saveGameConfig } from "../../lib/saveGameConfig";

export const GameSettingsDialog = ({ onClose }: any) => {
  const { gameConfig } = data;
  const [name, setName] = useState(gameConfig.name);

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
            // Need to re-get the gameConfig as the reference to the object could have changed
            const { gameConfig } = data;

            gameConfig.name = name;

            await saveGameConfig();
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
