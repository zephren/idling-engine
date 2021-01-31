import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context, store } from "../lib/context";
import { saveGameData } from "../lib/saveGameData";
import { openStyleDrawer } from "../actions/styleDrawer";
import MenuIcon from "@material-ui/icons/Menu";

export const Header = () => {
  const history = useHistory();
  const path = history.location.pathname;
  const [updateValue, update] = useState(false);

  useContext(Context);

  function navigate(path: string) {
    history.push(path);
    update(!updateValue);
  }

  return (
    <div>
      <Button
        onClick={() => {
          store.state.optionsDrawerOpen = true;
          store.update();
        }}
      >
        <MenuIcon />
      </Button>
      <Button
        onClick={() => {
          navigate("/edit");
        }}
        variant={path.includes("/edit") ? "contained" : undefined}
        color="primary"
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          let file = store.state.localSettings.lastCodeFile;

          if (file) {
            file = `/${file}`;
          }

          navigate(`/code${file}`);
        }}
        variant={path.includes("/code") ? "contained" : undefined}
        color="primary"
      >
        Code
      </Button>
      <Button
        onClick={() => {
          openStyleDrawer();
        }}
      >
        Styling
      </Button>
      <Button
        onClick={() => {
          saveGameData();
          navigate("/play");
        }}
        variant={path.includes("/play") ? "contained" : undefined}
        color="primary"
      >
        Play
      </Button>
      <Button
        onClick={() => {
          navigate("/documentation");
        }}
        variant={path.includes("/documentation") ? "contained" : undefined}
        color="primary"
      >
        Documentation
      </Button>
    </div>
  );
};
