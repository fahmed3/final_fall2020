import React, { useEffect, useState, useReducer, useCallback } from "react";
import { useParams } from "react-router";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "final-project-fall2020.firebaseapp.com",
  projectId: "final-project-fall2020",
  storageBucket: "final-project-fall2020.appspot.com",
  messagingSenderId: "642509716845",
  appId: "1:642509716845:web:319f20d725a409c597ee64",
};

function GalleryClass() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [imagesArray, setImagesArray] = useState([]);
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

  useEffect(() => {
    const imagesArray = [];
    const storageRef = firebase.storage().ref();
    if (eventData.images) {
      eventData.images.map(
        async (img) =>
          await storageRef
            .child(img)
            .getDownloadURL()
            .then((url) => {
              imagesArray.push(url);
              forceUpdate();
            })
            .catch((error) => {
              console.warn("downloading image error", error);
            })
      );
    }
    setImagesArray(imagesArray);
  }, [eventData]);

  const photos = [];
  imagesArray.map((url, i) => {
    photos.push({ src: url, width: 4, height: 3 });
  });

  // const BasicRows = () => <Gallery photos={photos} />;
  // render(<BasicRows />, document.getElementById("galleryClass"));

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  if (loading) return null;

  return (
    <div className="GalleryClass">
      <h1>
        Gallery for <span className="emphasis">{eventData["eventName"]}</span>
      </h1>
      <div className="innerContainer">
        <h2>
          <a href={`/upload/${id}`}>Add to Gallery </a>{" "}
        </h2>
        <br />
        <div className="Gallery">
          {/* {imagesArray.map((url, i) => (
            <a href={url}>
              <img key={i} alt="" src={url} />
            </a>
          ))} */}
        </div>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
        <a href={`/event/${id}`}>Back to Event</a>
      </div>
    </div>
  );
}

export default GalleryClass;
