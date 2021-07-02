import React from 'react';
import { CircuitCanvas } from '../../components/CircuitCanvas';
import { Port } from '../../components/Port';

export default {
  title: 'Custom Logic/Port',
  component: Port,
  parameters: {
    docs: {
      description: {
        component:
          'The Port component is what allows the user to create connections between components',
      },
    },
  },
};

export const Simple = () => {
  const size = 500;

  return (
    <CircuitCanvas width={size} height={size}>
      <Port bounds={{ x: size, y: size }} />
    </CircuitCanvas>
  );
};
