import { makeStyles, Theme } from "@material-ui/core";

export const useSharedStyles = makeStyles((theme: Theme) => ({
  gameArea: {
    position: "absolute",
    background: "#eee",
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },
}));
