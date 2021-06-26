import React from 'react';

import { ElectricalCore } from '../ElectricalCore';
import PolarizedCapacitorSVG from '../../assets/polarized-capacitor.svg';

export const PolarizedCapacitor = ({ name, value, labelPosition, ...rest }) => (
  <ElectricalCore
    type='Polarized Capacitor'
    symbol={PolarizedCapacitorSVG}
    label={{ name, value, unit: 'F', defaultPosition: labelPosition }}
    ports={[
      { type: 'hybrid', position: { x: 0, y: 0.5 } },
      { type: 'hybrid', position: { x: 1, y: 0.5 } },
    ]}
    {...rest}
  />
);

PolarizedCapacitorSVG.propTypes = {
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

PolarizedCapacitorSVG.defaultProps = {
  name: 'C',
  value: '10µ',
  labelPosition: { x: 50, y: -25 },
};
