import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(!user){
            if(location.pathname !== '/auth/login')
                
                navigate('/auth/login');
        }else{
            if(location.pathname === '/auth/login')
                navigate('/');
        }
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        navigate('/auth/login');
    }

    return (
        <nav className="bg-orange-400 p-3">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <a className="text-white text-lg font-bold" href="#">
                    Madhav Sewa Society
                </a>
                <button
                    className="block lg:hidden text-white focus:outline-none"
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto`} id="navbarNavDropdown">
                    <ul className="flex flex-col lg:flex-row lg:space-x-4 lg:ml-auto">
                        <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500" href="/volunteer">Become a volunteer</a>
                        </li>
                        <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500" href="/dailyMotivation">Daily Motivation & Mudras</a>
                        </li>
                        <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500" href="/donations">Donate</a>
                        </li>
                        <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500" href="/differentlyAbleContactForm">Differently Abled Contact Form</a>
                        </li>
                        <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500" href="/events">Events</a>
                        </li>
                        {
                        localStorage.getItem('user') && <li className="nav-item">
                            <a className="block text-white px-3 py-2 rounded hover:bg-orange-500 cursor-pointer" onClick={handleLogout}  >Logout</a>
                        </li>
                        }
                        
                        
                    </ul>

                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
