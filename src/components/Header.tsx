import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { store } from "../lib/context";
import { saveLayout } from "../lib/saveLayout";

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
          saveLayout();
          history.push("/play");
        }}
      >
        Play
      </Button>
    </div>
  );
};
