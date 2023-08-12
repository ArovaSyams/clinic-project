import ClinicLayout from '@/Layouts/ClinicLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'

const Doctor = ({ user, doctors }) => {
  const [constantID, setConstantID] = useState('');
  console.log(constantID);
  return (
    <ClinicLayout user={user}>
      <Head title="Doctors" />

      <div className="content container-fluid">

      <div className="page-header">
      <div className="row">
      <div className="col-sm-7 col-auto">
      <h3 className="page-title">Doctors</h3>
      <ul className="breadcrumb">
      <li className="breadcrumb-item active"></li>
      </ul>
      </div>
      <div className="col-sm-5 col">
      {user.status === 'Inactive' ? (
        <a href="/create-doctor" style={{ pointerEvents: 'none' }} className="btn btn-secondary float-end mt-2">Waiting Approvement</a>
      ) : (
        <a href="/create-doctor" className="btn btn-primary float-end mt-2">Add New Doctor</a>
      )}
      </div>
      </div>
      </div>

      <div className="row">
      <div className="col-sm-12">
      <div className="card">
      <div className="card-body">
      <div className="table-responsive">
      <table className="datatable table table-hover table-center mb-0">
      <thead>
      <tr>
      <th>Doctor Name</th>
      <th>Speciality</th>
      <th>Contact No</th>
      <th>Account Status</th>
      <th className="text-end">Actions</th>
      </tr>
      </thead>
      <tbody>

      {doctors.map((doctor, i) => (
      <tr key={i}>
      <td>
      <h2 className="table-avatar">
      <a href={`/profile/${doctor.first_name.split(' ').join('-')}`} className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src={`/storage/${doctor.image}`} alt="User Image" /></a>
      <a href={`/profile/${doctor.first_name.split(' ').join('-')}`}>{doctor.first_name} {doctor.last_name}</a>
      </h2>
      </td>
      <td>{doctor.speciality}</td>
      <td>{doctor.phone}</td>
      <td>{doctor.status}</td>
      <td className="text-end">
      <div className="actions">
      <Link className="btn btn-sm bg-success-light" href={`/doctor/${doctor.first_name.split(' ').join('-')}/edit`}>
      <i className="fe fe-pencil"></i> Edit
      </Link>
      <a data-bs-toggle="modal" href="#delete_modal" onClick={(e) => setConstantID(doctor.unique_id)} className="btn btn-sm bg-danger-light">
      <i className="fe fe-trash"></i> Delete
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

      {/* modal */}

      <div class="modal fade" id="delete_modal" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-body">
      <div class="form-content p-2">
      <h4 class="modal-title">Delete</h4>
      <p class="mb-4">Are you sure want to delete?</p>
      {/* <button type="button" class="btn btn-success mx-2"> */}
      <Link as="button" href={`/doctor/${constantID}`} method="delete" data-bs-dismiss="modal" class="btn btn-success mx-2">
        Yes
      </Link>
      {/* </button> */}
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No</button>
      </div>
      </div>
      </div>
      </div>
      </div>
    </ClinicLayout>
  )
}

export default Doctor