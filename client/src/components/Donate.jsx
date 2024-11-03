import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Donate = () => {
  const [formData, setFormData] = useState({
    donation_name: '',
    donation_description: '',
    donation_fund: '',
    donation_image: null,
  });

  const [donations, setDonations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showDonations, setShowDonations] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch donations when component loads
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4100/donations/list');
      setDonations(response.data.donations);
    } catch (error) {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const fetchDonors = async (donationName) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4100/donations/${donationName}`);
      setDonors(response.data.users);
      setSelectedDonation(donationName);
    } catch (error) {
      toast.error('Failed to load donors for this donation');
    } finally {
      setLoading(false);
    }
  };

  const deleteDonation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;

    setLoading(true);
    try {
      await axios.get(`http://localhost:4100/deleteDonation/${id}`);
      toast.success('Donation deleted successfully');
      fetchDonations();
    } catch (error) {
      toast.error('Failed to delete donation');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, donation_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('donation_name', formData.donation_name);
    formPayload.append('donation_description', formData.donation_description);
    formPayload.append('donation_fund', formData.donation_fund);
    formPayload.append('donation_image', formData.donation_image);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4100/upload-donation', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setFormData({
          donation_name: '',
          donation_description: '',
          donation_fund: '',
          donation_image: null,
        });
        fetchDonations();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader border-t-4 border-[#ffa85a] rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      <div className="text-end my-4">
        <button
          onClick={() => setShowDonations(!showDonations)}
          className="w-full lg:w-auto bg-[#ffa85a] text-white py-3 px-6 rounded-lg hover:bg-[#fff8f1] hover:text-black border-2 border-transparent hover:border-[#ffa85a] transition-all duration-300"
        >
          {showDonations ? 'Add Donation' : 'View All Donations'}
        </button>
      </div>

      {!showDonations && (
        <div className="form mt-8">
          <div className="form-container max-w-screen-lg mx-auto px-4">
            <h1 className="text-center underline text-3xl mb-8">Add Donation</h1>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="bg-[#fff8f1] p-6 rounded-lg shadow-md w-full flex flex-col space-y-6"
            >
              <input
                type="text"
                placeholder="Donation Name"
                name="donation_name"
                value={formData.donation_name}
                onChange={handleInputChange}
                className="bg-white border-none p-3 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Description"
                name="donation_description"
                value={formData.donation_description}
                onChange={handleInputChange}
                className="bg-white border-none p-3 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Donation Fund"
                name="donation_fund"
                value={formData.donation_fund}
                onChange={handleInputChange}
                className="bg-white border-none p-3 rounded-lg w-full"
              />
              <div className="upload-img flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <h5 className="text-lg">Upload Image:</h5>
                <input
                  type="file"
                  accept="image/*"
                  name="donation_image"
                  onChange={handleFileChange}
                  className="w-full lg:w-3/5 bg-white p-3 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-40 bg-[#ffa85a] text-white p-3 rounded-lg hover:bg-[#fff8f1] hover:text-black border-2 border-transparent hover:border-[#ffa85a] mx-auto transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showDonations && (
        <div className="container mx-auto my-8 px-4">
          <h2 className="text-2xl text-center mb-4 font-semibold">Donation List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Donation Name</th>
                  <th className="py-2 px-4 border-b text-left">Description</th>
                  <th className="py-2 px-4 border-b text-left">Fund</th>
                  <th className="py-2 px-4 border-b text-left">Upload Date</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td
                      className="py-2 px-4 border-b cursor-pointer text-blue-600 underline"
                      onClick={() => fetchDonors(donation.donation_name)}
                    >
                      {donation.donation_name}
                    </td>
                    <td className="py-2 px-4 border-b">{donation.donation_description}</td>
                    <td className="py-2 px-4 border-b">{donation.donation_fund}</td>
                    <td className="py-2 px-4 border-b">{donation.donation_date_time}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => deleteDonation(donation._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedDonation && donors.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl text-center mb-4 font-semibold">Donors for {selectedDonation}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Donor Name</th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">Phone</th>
                      <th className="py-2 px-4 border-b text-left">Donation Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map((donor) => (
                      <tr key={donor._id}>
                        <td className="py-2 px-4 border-b">{donor.user_name}</td>
                        <td className="py-2 px-4 border-b">{donor.user_email}</td>
                        <td className="py-2 px-4 border-b">{donor.user_number}</td>
                        <td className="py-2 px-4 border-b">{donor.user_donation_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Donate;
