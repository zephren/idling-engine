import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import beautify from "ace-builds/src-noconflict/ext-beautify";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch as MUISwitch,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useContext, useEffect, useState } from "react";
import { Context } from "../lib/context";
import { executeCode } from "../data/game";
import { v4 as uuid } from "uuid";

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

let files: any = localStorage.gameCode ? JSON.parse(localStorage.gameCode) : [];

export function Code() {
  const history = useHistory();
  const [updateValue, update] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(false);
  const [selectedFiles, setSelectedFiles]: [any, any] = useState({});
  useContext(Context);

  function save() {
    localStorage.gameCode = JSON.stringify(files);
  }

  function handleFileClick(fileName: string, index: number) {
    if (deletingFiles) {
      const newSelectedFiles = { ...selectedFiles };
      newSelectedFiles[index] = !newSelectedFiles[index];
      setSelectedFiles(newSelectedFiles);
      // update(!updateValue);
    } else {
      history.push(`/code/${fileName}`);
    }
  }

  function deleteFiles() {
    files = files.filter((item: any, index: number) => {
      return !selectedFiles[index];
    });

    setSelectedFiles({});
  }

  function addFile(name: string, code: string) {
    files.push({
      id: uuid(),
      name,
      code,
    });
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
    addFile("main", "//main\n" + initialCode);
  }

  return (
    <Grid
      container
      style={{
        position: "absolute",
        top: "37px",
        bottom: "0px",
        width: "100%",
      }}
    >
      <Grid item sm={2} style={{ position: "relative" }}>
        <List
          dense={true}
          style={{
            overflowY: "auto",
            position: "absolute",
            width: "100%",
            top: "0px",
            bottom: "0px",
          }}
        >
          {files.map((file: any, index: number) => {
            const selected = history.location.pathname.includes(file.name);
            return (
              <ListItem
                key={file.id}
                button
                selected={selected}
                onClick={() => {
                  handleFileClick(file.name, index);
                }}
              >
                <ListItemText primary={file.name} />
                {deletingFiles && (
                  <ListItemIcon>
                    {selectedFiles[index] ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </ListItemIcon>
                )}
              </ListItem>
            );
          })}
          <Divider />
          <ListItem
            button
            onClick={() => {
              const name = `New File ${files.length}`;

              addFile(name, `//${name}`);

              update(!updateValue);
            }}
          >
            <ListItemText primary="+ New File" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Delete Files" />
            <MUISwitch
              onChange={(event) => {
                if (deletingFiles) {
                  deleteFiles();
                }

                setDeletingFiles(event.target.checked);
              }}
              checked={deletingFiles}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="ctrl+shift+b - beautify" />
          </ListItem>
        </List>
      </Grid>
      <Grid item sm={10} style={{ background: "red", position: "relative" }}>
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
                        top: "0px",
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
                        style={{
                          width: "100%",
                          height: "100%",
                          fontSize: "1.1em",
                        }}
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
      </Grid>
    </Grid>
  );
}
