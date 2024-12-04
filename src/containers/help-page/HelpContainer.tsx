'use client';

import React, { useState } from 'react';

export default function HelpContactContainer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setResponseMessage(result.error);
      }
    } catch (error) {
      setResponseMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#ffc00c] text-[#013c6c]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Contact Us</h1>
          <p className="text-lg mb-6">
            We're here to assist you. Find answers to common questions or reach out to our support team for help.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">How do I list my property?</h3>
              <p className="text-gray-800">
                To list your property, simply create an account, go to the "My Properties" section, and click on "Add Listing." Follow the steps to provide all the necessary details.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">How can I contact a landlord?</h3>
              <p className="text-gray-800">
                You can contact a landlord directly through the listing page. Click on "Contact Landlord" to send a message.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-medium mb-1 text-[#013c6c]">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#013c6c]"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium mb-1 text-[#013c6c]">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#013c6c]"
                placeholder="Your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-lg font-medium mb-1 text-[#013c6c]">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#013c6c]"
                placeholder="Your message"
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="bg-[#013c6c] text-white px-6 py-3 rounded-lg hover:bg-[#012d50] transition"
            >
              Send Message
            </button>
          </form>
          {responseMessage && (
            <div className="mt-4 text-lg font-medium">
              {responseMessage}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}