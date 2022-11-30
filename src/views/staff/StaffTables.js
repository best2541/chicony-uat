import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import AccountTable from "components/Cards/AccountTable";
import StaffAccountTable from 'components/Cards/StaffAccountTable'

export default function StaffTables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <StaffAccountTable />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
