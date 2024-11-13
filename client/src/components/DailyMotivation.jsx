import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DailyMotivation = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoLoading, setVideoLoading] = useState(false);
    const [mudraLoading, setMudraLoading] = useState(false);
    const [mudraForm, setMudraForm] = useState({
        mudra_img: null,
        name: '',
        description: '',
        perform: '',
        benefits: '',
        release: '',
        duration: ''
    });

    // Handle video file change
    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    // Handle mudra form changes
    const handleMudraChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setMudraForm({ ...mudraForm, [name]: files[0] });
        } else {
            setMudraForm({ ...mudraForm, [name]: value });
        }
    };

    // Handle video upload form submit
    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        setVideoLoading(true);
        const formData = new FormData();
        formData.append('videoFile', videoFile);

        try {
            const response = await axios.post('https://madhav-sewa-society-admin-v7wo.vercel.app/upload-daily-motivation', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(`Video uploaded successfully!`);
            setVideoFile(null); // Reset video file
        } catch (error) {
            console.error(error);
            toast.error('Error uploading video');
        } finally {
            setVideoLoading(false);
        }
    };

    // Handle mudra form submit
    const handleMudraSubmit = async (e) => {
        e.preventDefault();
        setMudraLoading(true);
        const formData = new FormData();
        formData.append('mudra_img', mudraForm.mudra_img);
        formData.append('name', mudraForm.name);
        formData.append('description', mudraForm.description);
        formData.append('perform', mudraForm.perform);
        formData.append('benefits', mudraForm.benefits);
        formData.append('release', mudraForm.release);
        formData.append('duration', mudraForm.duration);

        try {
            const response = await axios.post('https://madhav-sewa-society-admin-v7wo.vercel.app/upload-mudra', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Mudra added successfully!');
            setMudraForm({
                mudra_img: null,
                name: '',
                description: '',
                perform: '',
                benefits: '',
                release: '',
                duration: ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Error adding mudra');
        } finally {
            setMudraLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />

            {/* Loading Indicator */}
            {(videoLoading || mudraLoading) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-16 h-16 border-t-4 border-[#ffa85a] border-solid rounded-full animate-spin"></div>
                </div>
            )}

            {/* Upload Section */}
            <div className="container mx-auto my-10 p-4">
                <section className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl mb-4">Upload Your Daily Motivational Video</h2>
                    <form onSubmit={handleVideoSubmit} encType="multipart/form-data">
                        <label
                            htmlFor="video-upload"
                            className="block py-4 px-8 cursor-pointer border-2 border-dashed border-gray-400 rounded-lg mb-4"
                        >
                            {videoFile ? videoFile.name : "Choose a video to upload"}
                        </label>
                        <input
                            type="file"
                            id="video-upload"
                            name="videoFile"
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoChange}
                        />
                        <button
                            type="submit"
                            className="mt-4 bg-[#ffa85a] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-[#ffa85a] transition"
                        >
                            Upload
                        </button>
                    </form>
                </section>
            </div>

            {/* Mudra Form */}
            <div className="container mx-auto mb-10">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-center text-3xl underline mb-6">Add Mudra</h1>
                    <form onSubmit={handleMudraSubmit} encType="multipart/form-data" className="bg-[#fff8f1] p-6 rounded-lg flex flex-col gap-6">
                        <div className="flex flex-col">
                            <h5 className="text-lg mb-2">Upload Image:</h5>
                            <input
                                type="file"
                                name="mudra_img"
                                accept="image/*"
                                className="bg-white p-4 border rounded-lg"
                                onChange={handleMudraChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Mudra Name"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleMudraChange}
                            value={mudraForm.name}
                        />
                        <textarea
                            name="description"
                            placeholder="Mudra Description"
                            rows="6"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleMudraChange}
                            value={mudraForm.description}
                        ></textarea>
                        <textarea
                            name="perform"
                            placeholder="Steps to perform Mudra"
                            rows="10"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleMudraChange}
                            value={mudraForm.perform}
                        ></textarea>
                        <textarea
                            name="benefits"
                            placeholder="Benefits"
                            rows="6"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleMudraChange}
                            value={mudraForm.benefits}
                        ></textarea>
                        <textarea
                            name="release"
                            placeholder="Release"
                            rows="3"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleMudraChange}
                            value={mudraForm.release}
                        ></textarea>
                        <textarea
                            name="duration"
                            placeholder="Duration"
                            rows="3"
                            className="bg-white p-4 border rounded-lg"
                            onChange={handleMudraChange}
                            value={mudraForm.duration}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-[#ffa85a] text-white py-2 px-6 rounded-lg hover:bg-white hover:text-black hover:border hover:border-[#ffa85a] transition mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DailyMotivation;
