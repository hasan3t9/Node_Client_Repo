import React from "react";
import AuthContext from "../../Provider/AuthContext";
import Hero from "../../Components/Hero/Hero";
import AllPosts from "./AllPost";

const Home = () => {
  return (
    <div>
      <Hero></Hero>

      <AllPosts></AllPosts>
    </div>
  );
};

export default Home;
