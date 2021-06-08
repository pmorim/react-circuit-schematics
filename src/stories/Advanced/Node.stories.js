import { Node } from '../../components/Node';

export default {
  title: 'Advanced/Node',
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

export const SimpleNode = (args) => <Node {...args} />;
