import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    alert("You are successfully logged out");
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      {Auth.loggedIn() && (
        <div>
          <button onClick={logout}>Logout</button>
          <button>Go to profile "not active yet"</button>
        </div>
      )}
      <div>
        <h2>Stuff about what the app is</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quis,
          deleniti assumenda amet facilis at? Minus in mollitia quo eius
          laudantium nulla accusamus laborum, soluta ipsa, corrupti ut,
          voluptate repellendus. Nisi odit deleniti aliquam consequuntur,
          perspiciatis rerum repellat, enim excepturi officiis aperiam, autem
          quo reiciendis reprehenderit neque non harum asperiores recusandae id
          dignissimos nam porro quos quaerat quam! Nemo, quas!
        </p>
        <Link to="/signup">
          <button>Teacher Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
