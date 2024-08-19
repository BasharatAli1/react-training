import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <nav style={{ display: "flex", padding: "16px", justifyContent: "space-between", alignItems: "center" }}>
        {/* <h3 style={{ }}>   Routing ........ </h3> */}
        <div>
          <Link to="/order">Order</Link>&nbsp;&nbsp;
          <Link to="/clinic">Clinic</Link>&nbsp;&nbsp;
          <Link to="/patient">Patient</Link>&nbsp;&nbsp;
        </div>
      </nav>
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Outlet />
      </div>


    </>
  )
}

export default Layout