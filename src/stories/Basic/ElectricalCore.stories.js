import { ElectricalCore } from '../../components/ElectricalCore';
import ANDGate from './and-gate.png';

export default {
  title: 'Basic/ElectricalCore',
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
      position: { x: 0, y: -25 },
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
    size={100}
    gridSize={10}
  />
);

export const AlternateImages = () => {
  const data = {
    type: 'DC Voltage Source',
    position: { x: 0, y: 0 },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
    size: 100,
    gridSize: 10,
  };

  return (
    <>
      <ElectricalCore {...data} />
      <ElectricalCore altImageIdx={1} {...data} />
    </>
  );
};

export const CustomComponent = () => (
  <ElectricalCore
    // 👇 You can add your own type and image
    type='AND Gate'
    imgPath={ANDGate} // `import ANDGate from './and-gate.png'`
    // ☝ You can add your own type and image
    ports={[
      {
        type: 'input',
        position: { x: 0.1, y: 0.3 },
      },
      {
        type: 'input',
        position: { x: 0.1, y: 0.7 },
      },
      {
        type: 'output',
        position: { x: 0.9, y: 0.5 },
      },
    ]}
    size={100}
    gridSize={10}
  />
);
