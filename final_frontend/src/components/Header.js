import React from "react";

function Header({ loggedIn, LogoutFunction, userInformation }) {
  return (
    <div className="Header">
      <header>
        <nav>
          {loggedIn ? (
            <>
              <a href="/">Home</a>
              <a href="/events">Events</a>
              <a href={`/profile`}>Profile</a>
              <a href="/login" onClick={() => LogoutFunction()}>
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/create-account">Create Account</a>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
