import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

// //from exercise 1
// import { useParams } from "react-router-dom";

function Profile({ userInformation }) {
  const [userEventsData, setUserEventsData] = useState([]);
  const id = userInformation.uid;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/profile?id=${id}`)
      .then(function (response) {
        if (response.data) {
          setUserEventsData(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.warn("PROFILE-ERROR", error);
      });
  }, []);

  return (
    <div>
      <h1> Profile </h1>
      <p>
        <strong> UID: </strong> {userInformation.uid}
      </p>
      <p>
        <strong> Email: </strong> {userInformation.email}
      </p>
      <h3> Hosted Events: </h3>
      <div className="innerContainer">
        {userEventsData.map((event, i) => (
          <EventCard eventData={event} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
