import { useSetupComponent } from "../config/useSetupComponent";
import { documentation } from "./documentation";

export const components: any = {};

export function registerCustomComponent(Component: any) {
  console.log(`Registering custom component ${Component.name}`);
  components[Component.name] = Component;

  documentation.addComponent(Component);
}

(window as any).registerCustomComponent = registerCustomComponent;

(window as any).useSetupComponent = useSetupComponent;
