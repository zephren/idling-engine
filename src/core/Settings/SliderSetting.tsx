import { Slider } from "@material-ui/core";

export const SliderSetting = ({
  property,
  value,
  min,
  max,
  step,
  setProp,
}: any) => {
  return (
    <Slider
      value={value || 7}
      step={step}
      min={min}
      max={max}
      onChange={(_, newValue) => {
        setProp((props: any) => (props[property] = newValue));
      }}
    />
  );
};
