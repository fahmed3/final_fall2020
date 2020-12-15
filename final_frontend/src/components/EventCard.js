import React from "react";

function EventCard({ eventData }) {
  return (
    <div className="EventCard">
      <h2>
        <a href={`/event/${eventData.eventID}`}>{eventData.eventName}</a>
      </h2>
    </div>
  );
}

export default EventCard;
