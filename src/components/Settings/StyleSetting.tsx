import { Box, Button, IconButton } from "@material-ui/core";
import { customStyles } from "../../data/customStyles";
import { Dropdown } from "../Controls/Dropdown";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import EditIcon from "@material-ui/icons/Edit";
import { openStyleDrawer } from "../../actions/styleDrawer";

interface Props {
  property: any;
  value: any;
  componentName: string;
  setProp: any;
}

export const StyleSetting = ({
  property,
  value,
  componentName,
  setProp,
}: Props) => {
  if (
    !customStyles[componentName] ||
    Object.keys(customStyles[componentName]).length === 0
  ) {
    return (
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          openStyleDrawer({
            componentName,
          });
        }}
      >
        Define a Style
      </Button>
    );
  }

  return (
    <Box display="flex" alignItems="flex-end">
      <Box flexGrow={1}>
        <Dropdown
          value={value || ""}
          items={Object.keys(customStyles[componentName]).map((id) => ({
            value: id,
            name: customStyles[componentName][id]._name,
          }))}
          onChange={(event: any) => {
            setProp((props: any) => (props[property] = event.target.value));
          }}
        />
      </Box>
      <Box>
        <IconButton
          onClick={() => {
            setProp((props: any) => (props[property] = null));
          }}
        >
          <SettingsBackupRestoreIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            openStyleDrawer({
              componentName,
              styleId: value,
            });
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
