import { Schematic } from '../../components/Schematic';
import { useSchematic } from '../../schematic';
import { initialState } from '../../schematic/initialState';

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

export const Empty = () => <Schematic width={800} height={500} />;

export const Simple = () => {
  const { schematic } = useSchematic(initialState);

  return <Schematic width={800} height={500} data={schematic} />;
};
