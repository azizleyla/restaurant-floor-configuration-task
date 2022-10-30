import React from "react";
import { Droppable } from "react-beautiful-dnd";

const RightSide = ({ isDropDisabled, children, title, name }) => {
  return (
    <div className="w-full flex flex-col flex-1">
      <h2 className="text-2xl font-bold mb-2 mx-5">{title}</h2>
      <div className="">
        <Droppable droppableId={name} isDropDisabled={isDropDisabled}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="h-screen">
              <div className="p-5 rounded-md min-h-max  mx-2 gap-y-3 flex flex-col h-screen">
                {children}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default RightSide;
