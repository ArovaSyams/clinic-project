import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

const Specialities = ({ user, specialities }) => {
  const [currentSpeciality, setCurrentSpeciality] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [constantId, setConstantId ] = useState('');
  
  const { data, setData, post, progress, errors } = useForm({
    speciality: '',
    image: null,
  });

  console.log(data);
  
  function handleSubmit(e) {
    e.preventDefault();
    post('/speciality');
  }

  function handleUpdateData(uptSpeciality, uptImage) {
    setData({
      speciality: uptSpeciality,
      image: uptImage
    });

  }
  
  function handleEdit(e) {
    e.preventDefault();
    
    post(`/update-speciality/${constantId}`);
  }



  return (
    <AdminLayout user={user}>
      <Head title="Specialities" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col-sm-7 col-auto">
      <h3 class="page-title">Specialities</h3>
      <ul class="breadcrumb">
      <li class="breadcrumb-item active">Admin Panel</li>
      </ul>
      </div>
      <div class="col-sm-5 col">
      <a href="#Add_Specialities_details" data-bs-toggle="modal" class="btn btn-primary float-end mt-2">Add</a>
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
      <th>Speciality</th>
      <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        {specialities.map((special) => (
          <tr key={special.id}>
          <td>
          <h2 class="table-avatar">
          <a href="" class="avatar avatar-sm me-2">
          <img class="avatar-img" src={`/storage/${special.image}`} alt="Speciality" />
          </a>
          <a href="">{special.speciality}</a>
          </h2>
          </td>
          <td>
          <div class="actions">
          <a onClick={() => {setCurrentSpeciality(special.speciality); setCurrentImage(special.image); handleUpdateData(special.speciality, special.image); setConstantId(special.speciality)}} class="btn btn-sm bg-success-light" data-bs-toggle="modal" href="#edit_specialities_details">
          <i class="fe fe-pencil"></i> Edit
          </a>
          <a onClick={() => setCurrentSpeciality(special.speciality)} data-bs-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
          <i class="fe fe-trash"></i> Delete
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

      {/* Modals */}

      <div class="modal fade" id="Add_Specialities_details" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title">Add Speciality</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={handleSubmit}>
      <div class="row">
      <div class="col-12 col-sm-6">
      <div class="mb-3">
      <label class="mb-2">Speciality</label>
      <input type="text" onChange={(e) => setData('speciality', e.target.value)} class="form-control" />
      <p style={{ color: 'red' }}>{errors.speciality}</p>
      </div>
      </div>
      <div class="col-12 col-sm-6">
      <div class="mb-3">
      <label class="mb-2">Image</label>
      <input type="file" onChange={(e) => setData('image', e.target.files[0])} class="form-control" />
      <p style={{ color: 'red' }}>{errors.image}</p>
      </div>
      </div>
      </div>
      <button type="submit" class="btn btn-primary w-100" data-bs-dismiss="modal">Save</button>
      </form>
      </div>
      </div>
      </div>
      </div>


      <div class="modal fade" id="edit_specialities_details" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title">Edit Speciality</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={handleEdit}>
      <div class="row">
      <div class="col-12 col-sm-6">
      <div class="mb-3">
      <label class="mb-2">Speciality</label>
      <input type="text" class="form-control" value={currentSpeciality} onChange={(e) => {setCurrentSpeciality(e.target.value); handleUpdateData(e.target.value, currentImage)}} />
      </div>
      </div>
      <div class="col-12 col-sm-6">
      <div class="mb-3">
      <label class="mb-2">Image</label>
      <input type="file" onChange={(e) => {setCurrentImage(e.target.files[0]); handleUpdateData(currentSpeciality, e.target.files[0])}}  class="form-control" />
      </div>
      </div>
      </div>
      <button type="submit" class="btn btn-primary w-100" data-bs-dismiss="modal">Save</button>
      </form>
      </div>
      </div>
      </div>
      </div>


      <div class="modal fade" id="delete_modal" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-body">
      <div class="form-content p-2">
      <h4 class="modal-title">Delete</h4>
      <p class="mb-4">Are you sure want to delete?</p>
      {/* <button type="button" class="btn btn-success"> */}
        <Link href={`/speciality/${currentSpeciality}`} as="button" method="delete" class="btn btn-success" data-bs-dismiss="modal">
          Yes
        </Link>
      {/* </button> */}
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No</button>
      </div>
      </div>
      </div>
      </div>
      </div>
    </AdminLayout>
  )
}

export default Specialities 