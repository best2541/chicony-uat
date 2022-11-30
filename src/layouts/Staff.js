import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import StaffNavbar from 'components/Navbars/StaffNavbar.js'
import Sidebar from "components/Sidebar/Sidebar.js";
import StaffSidebar from "components/Sidebar/StaffSidebar";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import StaffDashboard from "views/staff/StaffDashboard";
import StaffMaps from "views/staff/StaffMaps";
import StaffSettings from "views/staff/StaffSettings";
import StaffTables from "views/staff/StaffTables";

export default function Staff() {
  return (
    <>
      <StaffSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <StaffNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full pt-24">
          <Switch>
            <Route path="/staff/dashboard" exact component={StaffDashboard} />
            <Route path="/staff/maps" exact component={StaffMaps} />
            <Route path="/staff/settings" exact component={StaffSettings} />
            <Route path="/staff/tables" exact component={StaffTables} />
            <Redirect from="/staff" to="/staff/tables" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
