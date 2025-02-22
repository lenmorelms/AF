import React, { useEffect } from "react";
import "../components/scripts.js";
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { tournaments } from "../redux/Actions.js";
import LoaderSpinner from "../components/reusables/LoaderSpinner.js";
import TournamentCard from "../components/TournamentCard.js";

const Home = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const tournamentsData = useSelector((state) => state._fetchTournaments);
    const { loading, data, success } = tournamentsData;

    useEffect(() => {
      token &&  dispatch(tournaments());
    }, [dispatch, token]);

    const tournamentDeleteHandler = () => {
        return null;
    };
    return (
        <>
        <body className="sb-nav-fixed">
        {<Header />}
        <div id="layoutSidenav">
            {<Sidebar />}
            <div id="layoutSidenav_content">
                <main>
                    <div claassName="container-fluid px-4">
                        <h1 claassName="mt-4">Dashboard</h1>
                        {loading && (
                            <div className="loading-overlay">
                                <div className="loading-spinner">
                                <LoaderSpinner />
                                </div>
                            </div>
                        )}

                            <div className="row">
                            {success && data.tournaments.map((tournament) => (
                                <div className="column">
                                <TournamentCard
                                    key={tournament._id}
                                    imageUrl="https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg"
                                    title={tournament.name}
                                    onFixtures={`/${tournament._id}/fixtures`}
                                    onDelete={tournamentDeleteHandler}
                                    onClick={`/${tournament._id}`}
                                />
                                </div>
                            ))}
                        </div>

                    </div>
                </main>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        {/* <script src="js/scripts.js"></script> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        {/* <script src="assets/demo/chart-area-demo.js"></script> */}
        {/* <script src="assets/demo/chart-bar-demo.js"></script> */}
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
        {/* <script src="js/datatables-simple-demo.js"></script> */}
    </body>
        </>
    );
};

export default Home;