import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Doctor = ({ user, doctors, clinics }) => {
  

  return (
    <AdminLayout user={user}>
      <Head title="Doctor" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col-sm-12">
      <h3 class="page-title">List of Doctors</h3>
      <ul class="breadcrumb">
      <li class="breadcrumb-item active">Admin Panel</li>
      </ul>
      </div>
      </div>
      </div>

      <div class="row">
      <div class="col-sm-12">
      <div class="card">
      <div class="card-body">
      <div class="table-responsive">
      <table class="datatable table table-hover table-center mb-0">
      <thead>
      <tr>
      <th>Doctor Name</th>
      <th>Speciality</th>
      <th>Clinic</th>
      <th>Member Since</th>
      <th>Account Status</th>
      <th>Action</th>
      </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => (

          <tr>
          <td>
          <h2 class="table-avatar">
          <a href={`/profile/${doctor.first_name.split(' ').join('-')}`} class="avatar avatar-sm me-2"><img class="avatar-img rounded-circle" src={`/storage/${doctor.image}`} alt="User Image" /></a>
          <a href={`/profile/${doctor.first_name.split(' ').join('-')}`}>{doctor.first_name} {doctor.last_name}</a>
          </h2>
          </td>
          <td>{doctor.speciality}</td>
          {clinics.map((clinic) => (
            <>
            {doctor.clinic_id === clinic.id && (
              <td>{clinic.first_name} {clinic.last_name}</td>
            )}
            </>
          ))}
          <td>{new Date(doctor.created_at).toLocaleDateString() || ''}</td>
          <td>{doctor.status}</td>
          <td>
          <div class="actions">
          <a class="btn btn-sm bg-primary-light" href={`/doctor-request/${doctor.first_name.split(' ').join('-')}`}>
          <i class="fe fe-pencil"></i> Update
          </a>
          </div>
          </td>
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

export default Doctor