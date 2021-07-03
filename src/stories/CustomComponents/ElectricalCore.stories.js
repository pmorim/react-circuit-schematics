import { ElectricalCore } from '../../components/ElectricalCore';
import ResistorSVG from '../../assets/resistor.svg';

export default {
  title: 'Custom Components/ElectricalCore',
  component: ElectricalCore,
  argTypes: {
    symbol: { control: { type: null } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'All electrical components are created with this one. Electrical Core takes care of all the logic that comes with assembling the component itself. You can use this component to make your own electrical components.',
      },
    },
  },
};

export const ResistorExample = (args) => <ElectricalCore {...args} />;
ResistorExample.args = {
  symbol: ResistorSVG,
  type: 'Resistor',
  label: {
    name: 'R1',
    value: '10k',
    unit: 'Ω',
    position: { x: 50, y: -25 },
  },
  ports: [
    { type: 'hybrid', position: { x: 0, y: 0.5 } },
    { type: 'hybrid', position: { x: 1, y: 0.5 } },
  ],
};
