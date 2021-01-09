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

export const Settings = ({ config, properties, setProp }: any) => {
  const settingsRows = [];

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
