import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function JoinEvent({ userInformation }) {
  const history = useHistory();
  let eventName = "";

  function joinEvent(e) {
    e.preventDefault();
    const eventID = e.currentTarget.eventID.value;
    const userID = userInformation.uid;

    axios
      .get(`http://localhost:4000/join?eventID=${eventID}&userID=${userID}`)
      .then(function (response) {
        // console.log({ SUCCESS: response.data });
        eventName = response.data["eventName"];
        //reroute user after form submission
        history.push(`/event/${eventID}`);
        //reroute to ask them about which modules to include
      })
      .catch(function (error) {
        console.warn("error creating post", error);
      });

    console.log("eventName", eventName);
    console.log("hello ", e.currentTarget);
  }

  return (
    <div>
      <h1> Join Event </h1>
      <form className="SignupForm" onSubmit={(e) => joinEvent(e)}>
        <label htmlFor="eventID">Enter Event ID </label>
        <input type="text" name="eventID" placeholder="Event ID" />
        <button type="submit"> Join </button>
      </form>
    </div>
  );
}

export default JoinEvent;
