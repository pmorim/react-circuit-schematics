import React from 'react';
import PropTypes from 'prop-types';

import { ElectricalCore } from '../ElectricalCore';
import InductorSVG from '../../assets/inductor.svg';

export const Inductor = ({ name, value, labelPosition, ...rest }) => (
  <ElectricalCore
    type='Inductor'
    symbol={InductorSVG}
    label={{ name, value, unit: 'H', position: labelPosition }}
    ports={[
      { type: 'hybrid', position: { x: 0, y: 0.5 } },
      { type: 'hybrid', position: { x: 1, y: 0.5 } },
    ]}
    {...rest}
  />
);

Inductor.propTypes = {
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

Inductor.defaultProps = {
  name: 'L',
  value: '10m',
  labelPosition: { x: 50, y: -25 },
};
