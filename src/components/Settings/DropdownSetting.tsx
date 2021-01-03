import { MenuItem, Select } from "@material-ui/core";

export const DropdownSetting = ({ property, value, itemsFn, setProp }: any) => {
  const items = [];

  for (const item of itemsFn()) {
    let name = "";
    let value = null;

    if (typeof item === "string") {
      name = item;
      value = item;
    } else {
      name = item.name;
      value = item.value;
    }

    items.push(<MenuItem value={value}>{name}</MenuItem>);
  }

  return (
    <Select
      fullWidth
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value || ""}
      onChange={(event: any) => {
        setProp((props: any) => (props[property] = event.target.value));
      }}
    >
      {items}
    </Select>
  );
};
