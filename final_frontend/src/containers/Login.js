import React from "react";

function Login({ LoginFunction }) {
  return (
    <div>
      <h1> Login </h1>
      <form className="SignupForm" onSubmit={(e) => LoginFunction(e)}>
        <label htmlFor="loginEmail">Email</label>
        <input type="email" name="loginEmail" />
        <label htmlFor="loginPassword">Password</label>
        <input type="password" name="loginPassword" />
        <button>Submit</button>
      </form>
      <div id="error"></div>
    </div>
  );
}

export default Login;
