import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventsPage = () => {
    const [eventForm, setEventForm] = useState({
        event_img: null,
        date: '',
        description: '',
    });

    // Handle event form changes
    const handleEventChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setEventForm({ ...eventForm, [name]: files[0] });
        } else {
            setEventForm({ ...eventForm, [name]: value });
        }
    };

    // Handle event form submit
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('event_img', eventForm.event_img);  // Image file
        formData.append('date', eventForm.date);
        formData.append('description', eventForm.description);

        try {
            const response = await axios.post('http://localhost:4100/upload-event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Event added successfully!');
            setEventForm({ event_img: null, date: '', description: '' }); // Reset the form
        } catch (error) {
            console.error(error);
            toast.error('Error adding event');
        }
    };

    return (
        <div>
            {/* Toast Container */}
            <ToastContainer />

            {/* Events Section */}
            <div className="container mx-auto my-10 p-4">
                <section className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl mb-4">Add New Event</h2>
                    <form onSubmit={handleEventSubmit} encType="multipart/form-data" className="bg-[#fff8f1] p-6 rounded-lg flex flex-col gap-6">
                        <div className="flex flex-col">
                            <h5 className="text-lg mb-2">Upload Event Image:</h5>
                            <input
                                type="file"
                                name="event_img"
                                accept="image/*"
                                className="bg-white p-4 border rounded-lg"
                                onChange={handleEventChange}
                            />
                        </div>
                        <input
                            type="date"
                            name="date"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleEventChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Event Description"
                            rows="6"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleEventChange}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-[#ffa85a] text-white py-2 px-6 rounded-lg hover:bg-white hover:text-black hover:border hover:border-[#ffa85a] transition mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default EventsPage;
