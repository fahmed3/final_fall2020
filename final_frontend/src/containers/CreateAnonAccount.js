import React from "react";

function CreateAnonAccount({ CreateAnonAccountFunction }) {
  return (
    <div>
      <h1> Create Account </h1>
      <form
        className="SignupForm"
        onSubmit={(e) => CreateAnonAccountFunction(e)}
      >
        <label htmlFor="createName">Name</label>
        <input type="text" name="createName" />
        <label htmlFor="createPassword">Password</label>
        <input type="password" name="createPassword" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateAnonAccount;
