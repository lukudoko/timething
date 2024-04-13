import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Time() {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const tim = time.format('h:mm');
  const amPm = time.format('a');
  
  return (
<div id="container" className="z-50 font-sans flex justify-center items-center h-fit">
	  <div id="clock" className="align-center font-bold text-[25vw] bg-gradient-to-b from-slate-50 to-zinc-50 text-transparent bg-clip-text">{tim}</div>
      <div id="ampm"  className="align-center font-light text-[6vw] bg-gradient-to-b from-slate-50 to-zinc-50 text-transparent bg-clip-text">{amPm}</div>
    </div>
  );
}

export default Time;