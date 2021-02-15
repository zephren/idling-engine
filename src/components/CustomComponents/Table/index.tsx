import React from "react";
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
import {
  Settings,
  DropdownSetting,
  CustomRepeatSetting,
  Dropdown,
} from "../../../core";
import { game } from "../../../data/game";
import { Button } from "../Button";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { TableDocumentation } from "./TableDocumentation";
import { pluginRegistry } from "../../../lib/PluginRegistry";

const TableRows = ({ items, columnNames }: any) => {
  const rows = [];
  const currentContext = {
    item: {} as any,
    index: "0",
    column: {} as any,
  };

  try {
    for (const itemIndex in items) {
      const item = items[itemIndex];
      const cells = [];

      currentContext.item = item;

      for (const index in columnNames) {
        const column = columnNames[index];

        currentContext.index = index;
        currentContext.column = column;

        const { name } = column;
        const itemProperty = item[column.property];

        switch (column.type) {
          case "string":
            if (typeof itemProperty !== "string") {
              throw new Error("Trying to use a non-string value as a string");
            }

            cells.push(<TableCell key={name}>{itemProperty}</TableCell>);
            break;
          case "variableString":
            if (!itemProperty.data) {
              throw new Error("No data function for a variableString");
            }

            cells.push(<TableCell key={name}>{itemProperty.data()}</TableCell>);
            break;
          case "button":
            if (!itemProperty.onClickAction) {
              throw new Error("No onClickAcion function for a button");
            }

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
  } catch (err) {
    return (
      <TableBody>
        <TableCell>
          <div>Table Data Error! {err.message}</div>
          <div>Column Index: {currentContext.index}</div>
          <div>Column Type: {currentContext.column.type}</div>
          <div>Item Data: {JSON.stringify(currentContext.item)}</div>
        </TableCell>
      </TableBody>
    );
  }

  return <TableBody>{rows}</TableBody>;
};

export const Table = ({ columnNames = [], itemSource }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

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
      <Dropdown
        value={item.type || ""}
        items={[
          { name: "String", value: "string" },
          { name: "Button", value: "button" },
          { name: "Variable String", value: "variableString" },
        ]}
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
          type: DropdownSetting,
          property: "itemSource",
          itemsFn: () => Object.keys(game.dataSources),
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

Table.componentName = "Table";

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

Table.documentation = TableDocumentation;

Table.toolboxItem = (connectors: any) => {
  return {
    name: "Table",
    component: Table,
    ref: (ref: any) => connectors.create(ref, <Table />),
  };
};

pluginRegistry.registerCustomComponent(Table);
