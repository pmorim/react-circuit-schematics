import React from 'react';
import Draggable from 'react-draggable';

import styles from './Label.module.css';

export const Label = ({ children, ...rest }) => {
  return (
    <Draggable>
      <div className={styles.label}>{children}</div>
    </Draggable>
  );
};
