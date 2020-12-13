import React from "react";
//import axios from "axios";

//will become Home.js
//include button to createEvent
//include search bar for friends

function Home({ userInformation }) {
  return (
    <div className="Home">
      <h1> Home </h1>
      <div className="innerContainer">
        <a href={`/create-event`}>Create Event</a>
        <a href="/join-event">Join Event</a>
      </div>
      <h2>My Events </h2>
      {/* Order chronologically? */}
    </div>
  );
}

export default Home;
