import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

//from exercise 1
import { useParams } from "react-router-dom";

function UserEvents({}) {
  const [UserEventsData, setUserEventsData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:4000/events/${id}`)
      .then(function (response) {
        if (response.data) {
          setUserEventsData(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.warn("error: ", error);
      });
  }, []);

  return (
    <div>
      <h2>{"name"} Recipes: </h2>
      {UserEventsData.map((event, i) => (
        <EventCard eventData={event} key={i} />
      ))}
    </div>
  );
}

export default UserEvents;
