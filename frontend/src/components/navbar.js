import React, { useEffect, useState } from "react";

function Navbar() {
    const [showLoginBtn, setShowLoginBtn] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {

        if ((window.location.pathname == '/' || window.location.pathname == '/home') && !(navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
            setShowLoginBtn(true)
        } else {
            setShowLoginBtn(false);
        }

        if (window.location.pathname.includes('/analysis') || window.location.pathname.includes('/profile') || window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/train-model') || window.location.pathname.includes('/prediction')) {
            setShowNavbar(false)
        }

    }, []);

    return (
        <div>
            {showNavbar ? (
                <div className={`dlNavbar d-flex justify-content-between`} style={{ zIndex: '2' }}>
                    <div className={`d-flex align-items-center`}>
                        <a href='/' style={{ textDecoration: 'none', color: 'black' }}>
                            <h1 style={{ fontFamily: 'Rockwell', letterSpacing: '-3pt' }} className={``}>DataLog</h1>
                        </a>
                    </div>
                    {showLoginBtn ? (
                        <a href='/login' style={{ maxWidth: 'auto', minWidth: '9rem' }}>
                            <button className={`btn bttn`}>
                                <span>Login</span>
                            </button>
                        </a>
                    ) : <></>}
                </div >
            ) : (
                <div className={`dlSidebar d-flex justify-content-baseline`} style={{ zIndex: '2' }}>
                    <div className={`d-flex justify-content-between text-start`} style={{ flexDirection: 'column' }}>
                        <a href='/profile' style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                <p data-letters='JD'></p>
                                <h6 style={{ marginLeft: '1rem' }}>John Doe</h6>
                            </div>
                        </a>
                        <a href='/dashboard' style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/dashboard') ? (<h2>􀦳</h2>) : (<h2 style={{ margin: '0' }}>􀦲</h2>)}
                                <h6 style={{ marginLeft: '1rem' }}>Dashboard</h6>
                            </div>
                        </a>
                        <a href='/prediction' style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/prediction') ? (<h2 style={{ margin: '0' }}>􀜍</h2>) : (<h2 style={{ margin: '0' }}>􀜎</h2>)}
                                <h6 style={{ marginLeft: '1rem' }}>Prediction</h6>
                            </div>
                        </a>
                        <a href='/analysis' style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/analysis') ? (<h2 style={{ margin: '0' }}>􀦌</h2>) : (<h2 style={{ margin: '0' }}>􀥜</h2>)}
                                <h6 style={{ marginLeft: '1rem' }}>&nbsp;&nbsp;Analysis</h6>
                            </div>
                        </a>
                        <a href='/train-model' style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/train-model') ? (<h2 style={{ margin: '0' }}>􀧓</h2>) : (<h2 style={{ margin: '0' }}>􀫥</h2>)}
                                <h6 style={{ marginLeft: '1rem' }}>Train Model</h6>
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Navbar;