import React from 'react';
import { Editable } from './Editable';

const toDeg = (angle) => angle * (180 / Math.PI);
const toRad = (angle) => angle * (Math.PI / 180);

export const Imaginary = ({
  format,
  real,
  imaginary,
  imUnit,
  modulus,
  teta,
  decimalPlaces,
  onChange,
  ...rest
}) => {
  switch (format) {
    case 'polar':
      modulus =
        modulus ??
        Math.sqrt(Math.pow(real, 2) + Math.pow(imaginary, 2)).toFixed(
          decimalPlaces,
        );
      teta = teta ?? toDeg(Math.atan2(imaginary, real)).toFixed(decimalPlaces);

      return (
        <>
          <Editable onInput={(modulus) => onChange({ modulus })} {...rest}>
            {modulus}
          </Editable>
          {' ∡ '}
          <Editable onInput={(teta) => onChange({ teta })} {...rest}>
            {teta}
          </Editable>
          {'°'}
        </>
      );

    case 'cartesian':
    default:
      real = real ?? (modulus * Math.cos(toRad(teta))).toFixed(decimalPlaces);
      imaginary =
        imaginary ?? (modulus * Math.sin(toRad(teta))).toFixed(decimalPlaces);

      return (
        <>
          <Editable onInput={(real) => onChange({ real })} {...rest}>
            {real}
          </Editable>
          {imaginary >= 0 ? ' + ' : ' - '}
          <Editable onInput={(imaginary) => onChange({ imaginary })} {...rest}>
            {Math.abs(imaginary)}
          </Editable>
          {imUnit ?? 'j'}
        </>
      );
  }
};
