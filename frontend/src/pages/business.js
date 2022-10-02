import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground'

export default function Business(props) {
    const navigate = useNavigate();
    const [isBusinessReady, setBusinessReady] = useState(false);
    const [businessName, setBusinessName] = useState('');

    useEffect(() => {
        //const currentBusiness = AuthService.getCurrentBusiness();
        const JSONobj = '{"database":"businessNameTest"}';
        const currentBusiness = JSON.parse(JSONobj);

        if (typeof currentBusiness == "undefined") {
            navigate('/login');
        } else {
            setBusinessReady(true);
            setBusinessName(currentBusiness.database)
        }
    }, []);

    return (
        <div>
            {(isBusinessReady) ?
                <>
                    <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
                        <div style={{ width: '100vw' }}>
                            <div className="col-md-12" style={{ padding: '1rem 5rem', display: 'flex', justifyContent: 'center' }}>
                                <div className={`card card-container`} id={`cardBackground`}>
                                    <h1 className="text-center">{`${businessName}`} Customer Login</h1>
                                    <form className="row g-3" style={{ marginTop: '0.5rem' }}>
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label text-start" style={{ width: '100%' }}>Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="businessname"
                                                placeholder='Enter your username'
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label text-start">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder='Enter your password'
                                            />
                                        </div>
                                        <div className="col-12 text-start" style={{ marginBottom: '' }}>
                                            <button
                                                className={`btn bttn`}
                                            >
                                                <span>Login</span>
                                            </button>
                                        </div>
                                    </form>
                                    <p className="text-center" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Forgot password? Reset your password <a href='/' style={{ textDecoration: "underline" }}>here</a>.</p>
                                </div>
                            </div>
                        </div>
                        <BinaryBackground />
                    </div>
                </>
                : null
            }
        </div>
    )
}