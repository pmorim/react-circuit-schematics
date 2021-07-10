export const initialState = {
  schematic: {
    components: [
      {
        id: 'd',
        type: 'Resistor',
        position: { x: 100, y: 100 },
        label: {
          name: 'RL',
          value: '2M',
          unit: 'Ω',
        },
        ports: [
          {
            id: 'd1',
            type: 'hybrid',
            position: { x: 0, y: 0.5 },
          },
          {
            id: 'd2',
            type: 'hybrid',
            position: { x: 1, y: 0.5 },
          },
        ],
      },
    ],
    connections: [
      {
        id: 'c',
        start: 'a',
        end: 'b',
      },
      {
        id: 'e',
        start: 'b',
        end: 'd1',
      },
    ],
    nodes: [
      {
        id: 'a',
        type: 'real',
        position: { x: 0, y: 0 },
        //properties: { color: '#000', radius: 10 },
      },
      {
        id: 'b',
        type: 'real',
        position: { x: 200, y: 100 },
        //properties: { color: '#000', radius: 10 },
      },
    ],
  },
};
