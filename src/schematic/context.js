import React from 'react';
import { initialState } from './state';

export const SchematicContext = React.createContext({
  state: initialState,
  dispatch: () => undefined,
});
