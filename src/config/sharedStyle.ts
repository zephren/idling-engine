import { makeStyles, Theme } from "@material-ui/core";

export const useSharedStyles = makeStyles((theme: Theme) => ({
  componentEditing: {
    boxShadow: "inset 0em 0em 0em 2px red",
    paddingTop: "1em !important",
    paddingBottom: "1em !important",
  },
  componentSelected: {
    boxShadow: "inset 0em 0em 0em 2px green",
  },
}));

export function componentClass(
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
