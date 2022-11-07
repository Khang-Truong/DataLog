import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import eventBus from "../common/eventbus";
import authService from "../services/auth.service";

function Navbar() {
    const [showLoginBtn, setShowLoginBtn] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [initials, setInitials] = useState('')
    const [user, setUser] = useState('')
    const [url, setUrl] = useState('')
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
    }

    useEffect(() => {

        if ((window.location.pathname == '/' || window.location.pathname == '/home')
            && !(navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
            setShowLoginBtn(true)
        } else {
            setShowLoginBtn(false);
        }

        if (window.location.pathname.includes('/analysis') || window.location.pathname.includes('/profile')
            || window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/train-model')
            || window.location.pathname.includes('/prediction') || window.location.pathname.includes('/feedback')) {
            setShowNavbar(false)

            authService.getCurrentUser().then((response) => {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data)

                const namecheck = response.data.db.toLowerCase()
                setUrl(namecheck.split(' ').join('-'))

                const firstinitial = Array.from(response.data.firstname)[0];
                const lastinitial = Array.from(response.data.lastname)[0];
                setInitials(firstinitial + lastinitial)
            }).catch((error) => {
                logOut()
            });
        }

        eventBus.on('logout', () => {
            logOut()
        })

        return () => {
            eventBus.remove('logout')
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
                                <span>Log In</span>
                            </button>
                        </a>
                    ) : <></>}
                </div >
            ) : (
                <div className={`dlSidebar d-flex justify-content-baseline`} style={{ zIndex: '2' }}>
                    <div className={`d-flex justify-content-between text-start`} style={{ flexDirection: 'column' }}>
                        <a href='/profile' style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ flexDirection: 'row', marginLeft: '0.2rem' }} className={`d-flex align-items-center`}>
                                <p data-letters={initials}></p>
                                <h6 style={{ marginLeft: '1.6rem' }}>{`${user.firstname} ${user.lastname}`}</h6>
                            </div>
                        </a>
                        <a href={`/${url}/dashboard`} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/dashboard') ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀦳</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀦲</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>Dashboard</h6>
                            </div>
                        </a>
                        <a href={`/${url}/prediction`} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/prediction') ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀜍</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀜎</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>Prediction</h6>
                            </div>
                        </a>
                        <a href={`/${url}/analysis`} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/analysis') ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀦌</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀥜</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>&nbsp;&nbsp;Analysis</h6>
                            </div>
                        </a>
                        <a href={`/${url}/train-model`} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/train-model') ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀧓</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀫥</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>Train Model</h6>
                            </div>
                        </a>
                        <a href={`/profile`} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {window.location.pathname.includes('/feedback') ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀿌</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀿋</h2>)}
                                <h6 style={{marginLeft: '1.6rem', marginRight:'1rem' }}>Customer Feedback</h6>
                            </div>
                        </a>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, marginTop: '1.5rem' }}>
                        <a href='/' onClick={logOut} style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                <h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀆧</h2>
                                <h6 style={{ marginLeft: '1.6rem' }}>Log Out</h6>
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;