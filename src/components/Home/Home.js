import React from "react";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <section>
      <div className="flex justify-between items-center mx-10 md:h-[80vh]">
        <div>
          <h1 className="text-6xl font-bold">
            Fashion <br /> Collection{" "}
            <span className="text-orange-400">2023</span>
          </h1>
        </div>
        <div className="md:w-1/2">
          <Banner></Banner>
        </div>
      </div>
    </section>
  );
};

export default Home;
