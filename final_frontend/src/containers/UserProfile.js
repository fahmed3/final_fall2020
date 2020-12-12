import React, { useState, useEffect } from "react";
import UserProfileComponent from "../components/UserProfileComponent";
//import axios from "axios";

//will become Home.js
//include button to createEvent
//include search bar for friends

function UserProfile({ userInformation }) {
  //const [sampleAPIData, setSampleAPIData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`https://enigmatic-waters-66804.herokuapp.com/all-blogposts`)
  //     .then(function (response) {
  //       if (response.data) {
  //         setSampleAPIData(response.data);
  //         console.log(response.data);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.warn("error: ", error);
  //     });
  // }, []);

  // console.log({ sampleAPIData });
  return (
    <div>
      <h1> User Profile </h1>
      <UserProfileComponent userInformation={userInformation} />
      <a href={`/create-event`}>Create Event</a>
    </div>
  );
}

export default UserProfile;
