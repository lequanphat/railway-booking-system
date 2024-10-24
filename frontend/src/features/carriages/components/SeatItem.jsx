import { Flex } from 'antd';
import { SortableElement } from 'react-sortable-hoc';

const SeatItem = SortableElement(({ title, position = 1, cols = 1, rows = 1 }) => {
  return (
    <div
      className="style-item-sortable style-item-grid-sortable text-xs"
      style={{ height: 120, width: `${100 / (cols * rows)}%` }}
    >
      <div className="style-wrapper-sortable">
        <Flex vertical>
          <h1 className="font-semibold text-lg">{position}</h1>
          <h1 className="font-semibold text-xs"> {title}</h1>
        </Flex>
      </div>
    </div>
  );
});

export default SeatItem;
