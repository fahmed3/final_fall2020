//where to continue:
//implement axios, getting information from uploaded data

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
// Styles
import "./App.css";
// Pages
import Login from "./containers/Login";
import CreateAccount from "./containers/CreateAccount";
import Home from "./containers/Home";
import Header from "./components/Header";
import CreateEvent from "./containers/CreateEvent";
import Profile from "./containers/Profile";
import JoinEvent from "./containers/JoinEvent";
import Event from "./containers/Event";
import UploadPicture from "./containers/UploadPicture";
import AllEvents from "./containers/AllEvents";
import GalleryClass from "./containers/GalleryClass";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "final-project-fall2020.firebaseapp.com",
  projectId: "final-project-fall2020",
  storageBucket: "final-project-fall2020.appspot.com",
  messagingSenderId: "642509716845",
  appId: "1:642509716845:web:319f20d725a409c597ee64",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});

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

  // Check to see if user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is logged in
        setLoggedIn(true);
        setUserInformation(user);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  function LoginFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        setLoggedIn(true);
      })
      .catch(function (error) {
        document.getElementById("error").innerHTML =
          "<strong>Failed to login.</strong><br/>Please make sure you're using the right email and password,<br/>or create and account if you don't have one.";
        setLoggedIn(false);
      });
  }

  function LogoutFunction() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setUserInformation({});
      })
      .catch(function (error) {
        console.warn("LOGOUT ERROR", error);
      });
  }

  function CreateAccountFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;
    const name = e.currentTarget.createName.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        const user = response["user"];
        user
          .updateProfile({
            displayName: name,
          })
          .catch((e) => {
            console.warn("display name error", e);
          });
        setLoggedIn(true);
        return user.uid;
      })
      .then((userID) => {
        // also add to users collection
        axios
          .get(
            `https://enigmatic-waters-66804.herokuapp.com/create/user?userID=${userID}`
          )
          .catch((error) => {
            console.warn("adding user error", error);
          });
      })
      .catch(function (error) {
        console.warn("Account creation failed", error);
        document.getElementById(
          "error"
        ).innerHTML = `<strong>Failed to create account.</strong><br/>${error.message}`;
      });
  }

  if (loading) return null;

  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction} />
      <Router>
        <Route exact path="/login">
          {!loggedIn ? (
            <Login LoginFunction={LoginFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-account">
          {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-event">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <CreateEvent userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/join-event">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <JoinEvent userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/profile">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <Profile userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <Home userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/event/:id">
          {!loggedIn ? <Redirect to="/login" /> : <Event />}
        </Route>
        <Route exact path="/events">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <AllEvents userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/upload/:id">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <UploadPicture userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/gallery/:id">
          {!loggedIn ? <Redirect to="/login" /> : <GalleryClass />}
        </Route>
      </Router>
    </div>
  );
}

export default App;
