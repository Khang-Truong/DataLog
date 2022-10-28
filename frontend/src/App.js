import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./scss/App.scss";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./pages/login";
import Business from "./pages/business";
import Home from "./pages/home";
import NotSupported from "./pages/not-supported";
import Dashboard from './pages/dashboard';
import Analysis from './pages/analysis';
import Prediction from './pages/prediction';
import TrainModel from './pages/train-model';
// import CustomerFeedback from './pages/customerFeedback';

//import Navbar from './components/navbar';

export default function App() {
    return (
        <Router>
            <div className="App">
                {/* <Navbar/> */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/:businessname" element={<Business />} /> */}
                        <Route path="/business" element={<Business />} />
                        {/* <Route path="/:businessname/dashboard" element={<Dashboard />} /> */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/analysis" element={<Analysis />} />
                        <Route path="/prediction" element={<Prediction />} />
                        <Route path="/train-model" element={<TrainModel />} />
                        {/* <Route path="/feedback" element={<CustomerFeedback />} /> */}
                        <Route path="/not-supported" element={<NotSupported />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}