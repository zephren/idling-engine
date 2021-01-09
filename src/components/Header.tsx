import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { store } from "../lib/context";
import { saveGameData } from "../lib/saveGameData";

export const Header = () => {
  const history = useHistory();

  return (
    <div>
      <Button
        onClick={() => {
          store.state.drawerOpen = true;
          store.update();
        }}
      >
        Options
      </Button>
      <Button
        onClick={() => {
          history.push("/edit");
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          history.push("/code");
        }}
      >
        Code
      </Button>
      <Button
        onClick={() => {
          saveGameData();
          history.push("/play");
        }}
      >
        Play
      </Button>
      <Button
        onClick={() => {
          history.push("/documentation");
        }}
      >
        Documentation
      </Button>
    </div>
  );
};
