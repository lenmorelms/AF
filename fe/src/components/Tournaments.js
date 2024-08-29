import React, { useEffect, useMemo, useState } from "react";
import Tournament from "./reusables/Tournament";
import { useDispatch, useSelector } from "react-redux";
import { profile, tournaments } from "../redux/Actions";
import Loading from "./reusables/Loading";
import { checkTournIdMatch, isTokenValid, replaceSpacesWithHyphens, userData } from "./reusables/Functions";

const Tournaments = ({ source }) => {
    // const [userProfile, setUserProfile] = useState(userData);
    const dispatch = useDispatch();
    // const profileData = useSelector((state) => state._profile);
    // const { success: successProfile, data: dataProfile } = profileData;
    const tournamentsData = useSelector((state) => state._tournaments);
    const { data, loading, error, success } = tournamentsData;

    // useMemo(() => {
    //     dispatch(profile());
    // }, [dispatch]);
    // useEffect(() => {
    //     if(dataProfile) {
    //         setUserProfile(dataProfile.user);
    //         console.log(userProfile);
    //         console.log(userData);
    //     }
    // }, [dataProfile, userProfile, setUserProfile]);

    useMemo(() => {
        dispatch(tournaments());
    }, [dispatch]);
    // tournament descriptions
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
    const UCL = "";
    const MTN8 = "";
    const NEDBANKCUP = "";
    return (
        <div className="homepage-hero">
            {loading && <Loading />}
            {
            // successProfile && (
                success && (
                    <>
                    <h3 style={{textAlign: "center"}}>Tournaments</h3>
                    <div className="container">
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
                                        description={(tournament.name=='PSL' ? PSL :
                                                     tournament.name=='GPL' ? GPL :
                                                     tournament.name=='NPFL' ? NPFL :
                                                     tournament.name=='UCL' ? UCL :
                                                     tournament.name=='MT8' ? MTN8 :
                                                     tournament.name=='NEDBANKCUP' ? NEDBANKCUP : "")}
                                        buttonText={userData===null ? "" : !isTokenValid() ? 'Play Predictor' : source==`join` ? (checkTournIdMatch(userData.tournaments, tournament._id) ? `Play Predictor` : `Join Tournament`) : `Play Predictor`}
                                        isPlayerPartOfTournament={userData===null ? "" : !isTokenValid() ? false : checkTournIdMatch(userData.tournaments, tournament._id)}
                                        // buttonText={source==`join` ? (checkTournIdMatch(userProfile.tournaments, tournament._id) ? `Play Predictor` : `Join Tournament`) : `Play Predictor`}
                                        // isPlayerPartOfTournament={checkTournIdMatch(userProfile.tournaments, tournament._id)}
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