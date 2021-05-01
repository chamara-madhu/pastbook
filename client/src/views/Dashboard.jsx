import React from "react";

import DashboardLayout from "../components/layouts/DashboardLayout";
import DashboardComp from "../components/dashboard/DashboardComp";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardComp />
    </DashboardLayout>
  );
}

export default Dashboard;
