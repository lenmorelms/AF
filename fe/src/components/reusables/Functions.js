import { jwtDecode } from "jwt-decode";

// imgaes
export const logoImage = "/ap_imgs/logo/logo-no-background.svg";
export const heroLogoImage = "/ap_imgs/logo/logo-no-background.svg";
// export const heroLogoImage = "/ap_imgs/ap_banner.png";
export const tournImage = (name) => {
  return `/tourn_logos/${name}.png`;
};
export const teamImage = (country, team) => {
  return `/teams/${replaceSpacesWithHyphens(country).toLowerCase()}/${replaceSpacesWithHyphens(team).toLowerCase()}.png`;
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
export const selectedTournamentDat = null;

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

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const options = {
        day: '2-digit',        // Day of the month, 2 digits
        month: 'short',    // Short month name (e.g., "Sept")
        year: 'numeric'        // 4-digit year (e.g., "2024")
    };

    return date.toLocaleDateString('en-GB', options).replace(',', '');
};

export const isDateTimeInPast = (dateString, timeString) => {
  // Combine date and time strings into a single Date object
  const providedDateTime = new Date(`${dateString.split('T')[0]}T${timeString}:00.000`);

  // Get the current date and time
  const currentDateTime = new Date();

  // Check if the provided date and time are less than or equal to the current date and time
  return providedDateTime <= currentDateTime;
};

export const calculatePredictionPoints = (actualHomeScore, actualAwayScore, predictedHomeScore, predictedAwayScore) => {
  // Check for exact score match
  if (actualHomeScore === predictedHomeScore && actualAwayScore === predictedAwayScore) {
      return "exactScore";
  }

  // Check for correct result (win, lose, or draw)
  const actualResult = actualHomeScore > actualAwayScore ? "homeWin" :
                       actualAwayScore > actualHomeScore ? "awayWin" : "draw";
  const predictedResult = predictedHomeScore > predictedAwayScore ? "homeWin" :
                          predictedAwayScore > predictedHomeScore ? "awayWin" : "draw";

  if (actualResult === predictedResult) {
      return "correctResult";
  }

  // Check for close result
  const actualTotal = actualHomeScore + actualAwayScore;
  const predictedTotal = predictedHomeScore + predictedAwayScore;
  
  if (Math.abs(actualTotal - predictedTotal) <= 1.5) {
      return "closeResult";
  }

  // If none of the conditions match, return no points
  return "noPoints";
}

export const convertUTCToLocal = (utcDateString) =>{
  // Create a Date object in UTC
  const utcDate = new Date(utcDateString);
  
  // Convert to local time using the browser's time zone settings
  const localDate = new Date(utcDate.toLocaleString());

  return localDate;
}
export const convertUTCToLocalMobile = (utcDateString) => {
  // Create a Date object from the UTC string
  const utcDate = new Date(utcDateString);

  // Get the local time offset in minutes
  const timeOffset = utcDate.getTimezoneOffset();

  // Adjust the UTC date by the offset to get local time
  const localDate = new Date(utcDate.getTime() - (timeOffset * 60000));

  return localDate;
};


export const separateDateTime = (dateTime) => {
  // Get the date part (exclude day of the week)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
  const date = dateTime.toLocaleDateString('en-US', options); // Example: "Sep 16, 2024"

  // Get the time part (exclude seconds)
  const time = dateTime.toTimeString().split(' ')[0].slice(0, 5); // Example: "15:18"

  return { date, time };
}

export const isLocalTimeGreater = (dateTime) => {
  const localTime = new Date(); // Current local time
  const passedTime = new Date(dateTime); // Convert passed dateTime to a Date object

  return localTime > passedTime;
}