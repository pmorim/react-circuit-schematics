import React from 'react';
import PropTypes from 'prop-types';

import { ElectricalCore } from '../ElectricalCore';
import ReactanceSVG from '../../assets/reactance.svg';

export const Reactance = ({ name, value, labelPosition, ...rest }) => (
  <ElectricalCore
    type='Reactance'
    symbol={ReactanceSVG}
    label={{ name, value, unit: 'Ω', position: labelPosition }}
    ports={[
      { type: 'hybrid', position: { x: 0, y: 0.5 } },
      { type: 'hybrid', position: { x: 1, y: 0.5 } },
    ]}
    {...rest}
  />
);

Reactance.propTypes = {
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

Reactance.defaultProps = {
  name: 'X',
  value: '100',
  labelPosition: { x: 50, y: -25 },
};
