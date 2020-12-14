import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function Event() {
  const [eventData, setEventData] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/event?eventID=${id}`)
      .then((response) => {
        console.log("response", response.data);
        setEventData(response.data);
      })
      .catch((error) => {
        console.warn("event error", error);
      });
  }, [id]);

  if (!eventData.invitees) return null;

  return (
    <div>
      <h1>
        Event Page for{" "}
        <span className="emphasis">{eventData["eventName"]}</span>
      </h1>
      <div className="innerContainer">
        <p>
          <strong>Share Event Code: </strong> {id}
        </p>
        <strong> Members: </strong>
        <div className="members">
          {eventData.invitees.map((invitee, i) => {
            return <p key={i}> {invitee} | </p>;
          })}
        </div>
        <h2>
          <a href={`/gallery/${id}`}> Visit Gallery </a>
        </h2>
      </div>
    </div>
  );
}

export default Event;
