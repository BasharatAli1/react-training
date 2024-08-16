import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <nav style={{ display: "flex", backgroundColor: "blue", padding: "16px", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ color: 'greenyellow' }}>   Routing ........ </h3>
        <div>
          <Link to="/">Home</Link>&nbsp;&nbsp;
          <Link to="/about">About</Link>&nbsp;&nbsp;
        </div>
      </nav>
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Outlet />
      </div>


    </>
  )
}

export default Layout