import React from "react";
import { useParams } from "react-router";
import { useEffect, useState, useMemo, useReducer } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "final-project-fall2020.firebaseapp.com",
  projectId: "final-project-fall2020",
  storageBucket: "final-project-fall2020.appspot.com",
  messagingSenderId: "642509716845",
  appId: "1:642509716845:web:319f20d725a409c597ee64",
};

function Gallery() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  let { id } = useParams();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function (e) {
        console.warn("instantiating auth error", e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://enigmatic-waters-66804.herokuapp.com/event?eventID=${id}`)
      .then((response) => {
        setEventData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("event error", error);
      });
  }, [id]);

  const [imagesArray, setImagesArray] = useState([]);
  useEffect(() => {
    const imagesArray = [];
    const storageRef = firebase.storage().ref();
    if (eventData.images) {
      const images = eventData.images;
      images.map((img) => {
        storageRef
          .child(img)
          .getDownloadURL()
          .then((url) => {
            return imagesArray.push(url);
          })
          .catch((error) => {
            console.warn("downloading image error", error);
          });
      });
      // for (var i = 0; i < images.length; i++) {
      //   storageRef
      //     .child(images[i])
      //     .getDownloadURL()
      //     .then((url) => {
      //       imagesArray.push(url);
      //     })
      //     .catch((error) => {
      //       console.warn("downloading image error", error);
      //     });
      // }
    }
    setImagesArray(imagesArray);
    forceUpdate();
  }, [eventData]);

  console.log("images", imagesArray);
  console.log("image filepaths", eventData.images);

  if (loading) return null;

  return (
    <div className="Gallery">
      <h1>
        Gallery for <span className="emphasis">{eventData["eventName"]}</span>
      </h1>
      <div className="innerContainer">
        <h2>
          <a href={`/upload/${id}`}>Add to Gallery </a>{" "}
        </h2>
        <br />
        <div className="Gallery" id="gallery"></div>
        {imagesArray.map((img, i) => (
          <img key={i} alt="" src={img} />
        ))}
        <a href={`/event/${id}`}>Back to Event</a>
      </div>
    </div>
  );
}

export default Gallery;
