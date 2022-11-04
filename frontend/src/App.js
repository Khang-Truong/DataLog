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
//import Navbar from './components/navbar';
import Cookies from 'js-cookie';

const AuthApi = React.createContext();
const TokenApi = React.createContext();

export default function App() {
    const [showWarning, setShowWarning] = useState(false)
    const [auth, setAuth] = useState(false);

    const [token, setToken] = useState("");
    const readCookie = () => {
        let token = Cookies.get("token");
        if (token) {
            setAuth(true);
            setToken(token);
        }
    }

    const Auth = React.useContext(AuthApi);

    useEffect(() => {
        readCookie();

        window.addEventListener('resize', function () {
            if (window.innerWidth < 800) {
                setShowWarning(true)
            } else {
                setShowWarning(false)
            }
        })
    }, [])

    return (
        <AuthApi.Provider value={{ auth, setAuth }}>
            <TokenApi.Provider value={{ token, setToken }}>
                <Router>
                    <div className="App">
                        {/* <Navbar/> */}
                        <main>
                            {showWarning ? (<WindowWarning />)
                                : (
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
                                        {/* <Route path="*" element={<Home />} /> */}
                                    </Routes>
                                )}
                        </main>
                    </div>
                </Router>
            </TokenApi.Provider>
        </AuthApi.Provider>
    );
}