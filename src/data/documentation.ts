class Documentation {
  components: any = {};

  addComponent(component: any) {
    this.components[component.componentName] = {
      componentName: component.componentName,
      component,
    };
  }
}

export const documentation = new Documentation();
