import { SortableContainer } from 'react-sortable-hoc';

const TrainContainer = SortableContainer(({ children }) => {
  return (
    <div className="table mx-auto p-4 rounded-lg w-[272px] bg-[#f2f2f2]">
      <div className="relative ">{children}</div>
    </div>
  );
});
export default TrainContainer;
