import React from 'react';

import { ElectricalCore } from '../ElectricalCore';
import ResistorSVG from '../../assets/resistor.svg';

export const Resistor = ({ name, value, labelPosition, ...rest }) => (
  <ElectricalCore
    type='Resistor'
    symbol={ResistorSVG}
    label={{ name, value, unit: 'Ω', defaultPosition: labelPosition }}
    ports={[
      { type: 'hybrid', position: { x: 0, y: 0.5 } },
      { type: 'hybrid', position: { x: 1, y: 0.5 } },
    ]}
    {...rest}
  />
);

Resistor.propTypes = {
  /**
   * The name of the component
   */
  name: PropTypes.string,
  /**
   * The value of the component (including the multiplier)
   */
  value: PropTypes.string,
  /**
   * The default position of the component's label
   */
  labelPosition: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

Resistor.defaultProps = {
  name: 'R',
  value: '10k',
  labelPosition: { x: 50, y: -25 },
};
