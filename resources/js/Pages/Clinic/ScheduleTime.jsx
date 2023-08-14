import ClinicLayout from '@/Layouts/ClinicLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'



const ScheduleTime = ({ user, doctor, timeSlots, dates, availableTimes }) => {
  const { flash } = usePage().props;
  console.log(flash.message);
  const { data, setData, post, progress, errors } = useForm({
    doctor_id: doctor.unique_id,
    date_from: '',
    date_to: '',
    slot: '',
    available_times: [],
  }); 

  const [deleteData, setDeleteData] = useState({
    date: '',
    available_time: ''
  });
  
  console.log(deleteData);
  const handleAvailableTime = (available_time) => {
    console.log(data);
    let timed = data.available_times;
    let date = available_time;
    let index = timed.indexOf(date);
    
    // console.log(index);
    if (index > -1) {
      timed.splice(index, 1);

    } else {
      setData({ ...data, 
        available_times: [...data.available_times, available_time],
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/schedule-time');
  }

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    
    router.post('/delete-schedule-time', deleteData);
  }

  return (
    <ClinicLayout user={user}>
      <Head title={`${doctor.first_name} Schedule Time`} />

      <div class="content container-fluid">

      <div class="page-header">
      <div class="row">
      <div class="col">
      <h3 class="page-title">Schedule Timings</h3>
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
      <label class="col-lg-3 col-form-label">Date From</label>
      <div class="col-lg-9">
      <input type="date"  class="form-control" onChange={(e) => setData('date_from', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.date_from}</p>
      </div>
      </div>
      </div>
      <div class="col-xl-6">
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Date To</label>
      <div class="col-lg-9">
      <input type="date"  class="form-control" onChange={(e) => setData('date_to', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.date_to}</p>
      </div>
      </div>
      </div>
      <div class="col-xl-6">
      <div class="form-group row">
      <label class="col-lg-3 col-form-label">Available Slots</label>
      <div class="col-lg-9">
      <input type="text"  class="form-control" onChange={(e) => setData('slot', e.target.value)} />
      <p style={{ color: 'red' }}>{errors.slot}</p>
      </div>
      </div>
      </div>
      <div class="col-xl-12">
      <div class="token-slot mt-2">

      {timeSlots.map((timeSlot, i) => (
        <div class="form-check-inline visits me-1">
      <label class="visit-btns">
        <input type="checkbox" value={`${timeSlot.time_from} - ${timeSlot.time_to}`} onChange={(e) => handleAvailableTime(`${timeSlot.time_from} - ${timeSlot.time_to}`)} class="form-check-input" />
        <span class="visit-rsn" data-bs-toggle="tooltip" title={`${timeSlot.time_from} - ${timeSlot.time_to}`}>{timeSlot.time_from} - {timeSlot.time_to}</span>
      </label>
      </div>
      ))}
      <p style={{ color: 'red' }}>{errors.available_times}</p>

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


      <div class="col-sm-7 col-auto">
        <ul class="breadcrumb">
        <h3 class="page-title">Delete Schedule Time</h3>
        <li class="breadcrumb-item active"><br/></li>
        </ul>
      </div>
        <div class="row">
            <div class="col-md-12">
              <div class="card">

                <div class="card-body">
                <form onSubmit={handleDeleteSubmit}>
                {flash.message === "Data not found" ? (
                  <p style={{ color: 'red' }}>{flash.message}</p>
                ) : (
                  <p style={{ color: 'green' }}>{flash.message}</p>  
                )}
                  <div class="row">
                  <div class="col-xl-6">
                  <div class="form-group row">
                  <label class="col-lg-3 col-form-label">Date</label>
                  <div class="col-lg-9">
                  {/* <input type="date"  class="form-control" onChange={(e) => setData('date_from', e.target.value)} /> */}
                  <select class="form-select" onChange={(e) => setDeleteData({...deleteData, date: e.target.value})}>
                    <option value=''>Select</option>
                    {dates.map((date, i) => (
                      <option key={i} value={date.date}>{date.date}</option>
                    ))}

                  </select>
                  </div>
                  </div>
                  </div>
                  
                  <div class="col-xl-6">
                  <div class="form-group row">
                  <label class="col-lg-3 col-form-label">Available Time</label>
                  <div class="col-lg-9">
                  {/* <input type="text"  class="form-control" onChange={(e) => setData('slot', e.target.value)} /> */}
                  <select class="form-select" onChange={(e) => setDeleteData({...deleteData, available_time: e.target.value})}>
                    {!deleteData.date ? (
                      <option>Select Date First</option>
                    ):(
                      <option>Select</option>
                    )}

                    {availableTimes.map((time, i) => (
                      <>
                      {time.date === deleteData.date && (
                        <option key={i} value={time.available_time}>{time.available_time}</option>
                      )}
                      </>
                    ))}

                  </select>
                  </div>
                  </div>
                  </div>

                  </div>
                  <div class="text-end">
                  <button type="submit" class="btn btn-danger">Delete</button>
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

export default ScheduleTime