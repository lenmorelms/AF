import React, { useEffect } from "react";
import "../components/scripts.js";
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { roundFixtures } from "../redux/Actions.js";
import LoaderSpinner from "../components/reusables/LoaderSpinner.js";
import { useParams } from "react-router-dom";
import FixtureCard from "../components/FixtureCard.js";
import TournamentRoundsNav from "../components/reusables/TournamentRoundsNav.js";

const TournamentRound = () => {
    const { id, round } = useParams();
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const fixturesData = useSelector((state) => state._fetchFixtures);
    const { loading, data, success } = fixturesData;

    useEffect(() => {
      token &&  dispatch(roundFixtures(id, round));
    }, [dispatch, token, id, round]);

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
                        <TournamentRoundsNav id={id} />
                        <div className="row">
                            {success && data.fixtures.map((fixture) => (
                                <div className="column">
                                    {
                                    <FixtureCard
                                        tournamentId={id}
                                        fixtureId={fixture._id}
                                        date={fixture.date}
                                        time={fixture.time}
                                        homeTeamId={fixture.homeTeamId}
                                        awayTeamId={fixture.awayTeamId}
                                        actualHomeScore={fixture.actualHomeScore}
                                        actualAwayScore={fixture.actualAwayScore}
                                        result={fixture.result}
                                    />
                                    }
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

export default TournamentRound;