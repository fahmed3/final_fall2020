import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function CreateEvent({ userInformation }) {
  const history = useHistory();

  function submitEvent(e) {
    e.preventDefault();
    const eventName = e.currentTarget.recipeName.value;
    const eventCreator = e.currentTarget.recipeAuthor.value;
    const creatorId = userInformation.uid; // important, this is the indentifier
    //Code to come...
    //ingredients
    //author
    //etc
    axios
      .get(
        `http://localhost:4000/create?recipeName=${eventName}&recipeAuthor=${eventCreator}&recipeAuthorId=${creatorId}`
      )
      .then(function (response) {
        console.log({ SUCCESS: response });
        //reroute user after form submission
        history.push("/");
      })
      .catch(function (error) {
        console.warn("error creating post", error);
      });

    console.log(e.currentTarget);
  }

  return (
    <div>
      <h1> Create Event </h1>
      <form onSubmit={(e) => submitEvent(e)}>
        <label>
          Title
          <input type="text" name="title" placeholder="Title of Post" />
        </label>
        <input type="text" name="text" placeholder="Text of Post" />
        <input type="text" name="author" placeholder="Author" />
        <button type="submit"> Submit Event </button>
      </form>
    </div>
  );
}

export default CreateEvent;
