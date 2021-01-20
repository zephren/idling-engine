import ContentEditable from "react-contenteditable";
import { useCustomStyle } from "../../../config/useCustomStyle";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { customStyles } from "../../../data/customStyles";
import { TextSettings } from "./TextSettings";
import { StringSetting } from "../../Settings";

export const Text = ({ text, customStyleName }: any) => {
  const { refFn, selected, componentClassName } = useSetupComponent();

  const style = useCustomStyle(
    Text.baseStyle,
    customStyles.Text,
    customStyleName
  );

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
        style={style}
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

Text.craft = {
  props: {
    text: "Text",
  },
  rules: {
    canDrag: (node: any) => true,
  },
  related: {
    settings: TextSettings,
  },
};

Text.baseStyle = {
  margin: "0em",
};

Text.styleProperties = [
  {
    property: "fontSize",
    type: StringSetting,
  },
];
