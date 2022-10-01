import React, { useState, useEffect } from "react";
import BinaryBackground from '../components/binarybackground'

export default function Home() {

    return (
        <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
            <BinaryBackground/>
        </div>
    );
}