import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import ContentEditable from "react-contenteditable";
import { useSetupComponent } from "../../config/useSetupComponent";

export const Text = ({ text, fontSize }: any) => {
  const { refFn, selected, componentClassName } = useSetupComponent();

  return (
    <span ref={refFn}>
      <ContentEditable
        disabled={!selected}
        html={text}
        onChange={
          (e) => null
          // setProp(
          //   (props) =>
          //     (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          // )
        }
        tagName="span"
        style={{ fontSize: `${fontSize}px` }}
        className={componentClassName}
      />
      {/* {selected && (
        <div>
          <FormControl className="text-additional-settings" size="small">
            <FormLabel component="legend">Font size</FormLabel>
            <Slider
              defaultValue={fontSize}
              step={1}
              min={7}
              max={50}
              valueLabelDisplay="auto"
              onChange={(_, value) => {
                setProp((props) => (props.fontSize = value));
              }}
            />
          </FormControl>
        </div>
      )} */}
    </span>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(_, value) => {
            setProp((props) => (props.fontSize = value));
          }}
        />
      </FormControl>
    </>
  );
};

Text.craft = {
  props: {
    text: "Hi",
    fontSize: 20,
  },
  rules: {
    canDrag: (node: any) => true,
  },
  related: {
    settings: TextSettings,
  },
};
