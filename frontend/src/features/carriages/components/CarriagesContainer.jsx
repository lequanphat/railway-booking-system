import { SortableContainer } from 'react-sortable-hoc';

const CarriagesContainer = SortableContainer(({ name, children }) => {
  return (
    <div className="table bg-[#f2f2f2] w-[460px] mx-auto p-4 rounded-lg">
      <h1 className="text-center text-[16px] font-semibold my-4">{name}</h1>
      <div className="relative ">{children}</div>
    </div>
  );
});
export default CarriagesContainer;
