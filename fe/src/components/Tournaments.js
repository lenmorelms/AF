import React, { useEffect, useMemo, useState } from "react";
import Tournament from "./reusables/Tournament";
import { heroImage2 } from "./reusables/Functions";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, profile, tournaments } from "../redux/Actions";
import Loading from "./reusables/Loading";
import { checkTournIdMatch, isTokenValid, replaceSpacesWithHyphens } from "./reusables/Functions";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Tournaments = ({ source }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const{ userId, getToken } = useAuth();

    const getUserDataData = useSelector((state) => state._getUserData);
    const { data: userData, loading: userLoading, error: userError, success: userSuccess } = getUserDataData;

    const tournamentsData = useSelector((state) => state._tournaments);
    const { data, loading, error, success } = tournamentsData;
    useEffect(() => {
        async function fetchUserData() {
            const token = await getToken();
            dispatch(getUserData(userId, token));
        }
    
        if (userId) {  // Only run the effect when userId is defined
            fetchUserData();
        }
    }, [dispatch, userId, getToken]);
    
    

    useEffect(() => {
        async function fetchTournaments() {
            // Retrieve the token from Clerk
            const token = await getToken();
            // Dispatch the Redux thunk with the token as an argument
            dispatch(tournaments(token));
            // console.log(token)
          }
          fetchTournaments();
    }, [dispatch, getToken]);
    const GPL = `Predict, compete, and win with the GPL predictor game! After Nsoatreman's thrilling FA Cup victory, 
                can they carry that momentum into the new season? Demonstrate your knowledge, forecast match results, 
                and rise to the top. With GPL teams strengthening their squads, this season promises to be electrifying. 
                Join now and become the ultimate GPL champion`;
    const NPFL = `Get ready for the NPL predictor challenge! With Enugu Rangers last season's success, 
                can they translate that form to the 2023/24 season? Predict match winners, scores, and more, and 
                compete against others. New teams, new talent, and new storylines - join the fun now and stay ahead of the curve!`;
    const PSL = `Join the PSL predictor game and ride the wave of Mamelodi Sundowns' dominance!
                 Can anyone dethrone the reigning champs? Predict match outcomes, earn points, 
                 and outsmart fellow fans. With new signings and coaching changes, this season is shaping up to be unpredictable. 
                 Sign up now and show off your expertise!`;
    const UCL = `Join the UCL predictor game and experience the thrill of Europe's elite competition like never before! With an expanded
                 format featuring more teams and exciting new match-ups, can anyone stop Real Madrid from dominating? Predict match outcomes,
                 earn points, and outsmart fellow fans as the continent's top teams clash. New format, new excitement - sign up now and prove
                  your UCL expertise!`;
    const CCC = `Get ready for the Castle Challenge Cup Predictor Game! 🏆🔥 As Simba Bhora, last season’s league champions, take on Dynamos in a thrilling
                 showdown on February 22, 2025, ⚽🔥 the stage is set for an epic battle! Will Simba Bhora prove their dominance, or can Dynamos rise to the challenge
                 and claim victory?`;
    const MTN8 = "";
    const NEDBANKCUP = "";
    const styles = {
        container: {
            backgroundImage: `url(${heroImage2})`,

        },
        heading: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#fff',
        }
    };
    return (
        <div style={styles.container} className="homepage-hero">
            {loading && <Loading />}
            {
                success && (
                    <>
                    <h3 style={styles.heading}>Tournaments</h3>
                    <div className="">
                        <div className="flex-container-wrap">
                        {data.tournaments.length === 0 && (
                         <div className="center">
                           NO TOURNAMENTS AS OF YET...
                      </div>
                         )}
                            {data && data.tournaments.map((tournament) => (
                                <div className="flex-tournament" key={tournament._id}>
                                      
                                    <Tournament
                                        data={tournament}
                                        Id={tournament._id}
                                        logoUrl={`/tourn_logos/${(tournament.name).toLowerCase()}.png`}
                                        flagUrl={`/flags/${replaceSpacesWithHyphens((tournament.country).toLowerCase())}.png`}
                                        title={tournament.name}
                                        // description={tournament.description || ``}
                                        description={(
                                                     tournament.name=='CCC' ? CCC :
                                                     tournament.name=='PSL' ? PSL :
                                                     tournament.name=='GPL' ? GPL :
                                                     tournament.name=='NPFL' ? NPFL :
                                                     tournament.name=='UCL' ? UCL :
                                                     tournament.name=='MT8' ? MTN8 :
                                                     tournament.name=='NEDBANKCUP' ? NEDBANKCUP : "")}
                                        buttonText={userId===null ? "Play Predictor" : source===`join` ? `Play Predictor` : source===`play` ? (userSuccess && (checkTournIdMatch(userData.user.tournaments, tournament._id)) ? `Make Predictions` : `Join Tournament`): `Play Predictor`}
                                        isPlayerPartOfTournament={(userSuccess && userData===null) ? "Play Predictor" : !userId ? false : (userSuccess && checkTournIdMatch(userData.user.tournaments, tournament._id))}
                                        source={source}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                ) 

            // )
            }
        </div>
    );
};

export default Tournaments;