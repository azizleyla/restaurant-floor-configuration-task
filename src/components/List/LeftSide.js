import React from "react";
import { Droppable } from "react-beautiful-dnd";

const LeftSide = ({ children, title, name }) => {
  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold mb-2 mx-5">{title}</h2>
      <div className="left">
        <div id="content">
          <div className="">
            <Droppable droppableId={name}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="h-full">
                  <div className="">
                    {children}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
