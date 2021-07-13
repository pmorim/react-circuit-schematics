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

export const Empty = () => <Schematic width={800} height={500} />;

export const Simple = () => {
  const RLC_Circuit = {
    schematic: {
      components: [
        {
          id: 'R',
          type: 'Resistor',
          position: { x: 100, y: 50 },
          label: {
            name: 'R',
            value: '10k',
            unit: 'Ω',
            position: { x: 10, y: -100 },
          },
          ports: [
            {
              id: 'Ra',
              type: 'hybrid',
              position: { x: 0, y: 0.5 },
            },
            {
              id: 'Rb',
              type: 'hybrid',
              position: { x: 1, y: 0.5 },
            },
          ],
        },
        {
          id: 'L',
          type: 'Inductor',
          position: { x: 200, y: 50 },
          label: {
            name: 'L',
            value: '10m',
            unit: 'H',
            position: { x: 10, y: -100 },
          },
          ports: [
            {
              id: 'La',
              type: 'hybrid',
              position: { x: 0, y: 0.5 },
            },
            {
              id: 'Lb',
              type: 'hybrid',
              position: { x: 1, y: 0.5 },
            },
          ],
        },
        {
          id: 'C',
          type: 'Capacitor',
          position: { x: 300, y: 200, angle: 90 },
          label: {
            name: 'C',
            value: '1µ',
            unit: 'F',
            position: { x: 90, y: -65 },
          },
          ports: [
            {
              id: 'Ca',
              type: 'hybrid',
              position: { x: 0, y: 0.5 },
            },
            {
              id: 'Cb',
              type: 'hybrid',
              position: { x: 1, y: 0.5 },
            },
          ],
        },
      ],
      nodes: [],
      connections: [
        {
          id: 'c1',
          start: 'Rb',
          end: 'La',
        },
        {
          id: 'c2',
          start: 'Lb',
          end: 'Ca',
        },
        {
          id: 'c3',
          start: 'Cb',
          end: 'Ra',
        },
      ],
    },
    settings: {
      optimize: true,
    },
  };

  const { schematic } = useSchematic(RLC_Circuit);
  return <Schematic width={800} height={500} data={schematic} />;
};
