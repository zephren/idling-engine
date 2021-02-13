import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import beautify from "ace-builds/src-noconflict/ext-beautify";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Switch as MUISwitch,
  TextField,
  Theme,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { data } from "../data/data";
import { useContext, useEffect, useState } from "react";
import { Context, store } from "../lib/context";
import { addCodeFile, executeCode, game } from "../data/game";
import { saveLocalSettings } from "../lib/localSettings";
import { saveGameData } from "../lib/saveGameData";

const useStyles = makeStyles((theme: Theme) => ({
  fileName: {
    fontSize: theme.typography.fontSize,
  },
}));

export function Code() {
  const history = useHistory();
  const classes = useStyles();
  const [updateValue, update] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(false);
  const [selectedFiles, setSelectedFiles]: [any, any] = useState({});
  useContext(Context);

  let files = data.gameData.codeFiles;

  function save() {
    saveGameData();
  }

  function setFiles(newFiles: string[]) {
    files = newFiles;
    data.gameData.codeFiles = newFiles;
  }

  function handleFileClick(id: string, index: number) {
    if (deletingFiles) {
      const newSelectedFiles = { ...selectedFiles };
      newSelectedFiles[index] = !newSelectedFiles[index];
      setSelectedFiles(newSelectedFiles);
      // update(!updateValue);
    } else {
      store.state.localSettings.lastCodeFile = id;
      saveLocalSettings();
      history.push(`/code/${id}`);
    }
  }

  function deleteFiles() {
    const newFiles = files.filter((item: any, index: number) => {
      return !selectedFiles[index];
    });

    setFiles(newFiles);
    setSelectedFiles({});
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
      game.initialize(game.data);
    };
  }, []);

  return (
    <Grid
      container
      style={{
        position: "absolute",
        height: "100%",
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
            const selected = history.location.pathname.includes(file.id);

            return (
              <ListItem
                key={file.id}
                style={{ cursor: "pointer" }}
                selected={selected}
                onClick={() => {
                  handleFileClick(file.id, index);
                }}
              >
                {deletingFiles && (
                  <ListItemIcon>
                    {selectedFiles[index] ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </ListItemIcon>
                )}
                {selected ? (
                  <ListItemText
                    primary={
                      <TextField
                        value={file.name}
                        onChange={(event) => {
                          file.name = event.target.value;
                          update(!updateValue);
                        }}
                        size="small"
                        inputProps={{ className: classes.fileName }}
                      />
                    }
                  />
                ) : (
                  <ListItemText primary={file.name} />
                )}
              </ListItem>
            );
          })}
          <Divider />
          <ListItem
            button
            onClick={() => {
              const name = `New File ${files.length}`;

              addCodeFile(name, `//${name}`);

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
            <ListItemText primary="Beautify" secondary="Ctrl + Shift + B" />
          </ListItem>
        </List>
      </Grid>
      <Grid item sm={10} style={{ background: "red", position: "relative" }}>
        <Switch>
          {files.map((file: any) => {
            return (
              <Route
                key={file.id}
                path={`/code/${file.id}`}
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
                        focus
                      />
                    </div>
                  );
                }}
              />
            );
          })}
          <Route path="/code">
            <Redirect to={`/code/${files[0].id}`} />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
