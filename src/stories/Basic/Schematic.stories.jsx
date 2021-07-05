import { Schematic } from '../../components/Schematic';

export default {
  title: 'Basic/Schematic',
  component: Schematic,
  parameters: {
    docs: {
      description: {
        component:
          'The Schematic component is where you hold all of the electrical components.',
      },
    },
  },
};

export const EmptySchematic = (args) => <Schematic {...args} />;
