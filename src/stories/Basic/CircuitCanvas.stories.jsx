import { CircuitCanvas } from '../../components/CircuitCanvas';

export default {
  title: 'Basic/Circuit Canvas',
  component: CircuitCanvas,
  parameters: {
    docs: {
      description: {
        component:
          'The Circuit Canvas is where you hold all of the electrical components.',
      },
    },
  },
};

export const EmptyCanvas = (args) => <CircuitCanvas {...args} />;
