import React from "react";

function Navbar() {


    return (
        <div className={`dlNavbar d-flex justify-content-between`}>
            <div className={`d-flex align-items-center`}>
                <h1 style={{ fontFamily: 'Rockwell', letterSpacing: '-3pt' }} className={``}>DataLog</h1>
            </div>
            <a href='/login' style={{maxWidth:'auto', minWidth:'9rem'}}>
                <button className={`btn bttn`}>
                    <span>Login</span>
                </button>
            </a>
        </div >
    )
}

export default Navbar;