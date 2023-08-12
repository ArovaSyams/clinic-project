import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const AdminDashboard = ({ user, doctorCount, clinicCount, doctors, clinics }) => {
  console.log(doctors);

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
    <AdminLayout user={user}>
      <Head title='Dashboard' />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col-sm-12">
      <h3 class="page-title">Welcome {user.first_name}!</h3>
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
      <a href="/admin-doctor" > <h3>{doctorCount}</h3> </a>
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
      <a href="/admin-clinic" > <h3>{clinicCount}</h3> </a>
      </div>
      </div>
      <div class="dash-widget-info">
      <h6 class="text-muted">Clinics</h6>
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
      <h4 class="card-title">Last 10 Doctor Registrations</h4>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-hover table-center mb-0">
      <thead>
      <tr>
      <th>Doctor Name</th>
      <th>Speciality</th>
      <th>Clinic Name</th>
      <th>Location</th>
      <th>Status</th>
      </tr>
      </thead>
      <tbody>

        {doctors.map((doctor) => (
        <tr key={doctor.id}>
          <td>
          <h2 class="table-avatar">
          <a href={`/profile/${doctor.first_name.split(' ').join('-')}`} class="avatar avatar-sm me-2"><img class="avatar-img rounded-circle" src={`storage/${doctor.image}`} alt="User Image" /></a>
          <a href={`/profile/${doctor.first_name.split(' ').join('-')}`}>{doctor.first_name} {doctor.last_name}</a>
          </h2>
          </td>
          <td>{doctor.speciality}</td>
          {clinics.map((clinic) => (
            <>
            {doctor.clinic_id === clinic.id && (
              <td><a href={`/profile/${clinic.first_name.split(' ').join('-')}`}>{clinic.first_name} {clinic.last_name}</a></td>
            )}
            </>
          ))}
          <td>{doctor.location}</td>
          <td>{doctor.status}</td>
        </tr>
        ))}

      </tbody>
      </table>
      </div>
      </div>
      </div>

      </div>
      </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard