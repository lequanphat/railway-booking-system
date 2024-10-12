import { SortableElement } from 'react-sortable-hoc';

const SeatItem = SortableElement(({ title, cols = 1, rows = 1 }) => {
  return (
    <div
      className="style-item-sortable style-item-grid-sortable text-[12px]"
      style={{ height: 120, width: `${100 / (cols * rows)}%` }}
    >
      <div className="style-wrapper-sortable">
        <h1 className="font-semibold text-[12px]"> {title}</h1>
      </div>
    </div>
  );
});

export default SeatItem;
