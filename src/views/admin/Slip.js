import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from 'react-router-dom'
// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { Link } from "react-router-dom";
import { get, post } from "components/Api";
import axios from "axios";

export default function Slip({ color }) {
    const [datas, setDatas] = useState([])
    const { id } = useParams()

    const exportClick = (type, date) => {
        axios.post(`${process.env.REACT_APP_API}/staff/slip`, {
            type: type,
            date: date
        }, {
            headers: {
                authorization: `bearer ${window.localStorage.getItem('token')}`
            },
            responseType: 'blob'
        })
            .then(result => {
                if (!result.data.err) {
                    const href = URL.createObjectURL(result.data);
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'demo.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                    // clean up "a" element & remove ObjectURL
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                }
            })
    }
    useEffect(() => {
        console.log('test', id)
        get(`${process.env.REACT_APP_API}/staff/index`)
            .then(result => {
                if (!result.data.err) {
                    setDatas(result.data.slip)
                } else {
                    alert(result.data.err)
                    window.location.href = '/staff/settings'
                }
            })
    }, [])
    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >

                            </h3>
                            <Link to={'/admin/register'}>
                                <h1 className="font-bold">
                                    Salary
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Period Date
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Period Type
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map(data => (
                                <tr>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        {/* <img
                    src={require("assets/img/bootstrap.jpg").default}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "} */}
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {data.Period_Detail_No}
                                        </span>
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {data.Period_Master_No}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            onClick={() => exportClick(data.Period_Master_No, data.Period_Detail_No)}
                                        >download</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

AccountTable.defaultProps = {
    color: "light",
};

AccountTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
