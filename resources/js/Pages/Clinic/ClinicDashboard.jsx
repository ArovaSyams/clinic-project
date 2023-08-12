import ClinicLayout from '@/Layouts/ClinicLayout'
import { Head } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

const ClinicDashboard = ({ user, doctorCount, appointmentCount, appointments }) => {

  const [reload, setReload] = useState(true);
  useEffect(() => {
    const reload = () => {
      if (reload === true) {
        location.reload();
      }
      setReload(false);
      return;
    }
    reload();
  }, [reload])

  return (
    <ClinicLayout user={user}>
      <Head title="Clinic Dashboard" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col-sm-12">
      <h3 class="page-title">Welcome Clinic!</h3>
      <ul class="breadcrumb">
      <li class="breadcrumb-item active">Dashboard</li>
      </ul>
      </div>
      </div>
      </div>

      <div class="row">
      <div class="col-xl-3 col-sm-6 col-12">
      <div class="card">
      <div class="card-body">
      <div class="dash-widget-header">
      <span class="dash-widget-icon text-primary border-primary">
      <i class="fe fe-users"></i>
      </span>
      <div class="dash-count">
      <a href="/doctor" > <h3>{doctorCount}</h3> </a>
      </div>
      </div>
      <div class="dash-widget-info">
      <h6 class="text-muted">Doctors</h6>
      <div class="progress progress-sm">
      <div class="progress-bar bg-primary w-100"></div>
      </div>
      </div>
      </div>
      </div>
      </div>

      <div class="col-xl-3 col-sm-6 col-12">
      <div class="card">
      <div class="card-body">
      <div class="dash-widget-header">
      <span class="dash-widget-icon text-danger border-danger">
      <i class="fe fe-money"></i>
      </span>
      <div class="dash-count">
      <a href="appointments.html" > <h3>{appointmentCount}</h3> </a>
      </div>
      </div>
      <div class="dash-widget-info">
      <h6 class="text-muted">Appointments</h6>
      <div class="progress progress-sm">
      <div class="progress-bar bg-danger w-100"></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>




      <div class="row">
      <div class="col-md-12">

      <div class="card card-table">
      <div class="card-header">
      <h4 class="card-title">Recent 10 Appointments</h4>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-hover table-center mb-0">
      <thead>
      <tr>
      <th>Doctor Name</th>
      <th>Speciality</th>
      <th>Patient Name</th>
      <th>Date & Time</th>
      <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>
      <h2 class="table-avatar">
      <a href="profile.html" class="avatar avatar-sm me-2"><img class="avatar-img rounded-circle" src="/dashboard-assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" /></a>
      <a href="profile.html">Dr. Ruby Perrin</a>
      </h2>
      </td>
      <td>Dental</td>
      <td>Alonso</td>
      <td>2nd November 2023</td>
      <td>Active</td>
      </tr>

      </tbody>
      </table>
      </div>
      </div>
      </div>

      </div>
      </div>
      </div>

    </ClinicLayout>
  )
}

export default ClinicDashboard