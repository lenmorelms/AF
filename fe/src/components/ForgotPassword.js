// import React, { useState } from "react";
// import Button from "./reusables/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { forgotPassword } from "../redux/Actions";
// import Loading from "./reusables/Loading";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const dispatch = useDispatch();

//     const forgotPasswordData = useSelector((state) => state._forgotPassword);
//     const { error, success, loading } = forgotPasswordData;

//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(forgotPassword(email));
//     };

//     return (
//         <>
//         <div className="" style={{ textAlign: "center", padding: "5rem 1rem" }}>
//         {error && <div variant="alert-danger">Failed to Recover Account, Try Again.</div>}
//         {success && <div style={{ color: "red" }}>Reset password link sent to your email</div>}
//         {loading && <Loading />}
//         <div className="forgot-password">
//             <h3>Forgot your password</h3>
//             <p>Enter the email you use to login into AfriPredictor</p>

//             <div className="login-form d-flex justify-content-center align-items-center">
//                 <form onSubmit={submitHandler}>
//                 <div className="input-group">
//                     <input
//                         className="form-control margin"
//                         type="email"
//                         name="forgot-password"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     </div>
//                     <Button
//                         className="btn btn-login margin"
//                         type="submit"
//                         text="Submit"
//                     />
//                 </form>
//             </div>
//         </div>
//         </div>
//         </>
//     );
//  };

//  export default ForgotPassword;