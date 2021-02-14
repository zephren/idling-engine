import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

import { CustomRepeatSetting } from "./CustomRepeatSetting";

export * from "./CustomRepeatSetting";
export * from "./DropdownSetting";
export * from "./SliderSetting";
export * from "./StringSetting";
export * from "./StyleSetting";
export * from "./SwitchSetting";

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
        <TableCell style={{ width: "1em" }} />
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
      <Table size="small" padding="none">
        <TableBody>{settingsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};
