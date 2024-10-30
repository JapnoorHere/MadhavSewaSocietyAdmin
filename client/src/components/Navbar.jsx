import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

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
                        
                        
                    </ul>

                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
