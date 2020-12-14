import React from "react";

// changes to be made
// no like this button or number of likes
// only name of event shown, as a link to event page
function EventCard({ eventData }) {
  // const [likes, setLikes] = useState(0);
  // useEffect(() => {
  //   if (eventData.likes) {
  //     return setLikes(eventData.likes.length);
  //   }
  // }, [eventData]);
  // function likePost() {
  //   axios
  //     .get(`localhost:4000/like-post/${eventData.id}`)
  //     .then(function () {
  //       setLikes(likes + 1);
  //     })
  //     .catch();
  // }

  console.log(eventData);

  return (
    <div className="EventCard">
      <h2>
        <a href={`/event/${eventData.eventID}`}>{eventData.eventName}</a>
      </h2>
      {/* <button onClick={() => likePost}> Like this </button>
      <p>Liked by {likes} people... </p>
      <ul>
        {eventData.ingredients &&
          eventData.ingredients.map((ingredient, i) => (
            <li key={i}>
              {ingredient.name} - {ingredient.amount}
            </li>
          ))}
      </ul> */}
    </div>
  );
}

export default EventCard;
