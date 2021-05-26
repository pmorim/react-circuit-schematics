import React from 'react';
import { ComponentCore } from '../components/ComponentCore';
import ResistorSVG from '../assets/resistor-us.svg';

export default {
  title: 'Basic/Component Core',
  component: ComponentCore,
  argTypes: {
    Symbol: { control: '' },
  },
};

const Template = (args) => <ComponentCore {...args} />;

export const Resistor = Template.bind({});
Resistor.args = {
  Symbol: ResistorSVG,
  label: 'R1 = 10k Ω',
  ports: [
    { type: 'hybrid', place: 'left' },
    { type: 'hybrid', place: 'right' },
  ],
};
