import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

export { CustomRepeatSetting } from "./CustomRepeatSetting";
export { DropdownSetting } from "./DropdownSetting";
export { SliderSetting } from "./SliderSetting";
export { StringSetting } from "./StringSetting";
export { StyleSetting } from "./StyleSetting";

export const Settings = ({ config, properties, setProp }: any) => {
  const settingsRows = [];

  if (!properties) {
    console.error(config, new Error());
    return null;
  }

  for (const configItem of config) {
    const { property, ...remainingProps } = configItem;
    const value = properties[property];

    settingsRows.push(
      <TableRow key={property}>
        <TableCell component="td" scope="row">
          {property}
        </TableCell>
        <TableCell>
          <configItem.type
            property={property}
            value={value}
            setProp={setProp}
            {...remainingProps}
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>{settingsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};
