import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuotationsById, updateQuotation } from '../../api/services/projectServices';

const QuotationEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        requirement: '',
        techStack: '',
        company: '',
        quote: '',
        note: '',
        quotation: '',
        status: 'Pending',
        quotationDate: new Date().toISOString().split('T')[0],
        updateLog: ''
    });

    useEffect(() => {
        const fetchQuotation = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await getQuotationsById(id);
                if (response.status === 200) {
                    const data = response.data;
                    setFormData({
                        ...data,
                        quotationDate: data.quotationDate ? data.quotationDate.split('T')[0] : '' // Format correctly
                    });
                } else {
                    alert('Failed to fetch quotation details.');
                }
            } catch (error) {
                console.error('Error fetching quotation:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuotation();
    }, [id]);


    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedData = {
                ...formData,
                quotationDate: new Date(formData.quotationDate).toISOString() // Convert back to ISO format before saving
            };

            const response = await updateQuotation(id, updatedData);

            if (response.status === 200) {
                alert('Quotation updated successfully!');
                navigate('/quotation-table');
            } else {
                alert('Failed to update quotation. Please try again.');
            }
        } catch (error) {
            console.error('Error updating quotation:', error);
            alert('An error occurred while updating the quotation.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4 mt-24">
            <h2 className="text-4xl font-bold mb-10 text-center">Edit Quotation</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Contact */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                            Contact
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="contact"
                            type="text"
                            name="contact"
                            required
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Requirement */}
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirement">
                            Requirements
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            id="requirement"
                            name="requirement"
                            required
                            value={formData.requirement}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="techStack">
                            Tech Stack
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-14"
                            id="techStack"
                            type="text"
                            name="techStack"
                            value={formData.techStack}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Quote */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quote">
                            Quote
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="quote"
                            type="text"
                            name="quote"
                            required
                            value={formData.quote}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Sent">Sent</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="In Negotiation">In Negotiation</option>
                        </select>
                    </div>

                    {/* Quotation Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quotationDate">
                            Quotation Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="quotationDate"
                            type="date"
                            name="quotationDate"
                            value={formData.quotationDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/quotation-table')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Updating...' : 'Update Quotation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuotationEdit;
