import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function AllEvents({ userInformation }) {
  const [userEventsData, setUserEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = userInformation.uid;

  useEffect(() => {
    axios
      .get(
        `https://enigmatic-waters-66804.herokuapp.com/all-events?userID=${id}`
      )
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
      <h1> My Events </h1>
      <div className="innerContainer">
        {userEventsData.map((event, i) => (
          <EventCard eventData={event} key={i} />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
