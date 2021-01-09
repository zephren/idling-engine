interface Style {
  [key: string]: string | number;
}

interface Styles {
  [key: string]: Style;
  base: Style;
}

interface ComponentProperties {
  default: any;
  allowedStyleProperties: Style;
  styles: Styles;
}

export interface ComponentPropertiesMap {
  [key: string]: ComponentProperties;
}

export const componentProperties: ComponentPropertiesMap = {};
