import React from "react";

// components
import StaffAccountTable from 'components/Cards/StaffAccountTable'

export default function StaffTables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <StaffAccountTable />
        </div>
      </div>
    </>
  );
}
