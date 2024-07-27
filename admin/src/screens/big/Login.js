import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Actions";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const loginData = useSelector((state) => state._login);
    const { data, loading, error } = loginData;

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if(error) console.log("Erro "+error);
        if (data && data.token) {
            console.log("Data "+data);
        }
    }, [data, error]);
    
    return (
        <>
        <form onSubmit={loginHandler}>
                            <label for="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label for="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                            >
                                LOGIN
                            </button>
                    </form>
        </>
    )
};

export default LoginScreen;