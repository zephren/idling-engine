import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

export const Settings = ({ config, properties, setProp }: any) => {
  const settingsRows = [];

  for (const configItem of config) {
    const { property, name, ...remainingProps } = configItem;
    const value = properties[property];

    settingsRows.push(
      <TableRow key={name}>
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
