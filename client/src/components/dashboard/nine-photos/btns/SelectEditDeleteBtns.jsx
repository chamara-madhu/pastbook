import React from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import SelectBtn from "./SelectBtn";

function SelectEditDeleteBtns({ photosLen }) {
  return photosLen > 0 ? (
    <>
      <EditBtn />
      <DeleteBtn />
    </>
  ) : (
    <SelectBtn />
  );
}

export default SelectEditDeleteBtns;
