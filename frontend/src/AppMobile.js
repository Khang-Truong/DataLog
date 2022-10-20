import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./scss/App.scss";
import Home from "./pages/home";
import NotSupported from "./pages/not-supported";
import Navbar from './components/navbar';

export default function AppMobile() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/not-supported" element={<NotSupported />} />
                        <Route path="*" element={<NotSupported />} />
                        {/* <Route render={() => <Redirect to={{pathname: "/not-supported"}} />} /> */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}