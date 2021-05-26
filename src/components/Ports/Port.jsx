import React from 'react';
import PropTypes from 'prop-types';

import styles from './Port.module.css';

export const Port = ({ ...rest }) => {
  return <div className={styles.port} {...rest} />;
};
