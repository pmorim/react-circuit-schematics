export const defaultState = {
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
  flags: {
    connecting: false,
  },
};
