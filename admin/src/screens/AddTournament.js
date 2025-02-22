import React, { useEffect, useState } from "react";
import "../components/scripts.js";
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { createTournament, tournaments } from "../redux/Actions.js";
import LoaderSpinner from "../components/reusables/LoaderSpinner.js";

const AddTournament = () => {
    const token = localStorage.getItem('token');
    const [tournamentName, setTournamentName] = useState("");
    const [tournamentCategory, setTournamentCategory] = useState("");
    const [tournamentCountry, setTournamentCountry] = useState("");
    const [tournamentTeams, setTournamentTeams] = useState("");
    const dispatch = useDispatch();

    const tournamentData = useSelector((state) => state._createTournament);
    const { loading, data, success } = tournamentData;

    useEffect(() => {
      
    }, [dispatch, token]);

    const submitTournamentHandler = (e) => {
        e.preventDefault();
        dispatch(createTournament(tournamentName, tournamentCategory, tournamentCountry, tournamentTeams));
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

<div class="container fixtures-container">
  <h2>ADD A TOURNAMENT</h2>
  <form onSubmit={submitTournamentHandler}>
    <div class="form-group">
      <label for="">Tournament Name</label>
      <input type="text" class="form-control" id="name" name="name" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="">Fixture Kickoff Time :</label>
      <input type="time" class="form-control" id="time" name="time" value={fixtureTime} onChange={(e) => setFixtureTime(e.target.value)}  />
    </div>
    <div class="form-group">
      <label for="">Fixture Round:</label>
      <input type="number" class="form-control" id="round" name="round" value={fixtureRound} onChange={(e) => setFixtureRound(e.target.value)}  />
    </div>
	<div class="form-group">
      <label for="">Home Team:</label>
      <input type="text" class="form-control" value={fixtureHomeTeamId} onChange={(e) => setFixtureHomeTeamId(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="">Away Team:</label>
      <input type="text" class="form-control" value={fixtureAwayTeamId} onChange={(e) => setFixtureAwayTeamId(e.target.value)} />
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
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

export default AddTournament;