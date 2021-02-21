import { useSetupComponent } from "../../config/useSetupComponent";
import { documentation } from "../../data/documentation";

class PluginRegistry {
  _components: any = {};
  _componentsArray: any[] = [];

  _pluginCategories: any = {
    saveManager: new Map<string, any>(),
  };

  get components() {
    return this._components;
  }

  get componentsArray() {
    return this._componentsArray;
  }

  registerPlugin(plugin: any, category: string) {
    if (!this._pluginCategories[category]) {
      throw new Error(`Invalid plugin category: ${category}`);
    }

    this._pluginCategories[category].set(plugin.pluginName, plugin);
  }

  registerCustomComponent(Component: any) {
    // console.debug(`Registering custom component ${Component.componentName}`);
    this._components[Component.componentName] = Component;

    documentation.addComponent(Component);

    this.componentsArray.push(Component);
  }

  getPlugin(category: string, pluginName: string) {
    return this._pluginCategories[category].get(pluginName);
  }
}

export const pluginRegistry = new PluginRegistry();

(window as any).pluginRegistry = pluginRegistry;
(window as any).useSetupComponent = useSetupComponent;
