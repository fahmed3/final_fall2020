import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function JoinEvent({ userInformation }) {
  const history = useHistory();

  function joinEvent(e) {
    e.preventDefault();
    const eventID = e.currentTarget.eventID.value;
    const userID = userInformation.uid;
    const userName = userInformation.displayName;

    axios
      .get(
        `https://enigmatic-waters-66804.herokuapp.com/join?eventID=${eventID}&userID=${userID}&userName=${userName}`
      )
      .then(function (response) {
        if (!response.data)
          document.getElementById("error").innerHTML = "Could not find event.";
        else history.push(`/event/${eventID}`);
      })
      .catch(function (error) {
        console.warn("error creating event", error);
      });
  }

  return (
    <div>
      <h1> Join Event </h1>
      <form className="SignupForm" onSubmit={(e) => joinEvent(e)}>
        <label htmlFor="eventID">Enter Event ID </label>
        <input type="text" name="eventID" placeholder="Event ID" />
        <button type="submit"> Join </button>
      </form>
      <div id="error"></div>
    </div>
  );
}

export default JoinEvent;
