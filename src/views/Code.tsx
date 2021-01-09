import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import beautify from "ace-builds/src-noconflict/ext-beautify";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Context } from "../lib/context";
import { executeCode } from "../data/game";

const initialCode = `

// You may wish to move each of the following to its own file

game.configure = (settings) => {
  // Update any game settings here
  // settings.tickInterval = 5000
}

game.initialize = () => {
  // Update any initial game data here
}

game.tick = () => {
  // The main function to handle game logic
};

// Define actions using game.actions ...
// Define conditionals using game.conditionals ...
`;

const files: any = localStorage.gameCode
  ? JSON.parse(localStorage.gameCode)
  : [];

export function Code() {
  const history = useHistory();
  const [updateValue, update] = useState(false);
  useContext(Context);

  function save() {
    localStorage.gameCode = JSON.stringify(files);
  }

  // Did mount / unmount
  useEffect(() => {
    const interval = setInterval(() => {
      save();
    }, 1000);

    return () => {
      // Update the code when navigating away
      clearInterval(interval);
      save();
      executeCode();
    };
  }, []);

  if (files.length === 0) {
    files.push({
      name: "main",
      code: "//main\n" + initialCode,
    });
  }

  return (
    <div>
      {files.map((file: any, index: number) => {
        const variant = history.location.pathname.includes(file.name)
          ? "contained"
          : "text";
        return (
          <Button
            key={file.name}
            color="primary"
            variant={variant}
            onClick={() => {
              history.push(`/code/${file.name}`);
            }}
          >
            {file.name}
          </Button>
        );
      })}
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          const name = `New File ${files.length}`;

          files.push({
            name: name,
            code: `//${name}`,
          });

          update(!updateValue);
        }}
      >
        + New File
      </Button>
      ctrl+shift+b - beautify
      <Switch>
        {files.map((file: any) => {
          return (
            <Route
              key={file.name}
              path={`/code/${file.name}`}
              render={() => {
                return (
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      top: "73px",
                      bottom: "0px",
                    }}
                  >
                    <AceEditor
                      mode="javascript"
                      theme="monokai"
                      onChange={(code: string) => {
                        file.code = code;
                      }}
                      name="Code Editor"
                      editorProps={{ $blockScrolling: true }}
                      style={{ width: "100%", height: "100%", fontSize: "1em" }}
                      value={file.code}
                      tabSize={2}
                      commands={beautify.commands}
                    />
                  </div>
                );
              }}
            />
          );
        })}
        <Route path="/code">
          <Redirect to={`/code/${files[0].name}`} />
        </Route>
      </Switch>
    </div>
  );
}
