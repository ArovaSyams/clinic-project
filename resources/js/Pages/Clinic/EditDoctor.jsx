import ClinicLayout from '@/Layouts/ClinicLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { Autocomplete } from '@mui/joy';
import React, { useState } from 'react'

const EditDoctor = ({ user, doctor, doctorQualifications, qualifications, documents, countries, states, specialities }) => {

  const { data, setData, post, progress, errors } = useForm({
    clinic_id: doctor.clinic_id,
    first_name: doctor.first_name,
    last_name: doctor.last_name,
    gender: doctor.gender,
    birth_date: doctor.birth_date,
    image: doctor.image,
    email: doctor.email,
    phone: doctor.phone,
    address: doctor.address,
    country: doctor.country,
    state: doctor.state,
    city: doctor.city,
    location: doctor.location,
    introduction: doctor.introduction,
    speciality: doctor.speciality,
    service: doctor.service,
    documents: [],
    qualifications: [],
    document: '',
    id: ''
  }); 

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/doctor/${doctor.unique_id}/edit`);
  }

  const handleQualification = (event, qualification) => {
    setData({ ...data, qualifications: qualification });
  }

  const handleDeleteDocument = (document) => {
    router.delete(`/delete-document/${document}`);
  }

  const handleAddDocument = () => {

    post('/add-document');
  }

  return (
    <ClinicLayout user={user}>
      <Head title="Edit Doctor" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col">
      <h3 class="page-title">Add New Doctor</h3>
      <ul class="breadcrumb">
      <li class="breadcrumb-item active">Clinic Manager</li>
      </ul>
      </div>
      </div>
      </div>

      <div class="row">
      <div class="col-md-12">
      <div class="card">

      <div class="card-body">
      <form onSubmit={handleSubmit}>
      <div class="row">
      <div class="col-xl-6">
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">First Name</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.first_name}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Last Name</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.last_name}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Gender</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('gender', e.target.value)}>
      <option value={data.gender}>{data.gender}</option>
      <option value="Male" >Male</option>
      <option value="Female" >Female</option>
      <option value="Other" >Other</option>
      </select>
      <p style={{ color: 'red' }}>{errors.gender}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Date of Birth</label>
      <div class="col-lg-9">
      <input type="date" class="form-control" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.birth_date}</p>
      </div>
      </div>
      {/* <div class="form-group row">
      <label class="col-lg-3 col-form-label">Image</label>
      <div class="col-lg-9">
      <input type="file" class="form-control" onChange={(e) => setData('image', e.target.files[0])} />
      <p style={{ color: 'red' }}>{errors.image}</p>
      </div>
      </div> */}
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Email</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.email}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Phone</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.phone} onChange={(e) => setData('phone', e.target.value)} /> 
      <p style={{ color: 'red' }}>{errors.phone}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Address</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.address} onChange={(e) => setData('address', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.address}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Country</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('country', e.target.value)}>
      <option value={data.country}>{data.country || 'Select'}</option>
      {countries.map((country, i) => (
        <option key={i} value={country.country}>{country.country}</option>
        ))}
      </select>
      <p style={{ color: 'red' }}>{errors.country}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">State</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('state', e.target.value)}>
      <option value={data.state}>{data.state || 'Select'}</option>
      {states.map((state, i) => (
        <option key={i} value={state.state}>{state.state}</option>
        ))}
      </select>
        <p style={{ color: 'red' }}>{errors.state}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">City</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.city} onChange={(e) => setData('city', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.city}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Location</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.location} onChange={(e) => setData('location', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.location}</p>
      </div>
      </div>
      </div>
      <div class="col-xl-6">
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Introduction</label>
      <div class="col-lg-9">
      <textarea class="form-control" value={data.introduction} style={{ height: '10em' }} onChange={(e) => setData('introduction', e.target.value)} ></textarea>
      <p style={{ color: 'red' }}>{errors.introduction}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Speciality</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('speciality', e.target.value)}>
      <option value={data.speciality}>{data.speciality || 'Select'}</option>
      {specialities.map((speciality, i) => (
        <option key={i} value={speciality.speciality}>{speciality.speciality}</option>
      ))}

      </select>
      <p style={{ color: 'red' }}>{errors.speciality}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Qualifications</label>
      <div class="col-lg-9">
      {/* <input type="text" class="form-control" onChange={(e) => setData('qualification', e.target.value)} /> */}
      <Autocomplete
          multiple
          id="tags-default"
          placeholder="Favorites"
          options={qualifications}
          getOptionLabel={(option) => option.qualification}
          onChange={handleQualification}
          defaultValue={doctorQualifications.map((qual) => (qual))}
      />

      <p style={{ color: 'red' }}>{errors.qualification}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Services</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" value={data.service} onChange={(e) => setData('service', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.service}</p>
      </div>
      </div>
      {/* <div class="form-group row">
      <label class="col-lg-3 col-form-label">Documents</label>
      <div class="col-lg-9">
      <input type="file" class="form-control" multiple onChange={(e) => setData('documents', e.target.files)} />
      <p style={{ color: 'red' }}>{errors.documents}</p>
      </div>
      </div> */}

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

      <div class="col-sm-7 col-auto">
        <ul class="breadcrumb">
        <h3 class="page-title">Edit Profile</h3>
        <li class="breadcrumb-item active"><br/></li>
        </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
              <div class="card">

                <div class="card-body">
                <div class="form-group row">
                <label class="col-lg-2 col-form-label">
                <img src={`/storage/${doctor.image}`} alt="" width={150} style={{ borderRadius: 10 }} />
                </label>
                <div class="col-lg-10">
                <input onChange={(e) => setData('image', e.target.files[0])} onClick={(e) => setData('id', doctor.unique_id)} type="file" class="form-control mt-2" />
                </div>
                </div>

                <div class="text-end">
                  <button onClick={handleSubmit} class="btn btn-primary">Edit</button>
                </div>

                </div>
              </div>
            </div>
          </div>

      <div class="col-sm-7 col-auto">
        <ul class="breadcrumb">
        <h3 class="page-title">Edit Documents</h3>
        <li class="breadcrumb-item active"><br/></li>
        </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
              <div class="card">

                <div class="card-body">
                
                {documents.map((document, i) => (
                <div key={i} class="form-group row">
                <label class="col-lg-3 col-form-label">
                {/* <img src={`/storage/${doctor.image}`} alt="" width={150} style={{ borderRadius: 10 }} /> */}
                <embed src={`/storage/${document.document}`} width={"100%"} />
                </label>
                <div class="col-lg-9">
                <a className="btn btn-info text-white mt-2" style={{ marginRight: '5px' }} target="_blank" href={`/storage/${document.document}`}>
                  Detail
                </a>
                  <button className="btn btn-danger mt-2" onClick={() => handleDeleteDocument(document.id)}>Delete</button>
                {/* <input onChange={(e) => setData('documents', e.target.files[0])} onClick={(e) => setData('id', document.unique_id)} type="file" class="form-control" /> */}
                </div>
                </div>

                ))}
{/* 
                <div class="text-end">
                  <button class="btn btn-primary">Edit</button>
                </div> */}

                <hr />
                <div className="mt-5">
                  <h3>Add Document</h3>
                  <input onChange={(e) => setData('document', e.target.files[0])} onClick={() => setData('id', doctor.unique_id)} type="file" class="form-control" />
                  <p style={{ color: 'red' }}>{errors.document}</p>

                  <div class="text-end mt-3">
                    <button class="btn btn-primary" onClick={handleAddDocument}>Add</button>
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

export default EditDoctor