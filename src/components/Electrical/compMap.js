import { Resistor } from './Resistor';
import { Inductor } from './Inductor';
import { Capacitor } from './Capacitor';
import { PolarizedCapacitor } from './PolarizedCapacitor';
import { Reactance } from './Reactance';

export const compMap = new Map([
  ['Resistor', <Resistor />],
  ['Inductor', <Inductor />],
  ['Capacitor', <Capacitor />],
  ['PolarizedCapacitor', <PolarizedCapacitor />],
  ['Reactance', <Reactance />],
]);
