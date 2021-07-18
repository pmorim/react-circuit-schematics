import React, { useRef } from 'react';
import { Connection } from '../../components/Connection';
import { Node } from '../../components/Node';

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

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <Node ref={start} position={{ x: 0, y: 0 }} />
      <Node ref={end} position={{ x: 200, y: 50 }} />

      <Connection start={start} end={end} />
    </div>
  );
};

export const Labeled = () => {
  const start = useRef();
  const end = useRef();

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <Node ref={start} position={{ x: 0, y: 0 }} />
      <Node ref={end} position={{ x: 200, y: 0 }} />

      <Connection
        start={start}
        end={end}
        label={{ name: 'Hello', position: { x: 70, y: -30 } }}
      />
    </div>
  );
};
