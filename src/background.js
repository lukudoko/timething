import { useEffect, useState } from 'react';

const Background = () => {
    const [gradientString, setGradientString] = useState('');

    useEffect(() => {
        const fetchSunriseSunsetData = async () => {
            try {
                const cacheKey = 'sunsetSunriseCache';
                const cacheExpiry = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

                const cachedData = JSON.parse(localStorage.getItem(cacheKey));
                if (cachedData && Date.now() - cachedData.timestamp < cacheExpiry) {
                    setGradientString(generateBackgroundGradient(cachedData.data));
                    return;
                }

                const apiEndpoint = 'https://api.sunrise-sunset.org/json?lat=57.6529&lng=11.9106&formatted=0';
                const response = await fetch(apiEndpoint);
                const data = await response.json();

                const newData = {
                    data: data.results,
                    timestamp: Date.now(),
                };
                localStorage.setItem(cacheKey, JSON.stringify(newData));

                setGradientString(generateBackgroundGradient(data.results));
            } catch (error) {
                console.error('Error fetching sunrise-sunset data:', error);
                // Handle errors gracefully, maybe show a message to the user
            }
        };

        fetchSunriseSunsetData();
    }, []);

    const generateBackgroundGradient = (sunData) => {
        if (!sunData) {
            console.error('Error: Sunrise-sunset data not available.');
            return '';
        }

        const times = [
            sunData.civil_twilight_begin,
            sunData.sunrise,
            sunData.solar_noon,
            sunData.sunset,
            sunData.civil_twilight_end,
        ];

        const totalDayDurationMinutes = 24 * 60;
        const percentagesArray = times.map(value => {
            const time = new Date(value);
            const minutesSinceMidnight = time.getHours() * 60 + time.getMinutes();
            return parseFloat(((minutesSinceMidnight / totalDayDurationMinutes) * 100).toFixed(1));
        });

        percentagesArray[0] = parseFloat((percentagesArray[0] - 3).toFixed(1));
        percentagesArray[4] += 3;
        percentagesArray.push(percentagesArray[2] + 5);
        percentagesArray.sort((a, b) => a - b);

        const colors = ['#18181B', '#FDBA74', '#38BDF8', '#38BDF8', '#F87171', '#18181B'];
        const gradientStops = colors.map((color, index) => {
            const percentage = percentagesArray[index];
            return `${color} ${percentage}%`;
        });

        return `linear-gradient(to bottom, ${gradientStops.join(', ')})`;
    };
	
	
return gradientString;
};

export default Background;
