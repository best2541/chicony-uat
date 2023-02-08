import axios from "axios";
import { get } from "components/Api";
import { post } from "components/Api";
import React, { useRef, useEffect, useState } from "react";

// components

export default function CardSettings() {
  const inputRef = useRef()
  const addressRef = useRef()
  const [date, setDate] = useState()
  const [setting, setSetting] = useState({})

  const settingChange = (event) => {
    const { name, value } = event.target
    setSetting({
      ...setting,
      [name]: value
    })
  }
  const submitSetting = (event) => {
    event.preventDefault()
    post(`${process.env.REACT_APP_API}/admin/updatesetting`, setting)
      .then(result => {
        if (!result.data.err)
          alert(result.data)
        else
          alert(result.data.err)
      })
  }
  const importFile = (event) => {
    const formData = new FormData
    formData.append('file', event.target.files[0])
    post(`${process.env.REACT_APP_API}/admin/import`, formData)
      .then(result => {
        if (!result.data.err) {
          alert('เรียบร้อย')
          window.location.reload()
        }
      })
  }
  const addressImportFile = (event) => {
    const formData = new FormData
    formData.append('file', event.target.files[0])
    post(`${process.env.REACT_APP_API}/admin/addressimport`, formData)
      .then(result => {
        if (!result.data.err) {
          alert('เรียบร้อย')
          window.location.reload()
        }
      })
  }
  const sendingEmail = async (event) => {
    let DATE = await prompt('วันที่จ่าย :', `1/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)
    if (DATE)
      if (window.confirm(`ยืนยัน วันที่จ่าย : ${DATE}`)) {
        post(`${process.env.REACT_APP_API}/admin/sendemail`, { date: event, paymentDate: DATE })
          .then(result => {
            if (!result.data.err)
              alert('ส่งสลิปเงินเดือนแล้ว')
            else
              alert(result.data.err)
          })
      } else {
        window.alert('ยกเลิกการส่ง slip')
      }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/admin/indexImport`, {
      headers: {
        authorization: `bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      setSetting(result.data.setting[0])
      setDate(result.data.indexImport[0]?.create_date)
    })
  }, [])
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Salary</h6>
            <button
              className=" text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              style={{ 'backgroundColor': 'green' }}
              onClick={() => sendingEmail(`${new Date().getFullYear()}/${new Date().getMonth() + 1 < 10 ? `0${parseInt(new Date().getMonth()) + 1}` : new Date().getMonth() + 1}`)}
            >
              Send Salary {`${new Date().getFullYear()}/${parseInt(new Date().getMonth()) + 1 < 10 ? `0${parseInt(new Date().getMonth()) + 1}` : parseInt(new Date().getMonth()) + 1}`}
            </button>
            <button
              className=" text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              style={{ 'backgroundColor': 'green' }}
              onClick={() => sendingEmail(`${new Date().getMonth() == 0 ? new Date().getFullYear() - 1 + '/' + '12' : new Date().getFullYear() + '/0' + new Date().getMonth() < 10 ? `0${parseInt(new Date().getMonth()) + 1}` : new Date().getFullYear() + '/' + new Date().getMonth()}`)}
            >
              Send Salary {`${new Date().getMonth() == 0 ? new Date().getFullYear() - 1 + '/12' : new Date().getMonth() < 10 ? new Date().getFullYear() + '/' + `0${parseInt(new Date().getMonth())}` : new Date().getFullYear() + '/' + new Date().getMonth()}`}
            </button>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              onClick={() => inputRef.current.click()}
            >
              import last updated : {new Date(date).toLocaleDateString('th')}
            </button>
            <input className="hidden" ref={inputRef} onChange={importFile} type='file' accept=".xlsx, .xls, .csv" />
          </div>
        </div>
        <br />
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">HQ/BR</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              onClick={() => addressRef.current.click()}
            >
              Import
            </button>
            <input className="hidden" ref={addressRef} onChange={addressImportFile} type='file' accept=".xlsx, .xls, .csv" />
          </div>
        </div>
        <br />
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <form className="text-center flex justify-between" onSubmit={submitSetting}>
            <div>
              <span className="text-blueGray-700 text-xl font-bold">Sender Email (อีเมลผู้ส่ง) :</span>
              <input className="ml-2" type='email' name='email' value={setting.email} onChange={settingChange} />
            </div>
            <div>
              <span className="text-blueGray-700 text-xl font-bold">Password :</span>
              <input className="ml-2" type='password' name='password' onChange={settingChange} />
            </div>
            <div></div>
            <div>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type='submit'
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <br />
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <form className="text-center flex justify-between" onSubmit={submitSetting}>
            <div>
              <span className="text-blueGray-700 text-xl font-bold">เลขประจำตัวผู้เสียภาษี :</span>
              <input className="ml-2" type='text' name='email' value={setting.id} onChange={settingChange} />
            </div>
            <div>
              <span className="text-blueGray-700 text-xl font-bold">ประกันสังคม(%) :</span>
              <input className="ml-2" type='number' min={0} name='SSO' value={setting.SSO} onChange={settingChange} />
            </div>
            <div>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
