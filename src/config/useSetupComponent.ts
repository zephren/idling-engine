import { useEditor, useNode } from "@craftjs/core";
import { makeStyles, Theme } from "@material-ui/core";

export const useSharedStyles = makeStyles((theme: Theme) => ({
  componentEditing: {
    boxShadow: "inset 0em 0em 0em 2px red",
    minHeight: "5px",
    minWidth: "5px",
  },
  componentSelected: {
    boxShadow: "inset 0em 0em 0em 2px green",
  },
}));

function componentClass(
  editing: boolean,
  selected: boolean,
  sharedClasses: any,
  additonalClasses: string[] = []
) {
  return [
    ...additonalClasses,
    editing ? sharedClasses.componentEditing : "",
    selected ? sharedClasses.componentSelected : "",
  ].join(" ");
}

type Properties = {
  additionalClasses?: string[];
};

export function useSetupComponent(properties: Properties = {}) {
  const { additionalClasses = [] } = properties;

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state: any) => ({
    selected: state.events.selected,
  }));

  const { enabled } = useEditor((state: any) => ({
    enabled: state.options.enabled,
  }));

  const sharedClasses = useSharedStyles();
  const componentClassName = componentClass(
    enabled,
    selected,
    sharedClasses,
    additionalClasses
  );

  const refFn = (ref: any) => connect(drag(ref));

  return {
    refFn,
    // connect,
    // drag,
    selected,
    enabled,
    // sharedClasses,
    componentClassName,
  };
}
