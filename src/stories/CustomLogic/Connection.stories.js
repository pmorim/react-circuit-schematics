import React, { useRef } from 'react';
import { Connection } from '../../components/Connection';
import { Port } from '../../components/Port';

export default {
  title: 'Custom Logic/Connection',
  component: Connection,
  argTypes: {
    start: { control: '' },
    end: { control: '' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Connection component is used to connect two components. Usually, instances of either `Port` or `Node`. This component makes use of [react-xarrows](https://www.npmjs.com/package/react-xarrows), therefore, any extra props you pass to this component will be forwarded to `XArrow`.',
      },
    },
  },
};

const Template = (args) => {
  const start = useRef();
  const end = useRef();

  const size = 200;
  const bounds = { x: size, y: size };

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <Port ref={start} position={{ x: 0, y: 0 }} bounds={bounds} />
      <Port ref={end} position={{ x: 1, y: 0.5 }} bounds={bounds} />

      <Connection start={start} end={end} {...args} />
    </div>
  );
};

export const Simple = Template.bind({});
