import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function Home({ userInformation }) {
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
  }, []);

  if (loading) return null;

  return (
    <div className="Home">
      <h1> Home </h1>
      <div className="innerContainer">
        <h2>
          <a href={`/create-event`}>Create Event</a>
        </h2>
        <h2>
          <a href="/join-event">Join Event</a>
        </h2>
      </div>
      <h1> My Events </h1>
      {/* Order chronologically? */}
      <div className="innerContainer">
        {userEventsData.map((event, i) => (
          <EventCard eventData={event} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Home;
