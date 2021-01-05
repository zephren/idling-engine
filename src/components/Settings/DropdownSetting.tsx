import { MenuItem, Select } from "@material-ui/core";
import { Dropdown } from "../Controls/Dropdown";

export const DropdownSetting = ({ property, value, itemsFn, setProp }: any) => {
  return (
    <Dropdown
      value={value || ""}
      items={itemsFn()}
      onChange={(event: any) => {
        setProp((props: any) => (props[property] = event.target.value));
      }}
    />
  );
};
