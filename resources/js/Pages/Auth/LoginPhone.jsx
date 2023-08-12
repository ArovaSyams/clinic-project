import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react'

const LoginPhone = () => {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    phone: '',
    // password: '',
    // remember: false,
  });
  
  const submit = (e) => {
    e.preventDefault();

    post(route('sendLoginOtp'));
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
                  <h3>Log In Via OTP</h3>
                  <form onSubmit={submit} id="contactForm">                    
                    <div className="row">
                      <div className="col-lg-12 ">
                        <div className="form-group">
                        <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} type="text" name="phone" id="phone" className="form-control" placeholder="Phone number" />
                        {flash.message && (
                          <p style={{ color: 'red' }}>{flash.message}</p>
                        )}
                        {/* <p style={{ color: 'red' }}>{errors.phone}</p> */}
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

export default LoginPhone