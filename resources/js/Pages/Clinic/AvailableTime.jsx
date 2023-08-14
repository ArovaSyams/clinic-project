import ClinicLayout from '@/Layouts/ClinicLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const AvailableTime = ({ user, timeSlots }) => {
  const { data, setData, post, progress, errors } = useForm({
    clinic_id: user.id,
    time_from: null,
    time_to: null
  }); 

  function onTimeChange(e) {
    var timeSplit = e.target.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return (hours + ':' + minutes + ' ' + meridian);

  }

  const timeFrom = (e) => {
    setData('time_from', onTimeChange(e));
  } 

  const timeTo = (e) => {
    setData('time_to', onTimeChange(e));
  } 

  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();

    post('/available-time');
  }

  return (
    <ClinicLayout user={user}>
      <Head title="Available Time" />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col">
      <h3 class="page-title">Available Timings</h3>
      <ul class="breadcrumb">
      <li class="breadcrumb-item active">Clinic Manager</li>
      </ul>
      </div>
      <div class="col-sm-5 col">
      <a href="#Add_Timing_details" data-bs-toggle="modal" class="btn btn-primary float-end mt-2">Add Timings</a>
      </div>
      </div>
      </div>


      <div class="row">
      <div class="col-md-12">
      <div class="card">

      <div class="card-body">

      <div class="row">
      <div class="col-xl-12">
      <div class="token-slot mt-2">
      
      {timeSlots.map((timeSlot, i) => (
        <div key={i} class="form-check-inline visits me-1">
        <label class="visit-btns">
        <input type="checkbox" class="form-check-input" />
        <span class="visit-rsn" data-bs-toggle="tooltip" title="10:00 AM - 12:00 PM">{timeSlot.time_from} - {timeSlot.time_to}</span>
        </label>
        </div>
      ))}
      
      </div>
      </div>
      </div>

      </div>
      </div>
      </div>
      </div>



      </div>

      <div class="modal fade" id="Add_Timing_details" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title">Add Timings</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={handleSubmit}>
      <div class="row">
      <div class="col-6 col-sm-12">
      <div class="mb-3">
      <label class="mb-2">Time From</label>
      <input type="time" onChange={(e) => timeFrom(e)} class="form-control" />
      <p style={{ color: 'red' }}>{errors.time_from}</p>
      </div>
      </div>
      <div class="col-6 col-sm-12">
      <div class="mb-3">
      <label class="mb-2">Time To</label>
      <input type="time" onChange={(e) => timeTo(e)} class="form-control" />
      <p style={{ color: 'red' }}>{errors.time_to}</p>
      </div>
      </div>
      </div>
      <button type="submit" data-bs-dismiss="modal" class="btn btn-primary w-100">Save</button>
      </form>
      </div>
      </div>
      </div>
      </div>

    </ClinicLayout>
  )
}

export default AvailableTime