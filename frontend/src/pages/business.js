import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground'
import Navbar from '../components/navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Business() {
    let { businessname } = useParams();
    const navigate = useNavigate();
    const [isBusinessReady, setBusinessReady] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation();

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if (location.state.name != '') {
            setBusinessReady(true)
        } else {
            navigate('/login')
        }
    }, []);

    function continueLogin(e) {
        e.preventDefault();

        if (username != '' && password != '') {
            document.getElementById('alertInput').style.display = `none`
            console.log(username)
            console.log(password)
            console.log(location.state.name)

            const fd = new FormData()
            fd.append('username', username)
            fd.append('password', password)
            fd.append('client_id', location.state.name)

            axios
                .post("http://127.0.0.1:8000/token", fd)
                .then((response) => {
                    console.log(response);
                    Cookies.set("token", response.data.access_token);

                    localStorage.setItem("user", JSON.stringify(response.data));

                    const namecheck = location.state.name.toLowerCase()
                    const url = namecheck.split(' ').join('-')
                    console.log(url)
                    navigate(`/${url}/dashboard`);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            document.getElementById('alertInput').innerText = 'Please enter your username and password.'
            document.getElementById('alertInput').style.display = `block`
        }
    }

    return (
        <div>
            {(isBusinessReady) ?
                <>
                    <Navbar loading='lazy' />
                    <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
                        <div style={{ width: '100vw' }}>
                            <div className="col-md-12" style={{ padding: '1rem 5rem', display: 'flex', justifyContent: 'center' }}>
                                <div className={`card card-container`} id={`cardBackground`}>
                                    <h1 className="text-center">{`${location.state.name}`} Customer Login</h1>
                                    <form className="row g-3" style={{ marginTop: '0.5rem' }} onSubmit={continueLogin}>
                                        <h6 id='alertInput' style={{ display: 'none', color: 'red', paddingTop: '0' }}>Please enter your username and password.</h6>
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label text-start" style={{ width: '100%' }}>Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="businessname"
                                                placeholder='Enter your username'
                                                onChange={onUsernameChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label text-start">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder='Enter your password'
                                                onChange={onPasswordChange}
                                            />
                                        </div>
                                        <div className="col-12" style={{ marginBottom: '' }}>
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