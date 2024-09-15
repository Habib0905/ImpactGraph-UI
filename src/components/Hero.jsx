import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-screen">
      <video
        className="w-full h-full object-cover"
        src="bg.mp4"
        autoPlay
        loop
        muted
      />
      <div className="hero-content text-neutral-content text-center">
        <div className="w-full">
          <h1 className="mb-5 text-white text-6xl font-bold">
            Welcome to ImapactGraph
          </h1>
          <p className="mb-5 text-white text-2xl">
            Unleash the power of data visualization. Connect, analyze, and make
            informed decisions with our intuitive graph-based platform designed
            to empower your projects.
          </p>

          <a href="/graph">
            <button className="btn bg-white text-pink-900  hover:bg-pink-900 hover:text-white">
              Get Started{" "}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
