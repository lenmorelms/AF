// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import Select from "react-select";
// import countryList from "react-select-country-list";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { register, resendCode } from "../redux/Actions";
// import Button from "../components/reusables/Button";
// import { Link } from "react-router-dom";
// import "../Import.css";
// import Message from "./reusables/Message";
// import Loading from "./reusables/Loading";

// const Signup = () => {
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [country, setCountry] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [localError, setLocalError] = useState(null);
//     const [isAdmin] = useState(false);

//     const [showPassword, setShowPassword] = useState(false);
//     // const [showSendCode, setShowSendCode] = useState(false);

//     const countryOptions = useMemo(() => countryList().getData(), []);

//     const dispatch = useDispatch();

//     const registerData = useSelector((state) => state._register);
//     const { data, loading, error, success } = registerData;

//     const resendCodeData = useSelector((state) => state._resendCode);
//     const { loading: codeLoading, data: codeData, error: codeError, success: codeSuccess } = resendCodeData;

//     useEffect(() => {
//         if (error) {
//           setLocalError("Failed To Sign Up, Try Again");
//         //   setShowSendCode(false);
//           setTimeout(() => {
//             setLocalError(null);
//           }, 2500);
//         }
//       }, [error]);
//       useEffect(() => {
//         if (codeError) {
//           setLocalError("Failed To Resend Code, Try Again");
//         //   setShowSendCode(true);
//           setTimeout(() => {
//             setLocalError(null);
//           }, 2500);
//         }
//       }, [codeError]);
//       useEffect(() => {
//         // localStorage.removeItem("userInfo");
//         setLocalError(null);
//         // if(codeSuccess && codeData.verificationToken) setShowSendCode(true)
//     }, [data]);
//     useEffect(() => {
//         if(success) {
//             window.scrollTo(0, 0);
//             // setShowSendCode(true);
//         }
//     }, [success]);

//     const countryHandler = (value) => {
//         setCountry(value)
//     }

//     const handlePasswordToggle = () => {
//         setShowPassword(!showPassword);
//     };
//     const onInputChange = () => {
//         setLocalError(null);
//     };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         setLocalError(null);
//         if(password !== confirmPassword) {
//             setLocalError("Passwords dont match");
//         } else if(!document.getElementById("terms").checked) {
//             setLocalError("Accept terms");
//         }else if(password.length < 6) {
//             setLocalError("Password should be 6 characters or more");
//         } else {
//             dispatch(register(email, username, country.label, password, isAdmin));
//         }
//     };
//     // const submitResendHandler = (e) => {
//     //     e.preventDefault();
//     //     dispatch(resendCode(data._id));
//     // };

//     return (
//         <>
//         <div className="" style={{ textAlign: "center", padding: "5rem 1rem" }}>
//         {/* {success && <div>Account created, check email for verification link</div>} */}
//         {success && <div>Account Created Successfully, <a href="/signin">Click to Signin</a></div>}
//         {/* {codeSuccess && <div>Account verification link sent to email</div>} */}
//         {localError && (
//           <Message variant="alert-danger" onClose={() => setLocalError(null)}>
//             {localError}
//           </Message>
//           )}
//           {loading && <Loading />}
//           {/* {codeLoading && <Loading />} */}
//             <div className="red heading">Don't miss out on the fun <i class="fa fa-sign-in" aria-hidden="true"></i></div>
//             <div className="login-form d-flex justify-content-center align-items-center">
//                 <form onSubmit={submitHandler}>
//                     <input
//                         type="text"
//                         className="form-control margin"
//                         id="username"
//                         name="username"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => {
//                             setUsername(e.target.value);
//                             onInputChange();
//                         }}
//                         required 
//                     />
//                     <input
//                         type="email"
//                         className="form-control margin"
//                         id="email"
//                         name="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => {
//                             setEmail(e.target.value);
//                             onInputChange();
//                         }}
//                         required 
//                     />
//                     <Select className="margin" placeholder="Country" options={countryOptions} value={country} onChange={countryHandler} />
//                     <div className="input-group">
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         className="form-control margin"
//                         name="password"
//                         id="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => {
//                             setPassword(e.target.value);
//                             onInputChange();
//                         }}
//                         required
//                     />
//                     <button
//                         type="button"
//                         className="btn btn-outline-secondary margin"
//                         onClick={handlePasswordToggle}
//                     >
//                         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                     </button>
//                     </div>
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         className="form-control margin"
//                         name="confirm-password"
//                         id="confirmPassword"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => {
//                             setConfirmPassword(e.target.value);
//                             onInputChange();
//                         }}
//                         required
//                     />
//                     <input
//                         type="checkbox"
//                         className="margin"
//                         name="terms"
//                         id="terms"
//                         onChange={(e) => {
//                             onInputChange();
//                         }}
//                         required
//                     />
//                     <label for="termsAgreement">I agree to the Terms and Privacy Policy</label>
//                     <br />

//                     <Button
//                         className="btn btn-login margin"
//                         type="submit"
//                         text="Sign Up"
//                     />
                    
//                 </form>
//             </div>
//             <div className="flex m-3">
//             <p>Already have an account <Link to="/signin" className="p-2" style={{ textDecoration: "none" }}>Signin</Link> </p>
//             {/* {showSendCode && <button className="plain-button" onClick={submitResendHandler}><Link to="/" className="nav-item p-2" style={{ textDecoration: "none" }}>Resend Verification Code</Link></button>} */}
//             </div>
//         </div>
//         </>
//     );
// }

// export default Signup;