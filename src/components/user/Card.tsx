import { Text } from "./Text";
import { Button } from "./Button";
import { Element, useNode } from "@craftjs/core";
import { Card as MUICard, CardActions, CardContent } from "@material-ui/core";
import { useSetupComponent } from "../../config/useSetupComponent";

export const CardTop = ({ children }: any) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <CardContent ref={connect} className="text-only">
      {children}
    </CardContent>
  );
};

CardTop.craft = {
  rules: {
    // Only accept Text
    // canMoveIn: (incomingNode: any) => incomingNode.data.type === Text,
  },
};

export const CardBottom = ({ children }: any) => {
  const {
    connectors: { connect },
  } = useNode();

  return <CardActions ref={connect}>{children}</CardActions>;
};

CardBottom.craft = {
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNode: any) => incomingNode.data.type === Button,
  },
};

export const Card = () => {
  const { refFn, componentClassName } = useSetupComponent();

  return (
    <MUICard ref={refFn} className={componentClassName}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>
      <Element id="buttons" is={CardBottom} canvas>
        <Button size="small" text="Learn more" variant="outlined">
          Hi!
        </Button>
      </Element>
    </MUICard>
  );
};
