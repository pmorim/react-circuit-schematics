import { Node } from '../../components/Node';

export default {
  title: 'Custom Logic/Node',
  component: Node,
  parameters: {
    docs: {
      description: {
        component:
          'The Node components acts like an independent Port. You are able to to connect it to other Nodes or Ports.',
      },
    },
  },
};

export const Simple = (args) => <Node {...args} />;
