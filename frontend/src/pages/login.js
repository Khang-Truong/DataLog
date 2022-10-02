import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground';

export default function Login(props) {
    const navigate = useNavigate();

    function continueLogin(e) {
        e.preventDefault();
        navigate('/business');
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
            <div style={{ width: '100vw' }}>
                <div className="col-md-12 text-center" style={{ padding: '1rem 5rem', display: 'flex', justifyContent: 'center' }}>
                    <div className={`card card-container`} id={`cardBackground`}>
                        <h1 className="text-center">DataLog Customer Login</h1>
                        <form className="row g-3" style={{ marginTop: '0.5rem' }} onSubmit={continueLogin}>
                            <div className="col-12">
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    name="businessname"
                                    placeholder='Enter your business name'
                                />
                            </div>
                            {/* When click continue ->  redirects to "/:businessname" */}
                            <div className="col-12 text-start" style={{ marginBottom: '' }}>
                                <button
                                    className={`btn bttn`}
                                >
                                    <span>Continue</span>
                                </button>
                            </div>
                        </form>
                        <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Interested in trying DataLog? Get FREE demo <a href='/register' style={{ textDecoration: "underline" }}>here</a>.</p>
                    </div>
                </div>
            </div>
            <BinaryBackground/>
        </div>
    );
}