export const initialState = {
  schematic: {
    components: [],
    nodes: [],
    connections: [],
  },
  history: {
    undoStack: [],
    redoStack: [],
  },
  settings: {
    optimize: true,
  },
};
