import React from 'react';
import XArrow from 'react-xarrows';
import PropTypes from 'prop-types';

import styles from './Connection.module.css';

export const Connection = ({ start, end, path, ...rest }) => {
  return (
    <XArrow start={start} end={end} path={path} showHead={false} {...rest} />
  );
};

Connection.propTypes = {
  /**
   * A `ref` to the component where the connection starts
   */
  start: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  /**
   * A `ref` to the component where the connection ends
   */
  end: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  /**
   * The type of path the connection takes
   */
  path: PropTypes.oneOf(['grid', 'smooth', 'straight']),
};

Connection.defaultProps = {
  path: 'grid',
};
