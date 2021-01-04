import React, { useContext } from "react";
import { useNode } from "@craftjs/core";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Settings } from "../Settings";
import { CustomRepeatSetting } from "../Settings/CustomRepeatSetting";
import { StringSetting } from "../Settings/SettingTypes";
import { game } from "../../lib/game";
import { Button } from "./Button";
import { Context } from "../../lib/context";
import { useSetupComponent } from "../../config/useSetupComponent";

const TableRows = ({ items, columnNames }: any) => {
  const rows = [];

  for (const itemIndex in items) {
    const item = items[itemIndex];
    const cells = [];

    for (const column of columnNames) {
      const { name } = column;
      const itemProperty = item[column.property];

      switch (column.type) {
        case "string":
          cells.push(<TableCell key={name}>{itemProperty}</TableCell>);
          break;
        case "textFromFunction":
          cells.push(<TableCell key={name}>{itemProperty.data()}</TableCell>);
          break;
        case "button":
          cells.push(
            <TableCell key={name}>
              <Button
                text={itemProperty.text}
                variant="contained"
                color="primary"
                onClickAction={itemProperty.onClickAction}
                actionContext={item}
              />
            </TableCell>
          );
          break;
      }
    }

    rows.push(<TableRow key={itemIndex}>{cells}</TableRow>);
  }

  return <TableBody>{rows}</TableBody>;
};

export const Table = ({ columnNames = [], itemSource }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  useContext(Context);

  const headerRow = [];

  for (const column of columnNames) {
    headerRow.push(<TableCell key={column.name}>{column.name}</TableCell>);
  }

  const itemSourceFunction = game.dataSources[itemSource];

  const items = itemSourceFunction ? itemSourceFunction() : [];

  return (
    <div ref={refFn} className={componentClassName}>
      <TableContainer>
        <MUITable size="small">
          <TableHead>
            <TableRow>{headerRow}</TableRow>
          </TableHead>
          <TableRows items={items} columnNames={columnNames} />
        </MUITable>
      </TableContainer>
    </div>
  );
};

const ColumnSetting = ({ item, update }: any) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <TextField
        fullWidth
        value={item.name}
        label="Name"
        onChange={(event: any) => {
          item.name = event.target.value;
          update();
        }}
      />
      <TextField
        fullWidth
        value={item.property}
        label="Property"
        onChange={(event: any) => {
          item.property = event.target.value;
          update();
        }}
      />
      <TextField
        fullWidth
        value={item.type}
        label="Type"
        onChange={(event: any) => {
          item.type = event.target.value;
          update();
        }}
      />
    </div>
  );
};

const TableSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <Settings
      config={[
        {
          type: StringSetting,
          property: "itemSource",
        },
        {
          type: CustomRepeatSetting,
          property: "columnNames",
          component: (item: any, index: number) => (
            <ColumnSetting
              key={index}
              item={item}
              update={() => {
                setProp(
                  (props: any) => (props.updateVarible = !props.updateVarible)
                );
              }}
            />
          ),
          items: props.columnNames,
        },
      ]}
      properties={props}
      setProp={setProp}
    />
  );
};

Table.craft = {
  props: {
    columnNames: [
      { name: "Colum 1", property: "col1", type: "string" },
      { name: "Colum 2", property: "col2", type: "string" },
      { name: "Colum 3", property: "col3", type: "button" },
    ],
    itemSource: "",
    updateVariable: false,
  },
  related: {
    settings: TableSettings,
  },
};
