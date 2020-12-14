import React from "react";

function Profile({ userInformation }) {
  return (
    <div>
      <h1>Profile </h1>
      {/* <p>
        <strong> UID: </strong> {userInformation.uid}
      </p> */}
      <p>
        <strong> Display Name: </strong> {userInformation.displayName}
      </p>
      <p>
        <strong> Email: </strong> {userInformation.email}
      </p>
    </div>
  );
}

export default Profile;
