import ClinicLayout from '@/Layouts/ClinicLayout'
import { Head, useForm } from '@inertiajs/react'
import { Autocomplete } from '@mui/joy';
import React from 'react'

const CreateDoctor = ({ user, countries, states, specialities, qualifications }) => {

  const { data, setData, post, progress, errors } = useForm({
    clinic_id: user.id,
    first_name: '',
    last_name: '',
    gender: '',
    birth_date: '',
    image: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    city: '',
    location: '',
    introduction: '',
    speciality: '',
    documents: [],
    qualifications: [],
    service: '',
  }); 

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/doctor');
  }

  const handleQualification = (event, qualification) => {
    setData('qualifications', qualification);
  }

  return (
    <ClinicLayout user={user}>
      <Head title="Create Doctor" />

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
      <input type="text" class="form-control" onChange={(e) => setData('first_name', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.first_name}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Last Name</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" onChange={(e) => setData('last_name', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.last_name}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Gender</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('gender', e.target.value)}>
      <option>Select</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      </select>
      <p style={{ color: 'red' }}>{errors.gender}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Date of Birth</label>
      <div class="col-lg-9">
      <input type="date" class="form-control" onChange={(e) => setData('birth_date', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.birth_date}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Image</label>
      <div class="col-lg-9">
      <input type="file" class="form-control" onChange={(e) => setData('image', e.target.files[0])} />
      <p style={{ color: 'red' }}>{errors.image}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Email</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" onChange={(e) => setData('email', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.email}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Phone</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" onChange={(e) => setData('phone', e.target.value)} /> 
      <p style={{ color: 'red' }}>{errors.phone}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Address</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" onChange={(e) => setData('address', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.address}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Country</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('country', e.target.value)}>
      <option>Select</option>
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
      <option>Select</option>
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
      <input type="text" class="form-control" onChange={(e) => setData('city', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.city}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Location</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" onChange={(e) => setData('location', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.location}</p>
      </div>
      </div>
      </div>
      <div class="col-xl-6">
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Introduction</label>
      <div class="col-lg-9">
      <textarea class="form-control" style={{ height: '10em' }} onChange={(e) => setData('introduction', e.target.value)} ></textarea>
      <p style={{ color: 'red' }}>{errors.introduction}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Speciality</label>
      <div class="col-lg-9">
      <select class="form-select" onChange={(e) => setData('speciality', e.target.value)}>
      <option>Select</option>

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
          // defaultValue={[tags[0]]}
      />

      <p style={{ color: 'red' }}>{errors.qualifications}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Services</label>
      <div class="col-lg-9">
      <input type="text" class="form-control" onChange={(e) => setData('service', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.service}</p>
      </div>
      </div>
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Documents</label>
      <div class="col-lg-9">
      <input type="file" class="form-control" multiple onChange={(e) => setData('documents', e.target.files)} />
      Documents must with PDF format
      <p style={{ color: 'red' }}>{errors.documents}</p>
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

    </ClinicLayout>
  )
}

export default CreateDoctor