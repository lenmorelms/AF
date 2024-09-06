// src/screens/HomeScreen.js
import React, { useState } from 'react';
import Header2 from '../components/Header2';
import MobileHeader from '../components/mobile/MobileHeader';
import Footer2 from '../components/reusables/Footer2';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/reusables/Button';
import FooterMobile from '../components/reusables/FooterMobile';
// import { sendMail } from '../Redux/Actions';
// import Message from '../components/LoadingError/Error';
// import Loading from '../components/LoadingError/Loading';

const Contact = ({ deviceType }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

//   const sendMailData = useSelector((state) => state._sendMail);
//   const { data, loading, error, success } = sendMailData;

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(sendMail(fullName, email, message));
  };

  return (
    <>
    <div className="heading">
        {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
    </div>
    {/* <div className='homepage-hero'>
      <h1>CONTACT US</h1>
    </div> */}
    <div className='terms-of-use'>
        <div className='container col-lg-8 p-3 pt-5'>
        <h1 className='red' style={{textAlign: "center", padding: "1rem"}}>
            CONTACT US
        </h1>
        {/* <h3 className='red' style={{textAlign: "center", padding: "5rem"}}>
            Contact Afripredictor
        </h3> */}
        {/* Contact form */}
{/* <section class="bg-light py-3 py-md-5"> */}
<section className='py-3 py-md-5'>
  <div className="container">
    <div className="row justify-content-lg-center">
      <div className="">
        <div className="bg-white border rounded shadow-sm overflow-hidden">
         
          <form onSubmit={submitHandler}>
            <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
              {/* {error &&  <Message variant="alert-danger">Failed to Send Email, Try Again.</Message>} */}
              {/* {success && <p>{data.message}</p>} */}
              {/* {loading && <Loading />} */}
              <div className="col-12">
                <label for="fullname" class="form-label">Full Name <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="fullname" 
                  name="fullname" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              <div className="">
                <label for="email" className="form-label">Email <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="col-12">
                <label for="message" className="form-label">Message <span className="text-danger">*</span></label>
                <textarea 
                  className="form-control"
                  id="message" 
                  name="message" 
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required>
                </textarea>
              </div>
              <div className="col-12">
                <div className="d-grid" style={{ textAlign: "center" }}>
                  <Button 
                    className="btn btn-login margin"
                    type="submit"
                    text="Submit"
                  />
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</section>

        </div>
    </div>
    {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
    </>
  );
};

export default Contact;