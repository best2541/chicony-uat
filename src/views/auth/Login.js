import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({})
  const [msg, setMsg] = useState('')
  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }
  const login = (event) => {
    event.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/staff/login`, input)
      .then(result => {
        if (!result.data.err) {
          window.localStorage.setItem('staff', input.username)
          window.localStorage.setItem('token', result.data)
          window.location.href = '/staff'
        } else {
          setMsg(result.data.err)
        }
      })
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-blueGray-500 text-center mb-3 font-bold">
                  <small>สลิปเงินเดือน</small>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={login}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      name='username'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder=""
                      onChange={inputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      name='password'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder=""
                      onChange={inputChange}
                    />
                  </div>
                  {/* <a href="/auth/adminlogin" className="text-blueGray-600 flex justify-center underline text-xs font-bold hover:underline">
                    are you admin?
                  </a> */}
                  <div>
                    {/* <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label> */}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <div className="text-center mb-3 font-bold" style={{ 'color': 'rgb(248 113 113)' }}>
                    <small>{msg}</small>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              {/* <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
