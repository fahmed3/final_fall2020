import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function Profile({ userInformation }) {
  const [userEventsData, setUserEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = userInformation.uid;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/all-events?userID=${id}`)
      .then(function (response) {
        if (response.data) {
          setUserEventsData(response.data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.warn("HOME-ERROR", error);
      });
  }, [id]);

  if (loading) return null;

  return (
    <div>
      <h1>Profile </h1>
      <p>
        <strong> UID: </strong> {userInformation.uid}
      </p>
      <p>
        <strong> Display Name: </strong> {userInformation.displayName}
      </p>
      <p>
        <strong> Email: </strong> {userInformation.email}
      </p>
      <h1> My Events </h1>
      <div className="innerContainer">
        {userEventsData.map((event, i) => (
          <EventCard eventData={event} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
