import React, { useEffect, useState } from "react";
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
import WindowWarning from "./components/warning/warning";
// import CustomerFeedback from './pages/customerFeedback';
import Navbar from './components/navbar';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Rating from "./pages/Rating";
import NewUser from "./components/warning/new-user";

export default function App() {
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {


        window.addEventListener('resize', function () {
            if (window.innerWidth < 800) {
                setShowWarning(true)
            } else {
                setShowWarning(false)
            }
        })
    }, [])

    return (
            <div className="App">
                <main>
                    {showWarning ? (<WindowWarning />)
                        : (
                            <><Navbar />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/:businessname" element={<Business />} />
                                    {/* <Route path="/business" element={<Business />} /> */}
                                    <Route path="/:businessname/dashboard" element={<Dashboard />} />
                                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                                    <Route path="/:businessname/analysis" element={<Analysis />} />
                                    <Route path="/:businessname/prediction" element={<Prediction />} />
                                    <Route path="/:businessname/train-model" element={<TrainModel />} />
                                    {/* <Route path="/feedback" element={<CustomerFeedback />} /> */}
                                    <Route path="/not-supported" element={<NotSupported />} />
                                    <Route path="/:businessname/new-user" element={<NewUser />} />
                                    {/* <Route path="*" element={<Home />} /> */}
                                    <Route path="/form" element={<Rating />} />
                                    <Route path="/feedback" element={<SentimentAnalysis />} />
                                </Routes>
                            </>
                        )}
                </main>
            </div>
    );
}