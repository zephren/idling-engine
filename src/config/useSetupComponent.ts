import { useEditor, useNode } from "@craftjs/core";
import { makeStyles, Theme } from "@material-ui/core";
import { useContext } from "react";
import { Context, store } from "../lib/context";

export const useSharedStyles = makeStyles((theme: Theme) => ({
  componentEditing: {
    boxShadow: "inset 0em 0em 0em 2px rgba(255, 50, 50, 1)",
    minHeight: "5px",
    minWidth: "5px",
    padding: "10px!important",
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
    editing && store.state.localSettings.flags.highlightComponents
      ? sharedClasses.componentEditing
      : "",
    selected ? sharedClasses.componentSelected : "",
  ].join(" ");
}

type Properties = {
  additionalClasses?: string[];
};

export function useSetupComponent(properties: Properties = {}) {
  const { additionalClasses = [] } = properties;

  const store = useContext(Context);

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
    store,
  };
}
