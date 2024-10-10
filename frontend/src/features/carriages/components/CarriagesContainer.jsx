import { SortableContainer } from 'react-sortable-hoc';

const CarriagesContainer = SortableContainer(({ children }) => {
  return (
    <div className="table bg-primary">
      <div className="relative ">{children}</div>
    </div>
  );
});
export default CarriagesContainer;
