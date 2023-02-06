import React from "react";
import { createPopper } from "@popperjs/core";
import { post } from "components/Api";

const NotificationDropdown = ({ username, setDatas }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const resetPassword = (event) => {
    let newPassword = prompt('New Password', 'password')
    if (newPassword && newPassword != null)
      if (window.confirm(`User : ${username} \nNew Password : ${newPassword}`))
        post(`${process.env.REACT_APP_API}/admin/resetpassword`, {
          password: newPassword,
          username: username
        }).then(result => {
          if (!result.data.err) {
            alert('เรียบร้อย')
          } else {
            alert('ไม่สำเร็จ')
          }
        })
  }
  const deleteClick = () => {
    post(`${process.env.REACT_APP_API}/admin/delete/${username}`)
      .then(() => {
        setDatas(prev => prev.filter(data => data.username != username))
      })
  }
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => resetPassword()}
        >
          Reset Password
        </button>
        <button
          // href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => deleteClick()}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default NotificationDropdown;
