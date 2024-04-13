import Time from './time';
import Background from './bgtest';
//import BackgroundScroll from './bgscroll';




function App() {

  return (
     <div className="relative font-sans">
	  <div className="flex justify-center items-center min-h-screen">
	  <Time />
</div>
		    	 <Background />
		<div id="perc" classname="h-24"></div>
    </div>
  );
}

export default App;
