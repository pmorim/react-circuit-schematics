import React from 'react';
import { Port } from '../../components/Ports';

export default {
  title: 'Advanced/Port',
  component: Port,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Port component is what allows the user to create connections between components.',
      },
    },
  },
};

export const Simple = (args) => (
  <div style={{ position: 'relative' }}>
    <Port {...args} />
  </div>
);
