import { useRef } from 'react';

export const initializer = (initialState) => {
  // Initialize an hash map to store the refs
  initialState.refMap = new Map();

  // Populate the hash map
  for (const type of Object.values(initialState.schematic)) {
    for (const obj of type) {
      initialState.refMap.set(obj.id, useRef());
    }
  }

  // Return the updated state
  return initialState;
};
