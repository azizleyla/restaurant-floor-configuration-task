import React from "react";

const Card = ({ data, setIsShowDropdown }) => {
  return (
    <div className=" flex w-full cursor-pointer">
      <div className="rounded-l-md p-5 w-36 ">
        <img src={data.thumb} alt="table" />
      </div>
    </div>
  );
};

export default Card;
