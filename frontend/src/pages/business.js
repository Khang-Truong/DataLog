import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BinaryBackground from '../components/binarybackground'

export default function Business(props) {
    const navigate = useNavigate();
    const [isBusinessReady, setBusinessReady] = useState('');
    let businessName = ''
    
    useEffect(() => {
        //const currentBusiness = AuthService.getCurrentBusiness();
        let currentBusiness = [1]
        
        if (!currentBusiness?.length) {
            navigate('/login');
        } else {
            setBusinessReady(true);
            businessName = 'businessNameTest';
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
                                    <h1 className="text-center">{businessName} Customer Login</h1>
                                    <form className="row g-3" style={{ marginTop: '0.5rem' }}>
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label text-start">Username</label>
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
                                                className={`btn btnLogin`}
                                            >
                                                <span>Login</span>
                                            </button>
                                        </div>
                                    </form>
                                    <p className="text-center" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Interested in trying DataLog? Get FREE demo <a href='/register' style={{ textDecoration: "underline" }}>here</a>.</p>
                                </div>
                            </div>
                        </div>
                        <BinaryBackground/>
                    </div>
                </>
                : null
            }
        </div>
    )
}