import React from "react";

function Header({ loggedIn, LogoutFunction }) {
  return (
    <div className="Header">
      <header>
        <nav>
          {loggedIn ? (
            <>
              <a href="/">User Profile</a>
              <a onClick={() => LogoutFunction()}>Logout</a>
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
