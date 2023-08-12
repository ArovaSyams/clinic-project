import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'
import { Head } from '@inertiajs/react'
import ClinicLayout from '@/Layouts/ClinicLayout'

const DoctorProfile = ({ user, doctor }) => {

  if(user.role === 'admin') {
    return (
      <AdminLayout user={user}>
        <Head title={`${user.first_name} `} />

        <div className="content container-fluid">

        <div className="page-header">
        <div className="row">
        <div className="col">
        <h3 className="page-title">Profile</h3>
        <ul className="breadcrumb">
        <li className="breadcrumb-item active">{doctor.first_name} {doctor.last_name} Profile</li>
        </ul>
        </div>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12">
        <div className="profile-header">
        <div className="row align-items-center">
        <div className="col-auto profile-image">
        <a href="#">
        <img className="image-full" alt="User Image" style={{ objectFit:'cover', width: 100, height: 100, borderRadius: 100 }} src={`/storage/${doctor.image}`} />
        </a>
        </div>
        <div className="col ml-md-n2 profile-user-info">
        <h4 className="user-name mb-0">{doctor.first_name} {doctor.last_name}</h4>
        <h6 className="text-muted"></h6>
        </div>
        </div>
        </div>

        <div className="tab-content profile-tab-cont">

        <div className="tab-pane fade show active" id="per_details_tab">

        <div className="row">
        <div className="col-lg-12">
        <div className="card">
        <div className="card-body">
        <h5 className="card-title d-flex justify-content-between">
        <span>Personal Details</span>
        {/* <a className="edit-link" data-bs-toggle="modal" href="#edit_personal_details"><i className="fa fa-edit me-1"></i>Edit</a> */}
        </h5>
        <div className="row">
        <p className="col-sm-2 text-muted">Full Name</p>
        <p className="col-sm-10">{doctor.first_name} {doctor.last_name}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Date of Birth</p>
        <p className="col-sm-10">{new Date(doctor.birth_date).toLocaleDateString()}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Email ID</p>
        <p className="col-sm-10">{doctor.email}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Mobile</p>
        <p className="col-sm-10">{doctor.phone}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Address</p>
        <p className="col-sm-10 mb-0">{doctor.address}<br />
        {doctor.city}<br />
        {doctor.state}<br />
        {doctor.country}</p>
        </div>
        </div>
        </div>

        {/* <div className="modal fade" id="edit_personal_details" aria-hidden="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Personal Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form>
        <div className="row">
        <div className="col-12">
        <div className="mb-3">
        <label className="mb-2">Image</label>
        <input type="file" className="form-control" />
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">First Name</label>
        <input type="text" className="form-control" value="John">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Last Name</label>
        <input type="text" className="form-control" value="Doe">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Date of Birth</label>
        <div className="cal-icon">
        <input type="text" className="form-control datetimepicker" value="24-07-1983">
        </div>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Gender</label>
        <select className="form-select">
        <option>Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        </select>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Email ID</label>
        <input type="email" className="form-control" value="johndoe@example.com">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Mobile</label>
        <input type="text" value="+1 202-555-0125" className="form-control">
        </div>
        </div>
        <div className="col-12">
        <h5 className="form-title"><span>Address</span></h5>
        </div>
        <div className="col-12">
        <div className="mb-3">
        <label className="mb-2">Address</label>
        <input type="text" className="form-control" value="4663 Agriculture Lane">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Country</label>
        <select className="form-select">
        <option>Select</option>
        <option value="India">India</option>
        </select>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">State</label>
        <select className="form-select">
        <option>Select</option>
        <option value="Delhi">Delhi</option>
        </select>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">City</label>
        <input type="text" className="form-control" value="New York">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Location</label>
        <input type="text" className="form-control" value="Miami">
        </div>
        </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Save</button>
        </form>
        </div>
        </div>
        </div>
        </div> */}

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
  if(user.role === 'clinic') {
    return (
      <ClinicLayout user={user}>
        <Head title={`${user.first_name} `} />

        <div className="content container-fluid">

        <div className="page-header">
        <div className="row">
        <div className="col">
        <h3 className="page-title">Profile</h3>
        <ul className="breadcrumb">
        <li className="breadcrumb-item active">{doctor.first_name} {doctor.last_name} Profile</li>
        </ul>
        </div>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12">
        <div className="profile-header">
        <div className="row align-items-center">
        <div className="col-auto profile-image">
        <a href="#">
        <img className="rounded-circle" style={{ objectFit:'cover', width: 100, height: 100, borderRadius: 100 }} alt="User Image" src={`/storage/${doctor.image}`} />
        </a>
        </div>
        <div className="col ml-md-n2 profile-user-info">
        <h4 className="user-name mb-0">{doctor.first_name} {doctor.last_name}</h4>
        <h6 className="text-muted"></h6>
        </div>
        </div>
        </div>

        <div className="tab-content profile-tab-cont">

        <div className="tab-pane fade show active" id="per_details_tab">

        <div className="row">
        <div className="col-lg-12">
        <div className="card">
        <div className="card-body">
        <h5 className="card-title d-flex justify-content-between">
        <span>Personal Details</span>
        {/* <a className="edit-link" data-bs-toggle="modal" href="#edit_personal_details"><i className="fa fa-edit me-1"></i>Edit</a> */}
        </h5>
        <div className="row">
        <p className="col-sm-2 text-muted">Full Name</p>
        <p className="col-sm-10">{doctor.first_name} {doctor.last_name}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Date of Birth</p>
        <p className="col-sm-10">{new Date(doctor.birth_date).toLocaleDateString()}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Email ID</p>
        <p className="col-sm-10">{doctor.email}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Mobile</p>
        <p className="col-sm-10">{doctor.phone}</p>
        </div>
        <div className="row">
        <p className="col-sm-2 text-muted">Address</p>
        <p className="col-sm-10 mb-0">{doctor.address}<br />
        {doctor.city}<br />
        {doctor.state}<br />
        {doctor.country}</p>
        </div>
        </div>
        </div>

        {/* <div className="modal fade" id="edit_personal_details" aria-hidden="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Personal Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form>
        <div className="row">
        <div className="col-12">
        <div className="mb-3">
        <label className="mb-2">Image</label>
        <input type="file" className="form-control" />
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">First Name</label>
        <input type="text" className="form-control" value="John">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Last Name</label>
        <input type="text" className="form-control" value="Doe">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Date of Birth</label>
        <div className="cal-icon">
        <input type="text" className="form-control datetimepicker" value="24-07-1983">
        </div>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Gender</label>
        <select className="form-select">
        <option>Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        </select>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Email ID</label>
        <input type="email" className="form-control" value="johndoe@example.com">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Mobile</label>
        <input type="text" value="+1 202-555-0125" className="form-control">
        </div>
        </div>
        <div className="col-12">
        <h5 className="form-title"><span>Address</span></h5>
        </div>
        <div className="col-12">
        <div className="mb-3">
        <label className="mb-2">Address</label>
        <input type="text" className="form-control" value="4663 Agriculture Lane">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Country</label>
        <select className="form-select">
        <option>Select</option>
        <option value="India">India</option>
        </select>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">State</label>
        <select className="form-select">
        <option>Select</option>
        <option value="Delhi">Delhi</option>
        </select>
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">City</label>
        <input type="text" className="form-control" value="New York">
        </div>
        </div>
        <div className="col-12 col-sm-6">
        <div className="mb-3">
        <label className="mb-2">Location</label>
        <input type="text" className="form-control" value="Miami">
        </div>
        </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Save</button>
        </form>
        </div>
        </div>
        </div>
        </div> */}

        </div>
        </div>

        </div>



        </div>
        </div>
        </div>
        </div>

      </ClinicLayout>
    )
  }
}

export default DoctorProfile