import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
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
    axios.post('http://localhost:3001/admin/login', input)
      .then(result => {
        if (!result.data.err) {
          window.localStorage.setItem('admin', input.username)
          window.localStorage.setItem('token', result.data)
          window.location.href = '/admin'
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
                  <small>ADMIN</small>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                <form onSubmit={login}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      USERNAME
                    </label>
                    <input
                      name='username'
                      type="text"
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
                      name='password'
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder=""
                      onChange={inputChange}
                    />
                  </div>
                  {/* <a href="/auth/login" className="text-blueGray-600 flex justify-center underline text-xs font-bold hover:underline">
                    check salary?
                  </a> */}
                  <div>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      admin Login
                    </button>
                  </div>
                  <div className="text-center mb-3 font-bold" style={{ 'color': 'rgb(248 113 113)' }}>
                    <small>{msg}</small>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
