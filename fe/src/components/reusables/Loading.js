import React from "react";
import { Audio } from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",  // Full viewport height
      width: "100vw",   // Full viewport width
      position: "fixed", // Ensures the loader stays centered during scroll
      top: 0,
      left: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: to create an overlay effect
      zIndex: 1000 // Optional: to ensure the loader is on top of other elements
    }}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loading;

// import React from "react";
// import { Audio } from "react-loader-spinner";
// const Loading = () => {
//   return (
//     <div style={styles.loadingContainer}>
//       <div style={styles.spinner}></div>
//     </div>
//       <Audio
//       top="0"
//       left="0"
//       height="80"
//       width="80"
//       radius="9"
//       color="blue"
//       ariaLabel="loading"
//       wrapperStyle={{}}
//       wrapperClass
//     />
//   );
// };

// const styles = {
//   loadingContainer: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent dark overlay
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 9999,
//   },
//   spinner: {
//     border: "8px solid rgba(0, 123, 255, 0.2)", // Light blue border
//     borderRadius: "50%",
//     borderTop: "8px solid #007bff", // Blue spinner
//     width: "60px",
//     height: "60px",
//     animation: "spin 1s linear infinite",
//   },
//   "@keyframes spin": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// };

// export default Loading;