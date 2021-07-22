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
  selection: {
    selecting: [],
    selected: [],
  },
  settings: {
    optimize: true,
  },
};
