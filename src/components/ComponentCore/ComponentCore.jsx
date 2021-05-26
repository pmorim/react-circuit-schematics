import React from 'react';
import Draggable from 'react-draggable';

import { ReactComponent as ResistorSVG } from '../../assets/resistor-us.svg';

export const ComponentCore = ({ ...rest }) => {
  return (
    <Draggable {...rest}>
      <ResistorSVG />
    </Draggable>
  );
};
