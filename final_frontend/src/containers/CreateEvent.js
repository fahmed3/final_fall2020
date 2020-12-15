import axios from "axios";
import React, { useState } from "react";

function CreateEvent({ userInformation }) {
  const [created, setCreated] = useState(false);
  const [eventID, setEventID] = useState(null);
  //const [eventName, setEventName] = useState(null);
  const creatorId = userInformation.uid;

  function submitEvent(e) {
    e.preventDefault();
    const eventName = e.currentTarget.eventName.value;
    //setEventName(e.currentTarget.eventName.value);
    const creatorName = userInformation.displayName;
    let docID = "";
    console.log("Event name: ", eventName);

    axios
      .get(
        `http://enigmatic-waters-66804.herokuapp.com/create?eventName=${eventName}&eventCreator=${creatorName}&eventCreatorId=${creatorId}`
      )
      .then(function (response) {
        console.log({ SUCCESS: response.data });
        docID = response.data["docID"];
        setEventID(docID);
        return [docID, eventName];
      })
      .then((data) => {
        joinEvent(data[0], data[1]);
      })
      .catch(function (error) {
        console.warn("create event error", error);
      });

    console.log(e.currentTarget);
  }

  //make sure to include host as invitee of event as well
  function joinEvent(eventID) {
    // const eventID = e.currentTarget.eventID.value;
    const userID = userInformation.uid;
    const userName = userInformation.displayName;

    axios
      .get(
        `https://enigmatic-waters-66804.herokuapp.com/join?eventID=${eventID}&userID=${userID}&userName=${userName}`
      )
      .then(function (response) {
        setCreated(true);
      })
      .catch(function (error) {
        console.warn("create event error", error);
      });
  }

  return (
    <div>
      <h1> Create Event </h1>
      {created ? (
        <p>
          Yay! You just created an event. Share this code with your friends so
          they could join: <span className="emphasis"> {eventID} </span>
          <br /> <br />
          <a href={`/event/${eventID}`}> Go to Event Page </a>
        </p>
      ) : (
        <form className="SignupForm" onSubmit={(e) => submitEvent(e)}>
          <label htmlFor="eventName">Event Name</label>
          <input type="text" name="eventName" placeholder="Event Name" />
          <button type="submit"> Submit Event </button>
        </form>
      )}
    </div>
  );
}

export default CreateEvent;
