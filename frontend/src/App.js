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

export default function App() {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/business" element={<Business />} />
                        {/* <Route path="/:businessname" element={<Business />} /> */}
                        <Route path="/not-supported" element={<NotSupported />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}