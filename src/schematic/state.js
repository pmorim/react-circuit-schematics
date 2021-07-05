export const initialState = {
  schematic: {
    components: [
      {
        id: 'd',
        type: 'Resistor',
        name: 'RL',
        value: '2M',
      },
    ],
    connections: [
      {
        id: 'c',
        path: 'grid',
        start: 'a',
        end: 'b',
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
