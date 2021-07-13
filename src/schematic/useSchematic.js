import { useReducer } from 'react';

import { reducer, ACTIONS } from './reducer';
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
    /**
     * The schematic object.
     *
     * It contains all the data needed to display the schematic.
     */
    schematic: state.schematic,

    /**
     * Adds a component to the schematic.
     * If the component doesn't have an id, then it creates one.
     *
     * @param {Object} component The component to be added
     */
    addComponent: (component) => {
      dispatch({
        type: ACTIONS.ADD,
        payload: {
          where: 'components',
          element: component,
        },
      });
    },

    /**
     * Deletes a component from the schematic.
     *
     * @param {String} id The id of the component.
     */
    deleteComponent: (id) => {
      dispatch({ type: ACTIONS.DELETE, payload: { id } });
    },
  };
};
