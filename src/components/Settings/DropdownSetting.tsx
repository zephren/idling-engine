import { Box, IconButton } from "@material-ui/core";
import { Dropdown } from "../Controls/Dropdown";
import ClearIcon from "@material-ui/icons/Clear";

interface Props {
  property: any;
  value: any;
  itemsFn: () => { name: string; value: any }[];
  setProp: any;
}

export const DropdownSetting = ({
  property,
  value,
  itemsFn,
  setProp,
}: Props) => {
  return (
    <Box display="flex" alignItems="flex-end">
      <Box flexGrow={1}>
        <Dropdown
          value={value || ""}
          items={itemsFn()}
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
    </Box>
  );
};
