import { ElectricalCore } from '../../components/ElectricalCore';

export default {
  title: 'Custom Components/ElectricalCore',
  component: ElectricalCore,
  parameters: {
    docs: {
      description: {
        component:
          'All electrical components are created from this one. `<ElectricalCore />` takes care of all the logic that comes with assembling the component itself. You can use this component to make your own custom electrical components.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const ResistorExample = () => (
  <ElectricalCore
    type='Resistor'
    position={{ x: 0, y: 0 }}
    label={{
      name: 'R1',
      value: '10k',
      unit: 'Ω',
      position: { x: 50, y: -25 },
    }}
    ports={[
      {
        type: 'hybrid',
        position: { x: 0, y: 0.5 },
      },
      {
        type: 'hybrid',
        position: { x: 1, y: 0.5 },
      },
    ]}
  />
);
