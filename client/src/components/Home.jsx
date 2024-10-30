import React, { useEffect, useState } from 'react';
import Carousel1 from '../assets/carousel1.jpg'
import Carousel2 from '../assets/event1.jpg'
import Carousel3 from '../assets/madhav.jpg'
import Vision from '../assets/vision.png'
import Mission from '../assets/mission.png'
import Values from '../assets/values.png'
import AboutImg from '../assets/about-img.jpg'
import DonationTitle from '../assets/donations-title.png'
import Donation1 from '../assets/donations1.png'
import WomanEmpower from '../assets/woman-empower-logo.png'
import DisabledPerson from '../assets/disabled-person-logo.png'
import AnimalWelfare from '../assets/animal-welfare.png'
import Event1 from '../assets/event1.jpg'
import Event2 from '../assets/world-disable-2.jpg'
import Event3 from '../assets/madhav.jpg'

const Carousel = () => {
    const images = [
        { src: { Carousel1 }, alt: "Slide 1" },
        { src: { Carousel1 }, alt: "Slide 2" },
        { src: { Carousel1 }, alt: "Slide 3" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-[80vh] overflow-hidden">
            <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >

                <div className="min-w-full">
                    <img
                        src={Carousel1}
                        className="w-full h-full object-cover"
                    />


                </div>
                <div className="min-w-full">
                    <img
                        src={Carousel2}
                        className="w-full h-full object-cover"
                    />


                </div>
                <div className="min-w-full">
                    <img
                        src={Carousel3}
                        className="w-full h-full object-cover"
                    />


                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={() =>
                        setCurrentIndex(
                            currentIndex === 0 ? images.length - 1 : currentIndex - 1
                        )
                    }
                    className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
                >
                    ❮
                </button>
                <button
                    onClick={() =>
                        setCurrentIndex((currentIndex + 1) % images.length)
                    }
                    className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
                >
                    ❯
                </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const ValuesSection = () => {
    return (
        <section className="py-12">
            <div className="max-w-screen-lg mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                    <div className="bg-white border border-orange-500 p-4 rounded-lg shadow-lg hover:scale-105 transform transition-all">
                        <h1 className="text-xl font-semibold text-center">OUR VISION</h1>
                        <p className="text-center">
                            We envision a society where disability is embraced as diversity, fostering empowerment and opportunity for all.
                        </p>
                        <div className="flex justify-center mt-4">
                            <img src={Vision} alt="Vision" className="w-32 h-32" />
                        </div>
                    </div>

                    <div className="bg-white border border-orange-500 p-4 rounded-lg shadow-lg hover:scale-105 transform transition-all">
                        <h1 className="text-xl font-semibold text-center">OUR MISSION</h1>
                        <p className="text-center">
                            To provide unwavering support, advocacy, and resources, empowering individuals with disabilities to lead dignified, independent lives.
                        </p>
                        <div className="flex justify-center mt-4">
                            <img src={Mission} alt="Mission" className="w-32 h-32" />
                        </div>
                    </div>

                    <div className="bg-white border border-orange-500 p-4 rounded-lg shadow-lg hover:scale-105 transform transition-all">
                        <h1 className="text-xl font-semibold text-center">OUR VALUES</h1>
                        <p className="text-center">
                            Guided by the principles of empowerment, inclusivity, and equality, we strive to create a world where every individual's potential is celebrated and realized.
                        </p>
                        <div className="flex justify-center mt-4">
                            <img src={Values} alt="Values" className="w-32 h-32" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section className="py-12 bg-gray-50" id="about">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full flex justify-start">
                    <img
                        src={AboutImg}
                        alt="About Vivek Joshi"
                        className="rounded-lg shadow-lg w-full md:w-3/4 h-auto"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
                        About
                    </h1>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
                        Adv. Vivek Joshi
                    </h3>
                    <ul className="space-y-2 text-gray-600 text-lg">
                        <li><strong>National & State Awardee</strong></li>
                        <li><strong>President - </strong>Madhav Sewa Society</li>
                        <li><strong>President - </strong>SAFI NORTH INDIA</li>
                        <li>
                            <strong>Member State Advisory Board - </strong><br />
                            Divyangjan, Disability Activist
                        </li>
                        <li><strong>Member Kick Drugs (Aus)</strong></li>
                        <li><strong>Motivational Speaker</strong></li>
                    </ul>

                    {/* Read More Button */}
                    <a href="/aboutVivekJoshi">
                        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Read More
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
};


const DonationsSection = () => {
  return (
    <section className="bg-orange-400 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Container */}
          <div className="p-12 flex flex-col w-full lg:w-4/5 ml-auto">
            <div className="h-64 w-64 rounded-full overflow-hidden mx-auto mb-4">
              <img src={DonationTitle} alt="" className="w-full h-full" />
            </div>
            <h1 className="text-white text-4xl font-bold mb-4">Give a future full of choices</h1>
            <hr className="border-orange-300 mb-4" />
            <p className="text-white text-lg">
              In a world of possibilities, your donation paves the way. Empower individuals with the freedom to choose their path. Every contribution fuels dreams and opens doors to opportunities. Join us in shaping a tomorrow abundant with options.
            </p>
          </div>
          {/* Right Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
            {/* Donation Cards */}
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-2">
                <img src={Donation1} alt="" className="w-full h-full" />
              </div>
              <h2 className="text-xl font-semibold">Education Fund</h2>
              <p className="text-gray-700 mb-4">
                Support underprivileged children's education by providing school supplies, books, and tuition fees.
              </p>
              <a href="/donations">
                <button className="bg-orange-300 hover:bg-orange-700 text-black py-2 px-4 rounded-lg">
                  Donate Now
                </button>
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-2">
                <img src={WomanEmpower} alt="" className="w-full h-full" />
              </div>
              <h2 className="text-xl font-semibold">Women Empowerment</h2>
              <p className="text-gray-700 mb-4">
                Empower women through our cloth-making initiative, providing training and resources for income generation.
              </p>
              <a href="/donations">
                <button className="bg-orange-300 hover:bg-orange-700 text-black py-2 px-4 rounded-lg">
                  Donate Now
                </button>
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-2">
                <img src={DisabledPerson} alt="" className="w-full h-full" />
              </div>
              <h2 className="text-xl font-semibold">Disability Support Fund</h2>
              <p className="text-gray-700 mb-4">
                Ensuring accessibility for individuals with disabilities through specialized programs and assistive devices.
              </p>
              <a href="/donations">
                <button className="bg-orange-300 hover:bg-orange-700 text-black py-2 px-4 rounded-lg">
                  Donate Now
                </button>
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-2">
                <img src={AnimalWelfare} alt="" className="w-full h-full" />
              </div>
              <h2 className="text-xl font-semibold">Animal Welfare</h2>
              <p className="text-gray-700 mb-4">
                Support shelters and rescue organizations in providing food and medical care to abandoned animals.
              </p>
              <a href="/donations">
                <button className="bg-orange-300 hover:bg-orange-700 text-black py-2 px-4 rounded-lg">
                  Donate Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EventsSection = () => {
    return (
      <section className="bg-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl text-center font-bold mb-12 text-gray-800">
            Latest Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event Cards */}
            <a href="/connectWithUs" className="group relative block overflow-hidden rounded-lg shadow-lg">
              <div className="h-80 w-full relative">
                <img
                  src={Event1}
                  alt="Event 1"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-end justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
                  <h3 className="text-white font-bold text-xl p-4">
                    Book Inauguration
                  </h3>
                </div>
                <p className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                  Click to Know More
                </p>
              </div>
            </a>
  
            <a href="/connectWithUs" className="group relative block overflow-hidden rounded-lg shadow-lg">
              <div className="h-80 w-full relative">
                <img
                  src={Event2}
                  alt="Event 2"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-end justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
                  <h3 className="text-white font-bold text-xl p-4">
                    World Disable Day
                  </h3>
                </div>
                <p className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                  Click to Know More
                </p>
              </div>
            </a>
  
            <a href="/connectWithUs" className="group relative block overflow-hidden rounded-lg shadow-lg">
              <div className="h-80 w-full relative">
                <img
                  src={Event3}
                  alt="Event 3"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-end justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
                  <h3 className="text-white font-bold text-xl p-4">
                    Clothes Distribution
                  </h3>
                </div>
                <p className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                  Click to Know More
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    );
  };
  

const Home = () => {
    return (
        <>
            <ValuesSection />
                
        </>
    );
};

export default Home;
