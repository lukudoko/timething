import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AppTray = () => {
  const [widgets, setWidgets] = useState([]);

  const createWidget = (content, id) => {
    const newWidget = {
      id: id || Date.now(), // Use provided ID or generate a new one
      content: content,
    };
    if (widgets.length < 4) {
      setWidgets(prevWidgets => [...prevWidgets, newWidget]);
    } else {
      // Remove the oldest widget after a short delay
      setTimeout(() => {
        setWidgets(prevWidgets => prevWidgets.slice(1)); // Remove the oldest widget
        // Add the new widget after the delay
        setTimeout(() => {
          setWidgets(prevWidgets => [...prevWidgets, newWidget]);
        }, 230); // Adjust the delay as needed for smooth animation
      }, 10); // Adjust the delay as needed for smooth animation
    }
  };
  

useEffect(() => {
  const fetchWeatherData = async () => {
    try {
      const cacheKey = 'weatherData';
      const cacheExpiry = 15 * 60 * 1000; // 15 minutes in milliseconds
      const currentTime = Date.now();

      const cachedData = JSON.parse(localStorage.getItem(cacheKey));
      if (cachedData && currentTime - cachedData.timestamp < cacheExpiry) {
        console.log("Using cached weather data");

        createWeatherWidget(cachedData.data);
        return;
      }

      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=57.65&lon=11.916&appid=7be8a9d34955926d889f6ce6d3ea87fb&units=metric');
      const data = await response.json();

      const newData = {
        data: data,
        timestamp: currentTime,
      };
      localStorage.setItem(cacheKey, JSON.stringify(newData));

     createWeatherWidget(data);
    } catch (error) {
      console.error('Error fetching or caching weather data:', error);
    }
  };

  fetchWeatherData();

  // Set interval to fetch new weather data every 15 minutes
  const intervalId = setInterval(fetchWeatherData, 15 * 60 * 1000);

  // Clean up interval on component unmount
  return () => clearInterval(intervalId);
}, [widgets]);



const createWeatherWidget = (weatherData) => {
  try {
    const icon = weatherData.weather[0].icon;
    const temp = Math.trunc(weatherData.main.temp);
	
	const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;


    const existingWeatherWidget = widgets.find(widget => widget.id === 'weather');

    if (existingWeatherWidget) {
      const existingIcon = existingWeatherWidget.content.props.children[0].props.src;
      const existingTemp = existingWeatherWidget.content.props.children[1].props.children[0];
	 
	if (iconUrl !== existingIcon || temp !== parseInt(existingTemp)) {
        removeWidget("weather");
      } 
    } else {

      const weatherContent = (
        <div className="flex justify-center items-center max-h-full w-full" id="weather">
          <img className="h-16" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
          <div className="text-xl font-semibold text-center text-zinc-800">{temp}°C</div>
        </div>
      );

      createWidget(weatherContent, 'weather');
    }
  } catch (error) {
    console.error('Error creating weather widget:', error);
  }
};



  const removeWidget = (id) => {
    setWidgets(prevWidgets => prevWidgets.filter(widget => widget.id !== id));
  };


  return (
    <div className="z-50">
      <div className="w-[60vw] lg:w-[50vw] h-16 flex justify-evenly" id="appTray">
        <AnimatePresence>
          {widgets.map(widget => (
            <motion.div
              key={widget.id}
              className="flex backdrop-blur-md bg-white/20 rounded-md w-[14vw] lg:w-[11vw] h-16 shadow-md ring-1 ring-black/5 justify-center items-center"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0  }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, type: "spring", stiffness: 250, damping: 20 }}
              layout={true}
              //onClick={() => removeWidget(widget.id)}
            >
              {widget.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppTray;
