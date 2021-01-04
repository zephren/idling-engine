import { Container as MUIContainer, Input } from "@material-ui/core";
import { useNode } from "@craftjs/core";
import { useSetupComponent } from "../../config/useSetupComponent";

export const Container = ({ background, padding, children }: any) => {
  const { refFn, componentClassName } = useSetupComponent();

  return (
    <MUIContainer
      ref={refFn}
      style={{ background, padding }}
      className={componentClassName}
    >
      {children}
    </MUIContainer>
  );
};

const ContainerSettings = () => {
  const {
    actions: { setProp },
    padding,
  } = useNode((node) => ({
    padding: node.data.props.padding,
  }));

  return (
    <>
      <Input
        value={padding}
        onChange={(event: any) => {
          setProp((props) => (props.padding = event.target.value));
        }}
      />
    </>
  );
};

Container.craft = {
  props: {
    padding: "0px",
  },
  related: {
    settings: ContainerSettings,
  },
};
