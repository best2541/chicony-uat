/*eslint-disable*/
import React from "react";
import { Link, Redirect } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      test
      <Redirect to={'/auth'} />
    </>
  );
}
