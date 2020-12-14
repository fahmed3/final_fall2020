import React, { useEffect } from "react";
import { useParams } from "react-router";
import firebase from "firebase/app";
import "firebase/storage";
import axios from "axios";
import { useHistory } from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "final-project-fall2020.firebaseapp.com",
  projectId: "final-project-fall2020",
  storageBucket: "final-project-fall2020.appspot.com",
  messagingSenderId: "642509716845",
  appId: "1:642509716845:web:319f20d725a409c597ee64",
};

function UploadPicture({ userInformation }) {
  let { id } = useParams();
  const history = useHistory();

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

  function uploadFile(e) {
    e.preventDefault();
    const selectedFiles = document.getElementById("input").files;
    const storageRef = firebase.storage().ref();

    var imageFullRef, filepath;
    for (var i = 0; i < selectedFiles.length; i++) {
      filepath = `images/${selectedFiles[i]["name"]}`;
      imageFullRef = storageRef.child(filepath);
      imageFullRef.put(selectedFiles[i]).catch((error) => {
        console.warn("error uploading file", error);
      });
    }

    axios
      .get(`http://localhost:4000/upload?eventID=${id}&filepath=${filepath}`)
      .then((response) => {
        history.push(`/event/${id}`);
      })
      .catch((error) => {
        console.warn("error uploading path", error);
      });
  }

  return (
    <div>
      <h1> Upload Pictures </h1>
      <form onSubmit={(e) => uploadFile(e)}>
        <input type="file" id="input" multiple />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadPicture;
