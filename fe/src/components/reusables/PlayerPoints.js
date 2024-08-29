import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { playerPoints } from "../../redux/Actions";

const PlayerPoints = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const playerPointsData = useSelector((state) => state._playerPoints);
    const { data, error } = playerPointsData;

    useEffect(() => {
        dispatch(playerPoints(id));
    }, [dispatch, id]);
    return (
        <>
            {data && data.playerPoints}
            {error && ""}
        </>
    );
};

export default PlayerPoints;