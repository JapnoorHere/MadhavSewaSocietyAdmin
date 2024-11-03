import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import AuthLogo from '../assets/auth-logo.jpg';

const Authentication = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen flex" >
                <div className="relative hidden md:flex md:w-1/2 items-center justify-center">
                    <div className='bg-black h-full w-full absolute bg-opacity-50 flex items-center justify-center'>
                        <h1 className='text-white text-7xl font-semibold text-center'>Small Effort Make <br /> Big Change</h1>
                    </div>
                    <img
                        src={AuthLogo}
                        alt="Authentication Logo"
                        className="w-full h-full object-cover shadow-lg"
                    />
                </div>

                <div className="flex w-full md:w-1/2 items-center justify-center">
                    <div className="w-full">
                        <Routes>
                            <Route path="/" element={<Navigate to="login" replace />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authentication;
