import React, { useRef } from 'react';
import { Connection } from '../../components/Connection';
import { Port } from '../../components/Ports';

export default {
  title: 'Custom Logic/Connection',
  component: Connection,
  parameters: {
    docs: {
      description: {
        component:
          'The Connection component is used to connect two components. Usually, instances of either `Port` or `Node`. This component makes use of [react-xarrows](https://www.npmjs.com/package/react-xarrows), therefore, any extra props you pass to this component will be forwarded to `XArrow`.',
      },
    },
  },
};

export const Simple = () => {
  const start = useRef();
  const end = useRef();

  return (
    <div style={{ position: 'relative' }}>
      <Port position={{ x: 0, y: 0 }} bounds={{ x: 200, y: 200 }} ref={start} />
      <Port position={{ x: 1, y: 0 }} bounds={{ x: 200, y: 200 }} ref={end} />

      <Connection start={start} end={end} />
    </div>
  );
};
