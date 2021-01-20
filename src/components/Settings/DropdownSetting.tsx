import { IconButton } from "@material-ui/core";
import { Dropdown } from "../Controls/Dropdown";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";

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
    <>
      <Dropdown
        value={value || ""}
        items={itemsFn()}
        onChange={(event: any) => {
          setProp((props: any) => (props[property] = event.target.value));
        }}
      />
      <IconButton
        onClick={() => {
          setProp((props: any) => (props[property] = null));
        }}
      >
        <SettingsBackupRestoreIcon />
      </IconButton>
    </>
  );
};
