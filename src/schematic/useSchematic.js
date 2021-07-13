import { useReducer } from 'react';

import { reducer } from './reducer';
import { initializer } from './initializer';

const defaultSchematic = {
  schematic: {
    components: [],
    nodes: [],
    connections: [],
  },
  settings: {
    optimize: true,
  },
};

export const useSchematic = (initialSchematic) => {
  const initial = { ...defaultSchematic, ...initialSchematic };
  const [state, dispatch] = useReducer(reducer, initial, initializer);

  return {
    schematic: state.schematic,
    addComponent: (comp) => dispatch({ where: 'components', payload: comp }),
    deleteComponent: (id) => dispatch({ id }),
  };
};
