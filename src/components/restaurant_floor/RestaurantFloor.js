import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { itemsNormal } from "../constants/items";
import LeftSide from "../List/LeftSide";
import RightSide from "../List/RightSide";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";

const RestaurantFloor = () => {
  const [items, setItems] = useState(itemsNormal);

  //Siyahıdan silir itemi
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };
  const [isDropDisabled, setIsDropDisabled] = useState(true);

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      console.log(result);
      return;
    }

    const listCopy = { ...items };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
    );

    //sola surusdulen stollar
    for (const element of listCopy.available) {
      element.isAllowCopy = true;
    }
    //sagdaki original stollar
    for (const element of listCopy.assigned) {
      delete element.isAllowCopy;
      delete element.isCopy;
    }
    setItems(listCopy);
  };

  //copy item
  const handleCopy = (item) => {
    setItems((previtems) => {
      return {
        ...previtems,
        available: [
          ...items.available,
          {
            ...item,
            id: Math.trunc(Math.random() * 1000 + 2),
            copyId: item.id,
            uuid: uuidv4(),
            isCopy: true,
            isShowDropdown: false,
          },
        ],
      };
    });
  };
  //show popup for item
  const handlePopup = (id, e) => {
    if (e.currentTarget === e.target) {
      setItems((prevItems) => {
        return {
          ...prevItems,
          available: [
            ...items.available.map((item) => {
              if (item.id === id) {
                item.isShowDropdown = !item.isShowDropdown;
              }
              return item;
            }),
          ],
        };
      });
    }
  };
  //delete item
  const handleDelete = (id) => {
    setItems((prevItems) => {
      return {
        ...prevItems,
        available: [...items.available.filter((item) => item.id !== id)],
      };
    });
  };
  //refresh all states
  const refreshState = () => {
    setItems(itemsNormal);
  };

  return (
    <div className="mt-2">
      <button
        className="bg-gray-400 font-semibold p-2 rounded w-28"
        type="button"
        onClick={refreshState}
      >
        Refresh
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          <LeftSide onDragEnd={onDragEnd} name="available">
            {items.available.map((item, index) => {
              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id + ""}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex w-full cursor-pointer">
                          <div
                            onClick={(e) => {
                              handlePopup(item.id, e);
                            }}
                            onMouseDown={() =>
                              setIsDropDisabled(item.isCopy)
                            }
                            className="rounded-l-md p-5 w-36 "
                          >
                            <img src={item.thumb} alt="table" />
                            {item.isShowDropdown ? (
                              <div className="modal">
                                <button
                                  className="flex items-center p-1  w-full rounded"
                                  onClick={() => {
                                    handleCopy(item);
                                  }}
                                >
                                  <AiOutlineCopy className="mr-1" />
                                  Copy
                                </button>
                                {item.isCopy && (
                                  <button
                                    className="flex items-center p-1 border-t border-[#ccc] w-full rounded"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <AiOutlineDelete className="mr-1" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </LeftSide>
          <RightSide
            onDragEnd={onDragEnd}
            name="assigned"
            isDropDisabled={isDropDisabled}
          >
            {items.assigned.map((item, index) => {
              return (
                <Draggable
                  draggableId={item.uuid}
                  index={index}
                  key={item.id}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className=" flex w-full cursor-pointer">
                        <div
                          onMouseDown={() => {
                            setIsDropDisabled(true);
                          }}
                          className="rounded-l-md p-5 w-36 "
                        >
                          <img
                            src={item.thumb}
                            alt="Ícone padrão de item do card"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </RightSide>
        </div>
      </DragDropContext>
    </div>
  );
};

export default RestaurantFloor;
