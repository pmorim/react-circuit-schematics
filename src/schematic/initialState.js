export const initialState = {
  schematic: {
    components: [
      {
        id: 'r1',
        type: 'Resistor',
        position: { x: 100, y: 0 },
        label: {
          name: 'R1',
          value: '10k',
          unit: 'Ω',
        },
        ports: [
          {
            id: 'r1a',
            type: 'hybrid',
            position: { x: 0, y: 0.5 },
          },
          {
            id: 'r1b',
            type: 'hybrid',
            position: { x: 1, y: 0.5 },
          },
        ],
      },
      {
        id: 'r2',
        type: 'Resistor',
        position: { x: 300, y: 200, angle: 90 },
        label: {
          name: 'R2',
          value: '10k',
          unit: 'Ω',
        },
        ports: [
          {
            id: 'r2a',
            type: 'hybrid',
            position: { x: 0, y: 0.5 },
          },
          {
            id: 'r2b',
            type: 'hybrid',
            position: { x: 1, y: 0.5 },
          },
        ],
      },
    ],
    connections: [
      {
        id: 'c1',
        start: 'r1b',
        end: 'r2a',
      },
    ],
    nodes: [],
  },
  settings: {
    optimize: true,
  },
};
