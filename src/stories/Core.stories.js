import React from 'react';
import { Core } from '../components/Core';
import ResistorSVG from '../assets/resistor-us.svg';

export default {
  title: 'Basic/Core',
  component: Core,
  argTypes: {
    Symbol: { control: '' },
    type: { control: 'select' },
  },
};

const Template = (args) => <Core {...args} />;

export const Resistor = Template.bind({});
Resistor.args = {
  Symbol: ResistorSVG,
  type: 'Resistor',
  label: { name: 'R1', value: '10k', unit: 'Ω', position: { x: 50, y: -25 } },
  ports: [
    { type: 'hybrid', position: { x: 0, y: 0.5 } },
    { type: 'hybrid', position: { x: 1, y: 0.5 } },
  ],
};
