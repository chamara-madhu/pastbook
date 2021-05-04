import React from "react";

import DashboardLayout from "../components/layouts/DashboardLayout";
import NinePhotosComp from "../components/dashboard/nine-photos/NinePhotosComp";

function Dashboard() {
  return (
    <DashboardLayout>
      <NinePhotosComp />
    </DashboardLayout>
  );
}

export default Dashboard;
