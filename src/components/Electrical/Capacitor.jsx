import React from 'react';
import PropTypes from 'prop-types';

import { ElectricalCore } from '../ElectricalCore';
import CapacitorSVG from '../../assets/capacitor.svg';

export const Capacitor = ({ name, value, labelPosition, ...rest }) => (
  <ElectricalCore
    type='Capacitor'
    symbol={CapacitorSVG}
    label={{ name, value, unit: 'F', position: labelPosition }}
    ports={[
      { type: 'hybrid', position: { x: 0, y: 0.5 } },
      { type: 'hybrid', position: { x: 1, y: 0.5 } },
    ]}
    {...rest}
  />
);

Capacitor.propTypes = {
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

Capacitor.defaultProps = {
  name: 'C',
  value: '10µ',
  labelPosition: { x: 50, y: -25 },
};
