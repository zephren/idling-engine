import { Box, Button, Drawer, Grid, Typography } from "@material-ui/core";
import { store } from "../lib/context";
import { useEffect, useState } from "react";
import { Settings, StringSetting } from "./Settings";
import { customStyles } from "../data/customStyles";
import { Dropdown } from "./Controls/Dropdown";
import * as components from "./user";
import { v4 as uuid } from "uuid";
import { closeStyleDrawer } from "../actions/styleDrawer";
import { useUpdate } from "../config/useUpdate";

const supportedComponents: any = {
  [components.Button.name]: components.Button,
  [components.PathContainer.name]: components.PathContainer,
  [components.GridItem.name]: components.GridItem,
  [components.Text.name]: components.Text,
  [components.VariableText.name]: components.VariableText,
};

export const StyleDrawer = () => {
  const update = useUpdate();

  const {
    styleDrawerComponentName: selectedComponent,
    styleDrawerStyleId: selectedStyle,
  } = store.state.localSettings;

  const updateSettings = (
    styleDrawerComponentName: string,
    styleDrawerStyleId: string
  ) => {
    store.state.localSettings.styleDrawerComponentName = styleDrawerComponentName;
    store.state.localSettings.styleDrawerStyleId = styleDrawerStyleId;
    update();
  };

  let component: any = null;
  if (selectedComponent) {
    component = customStyles[selectedComponent];
  }

  return (
    <div>
      <Drawer
        open={store.state.localSettings.styleDrawerOpen}
        onClose={() => {
          closeStyleDrawer();
        }}
        anchor="right"
        BackdropProps={{ invisible: true }}
      >
        <div style={{ padding: "1em" }}>
          <Typography variant="h4">Style Components</Typography>
          <Dropdown
            value={selectedComponent}
            items={Object.keys(supportedComponents)}
            label="Component"
            onChange={(event: any) => {
              customStyles[event.target.value] =
                customStyles[event.target.value] || {};

              updateSettings(event.target.value, "");
              update();
            }}
          />
          {component && (
            <Box display="flex" alignItems="flex-end">
              <Box flexGrow={1}>
                <Dropdown
                  value={selectedStyle}
                  items={Object.keys(component).map((id) => ({
                    value: id,
                    name: component[id]._name,
                  }))}
                  label="Styles"
                  onChange={(event: any) => {
                    updateSettings(selectedComponent, "");
                  }}
                />
              </Box>
              <Box>
                <Button
                  onClick={(event) => {
                    const id = uuid();

                    component[id] = {
                      _name: `New Style ${Object.keys(component).length + 1}`,
                    };

                    updateSettings(selectedComponent, id);
                  }}
                  variant="contained"
                >
                  Add Style
                </Button>
              </Box>
            </Box>
          )}

          {component && selectedStyle && (
            <>
              <Settings
                config={[
                  {
                    property: "_name",
                    type: StringSetting,
                  },
                  ...supportedComponents[selectedComponent].styleProperties,
                ]}
                properties={component[selectedStyle]}
                setProp={(callback: (props: any) => void) => {
                  // Important to assign it a new Id
                  const newProps = Object.assign({}, component[selectedStyle], {
                    customId: Math.random(),
                  });
                  callback(newProps);
                  component[selectedStyle] = newProps;

                  store.update();
                }}
              />
              <Button
                onClick={(event) => {
                  const styleIds = Object.keys(component);
                  const index = styleIds.indexOf(selectedStyle);

                  let nextStyle = "";

                  delete component[selectedStyle];

                  if (index > 0) {
                    nextStyle = styleIds[index - 1];
                  } else if (styleIds.length) {
                    nextStyle = styleIds[1];
                  }

                  updateSettings(selectedComponent, nextStyle);
                }}
                variant="contained"
              >
                Delete Style
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};
