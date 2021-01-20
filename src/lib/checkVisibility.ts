import { game } from "../data/game";

export function checkVisibility(visibilitySource: string, enabled: boolean) {
  if (!visibilitySource) {
    return {};
  }

  const extraStyle: any = {};

  if (
    game.visibilitySources[visibilitySource] &&
    !game.visibilitySources[visibilitySource]()
  ) {
    if (enabled) {
      extraStyle.opacity = "0.25";
    } else {
      return null;
    }
  }

  return extraStyle;
}
