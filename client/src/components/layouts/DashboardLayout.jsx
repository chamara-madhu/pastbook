import React from "react";
import NavbarComp from "../common/navbar/NavbarComp";
import FooterComp from "../common/footer/FooterComp";

function DashboardLayout(props) {
  return (
    <div className="container-fluid p-0">
      <NavbarComp />
      {props.children}
      <FooterComp />
    </div>
  );
}

export default DashboardLayout;
