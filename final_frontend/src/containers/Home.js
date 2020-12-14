import React from "react";

function Home({ userInformation }) {
  return (
    <div className="Home">
      <h1> Home </h1>
      <div className="innerContainerHome">
        <h2>
          <a href="/join-event">Join Event</a>
        </h2>
        <h2>
          <a href={`/create-event`}>Create Event</a>
        </h2>
      </div>
    </div>
  );
}

export default Home;
