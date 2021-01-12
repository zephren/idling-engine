import { Button } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context, store } from "../lib/context";
import { saveGameData } from "../lib/saveGameData";

export const Header = () => {
  const history = useHistory();
  const path = history.location.pathname;

  useContext(Context);

  return (
    <div>
      <Button
        onClick={() => {
          store.state.optionsDrawerOpen = true;
          store.update();
        }}
      >
        Options
      </Button>
      <Button
        onClick={() => {
          history.push("/edit");
        }}
        variant={path.includes("/edit") ? "contained" : undefined}
        color="primary"
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          history.push("/code");
        }}
        variant={path.includes("/code") ? "contained" : undefined}
        color="primary"
      >
        Code
      </Button>
      <Button
        onClick={() => {
          store.state.styleDrawerOpen = true;
          store.state.previoushighlightComponents =
            store.state.highlightComponents;
          store.state.highlightComponents = false;
          store.update();
        }}
      >
        Styling
      </Button>
      <Button
        onClick={() => {
          saveGameData();
          history.push("/play");
        }}
        variant={path.includes("/play") ? "contained" : undefined}
        color="primary"
      >
        Play
      </Button>
      <Button
        onClick={() => {
          history.push("/documentation");
        }}
        variant={path.includes("/documentation") ? "contained" : undefined}
        color="primary"
      >
        Documentation
      </Button>
    </div>
  );
};
