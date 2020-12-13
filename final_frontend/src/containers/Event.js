import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

//to be filled
function Event() {
  const [eventData, setEventData] = useState([]);
  //let eventData = {};
  // const [loading, setLoading]
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
  }, []);

  if (eventData.size == 0) return null;

  console.log("eventdata ", eventData);

  return (
    <div>
      <h1>
        Event Page for{" "}
        <span className="emphasis">{eventData["eventName"]}</span>{" "}
      </h1>
    </div>
  );
}

export default Event;
