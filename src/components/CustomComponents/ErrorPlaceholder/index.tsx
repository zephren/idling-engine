import { useCustomStyle } from "../../../config/useCustomStyle";
import { useSetupComponent } from "../../../config/useSetupComponent";
import { customStyles } from "../../../data/customStyles";

export const ErrorPlaceholder = ({ customStyleName }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  const style = useCustomStyle(
    ErrorPlaceholder.baseStyle,
    customStyles.Text,
    customStyleName
  );

  return (
    <span ref={refFn} className={componentClassName} style={style}>
      COMPONENT NOT LOADED ERROR
    </span>
  );
};

ErrorPlaceholder.componentName = "Text";

ErrorPlaceholder.craft = {
  props: {},
  rules: {
    canDrag: () => false,
  },
  related: {
    settings: {},
  },
};

ErrorPlaceholder.baseStyle = {};

ErrorPlaceholder.styleProperties = [] as any;

// ErrorPlaceholder.documentation = TextDocumentation;

// Do not register this component
// registerCustomComponent();
