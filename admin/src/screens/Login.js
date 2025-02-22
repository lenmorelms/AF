import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions";
import LoaderSpinner from "../components/reusables/LoaderSpinner";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginData = useSelector((state) => state._login);
    const { data, loading, error } = loginData;

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if(error) console.log("Erro "+error);
        if (data && data.token) {
            navigate("/home");
        }
    }, [data, error, navigate]);
    
    return (
        <>
        <body className="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    {loading && (
                                        <div className="loading-overlay">
                                            <div className="loading-spinner">
                                            <LoaderSpinner />
                                            </div>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <form onSubmit={loginHandler}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                            <input className="form-control" id="inputPassword" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                {/* <a className="small" href="password.html">Forgot Password?</a> */}
                                                <button className="btn btn-primary" type="submit">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a href="/">Forgot Password</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
    </body>
        </>
    )
};

export default LoginScreen;