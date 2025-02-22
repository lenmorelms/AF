// import React, { useEffect } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import Button from '../components/reusables/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { verify } from '../redux/Actions';
// import Loading from '../components/reusables/Loading';

// const Verify = () => {
//     const { token } = useParams();
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const redirect = location.search ? location.search.split("=")[1] : "/";

//     const verifyData = useSelector((state) => state._verify);
//     const { data, loading, error, success } = verifyData;

//     const verifyHandle = (e) => {
//         e.preventDefault();
//         dispatch(verify(token));
//     };

//     useEffect(() => {
//         if (data && success) {
//             navigate("/signin");
//         }
//     }, [data, success, navigate]);

//     return (
//         <div className="verify-container">
//             <div className="verify-content">
//                 <h2 className="verify-heading">Verify Your AfriPredictor Account</h2>
//                 <p className="verify-subtext">
//                     You're just one step away from unlocking all the features! Please click the button below to verify your account and start predicting!
//                 </p>
//                 {loading && <Loading />}  
//                 <form onSubmit={verifyHandle}>
//                     <Button
//                         className="btn verify-button"
//                         type="submit"
//                         text="VERIFY ACCOUNT"
//                     />
//                 </form>

//                 <p className="verify-footer">
//                     Need help? <a href="/contact" className="verify-link">Contact Support</a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Verify;
