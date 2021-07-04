import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const reducer = (state, action) => {
  switch (action.type) {
    /**
     * Adds the given component with a randomly generated id
     */
    case 'add':
      state[action.which].push({ id: uuidv4(), ...action.payload });
      return state;

    /**
     * Deletes a component by the given id
     */
    case 'delete':
      return {
        ...state,
        [action.which]: state[action.which].filter(
          (comp) => comp.id !== action.id,
        ),
      };

    case 'buildRefs':

    /**
     * Throw error if the given action type is not defined
     */
    default:
      throw new Error('Action type not supported.');
  }
};
