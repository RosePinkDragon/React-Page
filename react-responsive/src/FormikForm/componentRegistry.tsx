import DefaultComponent from "./DefaultComponent";
import type { FormField } from "./formelements";

// Inside your module code
const componentRegistry: { [type: string]: React.FC } = {};

function registerComponent(type: string, component: React.FC) {
  componentRegistry[type] = component;
}

function renderFormField(field: FormField) {
  const { type } = field;
  const Component = componentRegistry[type] || DefaultComponent;

  return <Component />;
}

export { registerComponent, renderFormField };
