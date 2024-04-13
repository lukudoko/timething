import { useEffect, useState } from 'react';
import Background from './background';

const BackgroundScroll = () => {
    const [targetPosition, setTargetPosition] = useState(0);
    const [transition, setTransition] = useState('none'); // Set transition to 'none' initially

    const [backgroundGradient, setBackgroundGradient] = useState('');

    const handleGradientChange = (gradientString) => {
        // Set the gradient string to the state
        setBackgroundGradient(gradientString);
    };

useEffect(() => {

            const bgMove = () => {
            const now = new Date();
            const totalMinutes = now.getHours() * 60 + now.getMinutes();
            const totalMinutesInDay = 24 * 60;
            const percentage = totalMinutes / totalMinutesInDay;

            const background = document.getElementById('background');
            const percElement = document.getElementById('perc');

			if (background && percElement) {
				
			var newPosition;
			
			const cachedPosition = localStorage.getItem('latestBGPosition');
			

			if (cachedPosition !== null) {

				
                var newPosition = cachedPosition;
                // Set the background position
                percElement.style.width = percentage * 100 + '%';
				background.style.backgroundPositionY = '-1111px'; // Using camelCase
				
				setTimeout(() => {
			        setTransition('background-position-y 1s ease-in-out');
			    }, 10);


		
				
				 } else {

			    setTransition('background-position-y 1s ease-in-out')
				
				// Calculate the new position
                const backgroundHeight = 9 * window.innerHeight; // Adjust as needed
                const viewport = window.innerHeight;
                var newPosition =  - ((backgroundHeight * percentage) - viewport / 2)
				localStorage.setItem('latestBGPosition', newPosition);
				
				console.log (newPosition);
							        
				
			    setTimeout(() => {
				setTargetPosition(newPosition);
			    }, 10);
				
                
            }
			}
        };

        // Call bgMove immediately
		bgMove();

        // Call bgMove every minute
        const interval = setInterval(bgMove, 60000);

        // Cleanup function
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="background" className="z-2" class="fixed h-screen w-screen top-0" style={{ background: backgroundGradient, minHeight: '900vh' }}>
            <Background onGradientChange={handleGradientChange} />
        </div>
    );
};

export default BackgroundScroll;
