'use client';

import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function AboutUsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Connecting people to their perfect rental home, hassle-free.
        </p>
      </section>

      {/* Company Story */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg leading-relaxed">
          We started SafeHouse to help people easily find their perfect rental property. After experiencing the struggles of searching for quality rental properties ourselves, we realized there had to be a better way. Our goal is to empower renters and landlords with tools that make renting easy and stress-free.
        </p>
      </section>

      {/* Company Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">Transparency</h3>
            <p>We believe in being transparent with both renters and landlords.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">Customer-Centric</h3>
            <p>Our users are at the core of everything we do.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p>We continually innovate to simplify the rental process.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">Trust & Safety</h3>
            <p>Your safety and trust are our top priorities.</p>
          </div>
        </div>
      </section>
      
        {/* Meet the Team */}
        <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-lg leading-relaxed mb-4">
            Our team consists of passionate UCSC students dedicated to making the rental process better for everyone.
        </p>

        {/* Product Owner */}
        <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold">Matthew Chen</h3>
            <p className="text-lg text-gray-600">Product Owner</p>
        </div>

        {/* Development Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
            <h3 className="text-xl font-semibold">Lola Quiroga</h3>
            <p className="text-md text-gray-600">Backend Developer</p>
            </div>
            <div className="text-center">
            <h3 className="text-xl font-semibold">Derrick Lee</h3>
            <p className="text-md text-gray-600">Backend Developer</p>
            </div>
            <div className="text-center">
            <h3 className="text-xl font-semibold">George Austin</h3>
            <p className="text-md text-gray-600">Backend Developer</p>
            </div>
            <div className="text-center">
            <h3 className="text-xl font-semibold">JiaCheng Liu</h3>
            <p className="text-md text-gray-600">Backend Developer</p>
            </div>
            <div className="text-center">
            <h3 className="text-xl font-semibold">Nij Tandel</h3>
            <p className="text-md text-gray-600">Frontend Developer</p>
            </div>
        </div>
        </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-6">Ready to Find Your Perfect Home?</h2>
        <a
          href="/listings/default"
          className="inline-block bg-[#013c6c] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#012d50] transition"
        >
          Browse Listings
        </a>
      </section>

    </div>
  );
}
