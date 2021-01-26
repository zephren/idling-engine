class Documentation {
  components: any = {};

  addComponent(component: any) {
    this.components[component.name] = {
      name: component.name,
      component,
    };
  }
}

export const documentation = new Documentation();
