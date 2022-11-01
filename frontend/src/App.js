import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./scss/App.scss";
import Login from "./pages/login";
import Business from "./pages/business";
import Home from "./pages/home";
import NotSupported from "./pages/not-supported";
import Dashboard from './pages/dashboard';
import Analysis from './pages/analysis';
import Prediction from './pages/prediction';
import TrainModel from './pages/train-model';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Rating from "./pages/Rating";

export default function App() {
    return (
        <Router>
            <div className="App">
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
                        <Route path="/form" element={<Rating />} />
                        <Route path="/feedback" element={<SentimentAnalysis />} />
                        <Route path="/not-supported" element={<NotSupported />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}