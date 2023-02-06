import React, { useState, useEffect } from "react";
// components

import CardTable from "components/Cards/CardTable.js";
import AccountTable from "components/Cards/AccountTable";
import { get } from "components/Api";

export default function Tables() {
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    get(`${process.env.REACT_APP_API}/admin/employee?search=${search}`)
      .then(result => {
        setDatas(result.data.staff)
      })
  }, [search])
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <AccountTable datas={datas} setDatas={setDatas} setSearch={setSearch} />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
