import React from 'react';
import { CircuitCanvas } from '../components/CircuitCanvas';

export default {
  title: 'UI/Circuit Canvas',
  component: CircuitCanvas,
};

const Template = (args) => <CircuitCanvas {...args} />;

export const Empty = Template.bind({});
Empty.args = {};
