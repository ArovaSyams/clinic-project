import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Clinic = ({ user, clinics }) => {
  return (
    <AdminLayout user={user}>
      <Head title="Clinic" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col-sm-12">
      <h3 class="page-title">List of Clinics</h3>
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
      <th>Clinic Name</th>
      <th>Address</th>
      <th>Account Status</th>
      <th>Action</th>
      </tr>
      </thead>
      <tbody>
        {clinics.map((clinic) => (
          <tr>
          <td>
          <h2 class="table-avatar">
          <a href="profile.html" class="avatar avatar-sm me-2"><img class="avatar-img rounded-circle" src={`/storage/${clinic.image}`} alt="User Image" /></a>
          <a href={`/profile/${clinic.first_name}`}>{clinic.first_name} {clinic.last_name}</a>
          </h2>
          </td>
          <td>{clinic.address}</td>
          <td>{clinic.status}</td>
          <td>
          <div class="actions">
          <a class="btn btn-sm bg-primary-light" href={`/clinic-request/${clinic.first_name.split(' ').join('-')}`}>
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

export default Clinic