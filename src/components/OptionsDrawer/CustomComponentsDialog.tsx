import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  TableHead,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUpdate } from "../../config/useUpdate";
import { data } from "../../data/data";
import { saveCustomComponents } from "../../lib/saveGameConfig";

function CustomComponent({ component, components, update }: any) {
  let icon = null;

  if (component.status === "Checking") {
    icon = <HelpOutlinedIcon />;
  } else if (component.ok) {
    icon = <CheckCircleIcon style={{ color: "green" }} />;
  } else {
    icon = <ErrorIcon style={{ color: "red" }} />;
  }

  return (
    <TableRow>
      <TableCell>
        <IconButton
          onClick={() => {
            const index = components.indexOf(component);
            components.splice(index, 1);
            update();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell>{component.url}</TableCell>
      <TableCell>{icon}</TableCell>
      <TableCell>{component.status}</TableCell>
    </TableRow>
  );
}

export const CustomComponentsDialog = ({ onClose }: any) => {
  const update = useUpdate();
  const [newComponentUrl, setNewComponentUrl] = useState("");

  function checkComponent(component: any) {
    component.status = "Checking";

    return new Promise(async function (accept: any) {
      try {
        const result = await axios.get(component.url);

        console.log(result.status);

        if (result.status === 200) {
          component.status = "Ok";
          component.ok = true;
        }
      } catch (err) {
        if (err.response) {
          component.status = `Failed (${err.response.status})`;
        } else {
          component.status = `Failed (${err.message})`;
        }

        component.ok = false;
      }

      accept();
    });
  }

  async function checkComponentUrls() {
    const requests = data.customComponents.map((component) => {
      return checkComponent(component);
    });

    update();

    await Promise.all(requests);

    // Need to use a different value... can't quite recall why
    update(123);
  }

  // Did mount / unmount
  useEffect(() => {
    checkComponentUrls();
  });

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Custom Components</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add custom components to your game.
        </DialogContentText>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>URL</TableCell>
                <TableCell></TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.customComponents.map((component) => {
                return (
                  <CustomComponent
                    key={component.url}
                    component={component}
                    components={data.customComponents}
                    update={update}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <br />

        <TextField
          value={newComponentUrl}
          onChange={(event: any) => {
            setNewComponentUrl(event.target.value);
          }}
        />
        <Button
          onClick={async () => {
            const component = {
              url: newComponentUrl,
              status: "New",
            };

            data.customComponents.push(component);

            await checkComponent(component);

            setNewComponentUrl("");
          }}
          variant="contained"
          color="primary"
        >
          Add Component
        </Button>
        <Button
          onClick={checkComponentUrls}
          variant="contained"
          color="primary"
        >
          Check Components
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          color="primary"
        >
          Done
        </Button>
        <Button
          onClick={() => {
            saveCustomComponents();
            window.location.reload();
          }}
          color="primary"
          variant="contained"
        >
          Save And Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
