import React from 'react';
import { initialSchematicState } from './state';

export const SchematicContext = React.createContext({
  state: initialSchematicState,
  dispatch: () => undefined,
});
