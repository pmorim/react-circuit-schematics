import React from 'react';
import XArrow from 'react-xarrows';
import PropTypes from 'prop-types';

export const Connection = ({ start, end, type, properties, ...rest }) => {
  return (
    <XArrow start={start} end={end} path={type} showHead={false} {...rest} />
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
   * The type of path the connection takes
   */
  type: PropTypes.oneOf(['grid', 'smooth', 'straight']),
  /**
   * Optional properties of the connection
   */
  properties: PropTypes.exact({
    color: PropTypes.string,
    stroke: PropTypes.number,
    decoration: PropTypes.exact({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  }),
};

Connection.defaultProps = {
  path: 'grid',
};
