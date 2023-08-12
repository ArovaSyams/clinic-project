import Profile from '@/Components/Profile'
import AdminLayout from '@/Layouts/AdminLayout'
import ClinicLayout from '@/Layouts/ClinicLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'

const MyProfile = ({ user, countries, states }) => {
  

  const { data, setData, post, progress, errors } = useForm({
    first_name: user.first_name,
    last_name: user.last_name,
    birth_date: user.birth_date,
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    address: user.address,
    country: user.country,
    state: user.state,
    city: user.city,
    location: user.location,
    image: null
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/update-profile/${user.id}`);
  }

  if (user.role === 'admin') {
    return (
      <AdminLayout user={user}>
        <Head title='My Profile' />
        <Profile 
          user={user} 
          data={data}
          setData={setData}
          errors={errors}
          handleSubmit={handleSubmit}
          countries={countries}
          states={states}
        />
      </AdminLayout>
    )
  } else if (user.role === 'clinic') {
    return (
      <ClinicLayout user={user}>
        <Profile 
          user={user} 
          data={data}
          setData={setData}
          errors={errors}
          handleSubmit={handleSubmit}
          countries={countries}
          states={states}
        />
      </ClinicLayout>
    )
  }
}

export default MyProfile