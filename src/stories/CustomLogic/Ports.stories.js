import React from 'react';
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

export const Simple = (args) => (
  <div style={{ position: 'relative' }}>
    <Port {...args} />
  </div>
);
