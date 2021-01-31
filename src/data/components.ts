import { useSetupComponent } from "../config/useSetupComponent";
import { documentation } from "./documentation";

export const components: any = {};

export function registerCustomComponent(Component: any) {
  console.log(`Registering custom component ${Component.componentName}`);
  components[Component.componentName] = Component;

  documentation.addComponent(Component);
}

(window as any).registerCustomComponent = registerCustomComponent;

(window as any).useSetupComponent = useSetupComponent;
