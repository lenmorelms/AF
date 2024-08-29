import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/reusables/Button';
import { useDispatch, useSelector } from 'react-redux';
// import { verify } from '../Redux/Actions';
// import Message from '../components/LoadingError/Error';
// import Loading from '../components/LoadingError/Loading';

const Verify = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split("=")[1] : "/tournaments";

    // const verifyData = useSelector((state) => state._verify);
    // const { data, loading, error } = verifyData;

    const verifyHandle = (e) => {
        e.preventDefault();
        // dispatch(verify(token));
    };

    // useEffect(() => {
    //     if (data && data.token) {
    //         navigate(redirect);
    //     }
    // }, [data, navigate, redirect]);

    return (
        <div className="container">
            <div className="row" style={{ textAlign: "center", padding: "5rem" }}>
            <h2 className="center">Account Verification</h2><br />
            {/* {error && <Message variant="alert-danger">Failed to Verify Account, Try Again.</Message>} */}
            {/* {loading && <Loading />} */}
            <form onSubmit={verifyHandle}>
                <Button
                    className="btn btn-success"
                    type="submit"
                    children="VERIFY"
                />
            </form>
            </div>
        </div>
    );
};

export default Verify;