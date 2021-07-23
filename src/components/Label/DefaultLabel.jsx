import React from 'react';

import { Editable } from './Editable';
import { Imaginary } from './Imaginary';

export const DefaultLabel = ({
  name,
  value,
  multiplier,
  unit,
  onChange,
  ...rest
}) => {
  return (
    <b>
      {name && (
        <Editable onInput={(name) => onChange({ name })} {...rest}>
          {name}
        </Editable>
      )}
      {value && (
        <>
          {' = '}
          {value instanceof Object ? (
            <Imaginary onChange={onChange} {...value} />
          ) : (
            <Editable onInput={(value) => onChange({ value })} {...rest}>
              {value}
            </Editable>
          )}
        </>
      )}{' '}
      {multiplier && (
        <Editable onInput={(multiplier) => onChange({ multiplier })} {...rest}>
          {multiplier}
        </Editable>
      )}
      {unit}
    </b>
  );
};
