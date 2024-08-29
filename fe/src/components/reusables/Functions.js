import { jwtDecode } from "jwt-decode";

// imgaes
export const logoImage = "/ap_imgs/logo/logo-no-background.svg";
export const heroLogoImage = "/ap_imgs/logo/logo-no-background.svg";
// export const heroLogoImage = "/ap_imgs/ap_banner.png";
export const tournImage = "https://s.yimg.com/ny/api/res/1.2/E2ehEvUxeyj2jdBmbVw3lQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/creative_bloq_161/87fefa9e5a05f4e3b07c88f2fe805fcc";
export const teamImage = (country, team) => {
  return `/teams/${replaceSpacesWithHyphens(country)}/${replaceSpacesWithHyphens(team)}.png`;
};
// export const heroImage = "https://media.istockphoto.com/id/615633948/photo/boy-kicking-a-soccer-ball-eveningthe-sun-was-falling.jpg?s=612x612&w=0&k=20&c=4FmbSVIIC8HvuhFPqMr6LX9Bd5YRscaE-VJif-_wskk=";
export const heroImage = "/ap_imgs/hero.jpg";
export const heroImage2 = "/ap_imgs/hero2.jpg";
export const infoImage = "/ap_imgs/ap_banner.png";
// export const infoImage = "https://media.istockphoto.com/id/954669366/photo/soccer-game-on-laptop-live-broadcast.jpg?s=612x612&w=0&k=20&c=X2moIWIeuThFVF9JFmtRRokA_DFkHtYi1nAIxjtzoRE=";
// HEADER CONFIG FUNCTION
export const  configFunction = (contentType, Authorization) => {
    const config = {
        headers: {
            "Content-type": contentType,
            "Authorization": Authorization,
        },
    };
    return config;
}
// REDUCER FUNCTION
export const reducerFunction = (state, action, REQUEST, SUCCESS, FAILURE) => {
    switch(action.type) {
        case REQUEST:
            return { ...state, loading: true, error: null, success: false };
        case SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload };
        case FAILURE:
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

// Helper function to check token validity
export const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else if(token === null ) {
      return false;
    } else {
      const decodedToken = jwtDecode(token);
      // Get current time in seconds
      const currentTime = Date.now() / 1000;
      // Return true if token hasn't expired
      return decodedToken.exp > currentTime;
    }
};

export const userData = JSON.parse(localStorage.getItem("userData")) || null;

export const checkTournIdMatch = (array, id) => {
    for (let item of array) {
      if (item.tournId === id) {
        return true; // Positive match found
        break;
      }
    }
    return false; // No match found
};

export const checkTournIdAndReturnObject = (array, id) => {
    for (let item of array) {
        if (item.tournId === id) {
          return item; // Positive match found
          break;
        }
      }
      return null; // No match found
};

export const findUserTeamAndLeagues = (data, tournamentId) => {
    // Initialize variables to store the results
    let playerTeam = null;
    let matchingLeagues = [];
  
    // Loop through the tournaments array to find a matching tournId
    for (let tournament of data.tournaments) {
      if (tournament.tournId === tournamentId) {
        playerTeam = tournament.playerTeam;
        break; // Exit the loop once a match is found
      }
    }
  
    // Loop through the leagues array to find all matching tournIds
    for (let league of data.leagues) {
      if (league.tournId === tournamentId) {
        matchingLeagues.push(league.leagueId);
      }
    }
  
    // Return the result if at least one match is found
    if (playerTeam || matchingLeagues.length > 0) {
      return { playerTeam, matchingLeagues };
    }
  
    // Return null if no matches are found
    return null;
  };

export const replaceSpacesWithHyphens = (str) => {
    return str.split(' ').join('-');
  }