import { Schematic } from '../../components/Schematic';
import { useSchematic } from '../../hooks/useSchematic';

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

export const RLC_Circuit = () => {
  const RLC_Circuit = {
    components: [
      {
        id: 'VDC',
        type: 'DC Voltage Source',
        position: { x: 50, y: 150 },
        label: {
          name: 'U',
          value: '5',
          unit: 'V',
          position: { x: 90, y: 40 },
        },
        ports: [
          {
            id: 'VDCa',
            type: 'hybrid',
            position: { x: 0.5, y: 0 },
          },
          {
            id: 'VDCb',
            type: 'hybrid',
            position: { x: 0.5, y: 1 },
          },
        ],
      },
      {
        id: 'R',
        type: 'Resistor',
        position: { x: 200, y: 100 },
        label: {
          name: 'R',
          value: '10k',
          unit: 'Ω',
          position: { x: 10, y: 0 },
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
        position: { x: 400, y: 100 },
        label: {
          name: 'L',
          value: '10m',
          unit: 'H',
          position: { x: 10, y: 0 },
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
        position: { x: 500, y: 200, angle: 90 },
        label: {
          name: 'C',
          value: '1µ',
          unit: 'F',
          position: { x: 80, y: 40 },
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
        end: 'VDCb',
      },
      {
        id: 'c4',
        start: 'VDCa',
        end: 'Ra',
      },
    ],
  };

  const { schematic } = useSchematic(RLC_Circuit);
  return <Schematic width={800} height={500} schematic={schematic} />;
};
