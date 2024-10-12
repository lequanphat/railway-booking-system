import { SortableContainer } from 'react-sortable-hoc';

const CarriagesContainer = SortableContainer(({ children }) => {
  return (
    <div className="table bg-[#f2f2f2] w-[460px] mx-auto p-4 rounded-lg">
      <div className="relative ">{children}</div>
    </div>
  );
});
export default CarriagesContainer;
