//where to continue:
//implement axios, getting information from uploaded data

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
// Styles
import "./App.css";
// Pages
import Login from "./containers/Login";
import CreateAccount from "./containers/CreateAccount";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";
import CreateEvent from "./containers/CreateEvent";
import UserEvents from "./containers/UserEvents";

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
    console.log("firebase initialized");
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function (e) {
        console.log("instantiating auth error", e);
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
        console.log("LOGOUT ERROR", error);
      });
  }

  // Function for ceating an account
  function CreateAccountFunction(e) {
    // what will run when you create an account
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("VALID ACCOUNT CREATE FOR:", email, response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("Account creation failed", error);
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
          {/** If someone is logged in don't take them to login page - take them to user profile */}
          {!loggedIn ? (
            <Login LoginFunction={LoginFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-account">
          {/** If someone is logged in, do not take them to create account page */}
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
        <Route exact path="/profile/:id">
          {/** If someone is not logged in, do not take them to user profile page */}
          {!loggedIn ? <Redirect to="/login" /> : <UserEvents />}
        </Route>
        <Route exact path="/">
          {/** If someone is not logged in, do not take them to user profile page */}
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <UserProfile userInformation={userInformation} />
            //or <UserEvents>
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
