import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export const Dropdown = ({ value, items, label, onChange }: any) => {
  const itemElements = [];

  for (const item of items) {
    let name = "";
    let value = null;

    if (typeof item === "string") {
      name = item;
      value = item;
    } else {
      name = item.name;
      value = item.value;
    }

    itemElements.push(
      <MenuItem key={name} value={value}>
        {name}
      </MenuItem>
    );
  }

  let labelElement = null;
  if (label) {
    labelElement = <InputLabel shrink>{label}</InputLabel>;
  }

  return (
    <FormControl fullWidth>
      {labelElement}
      <Select value={value || ""} onChange={onChange}>
        {itemElements}
      </Select>
    </FormControl>
  );
};
