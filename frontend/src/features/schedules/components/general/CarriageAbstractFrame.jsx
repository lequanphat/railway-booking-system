import { Flex, Tooltip } from 'antd';
import carriageFrame from '~/assets/images/carriage-frame.png';
import trainHeadFrame from '~/assets/images/train-head-frame.png';
import PropTypes from 'prop-types';

const CarriageAbstractPattern = ({ name, position, isSelected, ...others }) => {
  return (
    <Flex vertical align="center" gap={8} {...others}>
      <Tooltip placement="top" title={name}>
        <div
          className={`${isSelected ? 'bg-[#a6b727]' : 'bg-[#80b5d6]'} w-max rounded-md px-1 py-[0.4] cursor-pointer`}
        >
          <img src={carriageFrame} alt="" className="w-[42px]" />
        </div>
      </Tooltip>
      <p className="text-xs">{position}</p>
    </Flex>
  );
};

const TrainHeadAbstractPattern = ({ name }) => {
  return (
    <Flex vertical align="center" gap={4}>
      <div className="w-max">
        <img src={trainHeadFrame} alt="" className="w-[48px]" />
      </div>
      <p className="text-xs">{name}</p>
    </Flex>
  );
};

CarriageAbstractPattern.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  isSelected: PropTypes.bool,
};

TrainHeadAbstractPattern.propTypes = {
  name: PropTypes.string,
};

export { CarriageAbstractPattern, TrainHeadAbstractPattern };
