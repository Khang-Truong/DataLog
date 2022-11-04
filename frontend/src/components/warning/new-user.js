import React, { useState, useEffect, useContext } from "react"
import MatrixRainingLetters from "../backgrounds/binarybackground"
import authService from "../../services/auth.service"
import Business from "../../pages/business"
import { v4 } from 'uuid'
import Cookies from 'js-cookie';

export default function NewUser() {
    var CryptoJS = require("crypto-js");

    const [data, setData] = useState('');

    useEffect(() => {
        const currentuser = localStorage.getItem('user');
        const userObj = JSON.parse(currentuser);
        console.log(JSON.stringify(userObj.access_token));

        authService.getCurrentUser().then(
            res => {
                console.log(res.data)
                setUser(res.data)
            }
        )
    }, [])

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function inputValidation(e) {
        e.preventDefault()
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        const usernameRegex = /^[A-Za-z0-9]+$/
        username = username.toLowerCase()

        if (username != '' && password != '') {
            document.getElementById('alertInput').style.display = `none`

            if (username != currentUsername && password != currentPassword) {
                if ((username.length > 5 && username.length < 17) && usernameRegex.test(username) && passwordRegex.test(password)) {
                    document.getElementById('alertUsername').style.display = `none`
                    document.getElementById('alertUsername1').style.display = `none`
                    document.getElementById('alertPassword').style.display = `none`

                    let key = v4()
                    localStorage.setItem('key', JSON.stringify(key));

                    const encrypted = CryptoJS.AES.encrypt(password, key);
                    console.log(encrypted.toString());

                    key = JSON.parse(localStorage.getItem('key'))
                    const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
                    console.log(decrypted);

                    user.username = username
                    user.password = encrypted.toString()
                    user.newuser = false
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('business', JSON.stringify(Object.assign({}, businesses, { users: user }))
                    )

                    console.log(JSON.parse(localStorage.getItem('user')))
                    console.log(JSON.parse(localStorage.getItem('business')))

                    window.location.reload()
                } else {
                    if (username.length < 6 || username.length > 16) {
                        document.getElementById('alertUsername').style.display = `block`
                    } else {
                        document.getElementById('alertUsername').style.display = `none`
                    }

                    if (usernameRegex.test(username)) {
                        document.getElementById('alertUsername1').style.display = `none`
                    } else {
                        document.getElementById('alertUsername1').style.display = `block`
                    }

                    if (passwordRegex.test(password)) {
                        document.getElementById('alertPassword').style.display = `none`
                    } else {
                        document.getElementById('alertPassword').style.display = `block`
                    }
                }
            } else {
                if (password == currentPassword) {
                    document.getElementById('alertPassword').innerText = 'Your new password cannot be the same as your current one.'
                    document.getElementById('alertPassword').style.display = `block`
                } else {
                    document.getElementById('alertPassword').innerText = 'Minimum and maximum length for password are 6 and 16 characters.\nPassword must have at least one number and one special character.'
                    document.getElementById('alertPassword').style.display = `none`
                }

                if (username == currentUsername) {
                    document.getElementById('alertUsername').innerText = 'Your new username cannot be the same as your current one.'
                    document.getElementById('alertUsername').style.display = `block`
                } else {
                    document.getElementById('alertUsername').innerText = 'Minimum and maximum length for username are 6 and 16 characters.'
                    document.getElementById('alertUsername').style.display = `none`
                }
            }
        } else {
            document.getElementById('alertInput').style.display = `block`
        }
    }

    return (
        <div>
            <div>
                <div className={`d-flex-row align-items-center`} style={{ zIndex: '99', height: '100vh', width: '100vw' }}>
                    <div style={{ zIndex: '99', position: 'absolute', bottom: '30%', width: '100%', paddingRight: '10%', paddingLeft: '10%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '500%' }}>􁏺 </h1>
                            <div style={{ paddingLeft: '1rem' }}>
                                <h1>Hello, {name}!</h1>
                                <h2>Looks like you're new here.</h2>
                                <h2>Please change your given username and password to your preference.</h2>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <form onSubmit={inputValidation} style={{ width: '80%', paddingRight: '5%', paddingLeft: '5%' }}>

                                <h6 id='alertInput' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Please enter your new username and password.</h6>
                                <div>
                                    <label htmlFor="username" className="form-label text-start" style={{ width: '100%' }}>Username</label>
                                    <h6 id='alertUsername' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Minimum and maximum length for username are 6 and 16 characters.</h6>
                                    <h6 id='alertUsername1' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Only letters and numbers are allowed for username.</h6>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder='New username'
                                        onChange={onUsernameChange}
                                        id='usernameInput'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="form-label text-start" style={{ width: '100%', paddingTop: '1rem' }}>Password</label>
                                    <h6 id='alertPassword' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Minimum and maximum length for password are 6 and 16 characters.<br />Password must have at least one number and one special character.</h6>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder='New password'
                                        onChange={onPasswordChange}
                                        id='passwordInput'
                                    />
                                </div>
                                <div>
                                    <button className={`btn bttn`} >
                                        Update Information
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div style={{ filter: 'blur(10px)' }}>
                        <MatrixRainingLetters loading='lazy' />
                    </div>
                </div>
            </div>
        </div>
    )
}