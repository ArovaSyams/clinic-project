import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react'

const LoginOtp = () => {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    otp: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('check.otp'));
  };


  return (
    <>
      <Head title='Log In via OTP' />

      <div className="user-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="user-all-form">
                <div className="contact-form">
                  <h3>Confirm OTP</h3>
                  <p class="account-subtitle">Please enter the 4-digit code you just received on your phone.</p>
                  <form onSubmit={submit} id="contactForm">                    
                    <div className="row">
                      <div className="col-lg-12 ">
                        <div className="form-group">
                        <input value={data.otp} onChange={(e) => setData('otp', e.target.value)} type="text" name="otp" id="otp" className="form-control" placeholder="OTP number" />
                        {flash.message && (
                          <p style={{ color: 'red' }}>{flash.message}</p>
                        )}
                        {/* <p style={{ color: 'red' }}>{errors.otp}</p> */}
                        </div>
                      </div>
                    <div className="col-lg-12 col-md-12 text-center">
                      <button type="submit" className="default-btn">
                      Log In Now
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="account-desc text-center">
                      Not a member?
                      <a href="/register">Register</a>
                      </p>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginOtp