import React, { useEffect, useState } from 'react'

const ClinicSidebar = () => {
  const location = window.location; // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
    <div id="sidebar-menu" className="sidebar-menu">
    <ul>
    <li className="menu-title">
    <span>Main Menu</span>
    </li>
    <li className={'/clinic-dashboard' === url && 'active'}>
    <a href="/clinic-dashboard"><i className="fe fe-home"></i> <span>Dashboard</span></a>
    </li>
    <li className={'/doctor' === url && 'active'}>
    <a href="/doctor"><i className="fe fe-user-plus"></i> <span>Doctors</span></a>
    </li>
    </ul>
    </div>
    </div>
    </div>
  )
}

export default ClinicSidebar