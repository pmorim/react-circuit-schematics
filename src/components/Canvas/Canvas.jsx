import React from 'react';
import PropTypes from 'prop-types';

export const Canvas = ({ width, height, ...rest }) => {
  return (
    <div style={{ width, height }} {...rest}>
      <h2>Hello World</h2>
    </div>
  );
};

Canvas.propTypes = {
  /**
   * The width of the canvas
   */
  width: PropTypes.number,
  /**
   * The height of the canvas
   */
  height: PropTypes.number,
};

Canvas.defaultProps = {
  width: 500,
  height: 500,
};
