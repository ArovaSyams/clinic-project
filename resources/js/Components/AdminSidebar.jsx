import React, { useEffect, useState } from 'react'

const AdminSidebar = () => {
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
    <li className={'/admin-dashboard' === url && 'active'}>
    <a href="/admin-dashboard"><i className="fe fe-home"></i> <span>Dashboard</span></a>
    </li>
    <li className={'/specialities' === url && 'active'}>
    <a href="/specialities"><i className="fe fe-users"></i> <span>Specialities</span></a>
    </li>
    <li className={'/admin-doctor' === url && 'active'}>
    <a href="/admin-doctor"><i className="fe fe-user-plus"></i> <span>Doctors</span></a>
    </li>
    <li className={'/admin-clinic' === url && 'active'}>
    <a href="/admin-clinic"><i className="fe fe-star-o"></i> <span>Clinics</span></a>
    </li>
    </ul>
    </div>
    </div>
    </div>
  )
}

export default AdminSidebar