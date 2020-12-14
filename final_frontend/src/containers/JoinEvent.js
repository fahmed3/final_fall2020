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
        // eventName = response.data["eventName"];
        //console.log("Response", response);
        history.push(`/event/${eventID}`);
      })
      .catch(function (error) {
        console.warn("error creating post", error);
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
    </div>
  );
}

export default JoinEvent;
