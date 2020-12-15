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

    let fileExtension, docID;
    const filepath = `images/${id}`;
    for (var i = 0; i < selectedFiles.length; i++) {
      fileExtension = selectedFiles[i]["name"].split(".").pop();
      // Add empty doc to images collection
      axios
        .get(`http://localhost:4000/upload/image?eventID=${id}`)
        .then(function (response) {
          docID = response.data["docID"];
          return docID;
        })
        .then((docID) => {
          updateFilePath(selectedFiles[i], filepath, docID, fileExtension);
        })
        .catch(function (error) {
          console.warn("create event error", error);
        });
    }
  }

  function updateFilePath(file, filepath, docID, extension) {
    axios
      .get(
        `http://localhost:4000/upload?eventID=${id}&filepath=${filepath}&filename=${docID}&fileExtension=${extension}`
      )
      .then(() => {
        // add to storage after successful
        const storageRef = firebase.storage().ref();
        const imageFullRef = storageRef.child(
          `${filepath}/${docID}.${extension}`
        );
        imageFullRef.put(file).catch((error) => {
          console.warn("error uploading file", error);
        });
      })
      .then(() => {
        history.push(`/gallery/${id}`);
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
