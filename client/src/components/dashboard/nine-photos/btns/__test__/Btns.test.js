import React from "react";
import EditBtn from "../EditBtn";
import DeleteBtn from "../DeleteBtn";
import SelectBtn from "../SelectBtn";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let len = sessionStorage.getItem("saved_photos")
  ? JSON.parse(sessionStorage.getItem("saved_photos")).length
  : 0;

test("checking all first page btns are working correctly", () => {
  const editComp = render(<EditBtn />);
  const delComp = render(<DeleteBtn />);
  const selComp = render(<SelectBtn />);
  const editBtnEl = editComp.getByTestId("edit-btn");
  const delBtnEl = delComp.getByTestId("del-btn");
  const selBtnEl = selComp.getByTestId("sel-btn");

  if (len === 9) {
    expect(editBtnEl);
    expect(delBtnEl);
  } else {
    expect(selBtnEl);
  }
});
