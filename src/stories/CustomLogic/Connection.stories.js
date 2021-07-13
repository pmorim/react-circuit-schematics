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
      source: {
        type: 'code',
      },
    },
  },
};

export const Simple = () => {
  const start = useRef();
  const end = useRef();

  const size = 200;
  const bounds = { x: size, y: size };

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <Port ref={start} position={{ x: 0, y: 0 }} bounds={bounds} />
      <Port ref={end} position={{ x: 1, y: 0.5 }} bounds={bounds} />

      <Connection start={start} end={end} />
    </div>
  );
};
