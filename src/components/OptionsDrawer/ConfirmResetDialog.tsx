import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const ConfirmResetDialog = ({ onClose }: any) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Reset Game Configuration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reset the curret game data?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => {
            delete localStorage.gameData;
            delete localStorage.gameCode;
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
