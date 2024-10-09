import { SortableElement } from 'react-sortable-hoc';

const SeatItem = SortableElement(({ title }) => {
  return (
    <div className="style-item-sortable style-item-grid-sortable" style={{ height: 120 }}>
      <div className="style-wrapper-sortable">{title}</div>
    </div>
  );
});

export default SeatItem;
