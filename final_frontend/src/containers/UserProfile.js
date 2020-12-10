import React, { useState, useEffect } from "react";
import UserProfileComponent from "../components/UserProfileComponent";
import axios from "axios";

function UserProfile({ userInformation }) {
  const [sampleAPIData, setSampleAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://enigmatic-waters-66804.herokuapp.com/`) // This will actually link to your Heroku deploy
      .then(function (response) {
        if (response.data) {
          setSampleAPIData(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }, []);

  // console.log({ sampleAPIData });
  return (
    <div>
      <h1> User Profile </h1>
      <UserProfileComponent userInformation={userInformation} />
    </div>
  );
}

export default UserProfile;
