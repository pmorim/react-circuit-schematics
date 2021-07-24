import React, { useRef } from 'react';
import { Schematic } from '../../components/Schematic';
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
      description: {
        component:
          'The Connection component allows the user to connect Ports and \
          Nodes.',
      },
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
    <Schematic>
      <Node ref={start} position={{ x: 0, y: 0 }} />
      <Node ref={end} position={{ x: 200, y: 40 }} />

      <Connection start={start} end={end} />
    </Schematic>
  );
};

export const Labeled = () => {
  const start = useRef();
  const end = useRef();

  return (
    <Schematic>
      <Node ref={start} position={{ x: 0, y: 0 }} />
      <Node ref={end} position={{ x: 200, y: 0 }} />

      <Connection
        start={start}
        end={end}
        label={{ name: 'Hello', position: { x: 80, y: -20 } }}
      />
    </Schematic>
  );
};
