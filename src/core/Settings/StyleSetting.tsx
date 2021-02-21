import { Box, Button, IconButton } from "@material-ui/core";
import { Dropdown } from "../Controls/Dropdown";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { openStyleDrawer } from "../../actions/styleDrawer";
import { data } from "../../data/data";

// const customStyles: any = {};
// const openStyleDrawer: any = () => {};

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
  const { customStyles } = data.gameConfig;

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
            name: customStyles[componentName][id].styleName,
          }))}
          onChange={(event: any) => {
            setProp((props: any) => (props[property] = event.target.value));
          }}
        />
      </Box>
      <Box>
        <IconButton
          size="small"
          onClick={() => {
            setProp((props: any) => (props[property] = null));
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          size="small"
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
