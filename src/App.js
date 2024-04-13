// App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Normal from './Normal';
import Applets from './Applets';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Normal />} />
                <Route path="/apps" element={<Applets />} />
            </Routes>
        </Router>
    );
}
 
export default App;
