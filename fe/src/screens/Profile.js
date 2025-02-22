// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header2 from "../components/Header2";
// import MobileHeader from "../components/mobile/MobileHeader";
// import Footer2 from "../components/reusables/Footer2";
// import FooterMobile from "../components/reusables/FooterMobile";
// import Button from "../components/reusables/Button";
// import { useDispatch, useSelector } from "react-redux";
// // import { getProfileData, deleteAccount, updatePassword } from "../redux/Actions";
// import Loading from "../components/reusables/Loading";
// import Message from "../components/reusables/Message";
// import { deleteProfile, profile, updateProfile } from "../redux/Actions";
// // import "./Profile.css";

// const Profile = ({ deviceType }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [userId, setUserId] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
    
//     const profileData = useSelector(state => state._profile);
//     const { loading, data, error, success } = profileData;

//     const updateProfileData = useSelector(state => state._updateProfile);
//     const { loading: updateLoading, data: updateData, error: updateError, success: updateSuccess } = updateProfileData;
//     const deleteProfileData = useSelector(state => state._deleteProfile);
//     const { loading: deleteLoading, data: deleteData, error: deleteError, success: deleteSuccess } = deleteProfileData;

//     useEffect(() => {
//         dispatch(profile());
//     }, [dispatch]);
//     useEffect(() => {
//         if(success) {
//             setUserId(data._id);
//             console.log(data);
//         }
//     }, [success]);
//     useEffect(() => {
//         if(updateSuccess) alert("Chnaged password");
//         if(updateError) alert("Failed");
//     }, [updateError, updateSuccess]);

//     useEffect(() => {
//         if(deleteSuccess) navigate("/");
//         if(deleteError) alert("Failed to delete account, Try again");
//     }, [deleteError, deleteSuccess]);

//     const handlePasswordChange = (e) => {
//         e.preventDefault();
//         if (newPassword === confirmPassword) {
//             dispatch(updateProfile(userId, newPassword));
//         } else {
//             alert("Passwords do not match");
//         }
//     };

//     const handleDeleteAccount = () => {
//         if (window.confirm("Are you sure you want to delete your account?")) {
//             dispatch(deleteProfile(userId)); 
//             // navigate("/");
//         }
//     };

//     return (
//         <div>
//             <div className="heading">
//                 {deviceType === "phone" ? <MobileHeader /> : <Header2 />}
//             </div>
//             {updateLoading && <Loading />}
//             {deleteLoading && <Loading />}
//             <div className="profile-body">
//                 {loading ? (
//                     <Loading />
//                 ) : error ? (
//                     <Message variant="alert-danger">{error}</Message>
//                 ) : (
//                     <>
//                         <div className="profile-header">
//                             <img 
//                                 src="/ap_imgs/profile.png" 
//                                 alt="Profile" 
//                                 className="profile-picture"
//                             />
//                             <div className="profile-info">
//                                 <h2>{data?.username}</h2>
//                                 <p>{data?.email}</p>
//                             </div>
//                         </div>

//                         <div className="tournaments-section">
//                             <h3>Your Tournaments</h3>
//                             <ul>
//                                 {success && data?.tournaments.length > 0 ? (
//                                     data?.tournaments.map(tournament => (
//                                         <li className="profile-tournament" key={tournament.tournId}>
//                                             <a href={`/${tournament.tournId}/predictions`}>
//                                                 <b>{tournament.tourName}</b>
//                                             </a>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <p>No tournaments joined yet.</p>
//                                 )}
//                             </ul>
//                         </div>

//                         <div className="password-section">
//                             <h3>Change Password</h3>
//                             <form onSubmit={handlePasswordChange}>
//                                 <input
//                                     type="password"
//                                     placeholder="New Password"
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     required
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Confirm Password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     required
//                                 />
//                                 <Button
//                                     className="btn btn-profile"
//                                     type="submit" 
//                                     text="Update Password" 
//                                 />
//                             </form>
//                         </div>

//                         <div className="delete-account-section">
//                             <Button
//                                 className="btn btn-danger"
//                                 text="Delete Account"
//                                 onClick={handleDeleteAccount}
//                             />
//                         </div>
//                     </>
//                 )}
//             </div>
//             {deviceType === "phone" ? <FooterMobile /> : <Footer2 />}
//         </div>
//     );
// };

// export default Profile;