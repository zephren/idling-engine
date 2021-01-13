import { Button, Drawer, Typography } from "@material-ui/core";
import LoopIcon from "@material-ui/icons/Loop";
import ImportExportIcon from "@material-ui/icons/ImportExport";
// import { useHistory } from "react-router-dom";
import { store } from "../lib/context";
import { useState } from "react";
import { Settings, StringSetting } from "./Settings";
import { customStyles } from "../data/customStyles";
import { Dropdown } from "./Controls/Dropdown";
import * as components from "./user";

// const propertyConfigDefinitions: {
//   [key: string]: any;
// } = {
//   margin: {
//     property: "margin",
//     type: StringSetting,
//   },
//   padding: {
//     property: "padding",
//     type: StringSetting,
//   },
//   height: {
//     property: "height",
//     type: StringSetting,
//   },
// };

export const StyleDrawer = () => {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  let component: any = null;
  if (selectedComponent) {
    component = customStyles[selectedComponent];
  }

  return (
    <div>
      <Drawer
        open={store.state.localSettings.styleDrawerOpen}
        onClose={() => {
          store.state.localSettings.styleDrawerOpen = false;
          store.state.localSettings.highlightComponents =
            store.state.localSettings.previousHighlightComponents;
          store.update();
        }}
        anchor="right"
        BackdropProps={{ invisible: true }}
      >
        <div style={{ padding: "1em" }}>
          <Typography variant="h4">Style Components</Typography>
          <Dropdown
            value={selectedComponent}
            items={Object.keys(components)}
            label="Component"
            onChange={(event: any) => {
              customStyles[event.target.value] =
                customStyles[event.target.value] || {};
              setSelectedComponent(event.target.value);
            }}
          />
          {component && (
            <>
              <Dropdown
                value={selectedStyle}
                items={Object.keys(component)}
                label="Styles"
                onChange={(event: any) => {
                  setSelectedStyle(event.target.value);
                }}
              />
              <Button
                onClick={(event) => {
                  component[`New Style ${Math.random()}`] = {};
                }}
              >
                Add Style
              </Button>
            </>
          )}

          {component && selectedStyle && (
            <Settings
              config={[
                {
                  property: "padding",
                  type: StringSetting,
                },
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
          )}
        </div>
      </Drawer>
    </div>
  );
};
