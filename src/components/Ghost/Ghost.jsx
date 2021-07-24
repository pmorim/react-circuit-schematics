import { createElement, forwardRef } from 'react';
import PropTypes from 'prop-types';

export const Ghost = forwardRef(({ as, opacity, ...rest }, ref) =>
  createElement(as, { ref: ref, properties: { opacity }, ...rest }),
);

Ghost.propTypes = {
  /**
   * The type of component to be displayed as a ghost
   */
  as: PropTypes.any,
  /**
   * The amount of opacity to be applied to the component
   */
  opacity: PropTypes.number,
};

Ghost.defaultProps = {
  opacity: 0.75,
};
