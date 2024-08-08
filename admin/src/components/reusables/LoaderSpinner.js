import React from "react";
import { Audio } from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <>
        <Audio
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />
        </>
    )
};

export default LoaderSpinner;