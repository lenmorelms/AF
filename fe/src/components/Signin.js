// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { login } from "../redux/Actions";
// import Message from "./reusables/Message";
// import Loading from "./reusables/Loading";
// import Button from "../components/reusables/Button";
// import { isTokenValid } from "./reusables/Functions";

// const Signin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [localError, setLocalError] = useState(null);


//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const redirect = location.search ? location.search.split("=")[1] : "/";

//     const loginData = useSelector((state) => state._login);
//     const { data, loading, error } = loginData;

//    // Check if user is already logged in and redirect if token is valid
//     // useEffect(() => {
//     //   if (isTokenValid) {
//     //     navigate(redirect);
//     //   }
//     // }, [navigate, redirect]);

//     useEffect(() => {
//         if (data && data.token) {
//           // window.scrollTo(0, 0);
//           navigate(redirect);
//         }
//     }, [data, navigate, redirect]);
//     useEffect(() => {
//       if (error) {
//         setLocalError("Wrong Username/Password, Try Again.");
//       }
//     }, [error]);

//     const handlePasswordToggle = () => {
//         setShowPassword(!showPassword);
//     };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         setLocalError(null);
//         dispatch(login(email, password));
//     };

//     const onInputChange = () => {
//       setLocalError(null);
//     };

//     return (
//         <>
//         <div  className="" style={{ textAlign: "center", padding: "5rem 1rem" }}>
//           {/* {error && <Message variant="alert-danger">Wrong Username/Password, Try Again.</Message>} */}
//           {localError && (
//           <Message variant="alert-danger" onClose={() => setLocalError(null)}>
//             {localError}
//           </Message>
//           )}
//           {loading && <Loading />}
//             <div className="red heading">Sign In<i class="fa fa-sign-in" aria-hidden="true"></i></div>
//             <br />
//             <div className="login-form d-flex justify-content-center align-items-center">
//                 <form onSubmit={submitHandler}>
//                 <div className="input-group">
//                 <input
//                     type="email"
//                     className="form-control margin"
//                     id="email"
//                     name="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       onInputChange();
//                     }}  
//                     required
//                 />
//                 </div>
//                 <div className="input-group">
//             <input
//               type={showPassword ? "text" : "password"}
//               className="form-control margin"
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 onInputChange();
//               }}
//               required
//             />
//             <button
//               type="button"
//               className="btn btn-outline-secondary margin"
//               onClick={handlePasswordToggle}
//             >
//               <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//             </button>
//           </div>
//           <Button
//             className="btn btn-login margin"
//             type="submit"
//             text="Sign In"
//           />

//                 </form>
//             </div>
//             <div className="flex m-3">
//             <Link to="/forgot-password" className="nav-item p-2" style={{ textDecoration: "none" }}>Forgot Password</Link>
//             <Link to="/signup" className="p-2" style={{ textDecoration: "none" }}>Sign Up</Link>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Signin;