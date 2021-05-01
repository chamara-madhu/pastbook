import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function DashboardLayout(props) {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
