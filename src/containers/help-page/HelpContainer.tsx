'use client';

import React from 'react';
import { FiPhone, FiMail, FiHelpCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function HelpContactContainer() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Help & Contact Us</h1>
      <p className="text-lg mb-10">
        We're here to assist you. Find answers to common questions or reach out to our support team for help.
      </p>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">How do I search for rental properties?</h3>
            <p>Use the search bar on the home page to enter the city, neighborhood, or keywords to find the perfect rental property.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">How do I contact a landlord?</h3>
            <p>Click the "Contact Landlord" button on the listing page to send a direct message or request more information.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">How do I report a suspicious listing?</h3>
            <p>If you suspect a listing is fraudulent, click the "Report Listing" button at the bottom of the listing page.</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <div className="flex items-start mb-8">
          <FiMail className="text-3xl mr-4 text-[#013c6c]" />
          <div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p>safehousegroup727@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Send Us a Message</h2>
        <form className="bg-gray-100 p-6 rounded-lg space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#013c6c]"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#013c6c]"
              placeholder="Your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg font-medium mb-1">Message</label>
            <textarea
              id="message"
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
      </section>

    </div>
  );
}
