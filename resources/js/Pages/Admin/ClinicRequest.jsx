import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const ClinicRequest = ({ user, clinic }) => {

  

  const { data, setData, post, progress, errors } = useForm({
    remarks: clinic.remarks,
    status: clinic.status
  });
  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/clinic-request/${clinic.id}`);
  }

  return (
    <AdminLayout user={user}>
      <Head title="Client Request" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col">
      <h3 class="page-title">Clinic Request</h3>
      <ul class="breadcrumb">
      <li class="breadcrumb-item active">Admin Panel</li>
      </ul>
      </div>
      </div>
      </div>

      <div class="row">
      <div class="col-md-12">
      <div class="profile-header">
      <div class="row align-items-center">
      <div class="col-auto profile-image">
      <a href="#">
      <img class="rounded-circle" alt="User Image" style={{ objectFit:'cover', width: 100, height: 100, borderRadius: 100 }} src={`/storage/${clinic.image}`} />
      </a>
      </div>
      <div class="col ml-md-n2 profile-user-info">
      <h4 class="user-name mb-0">{clinic.first_name} {clinic.last_name}</h4>
      <h6 class="text-muted">{clinic.location}</h6>
      </div>
      </div>
      </div>
      <div class="profile-menu">
      <ul class="nav nav-tabs nav-tabs-solid">
      <li class="nav-item">
      <a class="nav-link active" data-bs-toggle="tab" href="#per_details_tab">About</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" data-bs-toggle="tab" href="#documents_tab">Documents</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" data-bs-toggle="tab" href="#update_tab">Verify Clinic</a>
      </li>
      </ul>
      </div>
      <div class="tab-content profile-tab-cont">

      <div class="tab-pane fade show active" id="per_details_tab">

      <div class="row">
      <div class="col-lg-12">
      <div class="card">
      <div class="card-body">
      <h5 class="card-title d-flex justify-content-between">
      </h5>
      <div class="row">
      <p class="col-sm-2 text-muted">Clinic Name</p>
      <p class="col-sm-10">{clinic.first_name} {clinic.last_name}</p>
      </div>
      <div class="row">
      <p class="col-sm-2 text-muted">Email ID</p>
      <p class="col-sm-10">{clinic.email}</p>
      </div>
      <div class="row">
      <p class="col-sm-2 text-muted">Contact No</p>
      <p class="col-sm-10">{clinic.phone || '-'}</p>
      </div>
      <div class="row">
      <p class="col-sm-2 text-muted">Address</p>
      <p class="col-sm-10 mb-0">{clinic.address || '-'}<br />
      {clinic.city}<br />
      {clinic.state}<br />
      {clinic.country}</p>
      </div>
      </div>
      </div>

      </div>
      </div>

      </div>

      <div class="tab-pane fade show" id="documents_tab">

      <div class="row">
      <div class="col-lg-12">
      <div class="card">
      <div class="card-body">
      <h5 class="card-title d-flex justify-content-between">
      </h5>
      <div class="row">
      {/* <p class="col-sm-10">certificate.pdf</p>
      <p class="col-sm-10">idproof.pdf</p>
      <p class="col-sm-10">education.pdf</p> */}
      </div>

      </div>
      </div>

      </div>
      </div>

      </div>


      <div class="tab-pane fade show" id="update_tab">

      <div class="row">
      <div class="col-lg-12">
      <div class="card">
      <div class="card-body">
      <h5 class="card-title d-flex justify-content-between">
      </h5>
      <div class="row">
      <div class="card">
      <div class="card-body">
      <form onSubmit={handleSubmit}>
      <div class="row">
      <div class="col-xl-6">
      <div class="mb-3 row">
      <label class="col-lg-3 col-form-label">Remarks</label>
      <div class="col-lg-9">
      <textarea class="form-control" style={{ height: '10em' }} onChange={(e) => setData('remarks', e.target.value)} >{data.remarks}</textarea>
      </div>
      </div>

      <div class="mb-3 row">
      <label class="col-lg-3 col-form-label">Status</label>
      <div class="col-lg-9">
      <select class="form-select" value={data.status} onChange={(e) => setData('status', e.target.value)}>
        <option value="Active">Approve</option>
        <option value="Inactive">Reject</option>
      </select>
      </div>
      </div>

      </div>

      </div>
      <div class="text-end">
      <button type="submit" class="btn btn-primary">Submit</button>
      </div>
      </form>
      </div>
      </div>
      </div>

      </div>
      </div>

      </div>
      </div>

      </div>


      </div>
      </div>
      </div>
      </div>

    </AdminLayout>
  )
}

export default ClinicRequest