import { Flex } from 'antd';
import { SortableElement } from 'react-sortable-hoc';

const CarriageSortableItem = SortableElement(({ label, floors, row_count, seats }) => {
  return (
    <div className="carriage-item-sortable carriage-item-grid-sortable text-[12px]">
      <div className="carriage-wrapper-sortable">
        <Flex vertical align="start">
          <h1 className="font-semibold text-[12px] text-center"> Thông tin toa tàu</h1>
          <p>
            <strong>Tên toa:</strong> {label}
          </p>
          <p>
            <strong>Kết cấu toa:</strong> {floors} tầng, {row_count} hàng
          </p>
          <p>
            <strong>Số chỗ:</strong> {seats?.length} chỗ
          </p>
        </Flex>
      </div>
    </div>
  );
});

export default CarriageSortableItem;
