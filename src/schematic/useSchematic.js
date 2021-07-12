import { useReducer } from 'react';

import { reducer } from './reducer';
import { initializer } from './initializer';

export const useSchematic = (initialSchematic) => {
  const [state, dispatch] = useReducer(reducer, initialSchematic, initializer);

  return {
    schematic: state.schematic,
    addComponent: (comp) => dispatch({ where: 'components', payload: comp }),
    deleteComponent: (id) => dispatch({ id }),
  };
};
