import { Flex } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { CarriageAbstractPattern, TrainHeadAbstractPattern } from './CarriageAbstractFrame';
import CarriageLayout from './CarriageLayout';
import PropTypes from 'prop-types';

const SeatsTab = ({ train }) => {
  const [selectedCarriage, setSelectedCarriage] = useState(null);

  useEffect(() => {
    setSelectedCarriage(train?.carriages?.[0]?.id);
  }, [train]);

  const options = useMemo(
    () =>
      train?.carriages
        ?.map((carriage) => ({
          label: `Toa ${carriage?.position}: ${carriage?.carriageLayout?.name}`,
          value: carriage?.id,
          position: carriage?.position,
        }))
        ?.reverse(),
    [train],
  );

  const currentCarriage = useMemo(
    () => train?.carriages?.find((carriage) => carriage?.id === selectedCarriage),
    [selectedCarriage, train],
  );
  return (
    <Flex vertical gap={20}>
      <Flex gap={4} justify="center" className="py-4">
        {options?.map((option) => (
          <CarriageAbstractPattern
            key={option.value}
            name={option.label}
            isSelected={selectedCarriage === option.value}
            {...option}
            onClick={() => {
              setSelectedCarriage(option.value);
            }}
          />
        ))}
        <TrainHeadAbstractPattern name={train?.name} />
      </Flex>
      <CarriageLayout
        {...currentCarriage?.carriageLayout}
        name={`Toa ${currentCarriage?.position}: ${currentCarriage?.carriageLayout?.name}`}
      />
    </Flex>
  );
};

SeatsTab.propTypes = {
  train: PropTypes.object,
};

export default SeatsTab;
