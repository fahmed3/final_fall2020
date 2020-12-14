import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function CreateEvent({ userInformation }) {
  const history = useHistory();

  function submitEvent(e) {
    e.preventDefault();
    const eventName = e.currentTarget.eventName.value;
    const creatorId = userInformation.uid;
    let docID = "";

    axios
      .get(
        `http://localhost:4000/create?eventName=${eventName}&eventCreator=${"tbd"}&eventCreatorId=${creatorId}`
      )
      .then(function (response) {
        console.log({ SUCCESS: response.data });
        docID = response.data["docID"];
        return docID;
      })
      .then((docID) => {
        joinEvent(docID);
      })
      .catch(function (error) {
        console.warn("error creating post", error);
      });

    console.log(e.currentTarget);
  }

  //make sure to include host as invitee of event as well
  function joinEvent(eventID) {
    // const eventID = e.currentTarget.eventID.value;
    const userID = userInformation.uid;

    axios
      .get(`http://localhost:4000/join?eventID=${eventID}&userID=${userID}`)
      .then(function (response) {
        // console.log({ SUCCESS: response.data });
        //reroute user after form submission
        history.push(`/event/${eventID}`);
        //reroute to ask them about which modules to include
      })
      .catch(function (error) {
        console.warn("error creating post", error);
      });
  }

  return (
    <div>
      <h1> Create Event </h1>
      <form className="SignupForm" onSubmit={(e) => submitEvent(e)}>
        <label htmlFor="eventName">Event Name</label>
        <input type="text" name="eventName" placeholder="Event Name" />
        <button type="submit"> Submit Event </button>
      </form>
    </div>
  );
}

export default CreateEvent;
