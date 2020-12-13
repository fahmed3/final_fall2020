import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function CreateEvent({ userInformation }) {
  const history = useHistory();

  function submitEvent(e) {
    e.preventDefault();
    const eventName = e.currentTarget.eventName.value;
    const creatorId = userInformation.uid;

    axios
      .get(
        `http://localhost:4000/create?eventName=${eventName}&eventCreator=${"tbd"}&eventCreatorId=${creatorId}`
      )
      .then(function (response) {
        console.log({ SUCCESS: response });
        //reroute user after form submission
        history.push("/");
        //reroute to ask them about which modules to include
      })
      .catch(function (error) {
        console.warn("error creating post", error);
      });

    console.log(e.currentTarget);
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
