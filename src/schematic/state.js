export const initialState = {
  schematic: {
    components: [],
    connections: [],
    nodes: [
      {
        id: 'a',
        type: 'real',
        position: { x: 0, y: 0 },
        properties: { color: '#000', radius: 10 },
      },
      {
        id: 'b',
        type: 'real',
        position: { x: 200, y: 100 },
        properties: { color: '#000', radius: 10 },
      },
    ],
  },
  refMap: new Map(),
};
