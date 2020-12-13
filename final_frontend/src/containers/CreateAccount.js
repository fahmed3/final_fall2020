import React from "react";

function CreateAccount({ CreateAccountFunction }) {
  return (
    <div>
      <h1> Create Account </h1>
      <form className="SignupForm" onSubmit={(e) => CreateAccountFunction(e)}>
        <label htmlFor="createEmail">Email</label>
        <input type="email" name="createEmail" />
        <label htmlFor="createPassword">Password</label>
        <input type="password" name="createPassword" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateAccount;
