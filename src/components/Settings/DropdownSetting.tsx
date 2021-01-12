import { Dropdown } from "../Controls/Dropdown";

interface Props {
  property: any;
  value: any;
  itemsFn: () => { name: string; value: any }[];
  setProp: any;
}

export const DropdownSetting = ({
  property,
  value,
  itemsFn,
  setProp,
}: Props) => {
  return (
    <Dropdown
      value={value || ""}
      items={itemsFn()}
      onChange={(event: any) => {
        setProp((props: any) => (props[property] = event.target.value));
      }}
    />
  );
};
