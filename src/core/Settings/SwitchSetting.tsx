import { Switch } from "@material-ui/core";

export const SwitchSetting = ({ property, value, onChange }: any) => {
  return <Switch checked={value || false} onChange={onChange} />;
};
