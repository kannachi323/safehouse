'use client';

import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="w-full min-h-screen bg-[#ffc00c] text-[#013c6c]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-6 text-[#013c6c]">
            Connecting people to their perfect rental home, hassle-free.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed text-[#013c6c]">
            We started SafeHouse to help people easily find their perfect rental property. After experiencing the struggles of searching for quality rental properties ourselves, we realized there had to be a better way. Our goal is to empower renters and landlords with tools that make renting easy and stress-free.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Transparency</h3>
              <p className="text-gray-800">We believe in being transparent with both renters and landlords.</p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Customer-Centric</h3>
              <p className="text-gray-800">Our users are at the core of everything we do.</p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Innovation</h3>
              <p className="text-gray-800">We continually innovate to simplify the rental process.</p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Trust & Safety</h3>
              <p className="text-gray-800">Your safety and trust are our top priorities.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
          <p className="text-lg leading-relaxed mb-8 text-[#013c6c]">
            Our team consists of passionate UCSC students dedicated to making the rental process better for everyone.
          </p>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-[#013c6c]">Matthew Chen</h3>
            <p className="text-lg text-[#013c6c]">Product Owner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Lola Quiroga</h3>
              <p className="text-md text-[#013c6c]">Backend Developer</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Derrick Lee</h3>
              <p className="text-md text-[#013c6c]">Backend Developer</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">George Austin</h3>
              <p className="text-md text-[#013c6c]">Backend Developer</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">JiaCheng Liu</h3>
              <p className="text-md text-[#013c6c]">Backend Developer</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#013c6c]">Nij Tandel</h3>
              <p className="text-md text-[#013c6c]">Frontend Developer</p>
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
    </div>
  );
}
