import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const BecomeVolunteer = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [status, setStatus] = useState('0'); // Default status is '0'

    useEffect(() => {
        // Fetch volunteers based on status
        const fetchVolunteers = async () => {
            try {
                const response = await axios.get(`https://madhav-sewa-society-admin-v7wo.vercel.app/volunteer?status=${status}`);
                setVolunteers(response.data);
            } catch (error) {
                console.error("There was an error fetching volunteers!", error);
            }
        };

        fetchVolunteers();
    }, [status]); // Fetch volunteers when status changes

    const handleVolunteerAction = async (id, action) => {
        try {
            await axios.get(`https://madhav-sewa-society-admin-v7wo.vercel.app/${action}-volunteer/${id}`);
            // Refresh volunteers after action
            const response = await axios.get(`https://madhav-sewa-society-admin-v7wo.vercel.app/volunteer?status=${status}`);
            setVolunteers(response.data);
        } catch (error) {
            console.error(`There was an error ${action === 'accept' ? 'accepting' : 'rejecting'} the volunteer!`, error);
        }
    };

    return (
        <div className="container mx-auto mt-5 p-4">
            {/* Links */}
            <div className="flex justify-end space-x-4 mb-4">
                <button onClick={() => setStatus('1')} className="text-sky-500">Accepted Volunteers</button>
                <button onClick={() => setStatus('-1')} className="text-red-500">Rejected Volunteers</button>
                <button onClick={() => setStatus('0')} className="text-black">Pending Volunteers</button>
            </div>

            {/* Status Heading */}
            <h2 className={`text-${status === '1' ? 'sky-500' : status === '-1' ? 'red-500' : 'black'}`}>
                {status === '0' && 'Volunteers Requests'}
                {status === '1' && 'Accepted Volunteers'}
                {status === '-1' && 'Rejected Volunteers'}
            </h2>

            {/* Responsive Table */}
            <div className="overflow-x-auto border border-orange-300 mt-4">
                <table className="min-w-full table-auto text-left">
                    <thead className="bg-orange-200">
                        <tr>
                            <th className="p-2">S No.</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone Number</th>
                            <th className="p-2">Date of Birth</th>
                            <th className="p-2">Qualifications</th>
                            <th className="p-2">Field</th>
                            {status === '0' && <th className="p-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.length > 0 ? (
                            volunteers.map((v, index) => (
                                <tr key={v._id} className="hover:bg-orange-100">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{v.name}</td>
                                    <td className="p-2">{v.email}</td>
                                    <td className="p-2">{v.phoneNumber}</td>
                                    <td className="p-2">{v.dateOfBirth}</td>
                                    <td className="p-2">{v.qualification}</td>
                                    <td className="p-2">{v.field}</td>
                                    {status === '0' && (
                                        <td className="p-2 flex space-x-2">
                                            <button onClick={() => handleVolunteerAction(v._id, 'accept')} className="text-green-500">
                                                <MdCheckCircle size={24} />
                                            </button>
                                            <button onClick={() => handleVolunteerAction(v._id, 'reject')} className="text-red-500">
                                                <MdCancel size={24} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-4">No volunteers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BecomeVolunteer;
