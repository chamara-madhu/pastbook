import React from "react";
import ContinueBtn from "../ContinueBtn";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let len = sessionStorage.getItem("selected_photos")
  ? JSON.parse(sessionStorage.getItem("selected_photos")).length
  : 0;

test("checking ontinue button is working correctly", () => {
  const component = render(<ContinueBtn len={len} />);
  const btnEl = component.getByTestId("continue-btn");

  if (len === 9) {
    expect(btnEl).toHaveClass("btn custom-btn-active");
  } else {
    expect(btnEl).toHaveClass("btn custom-btn-disabled");
  }
});
