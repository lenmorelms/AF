import React, { useEffect, useState } from "react";
import "../components/scripts.js";
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { createFixture, tournament, tournaments } from "../redux/Actions.js";
import LoaderSpinner from "../components/reusables/LoaderSpinner.js";
import TournamentCard from "../components/TournamentCard.js";
import { useParams } from "react-router-dom";


const convertGMT2ToUTC = (dateString) => {
  // Create a Date object assuming the date is in GMT+2
  // GMT+2 is 2 hours ahead of UTC, so subtract 2 hours to get UTC
  const date = new Date(dateString);
  
  // Adjust the date by subtracting the 2-hour difference
  const utcDate = new Date(date.getTime() - 2 * 60 * 60 * 1000);
  
  return utcDate;
}

const Fixture = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const dispatch = useDispatch();
    const [fixtureDate, setFixtureDate] = useState("");
    const [fixtureTime, setFixtureTime] = useState("");
    const [fixtureDateTime, setFixtureDateTime] = useState(null);
    const [fixtureRound, setFixtureRound] = useState("");
    const [fixtureHomeTeamId, setFixtureHomeTeamId] = useState("");
    const [fixtureAwayTeamId, setFixtureAwayTeamId] = useState("");

    const fixtureData = useSelector((state) => state._createFixture);
    const { loading, success, error } = fixtureData;

    // const tournamentData = useSelector((state) => state._fetchTournaments);
    // const { data: dataTournament, success: successTournament } = tournamentData;
    // let teamIdOptions = [];

    // useEffect(() => {
    //     token && dispatch(tournament(id));
    // }, [dispatch, token, id,]);

    // useEffect(() => {
    //       success &&  data.team.map((team) => (
    //         teamIdOptions.push({ value: team, label: team })
    //       ))
    // }, [data, success, teamIdOptions]);
    useEffect(() => {
        success && alert("Fixture Added");
        error && alert(error);
    }, [success, error]);

    const submitFixtureHandler = (e) => {
        e.preventDefault();
        dispatch(createFixture(id, convertGMT2ToUTC(fixtureDateTime), fixtureRound, fixtureHomeTeamId, fixtureAwayTeamId));
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
  <h2>ADD A FIXTURE</h2>
  <form onSubmit={submitFixtureHandler}>
    {/* <div class="form-group">
      <label for="">Fixture Date:</label>
      <input type="date" class="form-control" id="date" name="date" value={fixtureDate} onChange={(e) => setFixtureDate(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="">Fixture Kickoff Time :</label>
      <input type="time" class="form-control" id="time" name="time" value={fixtureTime} onChange={(e) => setFixtureTime(e.target.value)}  />
    </div> */}
    <div class="form-group">
      <label>Date Time</label>
      <input type="datetime-local" class="form-control" id="datetime" name="datetime" value={fixtureDateTime} onChange={(e) => setFixtureDateTime(e.target.value)} />
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

export default Fixture;