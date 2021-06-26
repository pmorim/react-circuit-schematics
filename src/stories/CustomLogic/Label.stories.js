import { Label } from '../../components/Label';

export default {
  title: 'Custom Logic/Label',
  component: Label,
  argTypes: {
    as: { control: { type: null } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Label component displays to the user the name, value and unit of the electrical component. It is also able to be dragged around.',
      },
    },
  },
};

export const ResistorLabel = (args) => <Label {...args} />;
ResistorLabel.args = {
  name: 'R1',
  value: '10k',
  unit: 'Ω',
};
