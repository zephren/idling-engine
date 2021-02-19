import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { data } from "../../data/data";
import { gameManager } from "../../lib/GameManager";

export const ConfirmResetDialog = ({ onClose }: any) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete Game Configuration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the curret game configuration? This
          cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await gameManager.delete(data.gameConfig.id);
            const games = await gameManager.getAll();

            if (games.length) {
              localStorage.lastGameId = games[0].id;
            }

            window.location.reload();
          }}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
