import React, { useRef } from 'react';

import { Schematic } from '../../components/Schematic';
import { Ghost } from '../../components/Ghost';
import { Connection } from '../../components/Connection';
import { Node } from '../../components/Node';

export default {
  title: 'Custom Logic/Ghost',
  component: Ghost,
  argTypes: {
    as: { control: '' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Ghost gives the component, passed in the "as" prop, a \
          transparency. It\'s useful to display a temporary preview of certain components.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const Compare = () => {
  const nodeRef = useRef();
  const ghostNodeRef = useRef();

  return (
    <Schematic>
      <Node ref={nodeRef} position={{ x: 0, y: 0 }} />
      <Ghost as={Node} ref={ghostNodeRef} position={{ x: 200, y: 40 }} />

      <Connection start={nodeRef} end={ghostNodeRef} />
      <Ghost as={Connection} start={ghostNodeRef} end={nodeRef} />
    </Schematic>
  );
};
