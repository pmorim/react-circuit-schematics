import React from 'react';
import { Canvas } from '../components/Canvas';

export default {
  title: 'Basic/Canvas',
  component: Canvas,
};

const Template = (args) => <Canvas {...args} />;

export const Empty = Template.bind({});
Empty.args = {};
