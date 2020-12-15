import React, { useState, useEffect } from "react";
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
  const [docIds, setDocIds] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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
    if (selectedFiles.length) {
      const docIDs = [];
      Array.from(selectedFiles).forEach((file) => {
        axios
          .get(
            `https://enigmatic-waters-66804.herokuapp.com/upload/image?eventID=${id}`
          )
          .then(function (response) {
            return response.data["docID"];
          })
          .then((docID) => {
            docIDs.push(docID);
            setDocIds(docIDs);
          })
          .catch(function (error) {
            console.warn("create doc ids error", error);
          });
      });
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (docIds.length && selectedFiles.length) {
      Array.from(selectedFiles).forEach((doc, i) => {
        const fileExtension = doc["name"].split(".").pop();
        const docID = docIds[i];
        const filepath = `images/${id}`;
        uploadImageToStorage(doc, `${filepath}/${docID}.${fileExtension}`);
        updateFilePath(filepath, docID, fileExtension);
      });
    }
  }, [docIds]);

  function getFiles(e) {
    e.preventDefault();
    const inputFiles = document.getElementById("input").files;
    setSelectedFiles(inputFiles);
  }

  function uploadImageToStorage(file, filepath) {
    const storageRef = firebase.storage().ref();
    const imageFullRef = storageRef.child(filepath);

    imageFullRef
      .put(file)
      .then(() => {
        history.push(`/gallery/${id}`);
      })
      .catch((error) => {
        console.warn("error uploading file", error);
      });
  }

  function updateFilePath(filepath, docID, extension) {
    axios
      .get(
        `https://enigmatic-waters-66804.herokuapp.com/upload?eventID=${id}&filepath=${filepath}&filename=${docID}&fileExtension=${extension}`
      )
      .catch((error) => {
        console.warn("error uploading path", error);
      });
  }

  return (
    <div className="UploadPicture">
      <h1> Upload Pictures </h1>
      <form className="SignupForm" onSubmit={(e) => getFiles(e)}>
        <input type="file" id="input" />
        <button type="submit">Submit</button>
        <div id="success"></div>
      </form>
      <a className="footLink" href={`/gallery/${id}`}>
        Back to Gallery
      </a>
    </div>
  );
}

export default UploadPicture;
