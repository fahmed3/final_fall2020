import axios from "axios";
import React, { useState, useEffect } from "react";

function EventCard({ eventData }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (eventData.likes) {
      return setLikes(eventData.likes.length);
    }
  }, [eventData]);

  function likePost() {
    axios
      .get(`localhost:4000/like-post/${eventData.id}`)
      .then(function () {
        setLikes(likes + 1);
      })
      .catch();
  }

  return (
    <div className="EventCard">
      <h2>{eventData.eventName}</h2>
      <button onClick={() => likePost}> Like this </button>
      <p>Liked by {likes} people... </p>
      <ul>
        {eventData.ingredients &&
          eventData.ingredients.map((ingredient, i) => (
            <li key={i}>
              {ingredient.name} - {ingredient.amount}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default EventCard;
