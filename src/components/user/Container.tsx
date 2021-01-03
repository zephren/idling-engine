import { Container as MUIContainer, Input } from "@material-ui/core";
import { useNode } from "@craftjs/core";

export const Container = ({ background, padding, children }: any) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <MUIContainer
      ref={(ref: any) => connect(drag(ref))}
      style={{ background, padding }}
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
