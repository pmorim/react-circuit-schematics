import React from 'react';
import PropTypes from 'prop-types';

import styles from './Ports.module.css';

export const Ports = ({ children, ...rest }) => {
  return (
    <div className={styles.ports} {...rest}>
      {children}
    </div>
  );
};
