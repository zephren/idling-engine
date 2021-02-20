import { AppBar, Button, Toolbar } from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context, store } from "../lib/context";
import { saveGameConfig } from "../lib/saveGameConfig";
import { openStyleDrawer } from "../actions/styleDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { data } from "../data/data";

export const Header = () => {
  const history = useHistory();
  const path = history.location.pathname;
  const [updateValue, update] = useState(false);
  const { gameConfig } = data;

  useContext(Context);

  if (store.state.mode === "play") {
    return null;
  }

  function navigate(path: string) {
    history.push(path);
    update(!updateValue);
  }

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
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
              saveGameConfig();
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
        <div>{gameConfig.name}</div>
      </Toolbar>
    </AppBar>
  );
};
