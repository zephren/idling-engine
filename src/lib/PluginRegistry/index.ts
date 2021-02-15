import { useSetupComponent } from "../../config/useSetupComponent";
import { documentation } from "../../data/documentation";

class PluginRegistry {
  _components: any = {};
  _componentsArray: any[] = [];

  get components() {
    return this._components;
  }

  get componentsArray() {
    return this._componentsArray;
  }

  registerPlugin() {}

  registerCustomComponent(Component: any) {
    console.log(`Registering custom component ${Component.componentName}`);
    this._components[Component.componentName] = Component;

    documentation.addComponent(Component);

    this.componentsArray.push(Component);
  }
}

export const pluginRegistry = new PluginRegistry();

(window as any).pluginRegistry = pluginRegistry;
(window as any).useSetupComponent = useSetupComponent;
