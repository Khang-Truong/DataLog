import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground'
import Navbar from '../components/navbar';
import { businesses } from '../TempData/UserData';

export default function Business(props) {
    let { businessname } = useParams();
    const navigate = useNavigate();
    const [isBusinessReady, setBusinessReady] = useState(false);
    const [business, setBusiness] = useState('')
    const [users, setUsers] = useState('')
    const [businessName, setBusinessName] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [url, setUrl] = useState('')

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        //const currentBusiness = AuthService.getCurrentBusiness();
        const currentbusiness = JSON.parse(localStorage.getItem('business'))
        const namecheck = currentbusiness.name.toLowerCase()

        if ('business' in localStorage) {
            setBusinessReady(true);
            setBusiness(currentbusiness)
            setBusinessName(currentbusiness.name)
            setUrl(namecheck.split(' ').join('-'))
            setUsers(currentbusiness.users)
        } else {
            navigate('/')
        }

        if ('isLoggedIn' in localStorage) {
            const isLoggedin = JSON.parse(localStorage.getItem('isLoggedIn'))
            console.log(isLoggedin)
            if (isLoggedin == true) {
                navigate(`/${namecheck.split(' ').join('-')}/dashboard`);
            } else {
                navigate('/')
            }

        }

    }, []);

    function continueLogin(e) {
        e.preventDefault();

        if (username != '' && password != '') {
            document.getElementById('alertInput').style.display = `none`
            console.log(username)
            console.log(password)
            console.log(users[0].username)

            users.map(function (user) {
                if (username == user.username && password == user.password) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isLoggedIn', JSON.stringify(true))
                    console.log(localStorage.getItem('user'))
                    navigate(`/${url}/dashboard`);
                } else {
                    document.getElementById('alertInput').innerText = 'Invalid username or password.\nPlease try again.'
                    document.getElementById('alertInput').style.display = `block`
                }
            })
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
                                    <h1 className="text-center">{`${businessName}`} Customer Login</h1>
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