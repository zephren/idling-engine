import { TextField } from "@material-ui/core";

export const StringSetting = ({ property, value, setProp }: any) => {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(event: any) => {
        setProp((props: any) => (props[property] = event.target.value));
      }}
    />
  );
};
