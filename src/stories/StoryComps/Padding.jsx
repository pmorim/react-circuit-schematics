import React from 'react';
import PropTypes from 'prop-types';

export const Padding = ({ amt, ...rest }) => {
  return <div style={{ padding: `${amt}` }} {...rest} />;
};

Padding.propTypes = {
  /**
   * The amount of padding
   */
  amt: PropTypes.string,
};

Padding.defaultProps = {
  amt: '10px',
};
