import React, { useEffect } from "react";

const Message = ({ variant, children }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("error-popup").style.display = "none";
    }, 2500); // Hide the message after x seconds

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div id="error-popup" style={{ ...styles.messageBox, ...styles[variant] }}>
      <span>{children}</span>
    </div>
  );
};

const styles = {
  messageBox: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem",
    borderRadius: "5px",
    zIndex: 9999,
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  "alert-danger": {
    backgroundColor: "#ff4d4d", // Red for error
  },
  "alert-success": {
    backgroundColor: "#007bff", // Blue for success
  },
};

export default Message;