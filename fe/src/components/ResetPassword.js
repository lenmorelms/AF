import React, { useEffect, useState } from "react";
import Button from "./reusables/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Loading from "../components/LoadingError/Loading";
// import Message from "../components/LoadingError/Error";
// import { resetPassword } from "../Redux/Actions";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split("=")[1] : "/";

    // const resetPasswordData = useSelector((state) => state._resetPassword);
    // const { data, error, loading } = resetPasswordData;

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(password.length < 6) {
            alert("Password should be 6 characters or more")
        } else if(password !== confirmPassword) {
            alert("Passwords dont match");
        } else {
            // dispatch(resetPassword(token, password));
        }
    };

    // useEffect(() => {
    //     if(data && data.token) {
    //         navigate(redirect);
    //     }
    // }, [data, navigate, redirect]);

    return (
        <>
        <div className="" style={{ textAlign: "center", padding: "5rem" }}>
        {/* {error && <Message variant="alert-danger">Failed to Reset Your Password, Try Again.</Message>} */}
        {/* {loading && <Loading />} */}
        <div className="forgot-password">
            <h3>Reset your password</h3>
            <div className="login-form d-flex justify-content-center align-items-center">
                <form onSubmit={submitHandler}>
                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control margin"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary margin"
                        onClick={handlePasswordToggle}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                <div className="input-group">
                <input
                        type={showPassword ? "text" : "password"}
                        className="form-control margin"
                        id="confirmPassword"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                    <Button
                        className="btn btn-login margin"
                        type="submit"
                        children="Reset"
                    />
                </form>
            </div>
        </div>
        </div>
        </>
    );
 };

 export default ResetPassword;