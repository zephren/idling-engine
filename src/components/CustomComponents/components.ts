import * as allComponents from "./index";

export const components: any = {};

for (const componentName in allComponents) {
  // Kinda hacky but works
  components[componentName] = (allComponents as any)[componentName];
}
