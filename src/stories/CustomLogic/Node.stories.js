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
      source: {
        type: 'code',
      },
    },
  },
};

export const Simple = () => (
  <div style={{ position: 'relative' }}>
    <Node />
  </div>
);

export const Labeled = () => (
  <div style={{ position: 'relative' }}>
    <Node label={{ name: 'A', position: { x: -10, y: -30 } }} />
  </div>
);
