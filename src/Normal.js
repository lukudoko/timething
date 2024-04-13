import React, { useState, useEffect } from 'react';
import Time from './time';
import Background from './background';
import '@fontsource-variable/noto-sans';



const Normal = () => {
    const [backgroundPosition, setBackgroundPosition] = useState(() => {
        const cachedPosition = localStorage.getItem('latestBGPosition');
        return cachedPosition ? parseFloat(cachedPosition) : 0;
    });
	const [bgtrans, settrans] = useState('background-position-y 1s ease-in-out');
	const [percentageWidth, setperc] = useState(0);
	
	
	const gradientString = Background(); // Get the gradient string from the Background component
	

    const bgmove = () => {
        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        const totalMinutesInDay = 24 * 60;
        const percentage = totalMinutes / totalMinutesInDay;
        const backgroundHeight = 9 * window.innerHeight; // Adjust as needed
        const viewport = window.innerHeight;
        const newPositionValue = -(((backgroundHeight * percentage) - viewport / 2).toFixed(2));
        
		setperc(percentage * 100);
        setBackgroundPosition(newPositionValue);
        localStorage.setItem('latestBGPosition', newPositionValue.toString());
		

    if (percentage >= 0.9986 || percentage <= 0.0014) {
		settrans('background-position-y 0s ease-in-out')
    } else {
         settrans('background-position-y 1s ease-in-out')
    }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            bgmove();
			console.log(backgroundPosition);
        }, 1000);

        return () => clearInterval(interval);
    }, [backgroundPosition]); // Run the effect only once on component mount
	
	 


  return (
     <div className="relative font-sans bg-[#18181b]">
	  <div className="flex justify-center items-center min-h-screen">
	  <Time />
</div>
<div className="fixed top-0 left-0 w-screen">

 <div
        className="background-container"
        style={{
          height: '900vh',
          backgroundImage: gradientString,
          backgroundPosition: `center ${backgroundPosition}px`,
          transition: bgtrans
        }}
      ></div>

</div>
<div id="perc" style={{
    width: `${percentageWidth}%` // Set the width dynamically
}}
		  className="transition-width duration-500 ease-in-out h-2 backdrop-blur-md bg-white/30 bottom-0 fixed"></div>
    </div>
  );
}

export default Normal;
