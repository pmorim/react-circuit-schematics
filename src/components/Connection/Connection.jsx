import React from 'react';
import XArrow from 'react-xarrows';
import PropTypes from 'prop-types';

import { Label } from '../Label';

export const Connection = ({
  start,
  end,
  label,
  type,
  properties,
  ...rest
}) => {
  return (
    <>
      <XArrow
        start={start}
        end={end}
        path={type}
        showHead={false}
        gridBreak={1}
        divContainerStyle={{ zIndex: -1 }}
        {...rest}
      />
      <Label {...label} />
    </>
  );
};

Connection.propTypes = {
  /**
   * A `ref` to the component where the connection starts
   */
  start: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]).isRequired,
  /**
   * A `ref` to the component where the connection ends
   */
  end: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]).isRequired,
  /**
   * The label of the connection
   */
  label: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  /**
   * The type of path the connection takes
   */
  type: PropTypes.oneOf(['grid', 'smooth', 'straight']),
  /**
   * Optional properties of the connection
   */
  properties: PropTypes.shape({
    color: PropTypes.string,
    stroke: PropTypes.number,
    decoration: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  }),
};

Connection.defaultProps = {
  type: 'grid',
};
