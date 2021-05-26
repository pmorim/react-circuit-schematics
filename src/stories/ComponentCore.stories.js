import React from 'react';
import { ComponentCore } from '../components/ComponentCore';

export default {
  title: 'Electrical/Core',
  component: ComponentCore,
};

const Template = (args) => <ComponentCore {...args} />;

export const Resistor = Template.bind({});
