import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import BecomeVolunteer from './components/BecomeVolunteer'
import DailyMotivation from './components/DailyMotivation'
import Donate from './components/Donate'
// import { Donate, DonationDetails, DonationList } from './components/Donate'
import DifferentlyAbleContactForm from './components/DifferentlyAbleContactForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DonationsList from './components/Donate'
import Events from './components/Events'
const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/volunteer" element={<BecomeVolunteer />} />
                        <Route path="/dailyMotivation" element={<DailyMotivation />} />
                        <Route path="/donations" element={<Donate />} />
                        <Route path="/donations/list" element={<DonationsList />} />
                        {/* <Route path="/donations/list" element={<DonationList />} /> */}
                        {/* <Route path="/donations/:name" element={<DonationDetails />} /> */}
                        <Route path="/differentlyAbleContactForm" element={<DifferentlyAbleContactForm />} />
                        <Route path="/events" element={<Events />} />
                    </Routes>
                </div>
            </Router>

        </div>
    )
}

export default App

