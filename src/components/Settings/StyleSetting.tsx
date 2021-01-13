import { Button } from "@material-ui/core";
import { customStyles } from "../../data/customStyles";
import { Dropdown } from "../Controls/Dropdown";

interface Props {
  property: any;
  value: any;
  componentName: string;
  setProp: any;
}

export const StyleSetting = ({
  property,
  value,
  componentName,
  setProp,
}: Props) => {
  console.log(componentName);
  if (!customStyles[componentName]) {
    return "No styles defined...";
  }

  return (
    <>
      <Dropdown
        value={value || ""}
        items={Object.keys(customStyles[componentName])}
        onChange={(event: any) => {
          setProp((props: any) => (props[property] = event.target.value));
        }}
      />
      <Button
        onClick={() => {
          setProp((props: any) => (props[property] = null));
        }}
      >
        Reset
      </Button>
    </>
  );
};
