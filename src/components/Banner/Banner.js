import React from 'react';
import Lottie from "lottie-react";
import animation from "../../animation.json"
const Banner = () => {
    return (
        <div>
            <Lottie className="" animationData={animation} loop={true} />
        </div>
    );
};

export default Banner;