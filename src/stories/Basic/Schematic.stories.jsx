import { Schematic } from '../../components/Schematic';
import { useSchematic } from '../../schematic';

export default {
  title: 'Basic/Schematic',
  component: Schematic,
  parameters: {
    docs: {
      description: {
        component:
          'The Schematic component is where you hold all of the electrical components.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

import { initialState } from '../../schematic/initialState';
export const EmptySchematic = (args) => {
  const { schematic } = useSchematic(initialState);

  return <Schematic data={schematic} {...args} />;
};
