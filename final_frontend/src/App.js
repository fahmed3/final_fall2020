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
import Gallery from "./containers/Gallery";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "final-project-fall2020.firebaseapp.com",
  projectId: "final-project-fall2020",
  storageBucket: "final-project-fall2020.appspot.com",
  messagingSenderId: "642509716845",
  appId: "1:642509716845:web:319f20d725a409c597ee64",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // is logged in?
  const [loading, setLoading] = useState(true); // is page loading?
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

  // function for logging in
  function LoginFunction(e) {
    // This is what you will run when you want to log in
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;
    console.log({ email, password });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("Login RESPONSE", response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("Login ERROR", error);
        setLoggedIn(false);
      });
  }

  // iAH7L4BGZEg4U72ipWlW96Mcb4Y2

  // Function for logging out
  function LogoutFunction() {
    // Function to run when you want to log out
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

  // Function for ceating an account
  function CreateAccountFunction(e) {
    // what will run when you create an account
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;
    const name = e.currentTarget.createName.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("VALID ACCOUNT CREATE FOR:", response["user"]);
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
        //also add to users collection
        axios
          .get(
            `https://enigmatic-waters-66804.herokuapp.com/create/user?userID=${userID}`
          )
          .then((response) => {
            console.log("successful, response", response);
          })
          .catch((error) => {
            console.warn("adding user error", error);
          });
      })
      .catch(function (error) {
        console.warn("Account creation failed", error);
      });
  }

  if (loading) return null;

  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        LogoutFunction={LogoutFunction}
        userInformation={userInformation}
      />
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
          {!loggedIn ? <Redirect to="/login" /> : <Gallery />}
        </Route>
      </Router>
    </div>
  );
}

export default App;
