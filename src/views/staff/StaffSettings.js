import { get } from "components/Api";
import { post } from "components/Api";
import React, { useState, useEffect } from "react";

// components

export default function StaffSettings() {
  const [input, setInput] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [detail, setDetail] = useState({})
  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }
  const detailChange = (event) => {
    const { name, value } = event.target
    setDetail({
      ...detail,
      [name]: value
    })
  }

  const submitClick = (event) => {
    event.preventDefault()
    post(`${process.env.REACT_APP_API}/staff/changepassword`, input)
      .then(result => {
        if (!result.data.err) {
          alert('เรียบร้อย')
        } else {
          alert(result.data.err)
        }
      })
  }

  const detailSubmitClick = (event) => {
    event.preventDefault()
    post(`${process.env.REACT_APP_API}/staff/updatedetail`, detail)
      .then(result => {
        if (!result.data.err) {
          window.localStorage.setItem('token', result.data)
          alert('เรียบร้อย')
        } else {
          alert('ล้มเหลว')
        }
      })
  }
  useEffect(() => {
    get(`${process.env.REACT_APP_API}/staff/setting`)
      .then(result => {
        setDetail({
          bank: result.data.detail[0]?.bank,
          hq: result.data.detail[0]?.hq,
          id: result.data.detail[0]?.id,
          phone: result.data.detail[0]?.phone
        })
      })
  }, [])
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Settings</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={submitClick}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Change Password
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Old Password
                  </label>
                  <input
                    name='oldPassword'
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={inputChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    New Password
                  </label>
                  <input
                    name='newPassword'
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={inputChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={inputChange}
                  />
                </div>

                <button
                  className={input.newPassword == input.confirmPassword && input.newPassword != '' ? "bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" : ''}
                  style={input.newPassword != input.confirmPassword || input.newPassword == '' ? { 'color': 'red' } : {}}
                  type="submit"
                  disabled={!input.newPassword == input.confirmPassword || input.newPassword == ''}
                >
                  {input.newPassword == input.confirmPassword && input.newPassword != '' ? 'Save' : 'New Password & Confirm Password is not match'}
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Detail</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={detailSubmitClick}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              ข้อมูลส่วนตัว
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    รหัสประจำตัวประชาชน
                  </label>
                  <input
                    name='id'
                    value={detail.id}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={detailChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    โทรศัพท์
                  </label>
                  <input
                    name='phone'
                    type="phone"
                    value={detail.phone}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={detailChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    เลขบัญชี
                  </label>
                  <input
                    name="bank"
                    type="text"
                    value={detail.bank}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={detailChange}
                  />
                </div>

                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Update
                </button>

              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    สาขา
                  </label>
                  <input
                    name='hq'
                    type="number"
                    min={0}
                    value={detail.hq}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={detailChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
