import ClinicSidebar from '@/Components/ClinicSidebar'
import DashboardNavbar from '@/Components/DashboardNavbar'
import { Head } from '@inertiajs/react'
import React from 'react'

const ClinicLayout = ({ user, header, children }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/dashboard-assets/plugins/fontawesome/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/dashboard-assets/plugins/fontawesome/css/all.min.css" />

        <script src="/dashboard-assets/js/jquery-3.7.0.min.js"></script>

        <script src="/dashboard-assets/js/bootstrap.bundle.min.js"></script>

        <script src="/dashboard-assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>

        <script src="/dashboard-assets/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="/dashboard-assets/plugins/datatables/datatables.min.js"></script>

        <script src="/dashboard-assets/plugins/raphael/raphael.min.js"></script>
        <script src="/dashboard-assets/plugins/morris/morris.min.js"></script>
        <script src="/dashboard-assets/js/chart.morris.js"></script>

        <script src="/dashboard-assets/js/script.js"></script>
      </Head>
    <div className="main-wrapper">

      <DashboardNavbar user={user} />
      <ClinicSidebar />

      <div className="page-wrapper">
        {children}
      </div>

    </div>
    </>
  )
}

export default ClinicLayout