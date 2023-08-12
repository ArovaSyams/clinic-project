import React from 'react'

const Profile = ({ user, data, setData, errors, handleSubmit, countries, states }) => {
  return (
    <div className="content container-fluid">

    <div className="page-header">
    <div className="row">
    <div className="col">
    <h3 className="page-title">Profile</h3>
    <ul className="breadcrumb">
    <li className="breadcrumb-item active">My Profile</li>
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
    <img className="image-full" style={{ objectFit:'cover', width: 100, height: 100, borderRadius: 100 }} alt="User Image" src={`/storage/${user.image}`} />
    </a>
    </div>
    <div className="col ml-md-n2 profile-user-info">
    <h4 className="user-name mb-0">{user.first_name} {user.last_name}</h4>
    <h6 className="text-muted">{user.role}</h6>
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
    <a className="edit-link" data-bs-toggle="modal" href="#edit_personal_details"><i className="fa fa-edit me-1"></i>Edit</a>
    </h5>
    <div className="row">
    <p className="col-sm-2 text-muted">Full Name</p>
    <p className="col-sm-10">{user.first_name} {user.last_name}</p>
    </div>
    <div className="row">
    <p className="col-sm-2 text-muted">Date of Birth</p>
    <p className="col-sm-10">{user.birth_date || '-'}</p>
    </div>
    <div className="row">
    <p className="col-sm-2 text-muted">Email ID</p>
    <p className="col-sm-10">{user.email}</p>
    </div>
    <div className="row">
    <p className="col-sm-2 text-muted">Mobile</p>
    <p className="col-sm-10">{user.phone || '-'}</p>
    </div>
    <div className="row">
    <p className="col-sm-2 text-muted">Address</p>
    <p className="col-sm-10 mb-0">{user.address || '-'}<br />
    {user.city}<br />
    {user.state}<br />
    {user.country}</p>
    </div>
    </div>
    </div>

    <div className="modal fade" id="edit_personal_details" aria-hidden="true" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
    <div className="modal-header">
    <h5 className="modal-title">Personal Details</h5>
    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
    <form onSubmit={handleSubmit}>
    <div className="row">
    <div className="col-12">
    <div className="mb-3">
    <label className="mb-2">Image</label>
    <input type="file" className="form-control" onChange={(e) => setData('image', e.target.files[0])} />
    <p style={{ color: 'red' }}>{errors.image}</p>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">First Name</label>
    <input type="text" className="form-control" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
    <p style={{ color: 'red' }}>{errors.first_name}</p>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Last Name</label>
    <input type="text" className="form-control" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
    <p style={{ color: 'red' }}>{errors.last_name}</p>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Date of Birth</label>
    <div className="cal-icon">
    <input type="date" className="form-control datetimepicker" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} />
    <p style={{ color: 'red' }}>{errors.birth_date}</p>
    </div>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Gender</label>
    <select className="form-select" onChange={(e) => setData('gender', e.target.value)}>
    <option value={data.gender || ''}>{data.gender || 'Select'}</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
    </select>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Email ID</label>
    <input type="email" className="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} />
    <p style={{ color: 'red' }}>{errors.email}</p>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Mobile</label>
    <input type="text" value={data.phone} className="form-control" onChange={(e) => setData('phone', e.target.value)}/>
    </div>
    </div>
    <div className="col-12">
    <h5 className="form-title"><span>Address</span></h5>
    </div>
    <div className="col-12">
    <div className="mb-3">
    <label className="mb-2">Address</label>
    <input type="text" className="form-control" value={data.address} onChange={(e) => setData('address', e.target.value)} />
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Country</label>
    <select className="form-select" onChange={(e) => setData('country', e.target.value)}>
    <option value={data.country || 'Select'}>{data.country || 'Select'}</option>
    {countries.map((country) => (
      <option key={country.key} value={country.country}>{country.country}</option>
    ))}
    </select>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">State</label>
    <select className="form-select" onChange={(e) => setData('state', e.target.value)}>
    <option value={data.state || ''}>{data.state || 'Select'}</option>
    {states.map((state) => (
      <option key={state.id} value={state.state}>{state.state}</option>
    ))}
    </select>
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">City</label>
    <input type="text" className="form-control" value={data.city} onChange={(e) => setData('city', e.target.value)} />
    </div>
    </div>
    <div className="col-12 col-sm-6">
    <div className="mb-3">
    <label className="mb-2">Location</label>
    <input type="text" className="form-control" value={data.location} onChange={(e) => setData('location', e.target.value)} />
    </div>
    </div>
    </div>
    <button type="submit" className="btn btn-primary w-100" data-bs-dismiss="modal">Save</button>
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
  )
}

export default Profile